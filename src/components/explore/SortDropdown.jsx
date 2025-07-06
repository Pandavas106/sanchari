import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const SortDropdown = ({ sortBy, setSortBy, options }) => {
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => option.value === sortBy)

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border ${
          isDark 
            ? 'bg-navy/50 border-gray-600 text-white' 
            : 'bg-white/50 border-gray-300 text-navy'
        } hover:bg-opacity-70 transition-all min-w-0`}
      >
        <span className="text-xs sm:text-sm font-medium truncate">
          Sort: <span className="hidden sm:inline">{selectedOption?.label}</span>
          <span className="sm:hidden">{selectedOption?.label.split(':')[0]}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute top-full right-0 mt-2 w-48 rounded-lg border shadow-lg z-50 ${
              isDark 
                ? 'bg-navy/95 border-gray-600' 
                : 'bg-white/95 border-gray-200'
            } backdrop-blur-md`}
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSortBy(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium flex items-center justify-between ${
                  sortBy === option.value
                    ? (isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-600/20 text-blue-600')
                    : (isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-gray-100')
                } transition-colors first:rounded-t-lg last:rounded-b-lg`}
              >
                <span className="truncate">{option.label}</span>
                {sortBy === option.value && (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default SortDropdown