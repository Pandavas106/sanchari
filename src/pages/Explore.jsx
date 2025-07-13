import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Star, MapPin, Calendar, Users, ArrowRight, TrendingUp, Heart, Grid, List, SlidersHorizontal, X, ChevronDown, Loader, CloudSun, Navigation, Sparkles, Bot, Compass, Share2, Eye, MessageCircle, Trophy, Clock, User } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAllBookings } from '../hooks/useUserData'
import { addToSaved, removeFromSaved, getUserSavedItems } from '../firebase/firestore'
import { useNearbyPOIs } from '../hooks/useNearbyPOIs'
import { generateGeminiTrip } from '../utils/geminiTripPlanner'
import { useSharedTrips, usePopularSharedTrips, useTrendingSharedTrips, useSharedTripActions } from '../hooks/useSharedTrips'
import POICard from '../components/explore/POICard'
import SharedTripCard from '../components/explore/SharedTripCard'
import axios from 'axios'
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
  
  // Enhanced state for advanced features
  const [weatherData, setWeatherData] = useState(null)
  const [userLocation, setUserLocation] = useState(null)
  const [aiRecommendations, setAiRecommendations] = useState([])
  const [nearbyPOIs, setNearbyPOIs] = useState([])
  const [loadingAI, setLoadingAI] = useState(false)
  const [loadingWeather, setLoadingWeather] = useState(false)
  const [locationName, setLocationName] = useState('')

  const itemsPerPage = 12

  // Fetch shared trips using custom hooks
  const { sharedTrips, loading: sharedTripsLoading, error: sharedTripsError } = useSharedTrips({
    sortBy,
    searchQuery,
    category: activeFilter !== 'All' ? activeFilter : null,
    ...appliedFilters
  })
  
  // Fetch popular and trending trips
  const { popularTrips, loading: popularLoading } = usePopularSharedTrips(5)
  const { trendingTrips, loading: trendingLoading } = useTrendingSharedTrips(5)
  
  // Shared trip actions
  const { useTrip, rateTrip, loading: actionLoading } = useSharedTripActions()
  
  // Use nearby POIs hook
  const { pois, loading: poisLoading, error: poisError } = useNearbyPOIs(userLocation)

  const [filteredTrips, setFilteredTrips] = useState([])
  const [activeTab, setActiveTab] = useState('all') // 'all', 'popular', 'trending'

  const categories = ['All', 'Adventure', 'Relaxation', 'Spiritual', 'Cultural', 'Nature', 'Beach', 'Mountains', 'City', 'Luxury']
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'budget-low', label: 'Budget: Low to High' },
    { value: 'budget-high', label: 'Budget: High to Low' }
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

  // Get user location and weather data
  useEffect(() => {
    const getUserLocationAndWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            setUserLocation({ lat, lon })

            // Get location name
            try {
              const geoRes = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
              )
              const locationName = geoRes.data.address.city ||
                geoRes.data.address.town ||
                geoRes.data.address.village ||
                geoRes.data.address.state ||
                "Your Location"
              setLocationName(locationName)
            } catch (error) {
              console.error('Error fetching location name:', error)
              setLocationName(`${lat.toFixed(2)}, ${lon.toFixed(2)}`)
            }

            // Get weather data
            setLoadingWeather(true)
            try {
              const weatherRes = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`
              )
              const weather = weatherRes.data.current_weather
              setWeatherData({
                temperature: `${Math.round(weather.temperature)}°C`,
                condition: getWeatherCondition(weather.weathercode),
                windSpeed: `${weather.windspeed} km/h`,
                humidity: weatherRes.data.hourly.relative_humidity_2m[0] || 0,
                recommendation: getWeatherRecommendation(weather.weathercode, weather.temperature)
              })
            } catch (error) {
              console.error('Error fetching weather data:', error)
            } finally {
              setLoadingWeather(false)
            }
          },
          (error) => {
            console.error('Error getting location:', error)
          }
        )
      }
    }

    getUserLocationAndWeather()
  }, [])

  // Generate AI recommendations based on user preferences and location
  useEffect(() => {
    const generateAIRecommendations = async () => {
      if (userLocation && !loadingAI && aiRecommendations.length === 0) {
        setLoadingAI(true)
        try {
          const preferences = {
            location: locationName,
            budget: 'moderate',
            interests: ['culture', 'nature', 'adventure'],
            duration: '3-5 days'
          }
          
          const aiTrip = await generateGeminiTrip(preferences)
          if (aiTrip && aiTrip.trip) {
            setAiRecommendations([aiTrip.trip])
          }
        } catch (error) {
          console.error('Error generating AI recommendations:', error)
        } finally {
          setLoadingAI(false)
        }
      }
    }

    generateAIRecommendations()
  }, [userLocation, locationName, loadingAI, aiRecommendations.length])

  // Helper functions for weather
  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight showers',
      81: 'Moderate showers',
      82: 'Violent showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Heavy thunderstorm'
    }
    return conditions[code] || 'Unknown'
  }

  const getWeatherRecommendation = (code, temperature) => {
    if (code === 0 || code === 1) {
      return temperature > 25 ? 'Perfect for outdoor activities!' : 'Great day for sightseeing!'
    } else if (code >= 61 && code <= 65) {
      return 'Consider indoor attractions or pack an umbrella'
    } else if (code >= 71 && code <= 75) {
      return 'Winter activities or cozy indoor experiences'
    } else if (code >= 95) {
      return 'Stay indoors and plan for tomorrow'
    }
    return 'Check weather before heading out'
  }

  // Filter and sort shared trips
  useEffect(() => {
    let filtered = []
    
    switch (activeTab) {
      case 'popular':
        filtered = [...popularTrips]
        break
      case 'trending':
        filtered = [...trendingTrips]
        break
      default:
        filtered = [...sharedTrips]
    }

    // Apply additional client-side filters if needed
    if (activeFilter !== 'All') {
      filtered = filtered.filter(trip => 
        trip.category === activeFilter || 
        trip.tags?.includes(activeFilter.toLowerCase())
      )
    }

    setFilteredTrips(filtered)
    setCurrentPage(1)
  }, [sharedTrips, popularTrips, trendingTrips, activeTab, activeFilter, appliedFilters])

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
    
    // Enhanced search with AI-powered suggestions
    if (query.length > 3) {
      generateSearchSuggestions(query)
    }
    
    setTimeout(() => setLoading(false), 800)
  }

  const generateSearchSuggestions = async (query) => {
    try {
      // Use Gemini AI to enhance search results
      const enhancedQuery = `Based on the search query "${query}" and location "${locationName}", suggest relevant travel destinations and activities. Focus on practical recommendations.`
      
      // This would call Gemini API for search enhancement
      console.log('Enhanced search query:', enhancedQuery)
    } catch (error) {
      console.error('Error generating search suggestions:', error)
    }
  }

  const getWeatherBasedRecommendations = () => {
    if (!weatherData) return []
    
    const recommendations = []
    const temp = parseInt(weatherData.temperature)
    
    if (temp > 25 && weatherData.condition.includes('clear')) {
      recommendations.push('Beach destinations', 'Outdoor adventures', 'Hiking trails')
    } else if (temp < 15) {
      recommendations.push('Mountain retreats', 'Cozy cafes', 'Museums')
    } else if (weatherData.condition.includes('rain')) {
      recommendations.push('Indoor attractions', 'Shopping centers', 'Spa resorts')
    }
    
    return recommendations
  }

  const handleSaveTrip = async (tripId) => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      const trip = filteredTrips.find(t => t.id === tripId)
      if (!trip) return

      if (savedItems.has(tripId)) {
        // Remove from saved
        const userSavedItems = await getUserSavedItems(user.uid)
        if (userSavedItems.success) {
          const savedItem = userSavedItems.data.find(item => item.itemId === tripId)
          if (savedItem) {
            await removeFromSaved(savedItem.id)
            setSavedItems(prev => {
              const newSet = new Set(prev)
              newSet.delete(tripId)
              return newSet
            })
          }
        }
      } else {
        // Add to saved
        const savedItemData = {
          itemId: tripId,
          itemType: 'SharedTrip',
          title: trip.name,
          subtitle: trip.location,
          price: trip.minBudget ? `₹${trip.minBudget} - ₹${trip.maxBudget}` : 'Varies',
          image: trip.image,
          description: trip.description,
          rating: trip.averageRating,
          savedDate: new Date()
        }
        
        const result = await addToSaved(user.uid, savedItemData)
        if (result.success) {
          setSavedItems(prev => new Set([...prev, tripId]))
        }
      }
    } catch (error) {
      console.error('Error saving trip:', error)
    }
  }

  const handleUseTrip = async (tripId) => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      const result = await useTrip(tripId, user.uid)
      if (result.success) {
        const trip = filteredTrips.find(t => t.id === tripId)
        // Navigate to trip planner with the shared trip data
        navigate('/trip-planner', { 
          state: { 
            sharedTrip: trip,
            mode: 'customize' 
          } 
        })
      }
    } catch (error) {
      console.error('Error using trip:', error)
    }
  }

  const handleRateTrip = async (tripId, rating, comment) => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      const result = await rateTrip(tripId, user.uid, rating, comment)
      if (result.success) {
        // Refresh the trips data to show updated rating
        // The useSharedTrips hook will automatically refresh
      }
      return result
    } catch (error) {
      console.error('Error rating trip:', error)
      return { success: false, error: error.message }
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

  const paginatedTrips = filteredTrips.slice(0, currentPage * itemsPerPage)
  const hasMoreItems = filteredTrips.length > currentPage * itemsPerPage

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  if (sharedTripsLoading || loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text={searchQuery ? `Searching for "${searchQuery}"...` : "Loading shared trips..."} />
      </div>
    )
  }

  if (sharedTripsError && !sharedTrips.length) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className={`text-2xl font-bold mb-4 text-white`}>
            Demo Mode Active
          </h2>
          <p className={`text-gray-300 mb-6`}>
            Firebase permissions need to be configured for full functionality. Currently showing demo data.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className={`w-full px-6 py-3 rounded-xl font-semibold bg-yellow-400 text-navy hover:bg-yellow-500 transition-colors`}
            >
              Retry Connection
            </button>
            <button 
              onClick={() => setError(null)}
              className={`w-full px-6 py-3 rounded-xl font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors`}
            >
              Continue with Demo
            </button>
          </div>
          <p className={`text-xs text-gray-400 mt-4`}>
            Demo data includes 6 sample trips from across India
          </p>
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
        {/* Demo Mode Notification */}
        {sharedTripsError && sharedTrips.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-yellow-400/20 border border-yellow-400/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div>
                <p className="text-yellow-300 font-medium text-sm">
                  Demo Mode Active
                </p>
                <p className="text-yellow-200 text-xs">
                  Showing sample trips. Configure Firebase permissions for full functionality.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-white truncate`}>
                Discover Shared Trips
              </h1>
              {searchQuery && (
                <p className={`text-sm sm:text-base lg:text-lg font-normal text-gray-300 truncate`}>
                  {filteredTrips.length} results for "{searchQuery}"
                </p>
              )}
              <p className={`text-sm sm:text-base lg:text-lg text-gray-300 hidden sm:block`}>
                Explore trips created by fellow travelers and customize them for your journey
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
            {/* Weather Widget */}
            {weatherData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className={`p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CloudSun className="w-8 h-8 text-yellow-400" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-semibold">{locationName}</span>
                          <span className="text-2xl font-bold text-white">{weatherData.temperature}</span>
                        </div>
                        <p className="text-sm text-gray-300">{weatherData.condition}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-300">Wind: {weatherData.windSpeed}</p>
                      <p className="text-sm text-gray-300">Humidity: {weatherData.humidity}%</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-500/10 rounded-lg">
                    <p className="text-sm text-blue-200 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      {weatherData.recommendation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center mb-4">
                  <Bot className="w-6 h-6 text-purple-400 mr-2" />
                  <h3 className="font-bold text-lg text-white">AI Recommendations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {aiRecommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/30"
                    >
                      <h4 className="font-semibold text-white mb-2">{recommendation.title}</h4>
                      <p className="text-sm text-gray-300 mb-3">{recommendation.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-yellow-400">{recommendation.price}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Weather-based Recommendations */}
            {getWeatherBasedRecommendations().length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center mb-4">
                  <Compass className="w-6 h-6 text-blue-400 mr-2" />
                  <h3 className="font-bold text-lg text-white">Perfect for Today's Weather</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getWeatherBasedRecommendations().map((rec, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-sm border border-blue-500/30"
                    >
                      {rec}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Popular Shared Trips Section */}
            {popularTrips.length > 0 && activeTab === 'all' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                    <h3 className="font-bold text-lg text-white">Popular Shared Trips</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveTab('popular')}
                    className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    View All
                  </motion.button>
                </div>
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                  {popularTrips.slice(0, 5).map((trip, index) => (
                    <div key={trip.id} className="flex-shrink-0 w-[320px]">
                      <SharedTripCard
                        trip={trip}
                        index={index}
                        viewMode="grid"
                        onUse={handleUseTrip}
                        onRate={handleRateTrip}
                        onSave={() => handleSaveTrip(trip.id)}
                        isSaved={savedItems.has(trip.id)}
                        currentUserId={user?.uid}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Trending Shared Trips Section */}
            {trendingTrips.length > 0 && activeTab === 'all' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                    <h3 className="font-bold text-lg text-white">Trending This Week</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveTab('trending')}
                    className="text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    View All
                  </motion.button>
                </div>
                <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                  {trendingTrips.slice(0, 5).map((trip, index) => (
                    <div key={trip.id} className="flex-shrink-0 w-[320px]">
                      <SharedTripCard
                        trip={trip}
                        index={index}
                        viewMode="grid"
                        onUse={handleUseTrip}
                        onRate={handleRateTrip}
                        onSave={() => handleSaveTrip(trip.id)}
                        isSaved={savedItems.has(trip.id)}
                        currentUserId={user?.uid}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab Navigation */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-navy/50 rounded-xl p-1">
                {[
                  { id: 'all', label: 'All Trips', icon: Compass },
                  { id: 'popular', label: 'Popular', icon: Trophy },
                  { id: 'trending', label: 'Trending', icon: TrendingUp }
                ].map(tab => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-yellow-400 text-navy font-semibold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Eye className="w-4 h-4" />
                <span>{filteredTrips.length} trips available</span>
              </div>
            </div>

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
                  {filteredTrips.length} shared trips found
                </span>
                {filteredTrips.length > 0 && (
                  <span className={`text-xs sm:text-sm text-gray-400 truncate`}>
                    Showing {Math.min(currentPage * itemsPerPage, filteredTrips.length)} of {filteredTrips.length}
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

            {/* Main Shared Trips Grid/List */}
            {filteredTrips.length > 0 ? (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr" 
                  : "space-y-6"
                }>
                  {paginatedTrips.map((trip, index) => (
                    <SharedTripCard
                      key={trip.id}
                      trip={trip}
                      index={index}
                      viewMode={viewMode}
                      onUse={handleUseTrip}
                      onRate={handleRateTrip}
                      onSave={() => handleSaveTrip(trip.id)}
                      isSaved={savedItems.has(trip.id)}
                      currentUserId={user?.uid}
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
                      Load More Trips
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
                  No shared trips found
                </h3>
                <p className={`text-base sm:text-lg mb-4 sm:mb-6 text-gray-300 px-4`}>
                  Try adjusting your search or filters, or be the first to share a trip!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearFilters}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-yellow-400 text-navy hover:opacity-90 transition-opacity`}
                  >
                    Clear All Filters
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/trip-planner')}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-sm sm:text-base bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center gap-2`}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Create & Share Trip</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 min-w-0">
            {/* Smart Filters */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 sm:mb-8"
            >
              <h3 className={`font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-white truncate`}>
                Smart Filters
              </h3>
              <div className={`p-4 sm:p-6 rounded-xl bg-navy/50 backdrop-blur-sm space-y-4`}>
                {/* Weather-based quick filters */}
                {weatherData && (
                  <div>
                    <label className={`block text-sm font-semibold mb-2 text-white`}>
                      Weather-based Suggestions
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {getWeatherBasedRecommendations().slice(0, 4).map((rec, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSearch(rec)}
                          className="p-2 text-xs bg-blue-500/20 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          {rec}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

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

                {/* Location-based filters */}
                {userLocation && (
                  <div>
                    <label className={`block text-sm font-semibold mb-2 text-white`}>
                      Distance from You
                    </label>
                    <div className="flex space-x-2">
                      {['10km', '50km', '100km', 'Any'].map((distance) => (
                        <motion.button
                          key={distance}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setAppliedFilters(prev => ({ ...prev, distance }))}
                          className={`flex-1 px-2 py-2 rounded-lg border text-xs ${
                            appliedFilters.distance === distance
                              ? 'bg-green-400 border-green-400 text-navy'
                              : 'border-gray-600 text-white hover:border-green-400'
                          } transition-colors`}
                        >
                          {distance}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* AI Travel Assistant */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <div className={`p-4 sm:p-6 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30`}>
                <div className="flex items-center mb-3">
                  <Bot className="w-6 h-6 text-purple-400 mr-2" />
                  <h3 className={`font-bold text-lg text-white`}>AI Travel Assistant</h3>
                </div>
                <p className={`text-sm mb-4 text-gray-300`}>
                  Get personalized recommendations based on your preferences and current location
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={async () => {
                    setLoadingAI(true)
                    try {
                      const preferences = {
                        location: locationName,
                        budget: 'moderate',
                        interests: ['culture', 'nature', 'adventure'],
                        duration: '3-5 days'
                      }
                      const aiTrip = await generateGeminiTrip(preferences)
                      if (aiTrip && aiTrip.trip) {
                        setAiRecommendations([aiTrip.trip])
                      }
                    } catch (error) {
                      console.error('Error generating AI recommendations:', error)
                    } finally {
                      setLoadingAI(false)
                    }
                  }}
                  disabled={loadingAI}
                  className={`w-full px-4 py-2 rounded-lg font-semibold text-sm ${
                    loadingAI 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  } transition-all flex items-center justify-center space-x-2`}
                >
                  {loadingAI ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  <span>{loadingAI ? 'Generating...' : 'Get AI Suggestions'}</span>
                </motion.button>
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
                Smart Travel Tips
              </h3>
              <div className={`p-4 sm:p-6 rounded-xl bg-navy/50 backdrop-blur-sm space-y-4`}>
                {[
                  { 
                    icon: Calendar, 
                    title: 'Best Time to Book', 
                    desc: 'Book 6-8 weeks in advance for best deals', 
                    color: 'bg-blue-500',
                    tip: weatherData ? `Perfect weather for ${weatherData.condition.toLowerCase()}` : 'Check weather forecasts'
                  },
                  { 
                    icon: MapPin, 
                    title: 'Local Insights', 
                    desc: userLocation ? `${pois?.length || 0} attractions near you` : 'Enable location for personalized tips', 
                    color: 'bg-green-500',
                    tip: locationName ? `Currently in ${locationName}` : 'Location services disabled'
                  },
                  { 
                    icon: Users, 
                    title: 'Group Benefits', 
                    desc: 'Travel with 4+ people for group rates', 
                    color: 'bg-purple-500',
                    tip: 'Save 15-25% with group bookings'
                  }
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
                        <p className={`text-xs text-blue-300 mt-1 leading-relaxed`}>
                          💡 {tip.tip}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Enhanced Newsletter */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <div className={`p-4 sm:p-6 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400`}>
                <h3 className={`font-bold text-lg sm:text-xl mb-2 text-navy truncate`}>
                  Stay Updated
                </h3>
                <p className={`text-sm mb-4 text-navy`}>
                  Get weather alerts, AI recommendations, and exclusive deals for {locationName || 'your area'}
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
                    className={`px-4 py-2 rounded-lg font-semibold text-sm bg-navy text-white hover:opacity-90 transition-opacity flex-shrink-0 flex items-center space-x-2`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Subscribe</span>
                  </motion.button>
                </div>
                {weatherData && (
                  <div className="mt-3 p-2 bg-navy/20 rounded-lg">
                    <p className="text-xs text-navy">
                      🌤️ Current: {weatherData.temperature} • {weatherData.condition}
                    </p>
                  </div>
                )}
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