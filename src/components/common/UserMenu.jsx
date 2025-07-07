import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Settings, 
  Calendar, 
  Heart, 
  CreditCard, 
  Headphones, 
  LogOut,
  ChevronDown,
  Award,
  Gift
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const UserMenu = ({ onSignOutClick }) => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const menuItems = [
    { 
      icon: User, 
      label: 'My Profile', 
      route: '/profile',
      description: 'View and edit profile'
    },
    { 
      icon: Calendar, 
      label: 'My Bookings', 
      route: '/bookings',
      description: 'Manage your trips'
    },
    { 
      icon: Heart, 
      label: 'Saved Items', 
      route: '/saved',
      description: 'Your favorites'
    },
    { 
      icon: CreditCard, 
      label: 'Payment Methods', 
      route: '/settings',
      description: 'Cards & billing'
    },
    { 
      icon: Award, 
      label: 'Travel Points', 
      route: '/profile',
      description: '2,450 points available'
    },
    { 
      icon: Gift, 
      label: 'Referral Program', 
      route: '/profile',
      description: 'Invite friends & earn'
    },
    { 
      icon: Headphones, 
      label: 'Help & Support', 
      route: '/settings',
      description: 'Get assistance'
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      route: '/settings',
      description: 'Privacy & preferences'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (route) => {
    setIsOpen(false)
    navigate(route)
  }

  const handleSignOut = () => {
    setIsOpen(false)
    onSignOutClick()
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/10 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-navy font-bold">
              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <div className="hidden lg:block text-left">
          <div className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
            {user.displayName || 'User'}
          </div>
          <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Premium Member
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden lg:block"
        >
          <ChevronDown className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute top-full right-0 mt-2 w-80 rounded-2xl border shadow-2xl z-50 ${
              isDark 
                ? 'bg-navy/95 border-gray-600' 
                : 'bg-white/95 border-gray-200'
            } backdrop-blur-md`}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-navy font-bold text-lg">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {user.displayName || 'User'}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.email}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Award className="w-3 h-3 text-yellow-500" />
                    <span className={`text-xs font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      Premium Member
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleItemClick(item.route)}
                    className={`w-full p-3 rounded-xl text-left flex items-center space-x-3 transition-colors ${
                      isDark 
                        ? 'hover:bg-white/10 text-white' 
                        : 'hover:bg-gray-100 text-navy'
                    }`}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Icon className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <div className="flex-1">
                      <div className="font-semibold">{item.label}</div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.description}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-gray-300">
              <motion.button
                onClick={handleSignOut}
                className="w-full p-3 rounded-xl text-left flex items-center space-x-3 text-red-500 hover:bg-red-500/10 transition-colors"
                whileHover={{ x: 5 }}
              >
                <LogOut className="w-5 h-5" />
                <div>
                  <div className="font-semibold">Sign Out</div>
                  <div className="text-xs text-red-400">
                    End your session
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserMenu