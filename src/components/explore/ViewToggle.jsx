import React from 'react'
import { motion } from 'framer-motion'
import { Grid, List } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const ViewToggle = ({ viewMode, setViewMode }) => {
  const { isDark } = useTheme()

  return (
    <div className={`flex items-center space-x-1 p-1 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setViewMode('grid')}
        className={`p-1.5 sm:p-2 rounded-lg transition-all ${
          viewMode === 'grid' 
            ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
            : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-navy')
        }`}
      >
        <Grid className="w-3 h-3 sm:w-4 sm:h-4" />
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setViewMode('list')}
        className={`p-1.5 sm:p-2 rounded-lg transition-all ${
          viewMode === 'list' 
            ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
            : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-navy')
        }`}
      >
        <List className="w-3 h-3 sm:w-4 sm:h-4" />
      </motion.button>
    </div>
  )
}

export default ViewToggle