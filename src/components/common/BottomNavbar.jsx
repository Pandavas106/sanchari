import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  Compass, 
  MapPin, 
  Sparkles, 
  Calendar, 
  Heart, 
  ShoppingCart, 
  User,
  Plus
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const BottomNavbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()

  const navigationItems = [
    { 
      path: '/dashboard', 
      label: 'Home', 
      icon: Home,
      activeColor: isDark ? 'text-yellow-400' : 'text-blue-600'
    },
    { 
      path: '/explore', 
      label: 'Explore', 
      icon: Compass,
      activeColor: isDark ? 'text-yellow-400' : 'text-blue-600'
    },
    { 
      path: '/trip-planner', 
      label: 'Plan', 
      icon: Plus,
      activeColor: isDark ? 'text-navy' : 'text-white',
      isSpecial: true
    },
    { 
      path: '/cart', 
      label: 'Cart', 
      icon: ShoppingCart,
      activeColor: isDark ? 'text-yellow-400' : 'text-blue-600',
      badge: cartCount
    },
    { 
      path: '/profile', 
      label: 'Profile', 
      icon: User,
      activeColor: isDark ? 'text-yellow-400' : 'text-blue-600'
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleNavigation = (path) => {
    navigate(path)
  }

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className={`md:hidden fixed bottom-0 left-0 right-0 z-50 ${
        isDark ? 'bg-navy/95' : 'bg-white/95'
      } backdrop-blur-md border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} px-2 py-2`}
    >
      <div className="flex items-center justify-around">
        {navigationItems.map((item, index) => {
          const Icon = item.icon
          const active = isActive(item.path)
          
          return (
            <motion.button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
                item.isSpecial 
                  ? `w-14 h-14 ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} shadow-lg`
                  : 'w-12 h-12'
              } ${
                active && !item.isSpecial
                  ? (isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20')
                  : ''
              }`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Active indicator */}
              {active && !item.isSpecial && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -top-1 w-1 h-1 rounded-full ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: active ? 1.1 : 1,
                  y: active && !item.isSpecial ? -2 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <Icon 
                  className={`w-6 h-6 ${
                    item.isSpecial 
                      ? item.activeColor
                      : active 
                        ? item.activeColor 
                        : (isDark ? 'text-gray-400' : 'text-gray-600')
                  }`} 
                />
              </motion.div>

              {/* Badge for cart */}
              {item.badge && item.badge > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  }`}
                >
                  {item.badge > 9 ? '9+' : item.badge}
                </motion.div>
              )}

              {/* Label */}
              <motion.span 
                className={`text-xs font-medium mt-1 ${
                  item.isSpecial 
                    ? item.activeColor
                    : active 
                      ? item.activeColor 
                      : (isDark ? 'text-gray-400' : 'text-gray-600')
                }`}
                animate={{ 
                  opacity: active ? 1 : 0.7,
                  scale: active ? 1.05 : 1
                }}
              >
                {item.label}
              </motion.span>
            </motion.button>
          )
        })}
      </div>

      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" />
    </motion.div>
  )
}

export default BottomNavbar