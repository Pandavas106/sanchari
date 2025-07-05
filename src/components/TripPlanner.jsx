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
  Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const TripPlanner = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: '2',
    budget: '',
    interests: []
  })

  const interests = [
    'Adventure', 'Culture', 'Food', 'Nature', 'Relaxation', 
    'Shopping', 'Nightlife', 'History', 'Art', 'Photography'
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

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/ai-trips')
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            Plan Your Trip
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Destination */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
              Where do you want to go?
            </label>
            <div className="relative">
              <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <input
                type="text"
                name="destination"
                placeholder="Enter destination"
                value={formData.destination}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Start Date
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`} />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                    isDark 
                      ? 'bg-navy/50 text-white' 
                      : 'bg-white/50 text-navy'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                End Date
              </label>
              <div className="relative">
                <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`} />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                    isDark 
                      ? 'bg-navy/50 text-white' 
                      : 'bg-white/50 text-navy'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
              Number of Travelers
            </label>
            <div className="relative">
              <Users className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <select
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                  isDark 
                    ? 'bg-navy/50 text-white' 
                    : 'bg-white/50 text-navy'
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3">3 Travelers</option>
                <option value="4">4 Travelers</option>
                <option value="5+">5+ Travelers</option>
              </select>
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
              Budget Range
            </label>
            <div className="relative">
              <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                  isDark 
                    ? 'bg-navy/50 text-white' 
                    : 'bg-white/50 text-navy'
                } focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select budget range</option>
                <option value="budget">Budget ($500 - $1,500)</option>
                <option value="mid">Mid-range ($1,500 - $3,000)</option>
                <option value="luxury">Luxury ($3,000+)</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
              What interests you?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`p-3 rounded-xl border-2 font-semibold transition-all ${
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
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
              isDark 
                ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-all`}
          >
            <Sparkles className="w-5 h-5" />
            <span>Generate AI Trip Plan</span>
          </motion.button>
        </form>
      </div>
    </div>
  )
}

export default TripPlanner