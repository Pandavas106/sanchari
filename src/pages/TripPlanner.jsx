import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight,
  DollarSign,
  Calendar, 
  Users, 
  MapPin,
  Check,
  Sparkles
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, LoadingSpinner } from '../components'
import { useNavigate } from 'react-router-dom';
import { generateGeminiTrip } from '../utils/geminiTripPlanner';
import { useUserBookings } from '../hooks/useUserData'
import { useAuth } from '../contexts/AuthContext'

const tripTypes = [
  { value: 0, label: 'Adventure', icon: '🏔️' },
  { value: 1, label: 'Relaxation', icon: '🧘' },
  { value: 2, label: 'Spiritual', icon: '🕉️' },
]
const companionTypes = [
  { value: 0, label: 'Solo', icon: '👤' },
  { value: 1, label: 'Couple', icon: '💕' },
  { value: 2, label: 'Family', icon: '👨‍👩‍👧‍👦' },
]
const budgetTypes = [
  { value: 0, label: 'Budget', icon: '💰', range: '₹15,000 - ₹50,000' },
  { value: 1, label: 'Comfort', icon: '💎', range: '₹50,000 - ₹1,50,000' },
  { value: 2, label: 'Luxury', icon: '👑', range: '₹1,50,000+' },
]

const sampleTrips = [
  {
    name: 'Himalayan Adventure',
    type: 0, // Adventure
    companion: 0, // Solo
    days: 7,
    minBudget: 30000,
    maxBudget: 60000,
    location: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Goa Beach Retreat',
    type: 1, // Relaxation
    companion: 1, // Couple
    days: 5,
    minBudget: 20000,
    maxBudget: 50000,
    location: 'Goa',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Spiritual Varanasi',
    type: 2, // Spiritual
    companion: 2, // Family
    days: 4,
    minBudget: 15000,
    maxBudget: 40000,
    location: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kerala Backwaters',
    type: 1, // Relaxation
    companion: 2, // Family
    days: 6,
    minBudget: 35000,
    maxBudget: 70000,
    location: 'Kerala',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Rishikesh Solo Adventure',
    type: 0, // Adventure
    companion: 0, // Solo
    days: 5,
    minBudget: 18000,
    maxBudget: 35000,
    location: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Luxury Udaipur',
    type: 1, // Relaxation
    companion: 1, // Couple
    days: 3,
    minBudget: 60000,
    maxBudget: 120000,
    location: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bangalore City Break',
    type: 0, // Adventure
    companion: 0, // Solo
    days: 2,
    minBudget: 8000,
    maxBudget: 20000,
    location: 'Bangalore',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
]

const steps = [
  { id: 'budget', title: 'Budget', subtitle: 'Set your budget range', icon: DollarSign },
  { id: 'duration', title: 'Duration', subtitle: 'How many days?', icon: Calendar },
  { id: 'type', title: 'Trip Type', subtitle: 'What kind of trip?', icon: Sparkles },
  { id: 'companion', title: 'Companion', subtitle: 'Who\'s traveling?', icon: Users },
  { id: 'location', title: 'Location', subtitle: 'Where do you want to go?', icon: MapPin },
]

const TripPlanner = () => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0)
  const [budget, setBudget] = useState(50000)
  const [budgetType, setBudgetType] = useState(1)
  const [selectedDays, setSelectedDays] = useState(5)
  const [selectedType, setSelectedType] = useState(0)
  const [selectedCompanion, setSelectedCompanion] = useState(0)
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [autoLocation, setAutoLocation] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('Bangalore')
  const [suggestedTrips, setSuggestedTrips] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [showRecentBooking, setShowRecentBooking] = useState(false)

  // Fetch the most recent booking
  const { bookings, loading: bookingsLoading } = useUserBookings()
  const recentBooking = bookings && bookings.length > 0 ? bookings[0] : null

  useEffect(() => {
    if (autoLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCurrentLocation('Your Location')
      })
    }
  }, [autoLocation])

  // Show recent booking if available
  useEffect(() => {
    if (recentBooking && !bookingsLoading) {
      setShowRecentBooking(true)
    }
  }, [recentBooking, bookingsLoading])

  function generateTripSuggestions() {
    return sampleTrips.filter(trip =>
      trip.type === selectedType &&
      trip.companion === selectedCompanion &&
      trip.days <= selectedDays &&
      trip.minBudget <= budget &&
      trip.maxBudget >= budget
    )
  }

  const nextStep = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
      handleGenerate()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
      setCurrentStep(stepIndex)
  }

  const handleRegenerate = () => {
    setShowRecentBooking(false)
    setCurrentStep(0)
    setBudget(50000)
    setBudgetType(1)
    setSelectedDays(5)
    setSelectedType(0)
    setSelectedCompanion(0)
    setAdults(1)
    setChildren(0)
    setAutoLocation(false)
    setCurrentLocation('Bangalore')
    setError(null)
  }

  async function handleGenerate() {
    setIsGenerating(true)
    setError(null)
    const data = {
      budget,
      budgetType,
      selectedDays,
      selectedType,
      selectedCompanion,
      adults,
      children,
      autoLocation,
      currentLocation,
    }
    
    console.log('🚀 Starting trip generation with data:', data);
    
    try {
      // Use Gemini utility
      const { trip, included } = await generateGeminiTrip(data);
      console.log('✅ Trip generated successfully:', { trip, included });
      navigate('/trip-details', { state: { trip, included } });
    } catch (e) {
      console.error('❌ Error generating trip:', e);
      setError(e.message || 'Error generating trip. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Budget
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className={`block text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>What's your budget?</label>
              <input
                type="number"
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                min={0}
                className={`w-full p-4 text-xl rounded-xl border-2 ${
                  isDark 
                    ? 'border-gray-600 bg-navy/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                placeholder="50000"
              />
            </div>

            <div>
              <label className={`block text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>Budget Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {budgetTypes.map((type) => (
                  <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBudgetType(type.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      budgetType === type.value
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-gray-700 hover:border-blue-500')
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <h3 className="font-bold text-lg mb-1">{type.label}</h3>
                    <p className="text-sm opacity-80">{type.range}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 1: // Duration
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
              <div>
              <label className={`block text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>How many days?</label>
                  <input
                type="number"
                value={selectedDays}
                onChange={e => setSelectedDays(Number(e.target.value))}
                min={1}
                max={30}
                className={`w-full p-4 text-xl rounded-xl border-2 ${
                      isDark 
                    ? 'border-gray-600 bg-navy/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
              />
              </div>
              
            <div className="grid grid-cols-3 gap-4">
              {[3, 5, 7, 10, 14, 21].map((days) => (
                  <motion.button
                  key={days}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDays(days)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                    selectedDays === days
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-gray-700 hover:border-blue-500')
                      }`}
                    >
                  <div className="text-2xl font-bold">{days}</div>
                  <div className="text-sm">days</div>
                    </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 2: // Trip Type
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
                  <div>
              <label className="block text-lg font-semibold mb-4">What type of trip?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tripTypes.map((type) => (
                    <motion.button
                    key={type.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      selectedType === type.value
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-gray-700 hover:border-blue-500')
                    }`}
                  >
                    <div className="text-4xl mb-2">{type.icon}</div>
                    <h3 className="font-bold text-lg">{type.label}</h3>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 3: // Companion
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-semibold mb-4">Who's traveling?</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {companionTypes.map((companion) => (
                <motion.button
                    key={companion.value}
                    whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCompanion(companion.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-center ${
                      selectedCompanion === companion.value
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-gray-700 hover:border-blue-500')
                    }`}
                  >
                    <div className="text-4xl mb-2">{companion.icon}</div>
                    <h3 className="font-bold text-lg">{companion.label}</h3>
                </motion.button>
              ))}
              </div>
            </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                <label className="block font-semibold mb-2">Adults</label>
                    <input
                      type="number"
                  value={adults}
                  onChange={e => setAdults(Number(e.target.value))}
                  min={1}
                  className={`w-full p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-navy/50 text-white' : 'border-gray-300'}`}
                    />
                  </div>
                  <div>
                <label className="block font-semibold mb-2">Children</label>
                    <input
                      type="number"
                  value={children}
                  onChange={e => setChildren(Number(e.target.value))}
                  min={0}
                  className={`w-full p-3 rounded-lg border ${isDark ? 'border-gray-600 bg-navy/50 text-white' : 'border-gray-300'}`}
                    />
                  </div>
            </div>
          </motion.div>
        )

      case 4: // Destination
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className={`block text-lg font-semibold mb-4 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Destination</label>
              <input
                type="text"
                value={currentLocation}
                onChange={e => setCurrentLocation(e.target.value)}
                className={`w-full p-4 text-xl rounded-xl border-2 ${isDark ? 'border-gray-600 bg-navy/50 text-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20' : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'}`}
                placeholder="Where do you want to go? (e.g., Paris, Tokyo, Goa)"
              />
              </div>
                      </motion.div>
        )

      default:
        return null
    }
  }

  if (isGenerating) {
        return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto px-6">
          <LoadingSpinner size="xl" />
          <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>🤖 AI is crafting your perfect trip</h2>
            <div className="space-y-3">
              {[ '🔍 Analyzing your preferences...', '🌍 Finding the best destinations...', '📅 Optimizing your itinerary...', '✨ Adding special experiences...' ].map((text, index) => (
              <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.5 }}
                  className={`text-left ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
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

  if (bookingsLoading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center max-w-md mx-auto px-6">
          <LoadingSpinner size="xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>Loading your recent trips...</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Checking for your latest AI-generated trip plans</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col ${bgGradient}`}>
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb & Hero/Header */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-8 pb-2">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>AI Trip Planner</h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Plan your next adventure with our AI-powered trip planner. Fill in your preferences and let us do the magic!</p>
        </div>
      </div>

      {/* Recent Booking Display */}
      {showRecentBooking && recentBooking && (
        <div className="max-w-5xl mx-auto w-full px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${isDark ? 'bg-navy/70' : 'bg-white/90'} rounded-2xl shadow p-8`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>
                  Your Recent Trip
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Here's your latest AI-generated trip plan
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRegenerate}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span>Plan New Trip</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trip Image */}
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={recentBooking.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'}
                  alt={recentBooking.tripName || recentBooking.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    {recentBooking.tripName || recentBooking.title}
                  </h3>
                  <p className="text-sm opacity-90">{recentBooking.location}</p>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-6">
                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>Trip Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-navy/50' : 'bg-gray-50'}`}>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Duration</div>
                      <div className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>
                        {recentBooking.days} days
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-navy/50' : 'bg-gray-50'}`}>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Price</div>
                      <div className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>
                        {recentBooking.price}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-navy/50' : 'bg-gray-50'}`}>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Rating</div>
                      <div className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>
                        {recentBooking.rating || 'N/A'}
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-navy/50' : 'bg-gray-50'}`}>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status</div>
                      <div className={`font-semibold ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {recentBooking.status || 'Booked'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentBooking.highlights?.slice(0, 4).map((highlight, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/trip-details', { state: { trip: recentBooking } })}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                      isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRegenerate}
                    className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all ${
                      isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Plan New Trip
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
          
      {/* Main Content: Two-column layout */}
      {!showRecentBooking && (
        <div className="max-w-5xl mx-auto w-full px-6 pb-16 flex flex-col md:flex-row gap-12">
        {/* Main Column (Form) */}
        <div className="w-full md:w-2/3">
          {/* Progress Bar */}
          <div className="mb-8">
          <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}
            />
            </div>
          </div>
          
          {/* Step Indicators (horizontal, web-like) */}
          <div className="flex justify-between mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              return (
                <motion.button
                  key={step.id}
                  onClick={() => goToStep(index)}
                  className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all min-w-0 ${isCurrent ? (isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20') : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : isCurrent ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white') : (isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500')}`}>{isCompleted ? (<Check className="w-5 h-5" />) : (<Icon className="w-5 h-5" />)}</div>
                  <span className={`text-xs font-medium text-center ${isCurrent ? (isDark ? 'text-yellow-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>{step.title}</span>
                </motion.button>
              )
            })}
          </div>

          {/* Main Form Card */}
          <div className={`${isDark ? 'bg-navy/70' : 'bg-white/90'} rounded-2xl shadow p-10 mb-10`}>
            <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{steps[currentStep].title}</h2>
            <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{steps[currentStep].subtitle}</p>
              <div className="mb-8">
              {renderStepContent()}
            </div>
            <hr className={`${isDark ? 'border-gray-700' : 'border-gray-200'} my-8`} />
              {/* Navigation */}
            <div className="flex justify-between">
                {currentStep > 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${isDark ? 'bg-navy/50 text-yellow-400 hover:bg-navy/70' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <ArrowLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>
              ) : (<div />)}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {currentStep === steps.length - 1 ? (<><Sparkles className="w-5 h-5" /><span>Generate My Trip</span></>) : (<><span>Continue</span><ArrowRight className="w-5 h-5" /></>)}
                </motion.button>
              </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`mt-6 text-center font-semibold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{error}</div>
          )}
                  </div>
                  
        {/* Sidebar */}
        <aside className="w-full md:w-1/3 flex flex-col gap-8">
          {/* Trip Summary Card */}
          <div className={`${isDark ? 'bg-navy/80 text-white' : 'bg-blue-100'} rounded-2xl shadow p-8 mb-4`}>
            <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Trip Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Budget:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>₹{budget.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Type:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{budgetTypes.find(b => b.value === budgetType)?.label}</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Duration:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{selectedDays} days</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Trip Type:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{tripTypes.find(t => t.value === selectedType)?.label}</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Companion:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{companionTypes.find(c => c.value === selectedCompanion)?.label}</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Travelers:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{adults + children} people</span></div>
              <div className="flex justify-between"><span className={isDark ? 'text-gray-300' : 'text-gray-700'}>Destination:</span><span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{currentLocation}</span></div>
                  </div>
                  </div>
                  
          {/* How it works/info card */}
          <div className={`${isDark ? 'bg-navy/70 text-white' : 'bg-white/90'} rounded-2xl shadow p-6 mb-4`}>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>How it works</h4>
            <ul className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <li>1. Fill in your preferences step by step.</li>
              <li>2. Our AI analyzes your input and finds the best options.</li>
              <li>3. Get a personalized trip plan instantly!</li>
            </ul>
                </div>
                
          {/* Help/Contact card */}
          <div className={`${isDark ? 'bg-navy/70 text-white' : 'bg-white/90'} rounded-2xl shadow p-6`}>
            <h4 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Need Help?</h4>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Contact our support team for assistance or questions about planning your trip.</p>
            <a href="mailto:help@sanchari.com" className={`${isDark ? 'text-yellow-400' : 'text-blue-600'} font-semibold hover:underline`}>help@sanchari.com</a>
                    </div>
        </aside>
        </div>
      )}

      {/* Footer */}
      <footer className={`${isDark ? 'bg-navy text-yellow-400' : 'bg-navy text-white'} w-full py-8 mt-auto`}>
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">&copy; {new Date().getFullYear()} Sanchari. All rights reserved.</div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
                    </div>
                  </div>
      </footer>
    </div>
  )
}

export default TripPlanner