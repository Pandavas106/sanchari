import React from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const { isDark } = useTheme()
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}
      >
        <Plane className="w-full h-full" />
      </motion.div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

export default LoadingSpinner