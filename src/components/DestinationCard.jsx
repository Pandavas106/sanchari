import React from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, MapPin, Calendar, Users, ArrowRight, TrendingUp } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const DestinationCard = ({ 
  destination, 
  index, 
  viewMode = 'grid', 
  isSaved = false, 
  onSave, 
  onClick 
}) => {
  const { isDark } = useTheme()

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.01 }}
        className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer group`}
        onClick={onClick}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative lg:w-80 h-48 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                destination.tag === 'Featured' 
                  ? 'bg-yellow-500 text-white'
                  : destination.tag === 'Luxury'
                  ? 'bg-purple-500 text-white'
                  : destination.tag === 'Popular'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}>
                {destination.tag}
              </span>
            </div>
            {destination.trending && (
              <div className="absolute top-3 right-3">
                <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              </div>
            )}
            {destination.discount && (
              <div className="absolute bottom-3 left-3">
                <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                  {destination.discount}% OFF
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className={`font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {destination.name}
                  </h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {destination.location}
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSave()
                  }}
                  className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center"
                >
                  <Heart className={`w-5 h-5 ${
                    isSaved ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`} />
                </motion.button>
              </div>
              
              <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {destination.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {destination.highlights?.slice(0, 3).map((highlight, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-navy'
                    }`}
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {destination.rating}
                  </span>
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    ({destination.reviews})
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {destination.duration}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  {destination.originalPrice && (
                    <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {destination.originalPrice}
                    </span>
                  )}
                  <span className={`font-bold text-lg ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    {destination.price}
                  </span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`mt-2 px-4 py-2 rounded-lg font-semibold text-sm flex items-center space-x-1 ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid view
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`rounded-2xl overflow-hidden ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer group`}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            destination.tag === 'Featured' 
              ? 'bg-yellow-500 text-white'
              : destination.tag === 'Luxury'
              ? 'bg-purple-500 text-white'
              : destination.tag === 'Popular'
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {destination.tag}
          </span>
        </div>
        
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          {destination.trending && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Hot
            </div>
          )}
          {destination.discount && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              {destination.discount}% OFF
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onSave()
            }}
            className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
          >
            <Heart className={`w-4 h-4 ${
              isSaved ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} />
          </motion.button>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {destination.duration}
            </span>
            <Star className="w-4 h-4 text-yellow-400 fill-current ml-2" />
            <span className="text-white text-sm font-semibold">
              {destination.rating}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
          {destination.name}
        </h3>
        <div className="flex items-center space-x-1 mb-3">
          <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {destination.location}
          </span>
        </div>
        
        <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {destination.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.highlights?.slice(0, 2).map((highlight, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-navy'
              }`}
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
              {destination.rating}
            </span>
            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              ({destination.reviews})
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              {destination.originalPrice && (
                <span className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {destination.originalPrice}
                </span>
              )}
              <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                {destination.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DestinationCard