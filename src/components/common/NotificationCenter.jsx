import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, Info, AlertTriangle, Gift, Plane } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const NotificationCenter = ({ isOpen, onClose, notificationCount, onMarkAsRead }) => {
  const { isDark } = useTheme()
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Your Maldives trip has been confirmed for Dec 15-22',
      time: '2 hours ago',
      read: false,
      icon: Check,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'offer',
      title: 'Special Offer',
      message: '20% off on your next booking. Limited time offer!',
      time: '1 day ago',
      read: false,
      icon: Gift,
      color: 'text-purple-500'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Travel Reminder',
      message: 'Don\'t forget to check-in online for your flight',
      time: '2 days ago',
      read: true,
      icon: Plane,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Weather Update',
      message: 'Weather conditions updated for your destination',
      time: '3 days ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-orange-500'
    }
  ])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
    onMarkAsRead()
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    onMarkAsRead()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-6"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/20" />
        
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 20, scale: 0.95 }}
          className={`relative w-full max-w-md rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } shadow-2xl max-h-96`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-300 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Notifications
              </h3>
              {notificationCount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={markAllAsRead}
                className={`text-sm font-medium ${
                  isDark ? 'text-yellow-400 hover:text-yellow-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Mark all read
              </button>
              <button
                onClick={onClose}
                className={`p-1 rounded-full ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-2">
                {notifications.map((notification, index) => {
                  const Icon = notification.icon
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                        notification.read 
                          ? (isDark ? 'bg-navy/30' : 'bg-gray-50')
                          : (isDark ? 'bg-navy/50' : 'bg-blue-50')
                      } ${isDark ? 'hover:bg-navy/60' : 'hover:bg-gray-100'}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-full ${
                          isDark ? 'bg-navy/50' : 'bg-white'
                        }`}>
                          <Icon className={`w-4 h-4 ${notification.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-semibold text-sm ${
                              isDark ? 'text-white' : 'text-navy'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className={`text-sm mt-1 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-2 ${
                            isDark ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default NotificationCenter