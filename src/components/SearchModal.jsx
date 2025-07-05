import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, MapPin, Clock, TrendingUp } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const SearchModal = ({ isOpen, onClose, onSearch }) => {
  const { isDark } = useTheme()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [recentSearches] = useState([
    'Maldives', 'Dubai', 'Bali', 'Tokyo', 'Paris'
  ])

  const popularDestinations = [
    { name: 'Santorini, Greece', type: 'Destination', trending: true },
    { name: 'Kyoto, Japan', type: 'Destination', trending: false },
    { name: 'Bali, Indonesia', type: 'Destination', trending: true },
    { name: 'Dubai, UAE', type: 'Destination', trending: false },
    { name: 'Maldives', type: 'Destination', trending: true },
    { name: 'Paris, France', type: 'Destination', trending: false }
  ]

  useEffect(() => {
    if (query.length > 0) {
      const filtered = popularDestinations.filter(dest =>
        dest.name.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (searchQuery) => {
    onSearch(searchQuery)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={`relative w-full max-w-2xl rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="p-6 border-b border-gray-300">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search destinations, hotels, activities..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-0 text-lg ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-gray-100 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
                autoFocus
              />
              <button
                onClick={onClose}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length > 0 ? (
              <div className="p-4">
                <h3 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Search Results
                </h3>
                {suggestions.length > 0 ? (
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(suggestion.name)}
                        className={`w-full p-3 rounded-lg text-left flex items-center space-x-3 ${
                          isDark ? 'hover:bg-navy/50' : 'hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <MapPin className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <div className="flex-1">
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-navy'}`}>
                            {suggestion.name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {suggestion.type}
                          </div>
                        </div>
                        {suggestion.trending && (
                          <div className="flex items-center space-x-1 text-orange-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">Trending</span>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    No results found for "{query}"
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-6">
                {/* Recent Searches */}
                <div>
                  <h3 className={`font-semibold mb-3 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    <Clock className="w-5 h-5" />
                    <span>Recent Searches</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(search)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${
                          isDark 
                            ? 'bg-navy/50 text-white hover:bg-navy/70' 
                            : 'bg-gray-100 text-navy hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {search}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Popular Destinations */}
                <div>
                  <h3 className={`font-semibold mb-3 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    <TrendingUp className="w-5 h-5" />
                    <span>Popular Destinations</span>
                  </h3>
                  <div className="space-y-2">
                    {popularDestinations.slice(0, 4).map((destination, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(destination.name)}
                        className={`w-full p-3 rounded-lg text-left flex items-center space-x-3 ${
                          isDark ? 'hover:bg-navy/50' : 'hover:bg-gray-100'
                        } transition-colors`}
                      >
                        <MapPin className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <div className="flex-1">
                          <div className={`font-medium ${isDark ? 'text-white' : 'text-navy'}`}>
                            {destination.name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {destination.type}
                          </div>
                        </div>
                        {destination.trending && (
                          <div className="flex items-center space-x-1 text-orange-500">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-xs font-medium">Trending</span>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SearchModal