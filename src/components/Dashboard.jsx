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
  User
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
    }
  ]

  const categories = [
    { icon: Plane, label: "Flights", color: "bg-blue-500" },
    { icon: Hotel, label: "Hotels", color: "bg-purple-500" },
    { icon: Trophy, label: "Experiences", color: "bg-yellow-500" },
    { icon: Utensils, label: "Dining", color: "bg-pink-500" }
  ]

  const quickActions = [
    { icon: CreditCard, label: "My Trips" },
    { icon: Bookmark, label: "Saved" },
    { icon: Gift, label: "Offers" },
    { icon: Headphones, label: "Support" }
  ]

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="p-6 pt-12">
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-navy" />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Good morning,
                  </p>
                  <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                    Sarah!
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bell className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  }`}>
                    3
                  </div>
                </div>
                <button onClick={toggleTheme} className="p-2">
                  {isDark ? (
                    <Sun className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Moon className="w-6 h-6 text-blue-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="px-6 mb-6">
          <div className="flex items-center space-x-2">
            <MapPin className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
              New York, NY
            </span>
          </div>
        </div>

        {/* CTA Card */}
        <div className="px-6 mb-8">
          <div 
            className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} cursor-pointer`}
            onClick={() => navigate('/trip-planner')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold text-lg ${isDark ? 'text-navy' : 'text-white'}`}>
                  Plan Your Dream Trip
                </h3>
                <p className={`text-sm ${isDark ? 'text-navy' : 'text-white'}`}>
                  Let AI create the perfect itinerary for you
                </p>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-navy' : 'bg-white'
              }`}>
                <ArrowRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Suggested for You */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
              Suggested for You
            </h3>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
              }`}
              onClick={() => navigate('/ai-trips')}
            >
              View All
            </button>
          </div>
          
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {recommendations.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="min-w-[260px] relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => navigate('/trip-details')}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  }`}>
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="font-bold text-white text-lg">{item.title}</h4>
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-white font-bold">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 mb-8">
          <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            What are you looking for?
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
                >
                  <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {category.label}
                  </h4>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 mb-8">
          <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Quick Actions
          </h3>
          <div className="flex space-x-3 overflow-x-auto pb-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <div
                  key={index}
                  className={`min-w-[100px] p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer text-center`}
                >
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {action.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md ${
          isDark ? 'bg-navy' : 'bg-white'
        } border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
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
    </div>
  )
}

export default Dashboard