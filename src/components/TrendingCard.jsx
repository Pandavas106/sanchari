import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const TrendingCard = ({ destination, index, onClick }) => {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      
      <div className="absolute top-2 right-2">
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + index * 0.05 }}
          className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 ${
            destination.trending ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
          }`}
        >
          {destination.trending && <TrendingUp className="w-3 h-3" />}
          <span>{destination.growth}</span>
        </motion.span>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2">
        <h4 className="font-bold text-white text-sm">{destination.name}</h4>
        <p className="text-white/80 text-xs">{destination.properties}</p>
      </div>
    </motion.div>
  )
}

export default TrendingCard