import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Bell, Star, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Explore = () => {
  const { isDark, toggleTheme } = useTheme()
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Hotels', 'Activities', 'Restaurants']

  const featuredDestinations = [
    {
      name: "Swiss Alps Luxury",
      location: "Zermatt, Switzerland",
      price: "$450/night",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tag: "Featured"
    }
  ]

  const trendingDestinations = [
    {
      name: "Dubai",
      properties: "2,847 properties",
      growth: "+24%",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Tokyo", 
      properties: "3,921 properties",
      growth: "+18%",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80"
    }
  ]

  const popularHotels = [
    {
      name: "The Ritz-Carlton",
      location: "New York, USA",
      price: "$680/night",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Four Seasons Resort",
      location: "Maldives",
      price: "$1,250/night", 
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80"
    }
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
            Explore
          </h1>
          <div className="flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-600" />
              )}
            </button>
            <button className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <Filter className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
            </button>
            <button className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <Bell className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 mb-6">
          <div className={`flex items-center space-x-3 p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search destinations, hotels, activities..."
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Filter Chips */}
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

        {/* Featured This Week */}
        <div className="px-6 mb-8">
          <h2 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            Featured This Week
          </h2>
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  {destination.tag}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-bold text-white text-lg">{destination.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white text-sm">{destination.rating}</span>
                    <span className="text-white/80 text-sm">{destination.location}</span>
                  </div>
                  <span className="text-white font-bold">{destination.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Destinations */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Trending Destinations
            </h2>
            <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
              See All
            </button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {trendingDestinations.map((destination, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="min-w-[120px] relative rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  }`}>
                    {destination.growth}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h4 className="font-bold text-white text-sm">{destination.name}</h4>
                  <p className="text-white/80 text-xs">{destination.properties}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Hotels */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Popular Hotels
            </h2>
            <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
              See All
            </button>
          </div>
          <div className="space-y-4">
            {popularHotels.map((hotel, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center space-x-4 p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {hotel.name}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {hotel.location}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {hotel.rating}
                      </span>
                    </div>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {hotel.price}
                    </span>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  Book
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore