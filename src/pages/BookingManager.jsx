import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  Heart, 
  Grid, 
  List, 
  X, 
  ChevronDown, 
  Loader, 
  CheckCircle,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  Download,
  Share2,
  Eye,
  Phone,
  MessageCircle,
  Navigation,
  Plane,
  Train,
  Car,
  Bed,
  Utensils
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAllBookings } from '../hooks/useUserData'
import { addToSaved, removeFromSaved, getUserSavedItems } from '../firebase/firestore'
import { 
  Navbar, 
  BottomNavbar, 
  SearchModal, 
  FilterModal, 
  LoadingSpinner, 
  DestinationCard, 
  CategoryFilter, 
  SortDropdown, 
  ViewToggle 
} from '../components'

// Helper functions moved outside components to avoid hoisting issues
const getBookingStatus = (booking) => {
  if (booking.status) return booking.status
  
  // Determine status based on dates
  const now = new Date()
  const checkInDate = new Date(booking.checkInDate || booking.createdAt)
  const checkOutDate = new Date(booking.checkOutDate || booking.createdAt)
  
  if (checkOutDate < now) return 'Completed'
  if (checkInDate <= now && checkOutDate >= now) return 'Active'
  if (checkInDate > now) return 'Upcoming'
  
  return 'Upcoming'
}

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'text-green-500'
    case 'active': return 'text-blue-500'
    case 'upcoming': return 'text-yellow-500'
    case 'cancelled': return 'text-red-500'
    default: return 'text-gray-500'
  }
}

const getStatusBgColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed': return 'bg-green-100 text-green-800'
    case 'active': return 'bg-blue-100 text-blue-800'
    case 'upcoming': return 'bg-yellow-100 text-yellow-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const BookingManager = () => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // State management
  const [activeFilter, setActiveFilter] = useState('All')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedItems, setSavedItems] = useState(new Set())
  const [appliedFilters, setAppliedFilters] = useState({})
  const [notificationCount, setNotificationCount] = useState(3)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('recent')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedBookings, setSelectedBookings] = useState(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  
  const itemsPerPage = 12

  // Fetch bookings using custom hook
  const { bookings, loading: bookingsLoading, error, refetch } = useAllBookings()
  
  const [filteredBookings, setFilteredBookings] = useState([])

  // Booking status categories
  const categories = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled']
  
  // Sort options specific to bookings
  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'departure', label: 'Departure Date' },
    { value: 'created', label: 'Booking Date' },
    { value: 'destination', label: 'Destination A-Z' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  // Load user's saved items
  useEffect(() => {
    const loadSavedItems = async () => {
      if (user?.uid) {
        try {
          const result = await getUserSavedItems(user.uid)
          if (result.success) {
            const savedItemIds = new Set(result.data.map(item => item.itemId))
            setSavedItems(savedItemIds)
          }
        } catch (error) {
          console.error('Error loading saved items:', error)
        }
      }
    }

    loadSavedItems()
  }, [user?.uid])

  // Filter and sort bookings
  useEffect(() => {
    let filtered = [...bookings]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.tripName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.destinationName?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply status filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(booking => {
        const status = getBookingStatus(booking)
        return status.toLowerCase() === activeFilter.toLowerCase()
      })
    }

    // Apply advanced filters
    if (appliedFilters.priceRange) {
      const [min, max] = appliedFilters.priceRange
      filtered = filtered.filter(booking => {
        const price = parseInt(booking.price?.replace(/[^\d]/g, '') || '0')
        return price >= min && price <= max
      })
    }

    if (appliedFilters.rating) {
      filtered = filtered.filter(booking => 
        parseFloat(booking.rating || 0) >= appliedFilters.rating
      )
    }

    if (appliedFilters.dateRange) {
      const [startDate, endDate] = appliedFilters.dateRange
      filtered = filtered.filter(booking => {
        const bookingDate = new Date(booking.createdAt)
        return bookingDate >= startDate && bookingDate <= endDate
      })
    }

    // Apply sorting
    switch (sortBy) {
      case 'departure':
        filtered.sort((a, b) => new Date(a.checkInDate || a.createdAt) - new Date(b.checkInDate || b.createdAt))
        break
      case 'created':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'destination':
        filtered.sort((a, b) => (a.tripName || '').localeCompare(b.tripName || ''))
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0')
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0')
          return priceB - priceA
        })
        break
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0')
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0')
          return priceA - priceB
        })
        break
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
        break
      default: // recent
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFilteredBookings(filtered)
    setCurrentPage(1)
  }, [bookings, searchQuery, appliedFilters, sortBy, activeFilter])

  // Handle search query from navigation state
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery)
    }
  }, [location.state])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setLoading(true)
    setTimeout(() => setLoading(false), 300)
  }

  const handleSaveItem = async (itemId) => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      const booking = bookings.find(b => b.id === itemId)
      if (!booking) return

      if (savedItems.has(itemId)) {
        const userSavedItems = await getUserSavedItems(user.uid)
        if (userSavedItems.success) {
          const savedItem = userSavedItems.data.find(item => item.itemId === itemId)
          if (savedItem) {
            await removeFromSaved(savedItem.id)
            setSavedItems(prev => {
              const newSet = new Set(prev)
              newSet.delete(itemId)
              return newSet
            })
          }
        }
      } else {
        const savedItemData = {
          itemId: itemId,
          itemType: 'Booking',
          title: booking.tripName || booking.title,
          subtitle: booking.location,
          price: booking.price,
          image: booking.image,
          description: booking.subtitle,
          rating: booking.rating,
          savedDate: new Date()
        }
        const result = await addToSaved(user.uid, savedItemData)
        if (result.success) {
          setSavedItems(prev => new Set([...prev, itemId]))
        }
      }
    } catch (error) {
      console.error('Error saving item:', error)
    }
  }

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters)
    setLoading(true)
    setTimeout(() => setLoading(false), 600)
  }

  const handleClearFilters = () => {
    setAppliedFilters({})
    setActiveFilter('All')
    setSearchQuery('')
  }

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings(prev => {
      const newSet = new Set(prev)
      if (newSet.has(bookingId)) {
        newSet.delete(bookingId)
      } else {
        newSet.add(bookingId)
      }
      setShowBulkActions(newSet.size > 0)
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedBookings.size === filteredBookings.length) {
      setSelectedBookings(new Set())
      setShowBulkActions(false)
    } else {
      setSelectedBookings(new Set(filteredBookings.map(b => b.id)))
      setShowBulkActions(true)
    }
  }

  const handleBulkAction = async (action) => {
    console.log(`Bulk ${action} for bookings:`, Array.from(selectedBookings))
    // Implement bulk actions here
    setSelectedBookings(new Set())
    setShowBulkActions(false)
  }

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const paginatedBookings = filteredBookings.slice(0, currentPage * itemsPerPage)
  const hasMoreItems = filteredBookings.length > currentPage * itemsPerPage

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  if (bookingsLoading || loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text={searchQuery ? `Searching bookings for "${searchQuery}"...` : "Loading your bookings..."} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Error Loading Bookings
          </h2>
          <p className="text-gray-300 mb-4">
            {error}
          </p>
          <button 
            onClick={refetch}
            className="px-6 py-3 rounded-xl font-semibold bg-yellow-400 text-navy hover:bg-yellow-300 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={2}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white truncate">
                My Bookings
              </h1>
              {searchQuery && (
                <p className="text-sm sm:text-base lg:text-lg font-normal text-gray-300 truncate">
                  {filteredBookings.length} results for "{searchQuery}"
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 sm:p-3 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFilterOpen(true)}
                className={`p-2 sm:p-3 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors relative`}
              >
                <Filter className="w-5 h-5" />
                {Object.keys(appliedFilters).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {showBulkActions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-blue-600/20 border border-blue-400/30 rounded-xl backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">
                  {selectedBookings.size} booking{selectedBookings.size !== 1 ? 's' : ''} selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleBulkAction('download')}
                    className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={() => handleBulkAction('share')}
                    className="px-3 py-1 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Bookings', value: bookings.length, color: 'text-blue-400' },
              { label: 'Active Trips', value: bookings.filter(b => getBookingStatus(b) === 'Active').length, color: 'text-green-400' },
              { label: 'Upcoming', value: bookings.filter(b => getBookingStatus(b) === 'Upcoming').length, color: 'text-yellow-400' },
              { label: 'Completed', value: bookings.filter(b => getBookingStatus(b) === 'Completed').length, color: 'text-purple-400' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <CategoryFilter 
          categories={categories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Sort and View Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedBookings.size === filteredBookings.length && filteredBookings.length > 0}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-300 flex-shrink-0">
                {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
              </span>
            </div>
            {filteredBookings.length > 0 && (
              <span className="text-xs sm:text-sm text-gray-400 truncate">
                Showing {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="sm:hidden">
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
            <SortDropdown 
              sortBy={sortBy}
              setSortBy={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>

        {/* Main Bookings Grid/List */}
        {filteredBookings.length > 0 ? (
          <>
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" 
              : "space-y-4 sm:space-y-6"
            }>
              {paginatedBookings.map((booking, index) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  index={index}
                  viewMode={viewMode}
                  isSaved={savedItems.has(booking.id)}
                  isSelected={selectedBookings.has(booking.id)}
                  onSave={() => handleSaveItem(booking.id)}
                  onSelect={() => handleSelectBooking(booking.id)}
                  onClick={() => navigate('/trip-details', { state: { trip: booking } })}
                  onViewDetails={() => navigate('/mybookings', { state: { tripName: booking.tripName } })}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreItems && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-8 sm:mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMore}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-yellow-400 text-navy hover:opacity-90 transition-opacity"
                >
                  Load More Bookings
                </motion.button>
              </motion.div>
            )}
          </>
        ) : (
          /* No Results */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {searchQuery ? 'No bookings found' : 'No bookings yet'}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {searchQuery 
                    ? `No bookings match "${searchQuery}". Try different keywords.`
                    : 'Start planning your next adventure! Browse destinations and create your first booking.'
                  }
                </p>
              </div>
              <div className="space-y-3">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="w-full px-6 py-3 rounded-xl font-semibold bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Clear Search
                  </button>
                )}
                <button
                  onClick={() => navigate('/explore')}
                  className="w-full px-6 py-3 rounded-xl font-semibold bg-yellow-400 text-navy hover:bg-yellow-300 transition-colors"
                >
                  Explore Destinations
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
        searchQuery={searchQuery}
        placeholder="Search bookings..."
      />
      
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        appliedFilters={appliedFilters}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  )
}

// Booking Card Component
const BookingCard = ({ 
  booking, 
  index, 
  viewMode, 
  isSaved, 
  isSelected, 
  onSave, 
  onSelect, 
  onClick, 
  onViewDetails 
}) => {
  const { isDark } = useTheme()
  const status = getBookingStatus(booking)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative ${viewMode === 'list' ? 'flex' : 'block'} bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 ${
        isSelected ? 'ring-2 ring-blue-400' : ''
      }`}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBgColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Image */}
      <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full'} h-48 relative overflow-hidden`}>
        <img
          src={booking.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'}
          alt={booking.tripName || booking.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className={`${viewMode === 'list' ? 'flex-1' : 'w-full'} p-4 sm:p-6`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate">
              {booking.tripName || booking.title}
            </h3>
            <p className="text-sm text-gray-300 truncate flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {booking.location || booking.destinationName}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onSave()
            }}
            className={`p-2 rounded-lg transition-colors ${
              isSaved ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'Date TBD'}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {booking.travelers || '1 traveler'}
            </span>
          </div>
          
          {booking.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-white">{booking.rating}</span>
              <span className="text-xs text-gray-400">({booking.reviews || 0} reviews)</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-yellow-400">
              {booking.price || 'Price TBD'}
            </span>
            <span className={`text-sm ${getStatusColor(status)}`}>
              {status}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails()
              }}
              className="p-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClick()
              }}
              className="px-3 py-1 rounded-lg bg-yellow-400 text-navy hover:bg-yellow-300 transition-colors font-medium text-sm"
            >
              View Trip
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BookingManager
