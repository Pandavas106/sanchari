import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Bell, Star, Sun, Moon, MapPin, Calendar, Users, ArrowRight } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'

const Explore = () => {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Hotels', 'Activities', 'Restaurants', 'Flights']

  const featuredDestinations = [
    {
      name: "Swiss Alps Luxury",
      location: "Zermatt, Switzerland",
      price: "$450/night",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
      tag: "Featured"
    },
    {
      name: "Maldives Paradise",
      location: "Malé, Maldives",
      price: "$850/night",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      tag: "Luxury"
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
    },
    {
      name: "Bali",
      properties: "1,654 properties",
      growth: "+32%",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Santorini",
      properties: "892 properties",
      growth: "+15%",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80"
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
    },
    {
      name: "Burj Al Arab",
      location: "Dubai, UAE",
      price: "$2,100/night",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Park Hyatt Tokyo",
      location: "Tokyo, Japan",
      price: "$450/night",
      rating: "4.7",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80"
    }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Explore Destinations
            </h1>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 lg:w-96">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <input
                  type="text"
                  placeholder="Search destinations, hotels, activities..."
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-0 ${
                    isDark 
                      ? 'bg-navy/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-navy placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <button className={`p-3 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <Filter className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              </button>
              <button onClick={toggleTheme} className="p-3">
                {isDark ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Chips */}
        <div className="mb-8">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                  activeFilter === filter
                    ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                    : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Featured This Week */}
            <div className="mb-12">
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                Featured This Week
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => navigate('/trip-details')}
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}>
                        {destination.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-white text-xl mb-1">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{destination.rating}</span>
                          <span className="text-white/80 text-sm ml-2">{destination.location}</span>
                        </div>
                        <span className="text-white font-bold">{destination.price}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending Destinations */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Trending Destinations
                </h2>
                <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} hover:opacity-80`}>
                  See All
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {trendingDestinations.map((destination, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
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
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Popular Hotels
                </h2>
                <button className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} hover:opacity-80`}>
                  See All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularHotels.map((hotel, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center space-x-4 p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                        {hotel.name}
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                        {hotel.location}
                      </p>
                      <div className="flex items-center justify-between">
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
                    } hover:opacity-90 transition-opacity`}>
                      Book
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Filters */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Filters
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className={`flex-1 p-2 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className={`flex-1 p-2 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[4, 4.5, 5].map((rating) => (
                      <button
                        key={rating}
                        className={`px-3 py-2 rounded-lg border ${
                          isDark 
                            ? 'border-gray-600 text-white hover:border-yellow-400' 
                            : 'border-gray-300 text-navy hover:border-blue-600'
                        } transition-colors`}
                      >
                        {rating}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Travel Tips
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Best Time to Book
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Book 6-8 weeks in advance for best deals
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Off-Season Travel
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Save up to 40% by traveling off-season
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Group Discounts
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Travel with 4+ people for group rates
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mb-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
                <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Stay Updated
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Get the latest travel deals and destination guides
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-1 p-2 rounded-lg border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white placeholder-gray-400' 
                        : 'bg-white text-navy placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                  <button className={`px-4 py-2 rounded-lg font-semibold ${
                    isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                  } hover:opacity-90 transition-opacity`}>
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore