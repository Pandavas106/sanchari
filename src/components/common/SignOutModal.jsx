import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, LogOut, AlertTriangle, Loader } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'

const SignOutModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme()
  const { signOut, loading } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    const result = await signOut()
    
    if (result.success) {
      onClose()
    } else {
      console.error('Sign out failed:', result.error)
      setIsSigningOut(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
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
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Sign Out
              </h2>
            </div>
            <button
              onClick={onClose}
              disabled={isSigningOut}
              className={`p-2 rounded-full ${
                isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
              } transition-colors disabled:opacity-50`}
            >
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Are you sure you want to sign out?
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  You'll need to sign in again to access your account and continue planning your trips.
                </p>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'} border-l-4 border-orange-500`}>
              <h4 className={`font-semibold text-sm mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                What happens when you sign out:
              </h4>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Your session will be ended</li>
                <li>• Cart items will be saved for next login</li>
                <li>• Saved preferences will be preserved</li>
                <li>• You'll be redirected to the welcome page</li>
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              disabled={isSigningOut}
              className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-colors disabled:opacity-50 ${
                isDark 
                  ? 'border-gray-600 text-white hover:bg-gray-600' 
                  : 'border-gray-300 text-navy hover:bg-gray-100'
              }`}
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex-1 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              whileHover={{ scale: isSigningOut ? 1 : 1.02 }}
              whileTap={{ scale: isSigningOut ? 1 : 0.98 }}
            >
              {isSigningOut ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Signing Out...</span>
                </>
              ) : (
                <>
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SignOutModal