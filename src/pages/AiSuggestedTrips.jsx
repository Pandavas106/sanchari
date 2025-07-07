import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Star, Edit, Sun, Moon, Filter, MapPin, Users, Plane, Search, Sparkles, Brain, Zap, Target, TrendingUp, Clock, Award } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, BottomNavbar } from '../components'

const AiSuggestedTrips = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [trips, setTrips] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [notificationCount, setNotificationCount] = useState(3)
  const [aiInsights, setAiInsights] = useState({
    totalRecommendations: 12,
    matchPercentage: 95,
    budgetOptimized: 8,
    trending: 4
  })

  const filters = ['All', 'Beach', 'Mountains', 'City', 'Adventure', 'Luxury', 'Cultural']

  // Simulate AI processing
  useEffect(() => {
    const fetchTrips = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTrips([
        {
          id: 1,
          title: "Kerala Backwaters & Hills",
          description: "AI-curated experience combining serene backwaters of Alleppey and misty hills of Munnar with personalized activities based on your preferences.",
          price: "₹45,000",
          originalPrice: "₹52,000",
          duration: "6 Days",
          rating: "4.8",
          reviews: "324",
          imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
          category: "Mountains",
          highlights: ["Houseboat Stay", "Tea Plantations", "Ayurvedic Spa"],
          aiMatch: 95,
          trending: true,
          aiReasons: ["Matches your love for nature", "Perfect for your budget", "Ideal weather in December"]
        },
        {
          id: 2,
          title: "Rajasthan Royal Heritage",
          description: "AI-designed royal journey through Rajasthan's palaces and vibrant culture, optimized for your cultural interests and luxury preferences.",
          price: "₹65,000",
          originalPrice: "₹75,000", 
          duration: "8 Days",
          rating: "4.9",
          reviews: "567",
          imageUrl: "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=400&q=80",
          category: "Cultural",
          highlights: ["Palace Hotels", "Desert Safari", "Cultural Shows"],
          aiMatch: 92,
          trending: false,
          aiReasons: ["Aligns with your cultural interests", "Premium accommodations", "Unique experiences"]
        },
        {
          id: 3,
          title: "Himalayan Adventure",
          description: "AI-planned adventure through Himachal Pradesh with activities tailored to your fitness level and adventure preferences.",
          price: "₹35,000",
          duration: "5 Days", 
          rating: "4.7",
          reviews: "445",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
          category: "Adventure",
          highlights: ["Trekking", "Mountain Views", "Adventure Sports"],
          aiMatch: 88,
          trending: true,
          aiReasons: ["Matches your adventure spirit", "Perfect difficulty level", "Great weather window"]
        },
        {
          id: 4,
          title: "Goa Beach Paradise",
          description: "AI-optimized beach getaway with activities and dining recommendations based on your lifestyle and preferences.",
          price: "₹28,000",
          duration: "4 Days",
          rating: "4.6",
          reviews: "678",
          imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80",
          category: "Beach",
          highlights: ["Beach Resorts", "Water Sports", "Nightlife"],
          aiMatch: 85,
          trending: false,
          aiReasons: ["Beach lover profile match", "Nightlife preferences", "Budget-friendly option"]
        },
        {
          id: 5,
          title: "Dubai Luxury Experience",
          description: "AI-curated luxury Dubai experience with premium hotels and exclusive activities matching your sophisticated taste.",
          price: "₹85,000",
          originalPrice: "₹95,000",
          duration: "7 Days",
          rating: "4.9",
          reviews: "892",
          imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
          category: "Luxury",
          highlights: ["Luxury Hotels", "Shopping", "Fine Dining"],
          aiMatch: 90,
          trending: true,
          aiReasons: ["Luxury preference match", "Shopping interests", "Premium experiences"]
        },
        {
          id: 6,
          title: "Bali Cultural Journey",
          description: "AI-designed cultural immersion in Bali with temple visits, ceremonies, and local experiences tailored to your interests.",
          price: "₹55,000",
          duration: "6 Days",
          rating: "4.8",
          reviews: "756",
          imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
          category: "Cultural",
          highlights: ["Temple Tours", "Cultural Shows", "Local Cuisine"],
          aiMatch: 87,
          trending: false,
          aiReasons: ["Cultural exploration interest", "Photography opportunities", "Spiritual experiences"]
        }
      ])
      setLoading(false)
    }

    fetchTrips()
  }, [])

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const filteredTrips = trips?.filter(trip => 
    activeFilter === 'All' || trip.category === activeFilter
  )

  const ShimmerCard = () => (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
      <div className="animate-pulse">
        <div className={`h-48 rounded-xl mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div className={`h-6 rounded mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div className={`h-4 rounded mb-4 w-3/4 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
        <div className="flex justify-between items-center">
          <div className={`h-4 rounded w-20 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
          <div className={`h-8 rounded w-24 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => {}}
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
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`}>
              <Brain className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
            </div>
            <div>
              <h1 className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Trip Recommendations
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Personalized travel suggestions powered by advanced AI
              </p>
            </div>
          </div>

          {/* AI Processing Status */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'} border-l-4 border-blue-500 mb-6`}>
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-blue-500" />
              </motion.div>
              <div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  AI Analysis Complete
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Based on your preferences, travel history, and current trends
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* AI Insights Dashboard */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Insights Dashboard
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}>
                  <Target className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {aiInsights.matchPercentage}%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Best Match
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}>
                  <Zap className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {aiInsights.totalRecommendations}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Recommendations
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}>
                  <Award className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {aiInsights.budgetOptimized}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Budget Optimized
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}>
                  <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {aiInsights.trending}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Trending Now
                  </div>
                </div>
              </div>
            </div>

            {/* Budget Recommendation */}
            <div className="mb-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                      <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>
                        AI Recommendation Engine
                      </h3>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Based on ₹50,000 budget preference, travel history, and seasonal trends
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/trip-planner')}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 ${
                      isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                    } hover:opacity-90 transition-opacity`}
                  >
                    <Edit className="w-5 h-5" />
                    <span>Refine Preferences</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="mb-8">
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {filters.map((filter, index) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all text-sm sm:text-base ${
                      activeFilter === filter
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Trip Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <>
                  <ShimmerCard />
                  <ShimmerCard />
                  <ShimmerCard />
                  <ShimmerCard />
                  <ShimmerCard />
                  <ShimmerCard />
                </>
              ) : (
                filteredTrips?.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl overflow-hidden ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer group`}
                    onClick={() => navigate('/trip-details')}
                  >
                    <div className="relative">
                      <img
                        src={trip.imageUrl}
                        alt={trip.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      
                      {/* AI Match Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                          }`}>
                            AI Match: {trip.aiMatch}%
                          </span>
                          {trip.trending && (
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-orange-500 text-white">
                              Trending
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Discount Badge */}
                      {trip.originalPrice && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                            {Math.round(((parseInt(trip.originalPrice.replace(/[^\d]/g, '')) - parseInt(trip.price.replace(/[^\d]/g, ''))) / parseInt(trip.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                          </span>
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Calendar className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-semibold">
                            {trip.duration}
                          </span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current ml-2" />
                          <span className="text-white text-sm font-semibold">
                            {trip.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        {trip.title}
                      </h3>
                      <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {trip.description}
                      </p>
                      
                      {/* AI Reasons */}
                      <div className="mb-4">
                        <h4 className={`text-xs font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                          Why AI Recommends This:
                        </h4>
                        <div className="space-y-1">
                          {trip.aiReasons.slice(0, 2).map((reason, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`} />
                              <span className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {reason}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {trip.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-navy'
                            }`}
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {trip.originalPrice && (
                            <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {trip.originalPrice}
                            </span>
                          )}
                          <span className={`font-bold text-2xl ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                            {trip.price}
                          </span>
                        </div>
                        <button className={`px-6 py-3 rounded-xl font-semibold ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        } hover:opacity-90 transition-all`}>
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            {/* AI Insights */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Insights
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Perfect Match
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Kerala trip matches 95% of your preferences
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Budget Optimized
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      8 trips within your ₹50,000 budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Best Timing
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      December is ideal for these destinations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Trending Picks
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      4 destinations trending this month
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Learning */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Learning Progress
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Preference Analysis
                    </span>
                    <span className={`text-sm ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      95%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`} style={{ width: '95%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Budget Optimization
                    </span>
                    <span className={`text-sm ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      88%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`} style={{ width: '88%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Seasonal Trends
                    </span>
                    <span className={`text-sm ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      92%
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`} style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Quick Filters
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Match Percentage
                  </label>
                  <div className="flex space-x-2">
                    {['80%+', '90%+', '95%+'].map((percentage) => (
                      <button
                        key={percentage}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                          isDark 
                            ? 'border-gray-600 text-white hover:border-yellow-400' 
                            : 'border-gray-300 text-navy hover:border-blue-600'
                        } transition-colors`}
                      >
                        {percentage}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    AI Confidence
                  </label>
                  <div className="space-y-2">
                    {['High Confidence', 'Medium Confidence', 'Experimental'].map((confidence) => (
                      <label key={confidence} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-2 text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                          {confidence}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Tips */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI Travel Tips
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
                  <h4 className={`font-bold text-lg ${isDark ? 'text-navy' : 'text-white'}`}>
                    Smart Tip
                  </h4>
                </div>
                <p className={`text-sm ${isDark ? 'text-navy' : 'text-white'}`}>
                  Based on your travel pattern, booking Kerala 2 months in advance 
                  will save you 25% and guarantee the best houseboat availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default AiSuggestedTrips