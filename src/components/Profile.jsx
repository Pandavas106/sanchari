import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Edit, 
  Star, 
  CreditCard, 
  Calendar, 
  Heart, 
  Gift, 
  Headphones, 
  Settings,
  LogOut,
  Sun,
  Moon,
  TrendingUp,
  Plane
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Profile = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const stats = [
    { label: "Trips", value: "24" },
    { label: "Reviews", value: "156" },
    { label: "Photos", value: "89" }
  ]

  const menuItems = [
    { icon: Calendar, title: "My Bookings", subtitle: "View and manage trips", color: "text-orange-500", route: "/bookings" },
    { icon: Heart, title: "Favorites", subtitle: "Saved places & activities", color: "text-red-500", route: "/saved" },
    { icon: CreditCard, title: "Payment Methods", subtitle: "Cards & payment options", color: "text-green-500" },
    { icon: Gift, title: "Referral Program", subtitle: "Invite friends & earn rewards", color: "text-purple-500" },
    { icon: Headphones, title: "Help & Support", subtitle: "Get assistance", color: "text-blue-500" },
    { icon: Settings, title: "Settings", subtitle: "Privacy & preferences", color: "text-gray-500", route: "/settings" }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            Profile
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Profile Card */}
        <div className="px-6 mb-6">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-navy">S</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    Sarah Johnson
                  </h2>
                  <Edit className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                </div>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  sarah.johnson@email.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                4.9 Premium Member
              </span>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-around">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="px-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-400 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <CreditCard className="w-6 h-6 text-navy" />
                <div className="bg-white px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold text-yellow-600">+15%</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-navy">2,450</div>
              <div className="text-sm font-semibold text-navy">Travel Points</div>
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-blue-600' : 'bg-blue-600'}`}>
              <div className="flex items-center justify-between mb-3">
                <Plane className="w-6 h-6 text-yellow-400" />
                <div className="bg-white px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold text-navy">Active</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-400">3</div>
              <div className="text-sm font-semibold text-yellow-400">Upcoming Trips</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-6 space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => item.route && navigate(item.route)}
                className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${item.color} bg-opacity-20 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.subtitle}
                    </p>
                  </div>
                  <div className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    →
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Sign Out */}
        <div className="px-6 pb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-red-500/20 rounded-2xl font-semibold text-red-500 flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </motion.button>
          
          <p className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Sanchari v2.1.0
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile