import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  X,
  ChevronRight,
  ChevronLeft,
  Search,
  Star,
  Clock,
  Plane,
  Hotel,
  Camera,
  Utensils,
  Mountain,
  Waves,
  Building,
  TreePine,
  Sun,
  Snowflake,
  Leaf,
  Flower,
  AlertCircle,
  Info,
  Save,
  Share2,
  RefreshCw
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'
import LoadingSpinner from '../components/LoadingSpinner'
import BottomNavbar from '../components/BottomNavbar'

const TripPlanner = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [errors, setErrors] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false)
  const [savedDrafts, setSavedDrafts] = useState([])
  
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: {
      adults: 2,
      children: 0,
      infants: 0
    },
    budget: '',
    budgetRange: [1000, 5000],
    interests: [],
    travelStyle: '',
    accommodation: '',
    transportation: '',
    activities: [],
    dietaryRestrictions: [],
    accessibility: [],
    season: '',
    flexibility: 'exact'
  })

  const steps = [
    { 
      id: 'destination', 
      title: 'Where to?', 
      subtitle: 'Choose your dream destination',
      icon: MapPin,
      required: true
    },
    { 
      id: 'dates', 
      title: 'When?', 
      subtitle: 'Select your travel dates',
      icon: Calendar,
      required: true
    },
    { 
      id: 'travelers', 
      title: 'Who\'s going?', 
      subtitle: 'Tell us about your travel group',
      icon: Users,
      required: true
    },
    { 
      id: 'budget', 
      title: 'Budget', 
      subtitle: 'What\'s your budget range?',
      icon: DollarSign,
      required: true
    },
    { 
      id: 'interests', 
      title: 'Interests', 
      subtitle: 'What excites you most?',
      icon: Star,
      required: true
    },
    { 
      id: 'style', 
      title: 'Travel Style', 
      subtitle: 'How do you like to travel?',
      icon: Sparkles,
      required: true
    },
    { 
      id: 'preferences', 
      title: 'Preferences', 
      subtitle: 'Any special requirements?',
      icon: Info,
      required: false
    }
  ]

  const destinations = [
    { name: 'Paris, France', type: 'City', season: 'spring', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=200&q=80' },
    { name: 'Tokyo, Japan', type: 'City', season: 'spring', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=200&q=80' },
    { name: 'Bali, Indonesia', type: 'Beach', season: 'summer', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=200&q=80' },
    { name: 'New York, USA', type: 'City', season: 'fall', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=200&q=80' },
    { name: 'London, UK', type: 'City', season: 'summer', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=200&q=80' },
    { name: 'Dubai, UAE', type: 'City', season: 'winter', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=200&q=80' },
    { name: 'Maldives', type: 'Beach', season: 'winter', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80' },
    { name: 'Santorini, Greece', type: 'Beach', season: 'summer', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=200&q=80' },
    { name: 'Swiss Alps, Switzerland', type: 'Mountain', season: 'winter', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=200&q=80' },
    { name: 'Kerala, India', type: 'Nature', season: 'winter', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=200&q=80' }
  ]

  const interests = [
    { name: 'Adventure', emoji: '🏔️', icon: Mountain, color: 'from-orange-500 to-red-500' },
    { name: 'Culture', emoji: '🏛️', icon: Building, color: 'from-purple-500 to-indigo-500' },
    { name: 'Food', emoji: '🍽️', icon: Utensils, color: 'from-yellow-500 to-orange-500' },
    { name: 'Nature', emoji: '🌿', icon: TreePine, color: 'from-green-500 to-emerald-500' },
    { name: 'Relaxation', emoji: '🧘', icon: Sun, color: 'from-blue-500 to-cyan-500' },
    { name: 'Shopping', emoji: '🛍️', icon: Building, color: 'from-pink-500 to-purple-500' },
    { name: 'Nightlife', emoji: '🌃', icon: Building, color: 'from-indigo-500 to-purple-500' },
    { name: 'History', emoji: '📚', icon: Building, color: 'from-amber-500 to-orange-500' },
    { name: 'Art', emoji: '🎨', icon: Building, color: 'from-rose-500 to-pink-500' },
    { name: 'Photography', emoji: '📸', icon: Camera, color: 'from-gray-500 to-slate-500' },
    { name: 'Beach', emoji: '🏖️', icon: Waves, color: 'from-cyan-500 to-blue-500' },
    { name: 'Mountains', emoji: '⛰️', icon: Mountain, color: 'from-slate-500 to-gray-500' },
    { name: 'Wildlife', emoji: '🦁', icon: TreePine, color: 'from-green-600 to-emerald-600' },
    { name: 'Wellness', emoji: '💆', icon: Sun, color: 'from-teal-500 to-cyan-500' }
  ]

  const budgetRanges = [
    { 
      value: 'budget', 
      label: 'Budget Friendly', 
      range: '₹15,000 - ₹50,000', 
      icon: '💰', 
      description: 'Affordable options with great value',
      min: 15000,
      max: 50000
    },
    { 
      value: 'mid', 
      label: 'Mid-Range', 
      range: '₹50,000 - ₹1,50,000', 
      icon: '💎', 
      description: 'Comfortable travel with good amenities',
      min: 50000,
      max: 150000
    },
    { 
      value: 'luxury', 
      label: 'Luxury', 
      range: '₹1,50,000+', 
      icon: '👑', 
      description: 'Premium experiences and accommodations',
      min: 150000,
      max: 500000
    },
    { 
      value: 'custom', 
      label: 'Custom Range', 
      range: 'Set your own', 
      icon: '⚙️', 
      description: 'Define your specific budget range',
      min: 0,
      max: 1000000
    }
  ]

  const travelStyles = [
    { 
      value: 'backpacker', 
      label: 'Backpacker', 
      icon: '🎒', 
      description: 'Budget-friendly, adventurous travel',
      features: ['Hostels', 'Public transport', 'Local experiences']
    },
    { 
      value: 'comfort', 
      label: 'Comfort', 
      icon: '🏨', 
      description: 'Balanced comfort and value',
      features: ['3-4 star hotels', 'Mix of transport', 'Guided tours']
    },
    { 
      value: 'luxury', 
      label: 'Luxury', 
      icon: '✨', 
      description: 'Premium accommodations and services',
      features: ['5-star hotels', 'Private transport', 'Exclusive experiences']
    },
    { 
      value: 'family', 
      label: 'Family', 
      icon: '👨‍👩‍👧‍👦', 
      description: 'Family-friendly options and activities',
      features: ['Family rooms', 'Kid-friendly activities', 'Safe destinations']
    },
    { 
      value: 'business', 
      label: 'Business', 
      icon: '💼', 
      description: 'Efficient travel for work',
      features: ['Business hotels', 'Fast transport', 'Meeting facilities']
    },
    { 
      value: 'romantic', 
      label: 'Romantic', 
      icon: '💕', 
      description: 'Perfect for couples',
      features: ['Romantic settings', 'Couple activities', 'Privacy']
    }
  ]

  const accommodationTypes = [
    { value: 'hotel', label: 'Hotels', icon: Hotel },
    { value: 'resort', label: 'Resorts', icon: Building },
    { value: 'villa', label: 'Villas', icon: Building },
    { value: 'apartment', label: 'Apartments', icon: Building },
    { value: 'hostel', label: 'Hostels', icon: Building },
    { value: 'boutique', label: 'Boutique', icon: Building }
  ]

  const transportationTypes = [
    { value: 'flight', label: 'Flights', icon: Plane },
    { value: 'train', label: 'Trains', icon: Building },
    { value: 'bus', label: 'Buses', icon: Building },
    { value: 'car', label: 'Car Rental', icon: Building },
    { value: 'cruise', label: 'Cruise', icon: Waves }
  ]

  const seasons = [
    { value: 'spring', label: 'Spring', icon: Flower, months: 'Mar-May' },
    { value: 'summer', label: 'Summer', icon: Sun, months: 'Jun-Aug' },
    { value: 'fall', label: 'Fall', icon: Leaf, months: 'Sep-Nov' },
    { value: 'winter', label: 'Winter', icon: Snowflake, months: 'Dec-Feb' }
  ]

  const flexibilityOptions = [
    { value: 'exact', label: 'Exact Dates', description: 'I need to travel on these specific dates' },
    { value: 'flexible', label: 'Flexible (±3 days)', description: 'I can adjust my dates by a few days' },
    { value: 'very_flexible', label: 'Very Flexible (±1 week)', description: 'I have flexibility with my travel dates' }
  ]

  // Validation functions
  const validateStep = (stepIndex) => {
    const step = steps[stepIndex]
    const newErrors = {}

    switch (step.id) {
      case 'destination':
        if (!formData.destination.trim()) {
          newErrors.destination = 'Please select a destination'
        }
        break
      case 'dates':
        if (!formData.startDate) {
          newErrors.startDate = 'Please select a start date'
        }
        if (!formData.endDate) {
          newErrors.endDate = 'Please select an end date'
        }
        if (formData.startDate && formData.endDate) {
          const start = new Date(formData.startDate)
          const end = new Date(formData.endDate)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          if (start < today) {
            newErrors.startDate = 'Start date cannot be in the past'
          }
          if (end <= start) {
            newErrors.endDate = 'End date must be after start date'
          }
          if (end - start > 365 * 24 * 60 * 60 * 1000) {
            newErrors.endDate = 'Trip duration cannot exceed 1 year'
          }
        }
        break
      case 'travelers':
        const totalTravelers = formData.travelers.adults + formData.travelers.children + formData.travelers.infants
        if (totalTravelers === 0) {
          newErrors.travelers = 'At least one traveler is required'
        }
        if (formData.travelers.adults === 0 && (formData.travelers.children > 0 || formData.travelers.infants > 0)) {
          newErrors.travelers = 'At least one adult is required when traveling with children or infants'
        }
        break
      case 'budget':
        if (!formData.budget) {
          newErrors.budget = 'Please select a budget range'
        }
        break
      case 'interests':
        if (formData.interests.length === 0) {
          newErrors.interests = 'Please select at least one interest'
        }
        break
      case 'style':
        if (!formData.travelStyle) {
          newErrors.travelStyle = 'Please select a travel style'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleTravelersChange = (type, increment) => {
    const newCount = Math.max(0, formData.travelers[type] + increment)
    const maxCount = type === 'adults' ? 20 : type === 'children' ? 10 : 5
    
    if (newCount <= maxCount) {
      setFormData(prev => ({
        ...prev,
        travelers: {
          ...prev.travelers,
          [type]: newCount
        }
      }))
    }
  }

  const toggleInterest = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter(i => i !== interest)
      : [...formData.interests, interest]
    
    handleInputChange('interests', newInterests)
  }

  const toggleArrayItem = (field, item) => {
    const currentArray = formData[field] || []
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item]
    
    handleInputChange(field, newArray)
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex) => {
    // Allow going to previous steps or next step if current is valid
    if (stepIndex <= currentStep || validateStep(currentStep)) {
      setCurrentStep(stepIndex)
    }
  }

  const handleSubmit = async () => {
    setIsGenerating(true)
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 3000))
      navigate('/ai-trips', { state: { generatedTrip: formData } })
    } catch (error) {
      console.error('Error generating trip:', error)
      setIsGenerating(false)
    }
  }

  const saveDraft = () => {
    const draft = {
      id: Date.now(),
      name: `${formData.destination || 'Untitled'} Trip`,
      data: formData,
      createdAt: new Date().toISOString()
    }
    setSavedDrafts(prev => [draft, ...prev.slice(0, 4)]) // Keep only 5 drafts
  }

  const loadDraft = (draft) => {
    setFormData(draft.data)
    setCurrentStep(0)
  }

  const resetForm = () => {
    setFormData({
      destination: '',
      startDate: '',
      endDate: '',
      travelers: { adults: 2, children: 0, infants: 0 },
      budget: '',
      budgetRange: [1000, 5000],
      interests: [],
      travelStyle: '',
      accommodation: '',
      transportation: '',
      activities: [],
      dietaryRestrictions: [],
      accessibility: [],
      season: '',
      flexibility: 'exact'
    })
    setCurrentStep(0)
    setErrors({})
  }

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTripDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  const getTotalTravelers = () => {
    return formData.travelers.adults + formData.travelers.children + formData.travelers.infants
  }

  const getEstimatedBudget = () => {
    const duration = getTripDuration()
    const travelers = getTotalTravelers()
    const budgetRange = budgetRanges.find(b => b.value === formData.budget)
    
    if (budgetRange && duration && travelers) {
      const baseAmount = (budgetRange.min + budgetRange.max) / 2
      const totalEstimate = baseAmount * travelers
      return totalEstimate.toLocaleString('en-IN')
    }
    return null
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

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
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              🤖 AI is crafting your perfect trip
            </h2>
            <div className="space-y-3">
              {[
                '🔍 Analyzing your preferences...',
                '🌍 Finding the best destinations...',
                '📅 Optimizing your itinerary...',
                '🏨 Selecting premium accommodations...',
                '✨ Adding special experiences...'
              ].map((text, index) => (
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                This usually takes 30-60 seconds. We're ensuring every detail is perfect for your {formData.destination} adventure!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.id) {
      case 'destination':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <input
                type="text"
                placeholder="Search destinations (e.g., Paris, Tokyo, Maldives)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowDestinationSuggestions(true)}
                className={`w-full pl-14 pr-4 py-4 text-lg rounded-xl border-2 ${
                  errors.destination 
                    ? 'border-red-500' 
                    : (isDark ? 'border-gray-600' : 'border-gray-300')
                } ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500 transition-all`}
              />
              {errors.destination && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.destination}</span>
                </motion.p>
              )}
            </div>

            {/* Destination Grid */}
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                {searchQuery ? 'Search Results' : 'Popular Destinations'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(searchQuery ? filteredDestinations : destinations).map((dest, index) => (
                  <motion.button
                    key={dest.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      handleInputChange('destination', dest.name)
                      setSearchQuery(dest.name)
                    }}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left overflow-hidden group ${
                      formData.destination === dest.name
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold">{dest.name}</h5>
                        <p className="text-sm opacity-80">{dest.type}</p>
                      </div>
                      {formData.destination === dest.name && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Destination */}
            <div className={`p-4 rounded-xl border-2 border-dashed ${
              isDark ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                Don't see your destination? Type it in the search box above.
              </p>
            </div>
          </motion.div>
        )

      case 'dates':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Date Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-yellow-400' : 'text-blue-600'
                  }`} />
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg ${
                      errors.startDate 
                        ? 'border-red-500' 
                        : (isDark ? 'border-gray-600' : 'border-gray-300')
                    } ${
                      isDark 
                        ? 'bg-navy/50 text-white' 
                        : 'bg-white/50 text-navy'
                    } focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                </div>
                {errors.startDate && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.startDate}</span>
                  </motion.p>
                )}
              </div>
              
              <div>
                <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Return Date
                </label>
                <div className="relative">
                  <Calendar className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-yellow-400' : 'text-blue-600'
                  }`} />
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 text-lg ${
                      errors.endDate 
                        ? 'border-red-500' 
                        : (isDark ? 'border-gray-600' : 'border-gray-300')
                    } ${
                      isDark 
                        ? 'bg-navy/50 text-white' 
                        : 'bg-white/50 text-navy'
                    } focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                </div>
                {errors.endDate && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center space-x-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.endDate}</span>
                  </motion.p>
                )}
              </div>
            </div>

            {/* Trip Duration Display */}
            {formData.startDate && formData.endDate && !errors.startDate && !errors.endDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl ${isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'} border-l-4 ${
                  isDark ? 'border-yellow-400' : 'border-blue-600'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Clock className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    Trip Duration: {getTripDuration()} {getTripDuration() === 1 ? 'day' : 'days'}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Flexibility Options */}
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Date Flexibility
              </h4>
              <div className="space-y-3">
                {flexibilityOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleInputChange('flexibility', option.value)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      formData.flexibility === option.value
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-semibold">{option.label}</h5>
                        <p className="text-sm opacity-80">{option.description}</p>
                      </div>
                      {formData.flexibility === option.value && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Season Preference */}
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Preferred Season (Optional)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {seasons.map((season) => {
                  const Icon = season.icon
                  return (
                    <motion.button
                      key={season.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('season', 
                        formData.season === season.value ? '' : season.value
                      )}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.season === season.value
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                          : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-semibold text-sm">{season.label}</div>
                      <div className="text-xs opacity-80">{season.months}</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )

      case 'travelers':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Traveler Counters */}
            <div className="space-y-6">
              {/* Adults */}
              <div className={`p-6 rounded-xl border-2 ${
                isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                      Adults
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Age 18+
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('adults', -1)}
                      disabled={formData.travelers.adults <= 0}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.adults <= 0 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className={`text-2xl font-bold w-12 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
                      {formData.travelers.adults}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('adults', 1)}
                      disabled={formData.travelers.adults >= 20}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.adults >= 20 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Children */}
              <div className={`p-6 rounded-xl border-2 ${
                isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                      Children
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Age 2-17
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('children', -1)}
                      disabled={formData.travelers.children <= 0}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.children <= 0 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className={`text-2xl font-bold w-12 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
                      {formData.travelers.children}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('children', 1)}
                      disabled={formData.travelers.children >= 10}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.children >= 10 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Infants */}
              <div className={`p-6 rounded-xl border-2 ${
                isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                      Infants
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Under 2 years
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('infants', -1)}
                      disabled={formData.travelers.infants <= 0}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.infants <= 0 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Minus className="w-5 h-5" />
                    </motion.button>
                    <span className={`text-2xl font-bold w-12 text-center ${isDark ? 'text-white' : 'text-navy'}`}>
                      {formData.travelers.infants}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleTravelersChange('infants', 1)}
                      disabled={formData.travelers.infants >= 5}
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        formData.travelers.infants >= 5 
                          ? 'bg-gray-300 cursor-not-allowed' 
                          : (isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700')
                      } transition-all`}
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'} border-l-4 ${
                isDark ? 'border-yellow-400' : 'border-blue-600'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Total Travelers: {getTotalTravelers()} {getTotalTravelers() === 1 ? 'person' : 'people'}
                </p>
              </div>
              {formData.travelers.adults === 0 && (formData.travelers.children > 0 || formData.travelers.infants > 0) && (
                <p className="text-red-500 text-sm mt-2">
                  ⚠️ At least one adult is required when traveling with children or infants
                </p>
              )}
            </motion.div>

            {errors.travelers && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.travelers}</span>
              </motion.p>
            )}

            {/* Quick Select Options */}
            <div>
              <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Select
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Solo', adults: 1, children: 0, infants: 0 },
                  { label: 'Couple', adults: 2, children: 0, infants: 0 },
                  { label: 'Family', adults: 2, children: 2, infants: 0 },
                  { label: 'Group', adults: 4, children: 0, infants: 0 }
                ].map((preset) => (
                  <motion.button
                    key={preset.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleInputChange('travelers', {
                      adults: preset.adults,
                      children: preset.children,
                      infants: preset.infants
                    })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.travelers.adults === preset.adults &&
                      formData.travelers.children === preset.children &&
                      formData.travelers.infants === preset.infants
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    <div className="font-semibold">{preset.label}</div>
                    <div className="text-xs opacity-80">
                      {preset.adults}A {preset.children > 0 && `${preset.children}C`} {preset.infants > 0 && `${preset.infants}I`}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'budget':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Budget Range Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgetRanges.map((budget, index) => (
                <motion.button
                  key={budget.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('budget', budget.value)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.budget === budget.value
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{budget.icon}</div>
                    {formData.budget === budget.value && (
                      <Check className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{budget.label}</h3>
                  <p className="text-lg font-semibold mb-2">{budget.range}</p>
                  <p className="text-sm opacity-80">{budget.description}</p>
                </motion.button>
              ))}
            </div>

            {errors.budget && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.budget}</span>
              </motion.p>
            )}

            {/* Custom Budget Range */}
            {formData.budget === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={`p-6 rounded-xl border-2 ${
                  isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30'
                }`}
              >
                <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Set Custom Budget Range
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Minimum Budget (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.budgetRange[0]}
                      onChange={(e) => handleInputChange('budgetRange', [
                        parseInt(e.target.value) || 0,
                        formData.budgetRange[1]
                      ])}
                      className={`w-full p-3 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white' 
                          : 'bg-white/50 text-navy'
                      } focus:ring-2 focus:ring-blue-500`}
                      placeholder="15000"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Maximum Budget (₹)
                    </label>
                    <input
                      type="number"
                      value={formData.budgetRange[1]}
                      onChange={(e) => handleInputChange('budgetRange', [
                        formData.budgetRange[0],
                        parseInt(e.target.value) || 0
                      ])}
                      className={`w-full p-3 rounded-lg border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white' 
                          : 'bg-white/50 text-navy'
                      } focus:ring-2 focus:ring-blue-500`}
                      placeholder="100000"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Budget Estimate */}
            {formData.budget && getTripDuration() > 0 && getTotalTravelers() > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'} border-l-4 ${
                  isDark ? 'border-yellow-400' : 'border-blue-600'
                }`}
              >
                <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Estimated Total Cost
                </h4>
                <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                  ₹{getEstimatedBudget()}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  For {getTotalTravelers()} {getTotalTravelers() === 1 ? 'person' : 'people'} • {getTripDuration()} days
                </p>
              </motion.div>
            )}

            {/* Budget Tips */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-white/30'} border-l-4 border-green-500`}>
              <h5 className={`font-semibold mb-2 text-green-600`}>💡 Budget Tips</h5>
              <ul className={`text-sm space-y-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                <li>• Book flights 6-8 weeks in advance for better deals</li>
                <li>• Consider traveling during off-peak seasons</li>
                <li>• Mix of luxury and budget experiences can optimize costs</li>
                <li>• Group bookings often get discounts</li>
              </ul>
            </div>
          </motion.div>
        )

      case 'interests':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Select all that interest you (minimum 1 required)
              </p>
              <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                isDark ? 'bg-navy/50' : 'bg-white/50'
              }`}>
                <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                  Selected: {formData.interests.length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {interests.map((interest, index) => {
                const Icon = interest.icon
                const isSelected = formData.interests.includes(interest.name)
                
                return (
                  <motion.button
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest.name)}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all text-center relative overflow-hidden group ${
                      isSelected
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2"
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    )}
                    
                    <div className="text-3xl mb-2">{interest.emoji}</div>
                    <Icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-semibold">{interest.name}</div>
                    
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${interest.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  </motion.button>
                )
              })}
            </div>

            {errors.interests && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.interests}</span>
              </motion.p>
            )}

            {/* Interest Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-white/30'}`}>
                <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>🏃 Active</h5>
                <div className="text-sm space-y-1">
                  {['Adventure', 'Nature', 'Beach', 'Mountains'].map(item => (
                    <div key={item} className={`${formData.interests.includes(item) ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                      {formData.interests.includes(item) ? '✓' : '•'} {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-white/30'}`}>
                <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>🎭 Cultural</h5>
                <div className="text-sm space-y-1">
                  {['Culture', 'History', 'Art', 'Food'].map(item => (
                    <div key={item} className={`${formData.interests.includes(item) ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                      {formData.interests.includes(item) ? '✓' : '•'} {item}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-white/30'}`}>
                <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>🛍️ Leisure</h5>
                <div className="text-sm space-y-1">
                  {['Shopping', 'Relaxation', 'Wellness', 'Nightlife'].map(item => (
                    <div key={item} className={`${formData.interests.includes(item) ? 'text-green-500' : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                      {formData.interests.includes(item) ? '✓' : '•'} {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'style':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelStyles.map((style, index) => (
                <motion.button
                  key={style.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange('travelStyle', style.value)}
                  className={`p-6 rounded-xl border-2 transition-all text-left h-full ${
                    formData.travelStyle === style.value
                      ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                      : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white/50 border-gray-300 text-navy hover:border-blue-600')
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{style.icon}</div>
                    {formData.travelStyle === style.value && (
                      <Check className="w-6 h-6" />
                    )}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{style.label}</h3>
                  <p className="text-sm opacity-80 mb-4">{style.description}</p>
                  <div className="space-y-1">
                    {style.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs">
                        <div className="w-1 h-1 rounded-full bg-current opacity-60" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>

            {errors.travelStyle && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm flex items-center space-x-1"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{errors.travelStyle}</span>
              </motion.p>
            )}
          </motion.div>
        )

      case 'preferences':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Accommodation Preferences */}
            <div>
              <h4 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Accommodation Preferences
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {accommodationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleArrayItem('accommodation', type.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.accommodation.includes(type.value)
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                          : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{type.label}</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Transportation Preferences */}
            <div>
              <h4 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Transportation Preferences
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {transportationTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <motion.button
                      key={type.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleArrayItem('transportation', type.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.transportation.includes(type.value)
                          ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                          : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-semibold">{type.label}</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <h4 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Dietary Restrictions (Optional)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free', 'Nut Allergy', 'Other'].map((diet) => (
                  <motion.button
                    key={diet}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleArrayItem('dietaryRestrictions', diet)}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      formData.dietaryRestrictions.includes(diet)
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    <div className="text-sm font-semibold">{diet}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Accessibility Needs */}
            <div>
              <h4 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Accessibility Needs (Optional)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Wheelchair Accessible',
                  'Mobility Assistance',
                  'Visual Impairment Support',
                  'Hearing Impairment Support',
                  'Elevator Access Required',
                  'Ground Floor Accommodation'
                ].map((need) => (
                  <motion.button
                    key={need}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleArrayItem('accessibility', need)}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      formData.accessibility.includes(need)
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-white hover:border-yellow-400' : 'border-gray-300 text-navy hover:border-blue-600')
                    }`}
                  >
                    <div className="text-sm font-semibold">{need}</div>
                  </motion.button>
                ))}
              </div>
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

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Progress Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className={`text-3xl lg:text-4xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                🤖 AI Trip Planner
              </h1>
              <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveDraft}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                  isDark ? 'bg-navy/50 text-yellow-400' : 'bg-white/50 text-blue-600'
                } hover:opacity-80 transition-opacity`}
              >
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:opacity-80 transition-opacity`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset</span>
              </motion.button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className={`w-full h-3 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} overflow-hidden`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isCompleted = index < currentStep
              const isCurrent = index === currentStep
              const isAccessible = index <= currentStep
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => isAccessible && goToStep(index)}
                  disabled={!isAccessible}
                  className={`flex flex-col items-center space-y-2 p-2 rounded-lg transition-all min-w-0 ${
                    isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                  } ${isCurrent ? (isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20') : ''}`}
                  whileHover={isAccessible ? { scale: 1.05 } : {}}
                  whileTap={isAccessible ? { scale: 0.95 } : {}}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent 
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500')
                  }`}>
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center ${
                    isCurrent 
                      ? (isDark ? 'text-yellow-400' : 'text-blue-600')
                      : (isDark ? 'text-gray-400' : 'text-gray-600')
                  }`}>
                    {step.title}
                  </span>
                </motion.button>
              )
            })}
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
              <div className="mb-8">
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={`text-3xl font-bold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}
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
                {steps[currentStep].required && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    * Required step
                  </motion.p>
                )}
              </div>

              {renderStepContent()}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-300">
                {currentStep > 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevStep}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold ${
                      isDark 
                        ? 'bg-navy/50 text-yellow-400 hover:bg-navy/70' 
                        : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
                    } transition-all`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Previous</span>
                  </motion.button>
                ) : (
                  <div />
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    isDark 
                      ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate My Trip</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Trip Summary */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}
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
                  
                  {formData.startDate && formData.endDate && (
                    <div className="flex justify-between">
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Duration:</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {getTripDuration()} {getTripDuration() === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Travelers:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {getTotalTravelers()} {getTotalTravelers() === 1 ? 'person' : 'people'}
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
                  
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Style:</span>
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {formData.travelStyle ? travelStyles.find(s => s.value === formData.travelStyle)?.label : 'Not selected'}
                    </span>
                  </div>
                </div>
                
                {/* Selected Interests */}
                {formData.interests.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Selected Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.slice(0, 6).map((interest) => (
                        <span
                          key={interest}
                          className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                            isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                          }`}
                        >
                          {interest}
                        </span>
                      ))}
                      {formData.interests.length > 6 && (
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          isDark ? 'bg-gray-600 text-white' : 'bg-gray-300 text-navy'
                        }`}>
                          +{formData.interests.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Estimated Budget */}
                {getEstimatedBudget() && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="text-center">
                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Estimated Total Cost
                      </p>
                      <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                        ₹{getEstimatedBudget()}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Saved Drafts */}
              {savedDrafts.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
                >
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Saved Drafts
                  </h3>
                  <div className="space-y-3">
                    {savedDrafts.slice(0, 3).map((draft) => (
                      <motion.button
                        key={draft.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => loadDraft(draft)}
                        className={`w-full p-3 rounded-lg text-left ${
                          isDark ? 'bg-navy/50 hover:bg-navy/70' : 'bg-white/50 hover:bg-white/70'
                        } transition-colors`}
                      >
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {draft.name}
                        </h4>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(draft.createdAt).toLocaleDateString()}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AI Features */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
              >
                <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  🤖 AI-Powered Features
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: Sparkles, title: 'Smart Recommendations', desc: 'Personalized suggestions based on your preferences', color: 'bg-purple-500' },
                    { icon: Calendar, title: 'Optimized Itinerary', desc: 'Efficient scheduling to maximize your experience', color: 'bg-green-500' },
                    { icon: DollarSign, title: 'Budget Optimization', desc: 'Best value options within your budget range', color: 'bg-blue-500' },
                    { icon: MapPin, title: 'Local Insights', desc: 'Hidden gems and local recommendations', color: 'bg-orange-500' }
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
                          whileHover={{ scale: 1.1, rotate: 5 }}
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

              {/* Help & Tips */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}
              >
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  💡 Need Help?
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Our AI assistant is here to help you plan the perfect trip
                </p>
                <button className={`px-4 py-2 rounded-lg font-semibold ${
                  isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                } hover:opacity-90 transition-opacity`}>
                  Chat with AI Assistant
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default TripPlanner