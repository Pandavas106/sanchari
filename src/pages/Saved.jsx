import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, Sun, Moon, MapPin, Calendar, Users, Filter, Search, Grid, List } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { Navbar, BottomNavbar } from '../components'

const Saved = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [notificationCount, setNotificationCount] = useState(3)

  const filters = ['All', 'Places', 'Hotels', 'Activities', 'Restaurants']

  const savedItems = [
    {
      title: "Santorini, Greece",
      subtitle: "4.8 • Island Paradise",
      price: "From $299",
      tag: "Place",
      tagColor: "bg-blue-500",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      description: "Stunning sunsets and white-washed buildings overlooking the Aegean Sea",
      savedDate: "2 days ago"
    },
    {
      title: "Ocean Paradise Resort",
      subtitle: "4.9 • Luxury Resort", 
      price: "$450/night",
      tag: "Hotel",
      tagColor: "bg-purple-500",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80",
      description: "Overwater bungalows with private pools and world-class spa facilities",
      savedDate: "1 week ago"
    },
    {
      title: "Hot Air Balloon Ride",
      subtitle: "4.7 • Adventure Experience",
      price: "$180",
      tag: "Activity", 
      tagColor: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=400&q=80",
      description: "Breathtaking aerial views of Cappadocia's unique landscape at sunrise",
      savedDate: "3 days ago"
    },
    {
      title: "Kyoto, Japan",
      subtitle: "4.9 • Cultural Heritage",
      price: "From $199",
      tag: "Place",
      tagColor: "bg-blue-500", 
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
      description: "Ancient temples, traditional gardens, and authentic Japanese culture",
      savedDate: "5 days ago"
    },
    {
      title: "Le Bernardin",
      subtitle: "4.8 • Fine Dining",
      price: "$$$",
      tag: "Restaurant",
      tagColor: "bg-pink-500",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80",
      description: "Michelin-starred seafood restaurant with exquisite French cuisine",
      savedDate: "1 day ago"
    },
    {
      title: "Scuba Diving Adventure",
      subtitle: "4.6 • Water Sports",
      price: "$120",
      tag: "Activity",
      tagColor: "bg-yellow-500",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80",
      description: "Explore vibrant coral reefs and marine life in crystal clear waters",
      savedDate: "4 days ago"
    }
  ]

  const filteredItems = savedItems.filter(item => 
    activeFilter === 'All' || item.tag === activeFilter.slice(0, -1)
  )

  const stats = [
    { label: "Total Saved", value: savedItems.length.toString() },
    { label: "Places", value: savedItems.filter(item => item.tag === 'Place').length.toString() },
    { label: "Hotels", value: savedItems.filter(item => item.tag === 'Hotel').length.toString() },
    { label: "Activities", value: savedItems.filter(item => item.tag === 'Activity').length.toString() }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => {}}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={2}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Saved Items
              </h1>
              <div className={`px-3 py-1 rounded-full ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                  {savedItems.length} items
                </span>
              </div>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <input
                  type="text"
                  placeholder="Search saved items..."
                  className={`pl-10 pr-4 py-2 rounded-xl border-0 w-64 ${
                    isDark 
                      ? 'bg-navy/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-navy placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' 
                      ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy')
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' 
                      ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy')
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button className={`p-2 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <Filter className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Filter Tabs */}
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

            {/* Saved Items */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`rounded-2xl overflow-hidden ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer group`}
                    onClick={() => navigate('/trip-details')}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${item.tagColor}`}>
                          {item.tag}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white/80 text-xs mb-1">Saved {item.savedDate}</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
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
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
                    onClick={() => navigate('/trip-details')}
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${item.tagColor}`}>
                            {item.tag}
                          </span>
                          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Saved {item.savedDate}
                          </span>
                        </div>
                        <h3 className={`font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-navy'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {item.subtitle}
                            </span>
                          </div>
                          <span className={`font-bold text-lg ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <button className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                          <Heart className="w-5 h-5 text-red-500 fill-current" />
                        </button>
                        <button className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        } hover:opacity-90 transition-opacity`}>
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Your Collection
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/trip-planner')}
                  className={`w-full p-4 rounded-xl font-semibold text-left ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                >
                  Plan Trip with Saved Items
                </button>
                <button className={`w-full p-4 rounded-xl font-semibold text-left ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:opacity-80 transition-opacity`}>
                  Create Wishlist
                </button>
                <button className={`w-full p-4 rounded-xl font-semibold text-left ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:opacity-80 transition-opacity`}>
                  Share Collection
                </button>
              </div>
            </div>

            {/* Recently Saved */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Recently Saved
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                {savedItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.savedDate}
                      </p>
                    </div>
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  💡 Smart Suggestion
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Based on your saved items, we recommend exploring Mediterranean destinations
                </p>
                <button className={`px-4 py-2 rounded-lg font-semibold ${
                  isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                } hover:opacity-90 transition-opacity`}>
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default Saved