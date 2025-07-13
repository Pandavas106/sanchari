import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Heart, MapPin, Calendar, Users, Filter, Search, Grid, List, Trash2 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useSavedItems } from '../hooks/useUserData'
import { Navbar, BottomNavbar, LoadingSpinner } from '../components'

const Saved = () => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid')
  const [notificationCount, setNotificationCount] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')

  const { savedItems, loading, error, removeFromSaved } = useSavedItems()

  const filters = ['All', 'Places', 'Hotels', 'Activities', 'Restaurants']



  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  // Filter items based on search query and active filter
  const filteredItems = savedItems.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.itemType === activeFilter.slice(0, -1)
    const matchesSearch = !searchQuery || 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const stats = [
    { label: "Total Saved", value: savedItems.length.toString() },
    { label: "Places", value: savedItems.filter(item => item.itemType === 'Place').length.toString() },
    { label: "Hotels", value: savedItems.filter(item => item.itemType === 'Hotel').length.toString() },
    { label: "Activities", value: savedItems.filter(item => item.itemType === 'Activity').length.toString() }
  ]

  if (loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text="Loading saved items..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Error Loading Saved Items</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-semibold bg-yellow-400 text-navy"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

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
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                Saved Items
              </h1>
              <div className="px-3 py-1 rounded-full bg-yellow-400">
                <span className="text-sm font-bold text-navy">
                  {savedItems.length} items
                </span>
              </div>
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden lg:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search saved items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-xl border-0 w-64 bg-navy/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' 
                      ? 'bg-yellow-400 text-navy'
                      : 'bg-navy/50 text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' 
                      ? 'bg-yellow-400 text-navy'
                      : 'bg-navy/50 text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button className="p-2 rounded-xl bg-navy/50 backdrop-blur-sm">
                <Filter className="w-6 h-6 text-yellow-400" />
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
                        ? 'bg-yellow-400 text-navy'
                        : 'bg-navy/50 text-white hover:bg-navy/70'
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
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl overflow-hidden bg-navy/50 backdrop-blur-sm cursor-pointer group"
                    onClick={() => navigate('/trip-details', { state: { trip: item } })}
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-blue-500">
                          {item.itemType || 'Booking'}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromSaved(item.id)
                          }}
                          className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-white" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-white/80 text-xs mb-1">
                          Saved {item.savedDate ? new Date(item.savedDate.toDate()).toLocaleDateString() : 'Recently'}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm mb-3 text-gray-300">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">
                            {item.subtitle}
                          </span>
                        </div>
                        <span className="font-bold text-yellow-400">
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
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 rounded-2xl bg-navy/50 backdrop-blur-sm cursor-pointer"
                    onClick={() => navigate('/trip-details', { state: { trip: item } })}
                  >
                    <div className="flex items-center space-x-6">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-24 h-24 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 rounded-lg text-xs font-bold text-white bg-blue-500">
                            {item.itemType || 'Booking'}
                          </span>
                          <span className="text-xs text-gray-400">
                            Saved {item.savedDate ? new Date(item.savedDate.toDate()).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>
                        <h3 className="font-bold text-xl mb-1 text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm mb-2 text-gray-300">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-300">
                              {item.subtitle}
                            </span>
                          </div>
                          <span className="font-bold text-lg text-yellow-400">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFromSaved(item.id)
                          }}
                          className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-500 hover:text-white" />
                        </button>
                        <button className="px-4 py-2 rounded-lg font-semibold text-sm bg-yellow-400 text-navy hover:opacity-90 transition-opacity">
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
              <h3 className="font-bold text-xl mb-4 text-white">
                Your Collection
              </h3>
              <div className="p-6 rounded-xl bg-navy/50 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-4 text-white">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/trip-planner')}
                  className="w-full p-4 rounded-xl font-semibold text-left bg-yellow-400 text-navy hover:opacity-90 transition-opacity"
                >
                  Plan Trip with Saved Items
                </button>
                <button className="w-full p-4 rounded-xl font-semibold text-left bg-navy/50 text-white hover:opacity-80 transition-opacity">
                  Create Wishlist
                </button>
                <button className="w-full p-4 rounded-xl font-semibold text-left bg-navy/50 text-white hover:opacity-80 transition-opacity">
                  Share Collection
                </button>
              </div>
            </div>

            {/* Recently Saved */}
            <div className="mb-8">
              <h3 className="font-bold text-xl mb-4 text-white">
                Recently Saved
              </h3>
              <div className="p-6 rounded-xl bg-navy/50 backdrop-blur-sm space-y-4">
                {savedItems.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {item.savedDate ? new Date(item.savedDate.toDate()).toLocaleDateString() : 'Recently'}
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