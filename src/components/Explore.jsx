import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Bell, Star, Sun, Moon, MapPin, Calendar, Users, ArrowRight, TrendingUp, Heart } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import SearchModal from './SearchModal'
import FilterModal from './FilterModal'
import LoadingSpinner from './LoadingSpinner'

const Explore = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeFilter, setActiveFilter] = useState('All')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [savedItems, setSavedItems] = useState(new Set())
  const [appliedFilters, setAppliedFilters] = useState({})
  const [notificationCount, setNotificationCount] = useState(3)

  const filters = ['All', 'Hotels', 'Activities', 'Restaurants', 'Flights']

  useEffect(() => {
    // Handle search query from navigation state
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery)
      setLoading(true)
      setTimeout(() => setLoading(false), 1000)
    }
  }, [location.state])

  const featuredDestinations = [
    {
      id: 1,
      name: "Swiss Alps Luxury",
      location: "Zermatt, Switzerland",
      price: "$450/night",
      originalPrice: "$550/night",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tag: "Featured",
      category: "Hotels",
      discount: "Save $100"
    },
    {
      id: 2,
      name: "Maldives Paradise",
      location: "Malé, Maldives",
      price: "$850/night",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      tag: "Luxury",
      category: "Hotels"
    }
  ]

  const trendingDestinations = [
    {
      id: 3,
      name: "Dubai",
      properties: "2,847 properties",
      growth: "+24%",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 4,
      name: "Tokyo", 
      properties: "3,921 properties",
      growth: "+18%",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 5,
      name: "Bali",
      properties: "1,654 properties",
      growth: "+32%",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
      trending: true
    },
    {
      id: 6,
      name: "Santorini",
      properties: "892 properties",
      growth: "+15%",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      trending: false
    }
  ]

  const popularHotels = [
    {
      id: 7,
      name: "The Ritz-Carlton",
      location: "New York, USA",
      price: "$680/night",
      originalPrice: "$780/night",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
      category: "Hotels"
    },
    {
      id: 8,
      name: "Four Seasons Resort",
      location: "Maldives",
      price: "$1,250/night", 
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80",
      category: "Hotels"
    },
    {
      id: 9,
      name: "Burj Al Arab",
      location: "Dubai, UAE",
      price: "$2,100/night",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      category: "Hotels"
    },
    {
      id: 10,
      name: "Park Hyatt Tokyo",
      location: "Tokyo, Japan",
      price: "$450/night",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80",
      category: "Hotels"
    }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const handleSearch = (query) => {
    setSearchQuery(query)
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
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
    setTimeout(() => setLoading(false), 800)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text={searchQuery ? `Searching for "${searchQuery}"...` : "Loading destinations..."} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgGradient}`}>
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
          <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Explore Destinations
            {searchQuery && (
              <span className={`block text-lg font-normal mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Results for "{searchQuery}"
              </span>
            )}
          </h1>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${
                isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
              } hover:bg-opacity-70 transition-all`}
            >
              <Search className="w-5 h-5" />
              <span>{searchQuery || 'Search destinations...'}</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(true)}
              className={`p-2 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm relative`}
            >
              <Filter className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              {Object.keys(appliedFilters).length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filters.map((filter, index) => (
              <motion.button
                key={filter}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                  activeFilter === filter
                    ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                    : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured This Week */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                Featured This Week
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate('/trip-details')}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}>
                        {destination.tag}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {destination.discount && (
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">
                          {destination.discount}
                        </span>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveItem(destination.id)
                        }}
                        className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                      >
                        <Heart className={`w-4 h-4 ${
                          savedItems.has(destination.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                        }`} />
                      </motion.button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white text-xl mb-1">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{destination.rating}</span>
                          <span className="text-white/80 text-sm ml-2">{destination.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {destination.originalPrice && (
                            <span className="text-white/60 text-sm line-through">{destination.originalPrice}</span>
                          )}
                          <span className="text-white font-bold">{destination.price}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trending Destinations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  <TrendingUp className="w-6 h-6" />
                  <span>Trending Destinations</span>
                </h2>
                <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} hover:opacity-80`}>
                  See All
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 ${
                          destination.trending ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                      >
                        {destination.trending && <TrendingUp className="w-3 h-3" />}
                        <span>{destination.growth}</span>
                      </motion.span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <h4 className="font-bold text-white text-sm">{destination.name}</h4>
                      <p className="text-white/80 text-xs">{destination.properties}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Popular Hotels */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Popular Hotels
                </h2>
                <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} hover:opacity-80`}>
                  See All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularHotels.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-4 p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer group`}
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-20 h-20 rounded-xl object-cover group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                        {hotel.name}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                        {hotel.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                            {hotel.rating}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {hotel.originalPrice && (
                            <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {hotel.originalPrice}
                            </span>
                          )}
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                            {hotel.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveItem(hotel.id)
                        }}
                        className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center"
                      >
                        <Heart className={`w-4 h-4 ${
                          savedItems.has(hotel.id) ? 'text-red-500 fill-current' : 'text-red-500'
                        }`} />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        } hover:opacity-90 transition-opacity`}
                      >
                        Book
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
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
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className={`flex-1 p-2 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[4, 4.5, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-3 py-2 rounded-lg border ${
                          isDark 
                            ? 'border-gray-600 text-white hover:border-yellow-400' 
                            : 'border-gray-300 text-navy hover:border-blue-600'
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
    </div>
  )
}

export default Explore