import React, { useState } from 'react'
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
  TrendingUp,
  Plane,
  Award,
  MapPin,
  Camera,
  Shield,
  Clock
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { Navbar, BottomNavbar, SignOutModal } from '../components'

const Profile = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { user } = useAuth()
  const [notificationCount, setNotificationCount] = useState(3)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const stats = [
    { label: "Trips", value: "24", icon: Plane, color: "text-blue-500" },
    { label: "Reviews", value: "156", icon: Star, color: "text-yellow-500" },
    { label: "Photos", value: "89", icon: Camera, color: "text-purple-500" },
    { label: "Countries", value: "12", icon: MapPin, color: "text-green-500" }
  ]

  const menuItems = [
    { icon: Calendar, title: "My Bookings", subtitle: "View and manage trips", color: "text-orange-500", route: "/bookings" },
    { icon: Heart, title: "Favorites", subtitle: "Saved places & activities", color: "text-red-500", route: "/saved" },
    { icon: CreditCard, title: "Payment Methods", subtitle: "Cards & payment options", color: "text-green-500", route: "/settings" },
    { icon: Gift, title: "Referral Program", subtitle: "Invite friends & earn rewards", color: "text-purple-500" },
    { icon: Award, title: "Achievements", subtitle: "Travel milestones & badges", color: "text-yellow-500" },
    { icon: Headphones, title: "Help & Support", subtitle: "Get assistance", color: "text-blue-500", route: "/settings" },
    { icon: Settings, title: "Settings", subtitle: "Privacy & preferences", color: "text-gray-500", route: "/settings" }
  ]

  const recentTrips = [
    {
      destination: "Maldives",
      date: "Dec 2024",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      status: "Upcoming"
    },
    {
      destination: "Dubai",
      date: "Oct 2024",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      status: "Completed"
    },
    {
      destination: "Santorini",
      date: "Aug 2024",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      status: "Completed"
    }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => {}}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={2}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            My Profile
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-8">
            {/* Profile Header */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm mb-8`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 lg:mb-0">
                  <div className="relative">
                    <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName} 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-navy">
                          {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                    <button className={`absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-yellow-400' : 'bg-blue-600'
                    }`}>
                      <Edit className={`w-4 h-4 ${isDark ? 'text-navy' : 'text-white'}`} />
                    </button>
                  </div>
                  <div>
                    <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'} mb-2`}>
                      {user?.displayName || 'User'}
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                      {user?.email}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        4.9 Premium Member
                      </span>
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}>
                        Elite
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Clock className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Member since {user?.createdAt ? new Date(user.createdAt).getFullYear() : '2023'}
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
                    <div className="text-sm font-semibold text-yellow-400">Upcoming</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Security Status */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm mb-8`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>
                  Account Security
                </h3>
                <Shield className={`w-6 h-6 ${user?.emailVerified ? 'text-green-500' : 'text-orange-500'}`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${user?.emailVerified ? 'bg-green-500' : 'bg-orange-500'}`} />
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                    Email {user?.emailVerified ? 'Verified' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                    2FA Enabled
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                    Secure Login
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => item.route && navigate(item.route)}
                    className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowSignOutModal(true)}
              className="w-full py-4 bg-red-500/20 rounded-2xl font-semibold text-red-500 flex items-center justify-center space-x-2 mb-4 border border-red-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </motion.button>
            
            <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Sanchari v2.1.0
            </p>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Recent Trips */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Recent Trips
              </h3>
              <div className="space-y-4">
                {recentTrips.map((trip, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm flex items-center space-x-4`}
                  >
                    <img
                      src={trip.image}
                      alt={trip.destination}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {trip.destination}
                      </h4>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {trip.date}
                      </p>
                      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold mt-1 ${
                        trip.status === 'Upcoming'
                          ? 'bg-orange-500 text-white'
                          : 'bg-green-500 text-white'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Preferences */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Travel Preferences
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Favorite Destinations
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Beach', 'Mountains', 'Cities'].map((pref) => (
                        <span
                          key={pref}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {pref}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Travel Style
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['Luxury', 'Adventure', 'Culture'].map((style) => (
                        <span
                          key={style}
                          className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                            isDark ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                          }`}
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Recent Achievements
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Globe Trotter
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Visited 10+ countries
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Review Master
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      100+ helpful reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Elite Member
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Premium status achieved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
      />
    </div>
  )
}

export default Profile