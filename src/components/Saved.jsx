import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Saved = () => {
  const { isDark, toggleTheme } = useTheme()
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Places', 'Hotels', 'Activities']

  const savedItems = [
    {
      title: "Santorini, Greece",
      subtitle: "4.8 • Island",
      price: "From $299",
      tag: "Place",
      tagColor: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Ocean Paradise Resort",
      subtitle: "4.9 • Maldives", 
      price: "$450/night",
      tag: "Hotel",
      tagColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Hot Air Balloon Ride",
      subtitle: "4.7 • 2 hours",
      price: "$180",
      tag: "Activity", 
      tagColor: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Kyoto, Japan",
      subtitle: "4.9 • Cultural",
      price: "From $199",
      tag: "Place",
      tagColor: "bg-blue-500", 
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80"
    }
  ]

  const stats = [
    { label: "Total Saved", value: "24" },
    { label: "Places", value: "8" },
    { label: "Hotels", value: "12" },
    { label: "Activities", value: "4" }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            Saved
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 mb-6">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition-all ${
                  activeFilter === filter
                    ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                    : (isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy')
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="px-6 mb-6">
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Items */}
        <div className="px-6 space-y-4">
          {savedItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`rounded-2xl overflow-hidden ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.subtitle}
                    </span>
                  </div>
                  <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    {item.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Saved