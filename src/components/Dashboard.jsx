import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Bell, 
  MapPin, 
  ArrowRight, 
  Star, 
  Calendar, 
  Users, 
  Plane, 
  Hotel, 
  Trophy, 
  Utensils,
  Sun,
  Moon,
  CreditCard,
  Bookmark,
  Gift,
  Headphones,
  ShoppingCart,
  User,
  Search,
  Menu
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const recommendations = [
    {
      title: "Bali Paradise",
      subtitle: "7 days • 2 people",
      price: "$1,299",
      rating: "4.8",
      tag: "Popular",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Alpine Escape",
      subtitle: "5 days • 2 people", 
      price: "$1,099",
      rating: "4.7",
      tag: "New",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Tokyo Adventure",
      subtitle: "6 days • 2 people",
      price: "$1,599",
      rating: "4.9",
      tag: "Trending",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Santorini Dreams",
      subtitle: "5 days • 2 people",
      price: "$1,399",
      rating: "4.8",
      tag: "Romantic",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80"
    }
  ]

  const categories = [
    { icon: Plane, label: "Flights", color: "bg-blue-500" },
    { icon: Hotel, label: "Hotels", color: "bg-purple-500" },
    { icon: Trophy, label: "Experiences", color: "bg-yellow-500" },
    { icon: Utensils, label: "Dining", color: "bg-pink-500" }
  ]

  const quickActions = [
    { icon: CreditCard, label: "My Trips", route: "/bookings" },
    { icon: Bookmark, label: "Saved", route: "/saved" },
    { icon: Gift, label: "Offers" },
    { icon: Headphones, label: "Support" }
  ]

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Desktop Header */}
      <header className="hidden lg:block sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <Plane className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
              </div>
              <h1 className={`text-2xl font-bold font-playfair ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`}>
                Sanchari
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button 
                onClick={() => navigate('/explore')}
                className={`font-semibold hover:opacity-80 transition-opacity ${
                  isDark ? 'text-white' : 'text-navy'
                }`}
              >
                Explore
              </button>
              <button 
                onClick={() => navigate('/trip-planner')}
                className={`font-semibold hover:opacity-80 transition-opacity ${
                  isDark ? 'text-white' : 'text-navy'
                }`}
              >
                Plan Trip
              </button>
              <button 
                onClick={() => navigate('/ai-trips')}
                className={`font-semibold hover:opacity-80 transition-opacity ${
                  isDark ? 'text-white' : 'text-navy'
                }`}
              >
                AI Trips
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  className={`pl-10 pr-4 py-2 rounded-xl border-0 w-64 ${
                    isDark 
                      ? 'bg-navy/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-navy placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <button onClick={toggleTheme} className="p-2">
                {isDark ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </button>
              <div className="relative">
                <Bell className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  3
                </div>
              </div>
              <button 
                onClick={() => navigate('/cart')}
                className="relative"
              >
                <ShoppingCart className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  2
                </div>
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                <User className="w-6 h-6 text-navy" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button className="p-2">
              <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
            </button>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <Plane className={`w-5 h-5 ${isDark ? 'text-navy' : 'text-white'}`} />
              </div>
              <h1 className={`text-xl font-bold font-playfair ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`}>
                Sanchari
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2">
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </button>
              <div className="relative">
                <Bell className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
                <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-navy" />
                    </div>
                    <div>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Good morning,
                      </p>
                      <h2 className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-navy'}`}>
                        Sarah!
                      </h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          New York, NY
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                      <div className={`text-2xl font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                        2,450
                      </div>
                      <div className={`text-sm font-semibold ${isDark ? 'text-navy' : 'text-white'}`}>
                        Travel Points
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-600' : 'bg-purple-600'} text-center`}>
                      <div className="text-2xl font-bold text-yellow-400">3</div>
                      <div className="text-sm font-semibold text-yellow-400">Upcoming Trips</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className="mb-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} cursor-pointer`}
                onClick={() => navigate('/trip-planner')}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h3 className={`font-bold text-2xl lg:text-3xl mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                      Plan Your Dream Trip
                    </h3>
                    <p className={`text-lg ${isDark ? 'text-navy' : 'text-white'}`}>
                      Let AI create the perfect itinerary for you
                    </p>
                  </div>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-navy' : 'bg-white'
                  }`}>
                    <ArrowRight className={`w-8 h-8 ${isDark ? 'text-white' : 'text-navy'}`} />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Suggested for You */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-navy'}`}>
                  Suggested for You
                </h3>
                <button 
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                  onClick={() => navigate('/ai-trips')}
                >
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {recommendations.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate('/trip-details')}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}>
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-bold text-white text-xl mb-1">{item.title}</h4>
                      <p className="text-white/80 text-sm mb-2">{item.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm font-semibold">{item.rating}</span>
                        </div>
                        <span className="text-white font-bold text-lg">{item.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className={`font-bold text-2xl mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                What are you looking for?
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer text-center`}
                    >
                      <div className={`w-16 h-16 rounded-xl ${category.color} flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                        {category.label}
                      </h4>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => action.route && navigate(action.route)}
                      className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer flex items-center space-x-4`}
                    >
                      <Icon className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {action.label}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Recent Activity
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Trip Booked
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Maldives Luxury Retreat
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Review Added
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Dubai Luxury Experience
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Points Earned
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      +250 travel points
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 ${
        isDark ? 'bg-navy' : 'bg-white'
      } border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md`}>
        <div className="flex items-center justify-around py-3">
          <button className="flex flex-col items-center space-y-1">
            <div className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>🏠</div>
            <span className={`text-xs font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>Home</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => navigate('/explore')}
          >
            <div className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>🔍</div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Explore</span>
          </button>
          <button 
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`}
            onClick={() => navigate('/trip-planner')}
          >
            <div className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`}>✨</div>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Cart</span>
          </button>
          <button 
            className="flex flex-col items-center space-y-1"
            onClick={() => navigate('/profile')}
          >
            <User className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard