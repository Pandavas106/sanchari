import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const CategoryFilter = ({ categories, activeFilter, setActiveFilter }) => {
  const { isDark } = useTheme()

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((filter, index) => (
          <motion.button
            key={filter}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
              activeFilter === filter
                ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
            }`}
          >
            {filter}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default CategoryFilter