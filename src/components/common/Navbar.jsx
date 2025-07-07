import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plane, 
  Search, 
  Bell, 
  ShoppingCart, 
  Sun, 
  Moon,
  Menu,
  X,
  Home,
  Compass,
  Sparkles,
  Calendar,
  Heart,
  Settings as SettingsIcon
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { UserMenu, SignOutModal } from '../index'

const Navbar = ({ 
  onSearchOpen, 
  onNotificationOpen, 
  notificationCount = 0, 
  cartCount = 0 
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  const navigationItems = [
    { 
      path: '/dashboard', 
      label: 'Home', 
      icon: Home,
      description: 'Your travel dashboard'
    },
    { 
      path: '/explore', 
      label: 'Explore', 
      icon: Compass,
      description: 'Discover destinations'
    },
    { 
      path: '/trip-planner', 
      label: 'AI Trips', 
      icon: Sparkles,
      description: 'AI-powered trip planning'
    },
    { 
      path: '/bookings', 
      label: 'My Trips', 
      icon: Calendar,
      description: 'Manage bookings'
    },
    { 
      path: '/saved', 
      label: 'Saved', 
      icon: Heart,
      description: 'Your favorites'
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleNavigation = (path) => {
    navigate(path)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:block sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            >
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
            </motion.div>

            {/* Navigation Links - Only show if authenticated */}
            {isAuthenticated && (
              <div className="flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  
                  return (
                    <motion.button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`relative px-4 py-2 rounded-lg font-semibold transition-all group ${
                        active
                          ? (isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-600/20 text-blue-600')
                          : (isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10')
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                            isDark ? 'bg-yellow-400' : 'bg-blue-600'
                          }`}
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}

                      {/* Tooltip */}
                      <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                        isDark ? 'bg-navy text-white' : 'bg-white text-navy'
                      } shadow-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                        {item.description}
                        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                          isDark ? 'bg-navy' : 'bg-white'
                        }`} />
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search - Only show if authenticated */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onSearchOpen}
                  className={`p-2 rounded-lg ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                  } transition-colors`}
                >
                  <Search className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                </motion.button>
              )}

              {/* Theme Toggle */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme} 
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                } transition-colors`}
              >
                {isDark ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </motion.button>
              
              {/* Notifications - Only show if authenticated */}
              {isAuthenticated && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onNotificationOpen}
                  className={`relative p-2 rounded-lg ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                  } transition-colors`}
                >
                  <Bell className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                  {notificationCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </motion.div>
                  )}
                </motion.button>
              )}
              
              {/* Cart - Only show if authenticated */}
              {isAuthenticated && (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/cart')}
                  className={`relative p-2 rounded-lg ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                  } transition-colors`}
                >
                  <ShoppingCart className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </motion.div>
                  )}
                </motion.button>
              )}
              
              {/* User Menu or Login Button */}
              {isAuthenticated ? (
                <UserMenu onSignOutClick={() => setShowSignOutModal(true)} />
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    isDark 
                      ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Only show if authenticated */}
            {isAuthenticated && (
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                } transition-colors`}
              >
                {isMobileMenuOpen ? (
                  <X className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
                )}
              </motion.button>
            )}

            {/* Mobile Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/')}
            >
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

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme} 
                className="p-2"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-blue-600" />
                )}
              </motion.button>
              
              {isAuthenticated ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onNotificationOpen}
                  className="relative p-2"
                >
                  <Bell className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
                  {notificationCount > 0 && (
                    <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold ${
                      isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                    }`}>
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </div>
                  )}
                </motion.button>
              ) : (
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    isDark 
                      ? 'bg-yellow-400 text-navy' 
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  Sign In
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu - Only show if authenticated */}
        {isAuthenticated && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} ${
              isDark ? 'bg-navy/95' : 'bg-white/95'
            } backdrop-blur-md`}
          >
            <div className="px-6 py-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                
                return (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                      active
                        ? (isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-600/20 text-blue-600')
                        : (isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10')
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="text-left">
                      <div>{item.label}</div>
                      <div className={`text-xs ${
                        active 
                          ? (isDark ? 'text-yellow-400/80' : 'text-blue-600/80')
                          : (isDark ? 'text-gray-400' : 'text-gray-500')
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
              
              {/* Mobile Menu Actions */}
              <div className="pt-4 border-t border-gray-300 space-y-2">
                <motion.button
                  onClick={() => {
                    navigate('/cart')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold ${
                    isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10'
                  } transition-colors`}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-bold ${
                      isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                    }`}>
                      {cartCount}
                    </span>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    navigate('/profile')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold ${
                    isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10'
                  } transition-colors`}
                  whileTap={{ scale: 0.95 }}
                >
                  <UserMenu onSignOutClick={() => setShowSignOutModal(true)} />
                  <span>Profile</span>
                </motion.button>
                
                <motion.button
                  onClick={() => {
                    navigate('/settings')
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold ${
                    isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10'
                  } transition-colors`}
                  whileTap={{ scale: 0.95 }}
                >
                  <SettingsIcon className="w-5 h-5" />
                  <span>Settings</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Sign Out Modal */}
      <SignOutModal 
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
      />
    </>
  )
}

export default Navbar