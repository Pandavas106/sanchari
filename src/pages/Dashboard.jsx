import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  ArrowRight, 
  Star, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Trophy, 
  Utensils,
  CreditCard,
  Bookmark,
  Gift,
  Headphones,
  TrendingUp,
  Clock,
  Award,
  User
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { useDestinations } from '../hooks/useDestinations'
import { Navbar, BottomNavbar, SearchModal, NotificationCenter, LoadingSpinner, DataSeeder } from '../components'
import axios from 'axios'; // Add this if not already imported

const Dashboard = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { user } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [loading, setLoading] = useState(true)
  const [weatherData, setWeatherData] = useState(null)
  const [userLocation, setUserLocation] = useState(null)

  // Fetch featured destinations
  const { destinations: featuredDestinations, loading: destinationsLoading } = useDestinations({
    trending: true,
    limit: 4
  })

  useEffect(() => {
    // Get user's real location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setUserLocation({ lat, lon });

          // Fetch city name using reverse geocoding (OpenStreetMap Nominatim)
          let locationName = "Your Location";
          try {
            const geoRes = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
            );
            locationName = geoRes.data.address.city ||
              geoRes.data.address.town ||
              geoRes.data.address.village ||
              geoRes.data.address.state ||
              "Your Location";
          } catch (e) {
            // fallback to coordinates
            locationName = `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
          }

          // Fetch weather using Open-Meteo (no API key required)
          try {
            const weatherRes = await axios.get(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const weather = weatherRes.data.current_weather;
            setWeatherData({
              location: locationName,
              temperature: `${weather.temperature}°C`,
              condition: weather.weathercode === 0 ? "Clear" : "See details",
              recommendation: "Enjoy your day!"
            });
          } catch (e) {
            setWeatherData({
              location: locationName,
              temperature: "",
              condition: "",
              recommendation: ""
            });
          }
        },
        () => {
          // If user denies location, fallback to default
          setWeatherData({
            location: "Unknown",
            temperature: "",
            condition: "",
            recommendation: ""
          });
        }
      );
    } else {
      setWeatherData({
        location: "Unknown",
        temperature: "",
        condition: "",
        recommendation: ""
      });
    }

    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const categories = [
    { icon: Plane, label: "Flights", color: "bg-blue-500", count: "200+ deals" },
    { icon: Hotel, label: "Hotels", color: "bg-purple-500", count: "500+ options" },
    { icon: Trophy, label: "Experiences", color: "bg-yellow-500", count: "100+ activities" },
    { icon: Utensils, label: "Dining", color: "bg-pink-500", count: "50+ restaurants" }
  ]

  const quickActions = [
    { icon: CreditCard, label: "My Trips", route: "/bookings", count: "3 upcoming" },
    { icon: Bookmark, label: "Saved", route: "/saved", count: "12 items" },
    { icon: Gift, label: "Offers", count: "5 new" },
    { icon: Headphones, label: "Support", count: "24/7" }
  ]

  const handleSearch = (query) => {
    console.log('Searching for:', query)
    navigate('/explore', { state: { searchQuery: query } })
  }

  const handleNotificationRead = () => {
    setNotificationCount(Math.max(0, notificationCount - 1))
  }

  if (loading || destinationsLoading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text="Loading your dashboard..." />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => setIsSearchOpen(true)}
        onNotificationOpen={() => setIsNotificationOpen(true)}
        notificationCount={notificationCount}
        cartCount={2}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Welcome Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-navy" />
                      )}
                    </motion.div>
                    <div>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                      >
                        Good morning,
                      </motion.p>
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-navy'}`}
                      >
                        {user?.displayName || user?.firstName || 'Traveler'}!
                      </motion.h2>
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center space-x-2 mt-1"
                      >
                        <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {weatherData?.location}
                        </span>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          • {weatherData?.temperature} {weatherData?.condition}
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}
                    >
                      <div className={`text-2xl font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                        {user?.travelPoints || 2450}
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-navy' : 'text-white'}`}>
                        Travel Points
                      </div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={`p-4 rounded-xl ${isDark ? 'bg-blue-600' : 'bg-purple-600'} text-center`}
                    >
                      <div className="text-2xl font-bold text-yellow-400">3</div>
                      <div className="text-sm font-semibold text-yellow-400">Upcoming Trips</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weather Recommendation */}
            {weatherData && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'} border-l-4 border-blue-500`}>
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">☀️</div>
                    <div>
                      <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        Weather Update
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {weatherData.recommendation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-8 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} cursor-pointer relative overflow-hidden`}
                onClick={() => navigate('/trip-planner')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h3 className={`font-bold text-2xl lg:text-3xl mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                      Plan Your Dream Trip
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-navy' : 'text-white'}`}>
                      Let AI create the perfect itinerary for you
                    </p>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-navy' : 'bg-white'
                    }`}
                  >
                    <ArrowRight className={`w-8 h-8 ${isDark ? 'text-white' : 'text-navy'}`} />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Suggested for You */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-navy'}`}>
                  Suggested for You
                </h3>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                  onClick={() => navigate('/ai-trips')}
                >
                  View All
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {featuredDestinations.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate('/trip-details', { state: { destination: item } })}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {item.tag}
                      </motion.span>
                    </div>
                    {item.discount && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-500 text-white">
                          {item.discount}% OFF
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-bold text-white text-xl mb-1">{item.name}</h4>
                      <p className="text-white/80 text-sm mb-2">{item.location}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-semibold">{item.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-white/60 text-sm line-through">{item.originalPrice}</span>
                          )}
                          <span className="text-white font-bold text-lg">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-2xl mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                What are you looking for?
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer text-center group`}
                    >
                      <motion.div 
                        whileHover={{ rotate: 10 }}
                        className={`w-16 h-16 rounded-xl ${category.color} flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-shadow`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className={`font-bold text-lg mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                        {category.label}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {category.count}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => action.route && navigate(action.route)}
                      className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer flex items-center space-x-4 group`}
                    >
                      <Icon className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'} group-hover:scale-110 transition-transform`} />
                      <div className="flex-1">
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {action.label}
                        </span>
                        {action.count && (
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {action.count}
                          </p>
                        )}
                      </div>
                      <ArrowRight className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'} group-hover:translate-x-1 transition-transform`} />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Recent Activity
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                {[
                  { icon: Calendar, color: 'bg-green-500', title: 'Trip Booked', desc: 'Maldives Luxury Retreat', time: '2h ago' },
                  { icon: Star, color: 'bg-blue-500', title: 'Review Added', desc: 'Dubai Luxury Experience', time: '1d ago' },
                  { icon: Gift, color: 'bg-purple-500', title: 'Points Earned', desc: '+250 travel points', time: '2d ago' }
                ].map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-3"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {activity.title}
                        </p>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {activity.desc}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {activity.time}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Trending Destinations */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                <TrendingUp className={`w-8 h-8 mx-auto mb-3 ${isDark ? 'text-navy' : 'text-white'}`} />
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Trending Now
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Bali is 40% more popular this month
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/explore', { state: { searchQuery: 'Bali' } })}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                  } hover:opacity-90 transition-opacity`}
                >
                  Explore Bali
                </motion.button>
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
      <NotificationCenter 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)}
        notificationCount={notificationCount}
        onMarkAsRead={handleNotificationRead}
      />

      {/* Data Seeder */}
      {/* <DataSeeder /> */}

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default Dashboard