import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, DollarSign, Star, MapPin, Calendar } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters = {} }) => {
  const { isDark } = useTheme()
  const [filters, setFilters] = useState({
    priceRange: currentFilters.priceRange || [0, 5000],
    rating: currentFilters.rating || 0,
    duration: currentFilters.duration || '',
    category: currentFilters.category || '',
    amenities: currentFilters.amenities || [],
    ...currentFilters
  })

  const categories = ['Beach', 'Mountains', 'City', 'Adventure', 'Luxury', 'Culture']
  const durations = ['1-3 days', '4-7 days', '8-14 days', '15+ days']
  const amenities = ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Room Service', 'Parking']

  const handlePriceChange = (value, index) => {
    const newRange = [...filters.priceRange]
    newRange[index] = parseInt(value)
    setFilters({ ...filters, priceRange: newRange })
  }

  const toggleAmenity = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity]
    setFilters({ ...filters, amenities: newAmenities })
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      priceRange: [0, 5000],
      rating: 0,
      duration: '',
      category: '',
      amenities: []
    })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 p-6 border-b border-gray-300 bg-inherit rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Filters
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Filter Content */}
          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className={`font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <DollarSign className="w-5 h-5" />
                <span>Price Range</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Min Price
                    </label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(e.target.value, 0)}
                      className={`w-full p-3 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white' 
                          : 'bg-gray-100 text-navy'
                      } focus:ring-2 focus:ring-blue-500`}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className={`block text-sm mb-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Max Price
                    </label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(e.target.value, 1)}
                      className={`w-full p-3 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white' 
                          : 'bg-gray-100 text-navy'
                      } focus:ring-2 focus:ring-blue-500`}
                      placeholder="5000"
                    />
                  </div>
                </div>
                <div className={`text-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className={`font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <Star className="w-5 h-5" />
                <span>Minimum Rating</span>
              </h3>
              <div className="flex space-x-2">
                {[0, 3, 4, 4.5, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilters({ ...filters, rating })}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      filters.rating === rating
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h3 className={`font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <Calendar className="w-5 h-5" />
                <span>Trip Duration</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setFilters({ ...filters, duration: filters.duration === duration ? '' : duration })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      filters.duration === duration
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <h3 className={`font-semibold mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <MapPin className="w-5 h-5" />
                <span>Category</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilters({ ...filters, category: filters.category === category ? '' : category })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      filters.category === category
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {amenities.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      filters.amenities.includes(amenity)
                        ? (isDark ? 'bg-yellow-400/20 border-yellow-400' : 'bg-blue-600/20 border-blue-600')
                        : (isDark ? 'border-gray-600 hover:border-yellow-400' : 'border-gray-300 hover:border-blue-600')
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-navy'}`}>
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-6 border-t border-gray-300 bg-inherit rounded-b-2xl">
            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className={`flex-1 py-3 rounded-xl font-semibold border-2 ${
                  isDark 
                    ? 'border-gray-600 text-white hover:bg-gray-600' 
                    : 'border-gray-300 text-navy hover:bg-gray-100'
                } transition-colors`}
              >
                Reset
              </button>
              <button
                onClick={handleApply}
                className={`flex-1 py-3 rounded-xl font-semibold ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default FilterModal