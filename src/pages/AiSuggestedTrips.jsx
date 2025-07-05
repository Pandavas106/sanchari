import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Star, Edit, Sun, Moon, Filter, MapPin, Users, Plane, Search } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'
import BottomNavbar from '../components/BottomNavbar'

const AiSuggestedTrips = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [trips, setTrips] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')
  const [notificationCount, setNotificationCount] = useState(3)

  const filters = ['All', 'Beach', 'Mountains', 'City', 'Adventure', 'Luxury']

  // Simulate API call
  useEffect(() => {
    const fetchTrips = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTrips([
        {
          title: "Kerala Backwaters & Hills",
          description: "Experience the serene backwaters of Alleppey and the misty hills of Munnar in this carefully curated Kerala journey.",
          price: "₹45,000",
          duration: "6 Days",
          rating: "4.8",
          imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
          category: "Mountains",
          highlights: ["Houseboat Stay", "Tea Plantations", "Ayurvedic Spa"]
        },
        {
          title: "Rajasthan Royal Heritage",
          description: "Discover the royal palaces and vibrant culture of Rajasthan with stays in heritage hotels.",
          price: "₹65,000", 
          duration: "8 Days",
          rating: "4.9",
          imageUrl: "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=400&q=80",
          category: "City",
          highlights: ["Palace Hotels", "Desert Safari", "Cultural Shows"]
        },
        {
          title: "Himalayan Adventure",
          description: "Trek through the stunning landscapes of Himachal Pradesh with mountain views and adventure activities.",
          price: "₹35,000",
          duration: "5 Days", 
          rating: "4.7",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
          category: "Adventure",
          highlights: ["Trekking", "Mountain Views", "Adventure Sports"]
        },
        {
          title: "Goa Beach Paradise",
          description: "Relax on pristine beaches and enjoy the vibrant nightlife of Goa with luxury beach resorts.",
          price: "₹28,000",
          duration: "4 Days",
          rating: "4.6",
          imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80",
          category: "Beach",
          highlights: ["Beach Resorts", "Water Sports", "Nightlife"]
        },
        {
          title: "Dubai Luxury Experience",
          description: "Experience the ultimate luxury in Dubai with world-class hotels and exclusive experiences.",
          price: "₹85,000",
          duration: "7 Days",
          rating: "4.9",
          imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
          category: "Luxury",
          highlights: ["Luxury Hotels", "Shopping", "Fine Dining"]
        },
        {
          title: "Bali Cultural Journey",
          description: "Immerse yourself in Balinese culture with temple visits, traditional ceremonies, and local experiences.",
          price: "₹55,000",
          duration: "6 Days",
          rating: "4.8",
          imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
          category: "City",
          highlights: ["Temple Tours", "Cultural Shows", "Local Cuisine"]
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
          <h1 className={`text-3xl lg:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            AI Suggested Trips
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Personalized travel recommendations powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Budget Recommendation */}
            <div className="mb-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>
                      Perfect for your budget
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Based on ₹50,000 budget preference and your travel interests
                    </p>
                  </div>
                  <button className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}>
                    <Edit className="w-5 h-5" />
                    <span>Edit Preferences</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="mb-8">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                      activeFilter === filter
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                    }`}
                  >
                    {filter}
                  </button>
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
                    key={index}
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
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        }`}>
                          AI Recommended
                        </span>
                      </div>
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
                        <span className={`font-bold text-2xl ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                          {trip.price}
                        </span>
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
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Best Match
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Kerala trip matches 95% of your preferences
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Budget Friendly
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      3 trips within your ₹50,000 budget
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">📅</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Best Time
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      December is ideal for these destinations
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Filters
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Duration
                  </label>
                  <div className="flex space-x-2">
                    {['3-5 days', '6-8 days', '9+ days'].map((duration) => (
                      <button
                        key={duration}
                        className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                          isDark 
                            ? 'border-gray-600 text-white hover:border-yellow-400' 
                            : 'border-gray-300 text-navy hover:border-blue-600'
                        } transition-colors`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Price Range
                  </label>
                  <div className="space-y-2">
                    {['Under ₹30k', '₹30k - ₹60k', 'Above ₹60k'].map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`ml-2 text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Travel Tips
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
                <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  💡 Pro Tip
                </h4>
                <p className={`text-sm ${isDark ? 'text-navy' : 'text-white'}`}>
                  Book your Kerala trip 2 months in advance to get the best houseboat deals 
                  and avoid peak season crowds.
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