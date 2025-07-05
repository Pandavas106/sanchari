import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Sparkles,
  Sun,
  Moon,
  Plus,
  Minus
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const TripPlanner = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    interests: []
  })

  const interests = [
    'Adventure', 'Culture', 'Food', 'Nature', 'Relaxation', 
    'Shopping', 'Nightlife', 'History', 'Art', 'Photography',
    'Beach', 'Mountains', 'City', 'Wildlife'
  ]

  const budgetRanges = [
    { value: 'budget', label: 'Budget', range: '$500 - $1,500', icon: '💰' },
    { value: 'mid', label: 'Mid-range', range: '$1,500 - $3,000', icon: '💎' },
    { value: 'luxury', label: 'Luxury', range: '$3,000+', icon: '👑' }
  ]

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const toggleInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interest)
        ? formData.interests.filter(i => i !== interest)
        : [...formData.interests, interest]
    })
  }

  const updateTravelers = (increment) => {
    const newCount = formData.travelers + increment
    if (newCount >= 1 && newCount <= 20) {
      setFormData({
        ...formData,
        travelers: newCount
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/ai-trips')
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm lg:hidden`}
              >
                <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
              </button>
              <h1 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Plan Your Dream Trip
              </h1>
            </div>
            <button onClick={toggleTheme} className="p-2">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Destination */}
              <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Where do you want to go?
                </h2>
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                    isDark ? 'text-yellow-400' : 'text-blue-600'
                  }`} />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Enter destination (e.g., Paris, Tokyo, Maldives)"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className={`w-full pl-14 pr-4 py-4 text-lg rounded-xl border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white placeholder-gray-400' 
                        : 'bg-white/50 text-navy placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>

              {/* Dates and Travelers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dates */}
                <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                  <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    When are you traveling?
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Start Date
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-yellow-400' : 'text-blue-600'
                        }`} />
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-0 ${
                            isDark 
                              ? 'bg-navy/50 text-white' 
                              : 'bg-white/50 text-navy'
                          } focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        End Date
                      </label>
                      <div className="relative">
                        <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDark ? 'text-yellow-400' : 'text-blue-600'
                        }`} />
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl border-0 ${
                            isDark 
                              ? 'bg-navy/50 text-white' 
                              : 'bg-white/50 text-navy'
                          } focus:ring-2 focus:ring-blue-500`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travelers */}
                <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                  <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    How many travelers?
                  </h2>
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      type="button"
                      onClick={() => updateTravelers(-1)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      } hover:opacity-80 transition-opacity`}
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {formData.travelers}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {formData.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateTravelers(1)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      } hover:opacity-80 transition-opacity`}
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  What's your budget range?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {budgetRanges.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: budget.value })}
                      className={`p-6 rounded-xl border-2 transition-all text-center ${
                        formData.budget === budget.value
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                          : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                      }`}
                    >
                      <div className="text-3xl mb-2">{budget.icon}</div>
                      <div className="font-bold text-lg mb-1">{budget.label}</div>
                      <div className="text-sm opacity-80">{budget.range}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  What interests you?
                </h2>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Select all that apply to help us personalize your trip
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all text-center ${
                        formData.interests.includes(interest)
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                          : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-6 rounded-xl font-semibold text-xl flex items-center justify-center space-x-3 ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-all`}
              >
                <Sparkles className="w-6 h-6" />
                <span>Generate AI Trip Plan</span>
              </motion.button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Trip Summary */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'} mb-6 sticky top-24`}>
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Trip Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Destination:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {formData.destination || 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Travelers:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {formData.travelers} {formData.travelers === 1 ? 'person' : 'people'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Budget:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {formData.budget ? budgetRanges.find(b => b.value === formData.budget)?.label : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Interests:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {formData.interests.length} selected
                  </span>
                </div>
              </div>
              
              {formData.interests.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <div className="flex flex-wrap gap-2">
                    {formData.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        }`}
                      >
                        {interest}
                      </span>
                    ))}
                    {formData.interests.length > 3 && (
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        isDark ? 'bg-gray-600 text-white' : 'bg-gray-300 text-navy'
                      }`}>
                        +{formData.interests.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* AI Features */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI-Powered Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Smart Recommendations
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Personalized suggestions based on your preferences
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Optimized Itinerary
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Efficient scheduling to maximize your experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Budget Optimization
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Best value options within your budget range
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripPlanner