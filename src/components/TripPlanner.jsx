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
  Plus,
  Minus,
  Check,
  X
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from './Navbar'
import LoadingSpinner from './LoadingSpinner'
import BottomNavbar from './BottomNavbar'

const TripPlanner = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    interests: [],
    travelStyle: '',
    accommodation: ''
  })

  const steps = [
    { title: 'Destination', subtitle: 'Where do you want to go?' },
    { title: 'Dates', subtitle: 'When are you traveling?' },
    { title: 'Travelers', subtitle: 'How many people?' },
    { title: 'Budget', subtitle: 'What\'s your budget?' },
    { title: 'Interests', subtitle: 'What interests you?' },
    { title: 'Style', subtitle: 'Your travel style?' }
  ]

  const interests = [
    { name: 'Adventure', emoji: '🏔️' },
    { name: 'Culture', emoji: '🏛️' },
    { name: 'Food', emoji: '🍽️' },
    { name: 'Nature', emoji: '🌿' },
    { name: 'Relaxation', emoji: '🧘' },
    { name: 'Shopping', emoji: '🛍️' },
    { name: 'Nightlife', emoji: '🌃' },
    { name: 'History', emoji: '📚' },
    { name: 'Art', emoji: '🎨' },
    { name: 'Photography', emoji: '📸' },
    { name: 'Beach', emoji: '🏖️' },
    { name: 'Mountains', emoji: '⛰️' },
    { name: 'City', emoji: '🏙️' },
    { name: 'Wildlife', emoji: '🦁' }
  ]

  const budgetRanges = [
    { value: 'budget', label: 'Budget', range: '$500 - $1,500', icon: '💰', description: 'Affordable options' },
    { value: 'mid', label: 'Mid-range', range: '$1,500 - $3,000', icon: '💎', description: 'Comfortable travel' },
    { value: 'luxury', label: 'Luxury', range: '$3,000+', icon: '👑', description: 'Premium experiences' }
  ]

  const travelStyles = [
    { value: 'backpacker', label: 'Backpacker', icon: '🎒', description: 'Budget-friendly, adventurous' },
    { value: 'comfort', label: 'Comfort', icon: '🏨', description: 'Balanced comfort and value' },
    { value: 'luxury', label: 'Luxury', icon: '✨', description: 'Premium accommodations' },
    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family-friendly options' }
  ]

  const popularDestinations = [
    'Paris, France', 'Tokyo, Japan', 'Bali, Indonesia', 'New York, USA',
    'London, UK', 'Dubai, UAE', 'Maldives', 'Santorini, Greece'
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

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsGenerating(true)
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    navigate('/ai-trips', { state: { generatedTrip: formData } })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return formData.destination.length > 0
      case 1: return formData.startDate && formData.endDate
      case 2: return formData.travelers > 0
      case 3: return formData.budget.length > 0
      case 4: return formData.interests.length > 0
      case 5: return formData.travelStyle.length > 0
      default: return true
    }
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  if (isGenerating) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Creating Your Perfect Trip
            </h2>
            <div className="space-y-2">
              {[
                'Analyzing your preferences...',
                'Finding the best destinations...',
                'Optimizing your itinerary...',
                'Selecting premium accommodations...'
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.5 }}
                  className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {text}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
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
            <div>
              <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Popular Destinations
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {popularDestinations.map((dest) => (
                  <motion.button
                    key={dest}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, destination: dest })}
                    className={`p-3 rounded-lg text-left border-2 transition-all ${
                      formData.destination === dest
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    {dest}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    min={new Date().toISOString().split('T')[0]}
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
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className={`w-full pl-12 pr-4 py-3 rounded-xl border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white' 
                        : 'bg-white/50 text-navy'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
            </div>
            {formData.startDate && formData.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'} border-l-4 ${
                  isDark ? 'border-yellow-400' : 'border-blue-600'
                }`}
              >
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Trip Duration: {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days
                </p>
              </motion.div>
            )}
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateTravelers(-1)}
                disabled={formData.travelers <= 1}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  formData.travelers <= 1 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                } transition-all`}
              >
                <Minus className="w-8 h-8" />
              </motion.button>
              <div className="text-center">
                <motion.div 
                  key={formData.travelers}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-6xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}
                >
                  {formData.travelers}
                </motion.div>
                <div className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {formData.travelers === 1 ? 'Traveler' : 'Travelers'}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => updateTravelers(1)}
                disabled={formData.travelers >= 20}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  formData.travelers >= 20 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                } transition-all`}
              >
                <Plus className="w-8 h-8" />
              </motion.button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[1, 2, 4, 6].map((count) => (
                <motion.button
                  key={count}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, travelers: count })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.travelers === count
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  {count} {count === 1 ? 'person' : 'people'}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {budgetRanges.map((budget, index) => (
                <motion.button
                  key={budget.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, budget: budget.value })}
                  className={`p-6 rounded-xl border-2 transition-all text-center ${
                    formData.budget === budget.value
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  <div className="text-4xl mb-3">{budget.icon}</div>
                  <div className="font-bold text-xl mb-2">{budget.label}</div>
                  <div className="text-sm opacity-80 mb-2">{budget.range}</div>
                  <div className="text-xs opacity-70">{budget.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <p className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Select all that interest you (minimum 3)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {interests.map((interest, index) => (
                <motion.button
                  key={interest.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleInterest(interest.name)}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all text-center relative ${
                    formData.interests.includes(interest.name)
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  {formData.interests.includes(interest.name) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                  <div className="text-2xl mb-2">{interest.emoji}</div>
                  <div className="text-sm">{interest.name}</div>
                </motion.button>
              ))}
            </div>
            <div className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Selected: {formData.interests.length} interests
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {travelStyles.map((style, index) => (
                <motion.button
                  key={style.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, travelStyle: style.value })}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.travelStyle === style.value
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{style.icon}</div>
                    <div>
                      <div className="font-bold text-lg">{style.label}</div>
                      <div className="text-sm opacity-80">{style.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      default:
        return null
    }
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

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Plan Your Dream Trip
              </h1>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
              <div className="text-center mb-8">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}
                >
                  {steps[currentStep].title}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {steps[currentStep].subtitle}
                </motion.p>
              </div>

              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                {currentStep > 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className={`px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 ${
                      isDark 
                        ? 'bg-navy/50 text-yellow-400 hover:bg-navy/70' 
                        : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
                    } transition-all`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                  </motion.button>
                ) : (
                  <div />
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className={`px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                    isStepValid()
                      ? (isDark 
                          ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                          : 'bg-blue-600 text-white hover:bg-blue-700')
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Trip</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Trip Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'} mb-6 sticky top-24`}
            >
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
                {formData.startDate && formData.endDate && (
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Duration:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {Math.ceil((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60 * 24))} days
                    </span>
                  </div>
                )}
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
            </motion.div>

            {/* AI Features */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                AI-Powered Features
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Sparkles, title: 'Smart Recommendations', desc: 'Personalized suggestions based on your preferences', color: 'bg-purple-500' },
                  { icon: Calendar, title: 'Optimized Itinerary', desc: 'Efficient scheduling to maximize your experience', color: 'bg-green-500' },
                  { icon: DollarSign, title: 'Budget Optimization', desc: 'Best value options within your budget range', color: 'bg-blue-500' }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start space-x-3"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className={`w-8 h-8 ${feature.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {feature.title}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default TripPlanner