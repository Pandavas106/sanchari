import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, MapPin, Calendar, Users, ArrowRight, TrendingUp, Heart, Grid, List, SlidersHorizontal, X, ChevronDown, Loader } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BottomNavbar from '../components/BottomNavbar'
import SearchModal from '../components/SearchModal'
import FilterModal from '../components/FilterModal'
import LoadingSpinner from '../components/LoadingSpinner'
import DestinationCard from '../components/DestinationCard'
import TrendingCard from '../components/TrendingCard'
import CategoryFilter from '../components/CategoryFilter'
import SortDropdown from '../components/SortDropdown'
import ViewToggle from '../components/ViewToggle'

const Explore = () => {
  const { isDark } = useTheme()
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
  const [hasMore, setHasMore] = useState(true)
  const [destinations, setDestinations] = useState([])
  const [filteredDestinations, setFilteredDestinations] = useState([])

  const itemsPerPage = 12

  // Mock data - In real app, this would come from API
  const allDestinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      location: "Cyclades, Greece",
      price: "From ₹45,000",
      originalPrice: "₹55,000",
      rating: 4.8,
      reviews: 324,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      tag: "Featured",
      category: "Beach",
      description: "Stunning sunsets and white-washed buildings overlooking the Aegean Sea",
      duration: "5-7 days",
      bestTime: "Apr-Oct",
      highlights: ["Sunset Views", "Wine Tasting", "Volcanic Beaches"],
      trending: true,
      discount: 18
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      location: "Kansai, Japan",
      price: "From ₹65,000",
      rating: 4.9,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
      tag: "Cultural",
      category: "Culture",
      description: "Ancient temples, traditional gardens, and authentic Japanese culture",
      duration: "6-8 days",
      bestTime: "Mar-May, Sep-Nov",
      highlights: ["Temples", "Gardens", "Traditional Culture"],
      trending: true
    },
    {
      id: 3,
      name: "Maldives",
      location: "Indian Ocean",
      price: "From ₹85,000",
      originalPrice: "₹95,000",
      rating: 4.7,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      tag: "Luxury",
      category: "Beach",
      description: "Overwater bungalows and pristine coral reefs in paradise",
      duration: "4-6 days",
      bestTime: "Nov-Apr",
      highlights: ["Overwater Villas", "Diving", "Spa Resorts"],
      trending: false,
      discount: 11
    },
    {
      id: 4,
      name: "Swiss Alps",
      location: "Switzerland",
      price: "From ₹75,000",
      rating: 4.6,
      reviews: 445,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tag: "Adventure",
      category: "Mountains",
      description: "Breathtaking alpine scenery and world-class skiing",
      duration: "7-10 days",
      bestTime: "Dec-Mar, Jun-Sep",
      highlights: ["Skiing", "Hiking", "Mountain Views"],
      trending: true
    },
    {
      id: 5,
      name: "Dubai, UAE",
      location: "United Arab Emirates",
      price: "From ₹55,000",
      rating: 4.5,
      reviews: 678,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      tag: "Luxury",
      category: "City",
      description: "Modern marvels, luxury shopping, and desert adventures",
      duration: "4-6 days",
      bestTime: "Nov-Mar",
      highlights: ["Shopping", "Architecture", "Desert Safari"],
      trending: true
    },
    {
      id: 6,
      name: "Bali, Indonesia",
      location: "Indonesia",
      price: "From ₹35,000",
      originalPrice: "₹42,000",
      rating: 4.7,
      reviews: 756,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
      tag: "Popular",
      category: "Culture",
      description: "Tropical paradise with rich culture and stunning landscapes",
      duration: "6-8 days",
      bestTime: "Apr-Oct",
      highlights: ["Temples", "Rice Terraces", "Beaches"],
      trending: true,
      discount: 17
    },
    {
      id: 7,
      name: "Paris, France",
      location: "Île-de-France, France",
      price: "From ₹70,000",
      rating: 4.8,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=400&q=80",
      tag: "Classic",
      category: "City",
      description: "The City of Light with iconic landmarks and world-class cuisine",
      duration: "5-7 days",
      bestTime: "Apr-Jun, Sep-Oct",
      highlights: ["Eiffel Tower", "Museums", "Cuisine"],
      trending: false
    },
    {
      id: 8,
      name: "Iceland",
      location: "Nordic Island",
      price: "From ₹80,000",
      rating: 4.9,
      reviews: 423,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tag: "Adventure",
      category: "Nature",
      description: "Land of fire and ice with stunning natural phenomena",
      duration: "8-10 days",
      bestTime: "Jun-Aug",
      highlights: ["Northern Lights", "Geysers", "Waterfalls"],
      trending: true
    }
  ]

  const trendingDestinations = [
    {
      id: 1,
      name: "Dubai",
      properties: "2,847 properties",
      growth: "+24%",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 2,
      name: "Tokyo", 
      properties: "3,921 properties",
      growth: "+18%",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 3,
      name: "Bali",
      properties: "1,654 properties",
      growth: "+32%",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 4,
      name: "Santorini",
      properties: "892 properties",
      growth: "+15%",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      trending: false
    }
  ]

  const categories = ['All', 'Beach', 'Mountains', 'City', 'Culture', 'Nature', 'Adventure', 'Luxury']
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ]

  // Initialize data
  useEffect(() => {
    setDestinations(allDestinations)
    setFilteredDestinations(allDestinations)
  }, [])

  // Handle search query from navigation state
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery)
      handleSearch(location.state.searchQuery)
    }
  }, [location.state])

  // Filter and sort destinations
  useEffect(() => {
    let filtered = [...destinations]

    // Apply category filter
    if (activeFilter !== 'All') {
      filtered = filtered.filter(dest => dest.category === activeFilter)
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply advanced filters
    if (appliedFilters.priceRange) {
      const [min, max] = appliedFilters.priceRange
      filtered = filtered.filter(dest => {
        const price = parseInt(dest.price.replace(/[^\d]/g, ''))
        return price >= min && price <= max
      })
    }

    if (appliedFilters.rating) {
      filtered = filtered.filter(dest => dest.rating >= appliedFilters.rating)
    }

    if (appliedFilters.category && appliedFilters.category !== activeFilter) {
      filtered = filtered.filter(dest => dest.category === appliedFilters.category)
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
          return priceA - priceB
        })
        break
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^\d]/g, ''))
          const priceB = parseInt(b.price.replace(/[^\d]/g, ''))
          return priceB - priceA
        })
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default: // popular
        filtered.sort((a, b) => b.reviews - a.reviews)
    }

    setFilteredDestinations(filtered)
    setCurrentPage(1)
  }, [destinations, activeFilter, searchQuery, appliedFilters, sortBy])

  const handleSearch = (query) => {
    setSearchQuery(query)
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  const handleSaveItem = (itemId) => {
    setSavedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
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

  const paginatedDestinations = filteredDestinations.slice(0, currentPage * itemsPerPage)
  const hasMoreItems = filteredDestinations.length > currentPage * itemsPerPage

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  if (loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text={searchQuery ? `Searching for "${searchQuery}"...` : "Loading destinations..."} />
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Explore Destinations
                {searchQuery && (
                  <span className={`block text-lg font-normal mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {filteredDestinations.length} results for "{searchQuery}"
                  </span>
                )}
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Discover amazing places around the world
              </p>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSearchOpen(true)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:bg-opacity-70 transition-all min-w-[200px]`}
              >
                <Search className="w-5 h-5" />
                <span className="hidden sm:block">{searchQuery || 'Search destinations...'}</span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFilterOpen(true)}
                className={`p-3 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm relative`}
              >
                <SlidersHorizontal className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                {Object.keys(appliedFilters).length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                )}
              </motion.button>

              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>

          {/* Active Filters Display */}
          {(Object.keys(appliedFilters).length > 0 || searchQuery || activeFilter !== 'All') && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex flex-wrap items-center gap-2"
            >
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Active filters:
              </span>
              
              {searchQuery && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {activeFilter !== 'All' && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  Category: {activeFilter}
                  <button onClick={() => setActiveFilter('All')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {Object.entries(appliedFilters).map(([key, value]) => (
                <span key={key} className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${
                  isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-navy'
                }`}>
                  {key}: {Array.isArray(value) ? value.join('-') : value}
                  <button onClick={() => {
                    const newFilters = { ...appliedFilters }
                    delete newFilters[key]
                    setAppliedFilters(newFilters)
                  }}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              
              <button 
                onClick={handleClearFilters}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDark ? 'text-yellow-400 hover:bg-yellow-400/20' : 'text-blue-600 hover:bg-blue-600/20'
                } transition-colors`}
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Category Filters */}
            <CategoryFilter 
              categories={categories}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {filteredDestinations.length} destinations found
                </span>
                {filteredDestinations.length > 0 && (
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Showing {Math.min(currentPage * itemsPerPage, filteredDestinations.length)} of {filteredDestinations.length}
                  </span>
                )}
              </div>
              
              <SortDropdown 
                sortBy={sortBy}
                setSortBy={setSortBy}
                options={sortOptions}
              />
            </div>

            {/* Trending Destinations */}
            {!searchQuery && activeFilter === 'All' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-2xl font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    <TrendingUp className="w-6 h-6" />
                    <span>Trending Now</span>
                  </h2>
                  <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} hover:opacity-80`}>
                    See All
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {trendingDestinations.map((destination, index) => (
                    <TrendingCard 
                      key={destination.id}
                      destination={destination}
                      index={index}
                      onClick={() => navigate('/trip-details')}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Main Destinations Grid/List */}
            {filteredDestinations.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-6"
                }>
                  {paginatedDestinations.map((destination, index) => (
                    <DestinationCard
                      key={destination.id}
                      destination={destination}
                      index={index}
                      viewMode={viewMode}
                      isSaved={savedItems.has(destination.id)}
                      onSave={() => handleSaveItem(destination.id)}
                      onClick={() => navigate('/trip-details', { state: { destination } })}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMoreItems && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center mt-12"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={loadMore}
                      className={`px-8 py-4 rounded-xl font-semibold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      } hover:opacity-90 transition-opacity`}
                    >
                      Load More Destinations
                    </motion.button>
                  </motion.div>
                )}
              </>
            ) : (
              /* No Results */
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
                  isDark ? 'bg-navy/50' : 'bg-gray-100'
                }`}>
                  <Search className={`w-12 h-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  No destinations found
                </h3>
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearFilters}
                  className={`px-6 py-3 rounded-xl font-semibold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            {/* Quick Filters */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Filters
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className={`flex-1 p-2 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                      onChange={(e) => {
                        const min = parseInt(e.target.value) || 0
                        const max = appliedFilters.priceRange?.[1] || 100000
                        setAppliedFilters(prev => ({ ...prev, priceRange: [min, max] }))
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className={`flex-1 p-2 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                      onChange={(e) => {
                        const max = parseInt(e.target.value) || 100000
                        const min = appliedFilters.priceRange?.[0] || 0
                        setAppliedFilters(prev => ({ ...prev, priceRange: [min, max] }))
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Minimum Rating
                  </label>
                  <div className="flex space-x-2">
                    {[4, 4.5, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAppliedFilters(prev => ({ ...prev, rating }))}
                        className={`px-3 py-2 rounded-lg border ${
                          appliedFilters.rating === rating
                            ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                            : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
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
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Travel Tips
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
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
                        className={`w-8 h-8 ${tip.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {tip.title}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
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
              className="mb-8"
            >
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
                <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Stay Updated
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Get the latest travel deals and destination guides
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-1 p-2 rounded-lg border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white placeholder-gray-400' 
                        : 'bg-white text-navy placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                    } hover:opacity-90 transition-opacity`}
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