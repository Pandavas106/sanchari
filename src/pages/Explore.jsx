import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, MapPin, Calendar, Users, ArrowRight, TrendingUp, Heart, Grid, List, SlidersHorizontal, X, ChevronDown, Loader } from 'lucide-react'
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
  TrendingCard, 
  CategoryFilter, 
  SortDropdown, 
  ViewToggle 
} from '../components'

const Explore = () => {
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
  const [sortBy, setSortBy] = useState('popular')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12

  // Fetch bookings using custom hook
  const { bookings, loading: bookingsLoading, error } = useAllBookings()

  const [filteredBookings, setFilteredBookings] = useState([])

  const categories = ['All', 'Beach', 'Mountains', 'City', 'Culture', 'Nature', 'Adventure', 'Luxury']
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
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
        booking.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )
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
      filtered = filtered.filter(booking => (booking.rating || 0) >= appliedFilters.rating)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0')
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0')
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price?.replace(/[^\d]/g, '') || '0')
          const priceB = parseInt(b.price?.replace(/[^\d]/g, '') || '0')
          return priceB - priceA
        })
        break
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default: // popular
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    setFilteredBookings(filtered)
    setCurrentPage(1)
  }, [bookings, searchQuery, appliedFilters, sortBy])

  // Handle search query from navigation state
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery)
      handleSearch(location.state.searchQuery)
    }
  }, [location.state])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
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
        // Remove from saved
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
        // Add to saved
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

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  const paginatedBookings = filteredBookings.slice(0, currentPage * itemsPerPage)
  const hasMoreItems = filteredBookings.length > currentPage * itemsPerPage

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  if (bookingsLoading || loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text={searchQuery ? `Searching for "${searchQuery}"...` : "Loading bookings..."} />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 text-white`}>
            Error Loading Bookings
          </h2>
          <p className={`text-gray-300 mb-4`}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className={`px-6 py-3 rounded-xl font-semibold bg-yellow-400 text-navy`}
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
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white truncate`}>
                Explore Bookings
              </h1>
              {searchQuery && (
                <p className={`text-sm sm:text-base lg:text-lg font-normal text-gray-300 truncate`}>
                  {filteredBookings.length} results for "{searchQuery}"
                </p>
              )}
              <p className={`text-sm sm:text-base lg:text-lg text-gray-300 hidden sm:block`}>
                Discover your booked trips and itineraries
              </p>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl bg-navy/50 text-white hover:bg-opacity-70 transition-all min-w-0 flex-1 sm:flex-none sm:min-w-[200px]`}
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">
                  {searchQuery || 'Search...'}
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(true)}
                className={`p-2 sm:p-3 rounded-xl bg-navy/50 backdrop-blur-sm relative flex-shrink-0`}
              >
                <SlidersHorizontal className={`w-5 h-5 sm:w-6 sm:h-6 text-yellow-400`} />
                {Object.keys(appliedFilters).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </motion.button>

              <div className="hidden sm:block">
                <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(Object.keys(appliedFilters).length > 0 || searchQuery || activeFilter !== 'All') && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap items-center gap-2 overflow-hidden"
            >
              <span className={`text-xs sm:text-sm font-medium text-gray-300 flex-shrink-0`}>
                Filters:
              </span>
              
              <div className="flex flex-wrap gap-2 min-w-0">
                {searchQuery && (
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 bg-yellow-400 text-navy max-w-[150px] sm:max-w-none`}>
                    <span className="truncate">Search: "{searchQuery}"</span>
                    <button onClick={() => setSearchQuery('')} className="flex-shrink-0">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {activeFilter !== 'All' && (
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 bg-yellow-400 text-navy`}>
                    <span className="truncate">Category: {activeFilter}</span>
                    <button onClick={() => setActiveFilter('All')} className="flex-shrink-0">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                
                {Object.entries(appliedFilters).map(([key, value]) => (
                  <span key={key} className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 bg-gray-600 text-white max-w-[120px] sm:max-w-none`}>
                    <span className="truncate">{key}: {Array.isArray(value) ? value.join('-') : value}</span>
                    <button onClick={() => {
                      const newFilters = { ...appliedFilters }
                      delete newFilters[key]
                      setAppliedFilters(newFilters)
                    }} className="flex-shrink-0">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              
              <button 
                onClick={handleClearFilters}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-yellow-400 hover:bg-yellow-400/20 transition-colors flex-shrink-0`}
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 min-w-0">
            {/* Category Filters */}
            <CategoryFilter 
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            {/* Sort and View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
                <span className={`text-sm font-medium text-gray-300 flex-shrink-0`}>
                  {filteredBookings.length} bookings found
                </span>
                {filteredBookings.length > 0 && (
                  <span className={`text-xs sm:text-sm text-gray-400 truncate`}>
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
                    <DestinationCard
                      key={booking.id}
                      destination={booking}
                      index={index}
                      viewMode={viewMode}
                      isSaved={savedItems.has(booking.id)}
                      onSave={() => handleSaveItem(booking.id)}
                      onClick={() => navigate('/trip-details', { state: { trip: booking } })}
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
                                          className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base bg-yellow-400 text-navy hover:opacity-90 transition-opacity`}
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
                <div className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center bg-navy/50`}>
                  <Search className={`w-8 h-8 sm:w-12 sm:h-12 text-gray-400`} />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white`}>
                  No bookings found
                </h3>
                <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-gray-300 px-4`}>
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearFilters}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-yellow-400 text-navy hover:opacity-90 transition-opacity`}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 min-w-0">
            {/* Quick Filters */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className={`font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white truncate`}>
                Quick Filters
              </h3>
              <div className={`p-4 sm:p-6 rounded-xl bg-navy/50 backdrop-blur-sm space-y-4`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className={`flex-1 p-2 rounded-lg border-0 text-sm bg-navy/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 min-w-0`}
                      onChange={(e) => {
                        const min = parseInt(e.target.value) || 0
                        const max = appliedFilters.priceRange?.[1] || 100000
                        setAppliedFilters(prev => ({ ...prev, priceRange: [min, max] }))
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className={`flex-1 p-2 rounded-lg border-0 text-sm bg-navy/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 min-w-0`}
                      onChange={(e) => {
                        const max = parseInt(e.target.value) || 100000
                        const min = appliedFilters.priceRange?.[0] || 0
                        setAppliedFilters(prev => ({ ...prev, priceRange: [min, max] }))
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 text-white`}>
                    Minimum Rating
                  </label>
                  <div className="flex space-x-2">
                    {[4, 4.5, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAppliedFilters(prev => ({ ...prev, rating }))}
                        className={`flex-1 px-2 py-2 rounded-lg border text-sm ${
                          appliedFilters.rating === rating
                            ? 'bg-yellow-400 border-yellow-400 text-navy'
                            : 'border-gray-600 text-white hover:border-yellow-400'
                        } transition-colors`}
                      >
                        {rating}+
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Travel Tips */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className={`font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white truncate`}>
                Travel Tips
              </h3>
              <div className={`p-4 sm:p-6 rounded-xl bg-navy/50 backdrop-blur-sm space-y-4`}>
                {[
                  { icon: Calendar, title: 'Best Time to Book', desc: 'Book 6-8 weeks in advance for best deals', color: 'bg-blue-500' },
                  { icon: MapPin, title: 'Off-Season Travel', desc: 'Save up to 40% by traveling off-season', color: 'bg-green-500' },
                  { icon: Users, title: 'Group Discounts', desc: 'Travel with 4+ people for group rates', color: 'bg-purple-500' }
                ].map((tip, index) => {
                  const Icon = tip.icon
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start space-x-3"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${tip.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                      <div className="min-w-0">
                        <h4 className={`font-semibold text-sm sm:text-base text-white truncate`}>
                          {tip.title}
                        </h4>
                        <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed`}>
                          {tip.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <div className={`p-4 sm:p-6 rounded-xl bg-yellow-400`}>
                <h3 className={`font-bold text-lg sm:text-xl mb-2 text-navy truncate`}>
                  Stay Updated
                </h3>
                <p className={`text-sm mb-4 text-navy`}>
                  Get the latest travel deals and destination guides
                </p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-1 p-2 rounded-lg border-0 text-sm bg-navy/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 min-w-0`}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm bg-navy text-white hover:opacity-90 transition-opacity flex-shrink-0`}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
      <FilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={appliedFilters}
      />

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default Explore