import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, RefreshCw, LogOut } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

const SessionTimeout = () => {
  const { isDark } = useTheme()
  const { signOut, isAuthenticated } = useAuth()
  const [showWarning, setShowWarning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes warning
  const [isExtending, setIsExtending] = useState(false)

  const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  const WARNING_TIME = 5 * 60 * 1000 // Show warning 5 minutes before timeout

  useEffect(() => {
    if (!isAuthenticated) return

    let timeoutId
    let warningId
    let countdownId

    const resetTimers = () => {
      clearTimeout(timeoutId)
      clearTimeout(warningId)
      clearInterval(countdownId)
      setShowWarning(false)
      setTimeLeft(300)

      // Set warning timer
      warningId = setTimeout(() => {
        setShowWarning(true)
        setTimeLeft(300)

        // Start countdown
        countdownId = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              handleTimeout()
              return 0
            }
            return prev - 1
          })
        }, 1000)
      }, SESSION_TIMEOUT - WARNING_TIME)

      // Set auto logout timer
      timeoutId = setTimeout(handleTimeout, SESSION_TIMEOUT)
    }

    const handleTimeout = async () => {
      clearTimeout(timeoutId)
      clearTimeout(warningId)
      clearInterval(countdownId)
      setShowWarning(false)
      await signOut()
    }

    const handleActivity = () => {
      if (isAuthenticated) {
        resetTimers()
      }
    }

    // Activity events to track
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Initialize timers
    resetTimers()

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(warningId)
      clearInterval(countdownId)
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
    }
  }, [isAuthenticated, signOut])

  const extendSession = async () => {
    setIsExtending(true)
    
    // Simulate API call to extend session
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsExtending(false)
    setShowWarning(false)
    
    // Reset timers by triggering activity
    document.dispatchEvent(new Event('mousedown'))
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isAuthenticated || !showWarning) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-md rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } shadow-2xl p-6`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
              Session Expiring Soon
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Your session will expire in
            </p>
          </div>

          {/* Countdown */}
          <div className="text-center mb-6">
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className={`text-4xl font-bold ${
                timeLeft <= 60 ? 'text-red-500' : 'text-orange-500'
              }`}
            >
              {formatTime(timeLeft)}
            </motion.div>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              You'll be automatically signed out for security
            </p>
          </div>

          {/* Progress Bar */}
          <div className={`w-full h-2 rounded-full mb-6 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div
              className={`h-2 rounded-full ${
                timeLeft <= 60 ? 'bg-red-500' : 'bg-orange-500'
              }`}
              initial={{ width: '100%' }}
              animate={{ width: `${(timeLeft / 300) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <motion.button
              onClick={signOut}
              className="flex-1 py-3 rounded-xl font-semibold border-2 border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Now</span>
            </motion.button>
            
            <motion.button
              onClick={extendSession}
              disabled={isExtending}
              className={`flex-1 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                isDark 
                  ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50`}
              whileHover={{ scale: isExtending ? 1 : 1.02 }}
              whileTap={{ scale: isExtending ? 1 : 0.98 }}
            >
              {isExtending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Extending...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Stay Signed In</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SessionTimeout