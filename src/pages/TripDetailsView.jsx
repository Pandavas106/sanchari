import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Heart,
  Share2,
  Eye,
  MessageCircle,
  CheckCircle,
  User,
  Mountain,
  Compass,
  Navigation,
  Sparkles,
  Download,
  Edit,
  Flag,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Bookmark,
  Send,
  Phone,
  Mail,
  Camera,
  Map,
  Route,
  Bed,
  Utensils,
  Car,
  Plane,
  Train,
  Bus,
  Wallet,
  Shield,
  Award,
  TrendingUp,
  Users2,
  Globe,
  Zap,
  Target,
  Gift
} from 'lucide-react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { Navbar, BottomNavbar, LoadingSpinner } from '../components'
import { useSharedTrips, useSharedTripActions } from '../hooks/useSharedTrips'
import { addToSaved, removeFromSaved, getUserSavedItems } from '../firebase/firestore'

const TripDetailsView = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const { user } = useAuth()
  
  // Get trip data from location state or fetch it
  const [trip, setTrip] = useState(location.state?.trip || null)
  const [loading, setLoading] = useState(!trip)
  const [isSaved, setIsSaved] = useState(false)
  const [isRating, setIsRating] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [ratingComment, setRatingComment] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  const { useTrip, rateTrip, loading: actionLoading } = useSharedTripActions()
  const { sharedTrips } = useSharedTrips({})

  // If no trip data in state, fetch it
  useEffect(() => {
    if (!trip && tripId && sharedTrips.length > 0) {
      const foundTrip = sharedTrips.find(t => t.id === tripId)
      if (foundTrip) {
        setTrip(foundTrip)
        setLoading(false)
      }
    }
  }, [trip, tripId, sharedTrips])

  // Check if trip is saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      if (user?.uid && trip?.id) {
        try {
          const result = await getUserSavedItems(user.uid)
          if (result.success) {
            const savedItemIds = new Set(result.data.map(item => item.itemId))
            setIsSaved(savedItemIds.has(trip.id))
          }
        } catch (error) {
          console.error('Error checking saved status:', error)
        }
      }
    }
    checkSavedStatus()
  }, [user?.uid, trip?.id])

  const handleSaveTrip = async () => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      if (isSaved) {
        // Remove from saved
        const userSavedItems = await getUserSavedItems(user.uid)
        if (userSavedItems.success) {
          const savedItem = userSavedItems.data.find(item => item.itemId === trip.id)
          if (savedItem) {
            await removeFromSaved(savedItem.id)
            setIsSaved(false)
          }
        }
      } else {
        // Add to saved
        const savedItemData = {
          itemId: trip.id,
          itemType: 'SharedTrip',
          title: trip.name,
          subtitle: trip.location,
          price: trip.minBudget ? `₹${trip.minBudget} - ₹${trip.maxBudget}` : 'Varies',
          image: trip.image,
          description: trip.description,
          rating: trip.averageRating,
          savedDate: new Date()
        }
        
        const result = await addToSaved(user.uid, savedItemData)
        if (result.success) {
          setIsSaved(true)
        }
      }
    } catch (error) {
      console.error('Error saving trip:', error)
    }
  }

  const handleUseTrip = async () => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    try {
      const result = await useTrip(trip.id, user.uid)
      if (result.success) {
        // Navigate to trip planner with the shared trip data
        navigate('/trip-planner', { 
          state: { 
            sharedTrip: trip,
            mode: 'customize' 
          } 
        })
      }
    } catch (error) {
      console.error('Error using trip:', error)
    }
  }

  const handleRateTrip = async () => {
    if (!user?.uid) {
      navigate('/login')
      return
    }

    if (userRating > 0) {
      try {
        const result = await rateTrip(trip.id, user.uid, userRating, ratingComment)
        if (result.success) {
          setIsRating(false)
          setUserRating(0)
          setRatingComment('')
          // Refresh trip data to show updated rating
          const updatedTrip = { ...trip, averageRating: result.newRating }
          setTrip(updatedTrip)
        }
      } catch (error) {
        console.error('Error rating trip:', error)
      }
    }
  }

  const formatBudget = (min, max) => {
    if (!min && !max) return 'Budget varies'
    if (!min) return `Up to ₹${max?.toLocaleString()}`
    if (!max) return `From ₹${min?.toLocaleString()}`
    return `₹${min?.toLocaleString()} - ₹${max?.toLocaleString()}`
  }

  const getCompanionLabel = (companion) => {
    const companions = {
      'solo': { label: 'Solo Travel', icon: User, color: 'bg-purple-500' },
      'couple': { label: 'Couple', icon: Users, color: 'bg-pink-500' },
      'family': { label: 'Family', icon: Users, color: 'bg-blue-500' },
      'friends': { label: 'Friends', icon: Users, color: 'bg-green-500' },
      'group': { label: 'Group', icon: Users2, color: 'bg-orange-500' }
    }
    return companions[companion] || companions.solo
  }

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

  if (loading) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <LoadingSpinner size="xl" text="Loading trip details..." />
      </div>
    )
  }

  if (!trip) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Trip Not Found</h2>
          <p className="text-gray-300 mb-6">The trip you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/explore')}
            className="px-6 py-3 bg-yellow-400 text-navy rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
          >
            Back to Explore
          </button>
        </div>
      </div>
    )
  }

  const companion = getCompanionLabel(trip.companion)

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveTrip}
                className="p-3 rounded-full bg-navy/50 hover:bg-navy/70 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-navy/50 hover:bg-navy/70 transition-colors"
              >
                <Share2 className="w-6 h-6 text-gray-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-navy/50 hover:bg-navy/70 transition-colors"
              >
                <MoreHorizontal className="w-6 h-6 text-gray-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Trip Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={trip.image}
                  alt={trip.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-full ${companion.color}`}>
                      <companion.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="px-3 py-1 bg-black/50 text-white rounded-full text-sm">
                      {companion.label}
                    </span>
                    {trip.category && (
                      <span className="px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm">
                        {trip.category}
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {trip.name}
                  </h1>
                  <div className="flex items-center gap-4 text-white/90">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{trip.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.duration} days</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-navy/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xl font-bold text-white">
                      {trip.averageRating?.toFixed(1) || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{trip.totalRatings || 0} ratings</p>
                </div>
                
                <div className="bg-navy/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    <span className="text-xl font-bold text-white">
                      {trip.usageCount || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">times used</p>
                </div>
                
                <div className="bg-navy/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-lg font-bold text-white">
                      {formatBudget(trip.minBudget, trip.maxBudget)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">budget range</p>
                </div>
                
                <div className="bg-navy/50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-xl font-bold text-white">
                      {trip.duration || 0}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">days</p>
                </div>
              </div>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center bg-navy/50 rounded-xl p-1">
                {[
                  { id: 'overview', label: 'Overview', icon: Compass },
                  { id: 'itinerary', label: 'Itinerary', icon: Route },
                  { id: 'reviews', label: 'Reviews', icon: MessageCircle },
                  { id: 'creator', label: 'Creator', icon: User }
                ].map(tab => {
                  const Icon = tab.icon
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all flex-1 justify-center ${
                        activeTab === tab.id
                          ? 'bg-yellow-400 text-navy font-semibold'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {activeTab === 'overview' && (
                <div className="bg-navy/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Trip Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Description</h4>
                      <p className="text-gray-300 leading-relaxed">
                        {showFullDescription ? trip.description : `${trip.description?.substring(0, 300)}...`}
                        {trip.description?.length > 300 && (
                          <button 
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-blue-400 ml-2 hover:text-blue-300"
                          >
                            {showFullDescription ? 'Show less' : 'Show more'}
                          </button>
                        )}
                      </p>
                    </div>
                    
                    {trip.tags && trip.tags.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-white mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {trip.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-semibold text-white mb-2">Best For</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                          {companion.label}
                        </span>
                        {trip.category && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                            {trip.category} Travel
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="bg-navy/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Trip Itinerary</h3>
                  <div className="space-y-6">
                    {trip.itinerary && trip.itinerary.length > 0 ? (
                      trip.itinerary.map((day, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 relative">
                              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-navy">
                                {index + 1}
                              </div>
                              {index < trip.itinerary.length - 1 && (
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-3">
                                <h4 className="text-xl font-bold text-white">Day {index + 1}</h4>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                  {day.date || `Day ${index + 1}`}
                                </span>
                              </div>
                              
                              <div className="space-y-4">
                                {day.activities?.map((activity, actIndex) => (
                                  <div key={actIndex} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-blue-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-blue-300 font-semibold text-sm">
                                            {activity.time || `${8 + actIndex * 2}:00 AM`}
                                          </span>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-gray-300 text-sm">
                                            {activity.duration || "2-3 hours"}
                                          </span>
                                        </div>
                                        <h5 className="font-semibold text-white mb-1">
                                          {activity.title || activity.name || activity}
                                        </h5>
                                        <p className="text-gray-300 text-sm mb-2">
                                          {activity.description || `Experience ${activity.title || activity.name || activity} with guided tours and local insights.`}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                          <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>{activity.location || "Location included"}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            <span>{activity.cost || "Included"}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Meals section */}
                                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Utensils className="w-5 h-5 text-green-400" />
                                    <h5 className="font-semibold text-white">Meals</h5>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                    <div className="text-gray-300">
                                      <span className="text-green-300 font-medium">Breakfast:</span> {day.meals?.breakfast || "Local cuisine"}
                                    </div>
                                    <div className="text-gray-300">
                                      <span className="text-green-300 font-medium">Lunch:</span> {day.meals?.lunch || "Traditional dishes"}
                                    </div>
                                    <div className="text-gray-300">
                                      <span className="text-green-300 font-medium">Dinner:</span> {day.meals?.dinner || "Regional specialties"}
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Accommodation */}
                                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                                  <div className="flex items-center gap-3 mb-2">
                                    <Bed className="w-5 h-5 text-purple-400" />
                                    <h5 className="font-semibold text-white">Accommodation</h5>
                                  </div>
                                  <div className="text-sm text-gray-300">
                                    <span className="text-purple-300 font-medium">Stay:</span> {day.accommodation || "Comfortable hotel/resort with modern amenities"}
                                  </div>
                                </div>
                                
                                {/* Transportation */}
                                {day.transportation && (
                                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Car className="w-5 h-5 text-orange-400" />
                                      <h5 className="font-semibold text-white">Transportation</h5>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                      <span className="text-orange-300 font-medium">Transport:</span> {day.transportation}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Generate sample itinerary based on trip details
                      <div className="space-y-6">
                        {Array.from({ length: trip.duration || 3 }, (_, index) => (
                          <div key={index} className="relative">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 relative">
                                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center font-bold text-navy">
                                  {index + 1}
                                </div>
                                {index < (trip.duration || 3) - 1 && (
                                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-transparent"></div>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-3">
                                  <h4 className="text-xl font-bold text-white">Day {index + 1}</h4>
                                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                                    Day {index + 1}
                                  </span>
                                </div>
                                
                                <div className="space-y-4">
                                  {/* Morning Activity */}
                                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-blue-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-blue-300 font-semibold text-sm">9:00 AM</span>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-gray-300 text-sm">3 hours</span>
                                        </div>
                                        <h5 className="font-semibold text-white mb-1">
                                          {index === 0 ? "Arrival & Check-in" : `Explore ${trip.location} - Morning`}
                                        </h5>
                                        <p className="text-gray-300 text-sm mb-2">
                                          {index === 0 
                                            ? "Welcome to your destination! Check into your accommodation and get oriented with the local area."
                                            : `Discover the beauty of ${trip.location} with guided tours and local experiences.`
                                          }
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                          <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>{trip.location}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            <span>Included</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Afternoon Activity */}
                                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-blue-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-blue-300 font-semibold text-sm">2:00 PM</span>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-gray-300 text-sm">2-3 hours</span>
                                        </div>
                                        <h5 className="font-semibold text-white mb-1">
                                          {trip.category === 'Adventure' ? 'Adventure Activities' : 
                                           trip.category === 'Cultural' ? 'Cultural Exploration' :
                                           trip.category === 'Nature' ? 'Nature Walk' :
                                           'Sightseeing Tour'}
                                        </h5>
                                        <p className="text-gray-300 text-sm mb-2">
                                          Experience the best of {trip.category?.toLowerCase()} activities with expert guides and local insights.
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                          <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>Various locations</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            <span>Included</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Evening Activity */}
                                  <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                                    <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                                        <Clock className="w-4 h-4 text-blue-400" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                          <span className="text-blue-300 font-semibold text-sm">6:00 PM</span>
                                          <span className="text-gray-400">•</span>
                                          <span className="text-gray-300 text-sm">2 hours</span>
                                        </div>
                                        <h5 className="font-semibold text-white mb-1">
                                          {index === (trip.duration || 3) - 1 ? "Farewell Dinner" : "Evening Relaxation"}
                                        </h5>
                                        <p className="text-gray-300 text-sm mb-2">
                                          {index === (trip.duration || 3) - 1 
                                            ? "Enjoy a memorable farewell dinner with local cuisine and cultural performances."
                                            : "Unwind with local entertainment, shopping, or peaceful evening activities."
                                          }
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-400">
                                          <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            <span>Hotel/Local area</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            <span>Included</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Meals section */}
                                  <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Utensils className="w-5 h-5 text-green-400" />
                                      <h5 className="font-semibold text-white">Meals</h5>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                      <div className="text-gray-300">
                                        <span className="text-green-300 font-medium">Breakfast:</span> Continental buffet
                                      </div>
                                      <div className="text-gray-300">
                                        <span className="text-green-300 font-medium">Lunch:</span> Local cuisine
                                      </div>
                                      <div className="text-gray-300">
                                        <span className="text-green-300 font-medium">Dinner:</span> Traditional dishes
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Accommodation */}
                                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Bed className="w-5 h-5 text-purple-400" />
                                      <h5 className="font-semibold text-white">Accommodation</h5>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                      <span className="text-purple-300 font-medium">Stay:</span> 
                                      {index === (trip.duration || 3) - 1 
                                        ? " Check-out and departure assistance" 
                                        : " Comfortable hotel with modern amenities and local charm"
                                      }
                                    </div>
                                  </div>
                                  
                                  {/* Transportation */}
                                  <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                      <Car className="w-5 h-5 text-orange-400" />
                                      <h5 className="font-semibold text-white">Transportation</h5>
                                    </div>
                                    <div className="text-sm text-gray-300">
                                      <span className="text-orange-300 font-medium">Transport:</span> 
                                      {index === 0 
                                        ? " Airport pickup and transfer to hotel" 
                                        : index === (trip.duration || 3) - 1 
                                          ? " Hotel to airport departure transfer"
                                          : " Private vehicle with driver for sightseeing"
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {/* Additional Information */}
                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
                          <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-6 h-6 text-yellow-400" />
                            <h3 className="text-lg font-bold text-white">What's Included</h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>Professional guide services</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>All accommodation as per itinerary</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>Transportation between destinations</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>Entry fees to attractions</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>Meals as specified in itinerary</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>24/7 customer support</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="bg-navy/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Reviews & Ratings</h3>
                  <div className="space-y-4">
                    {trip.reviews && trip.reviews.length > 0 ? (
                      trip.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-600 pb-4 last:border-b-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{review.userName}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-400">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400">No reviews yet. Be the first to review this trip!</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'creator' && (
                <div className="bg-navy/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Trip Creator</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{trip.creatorName || 'Travel Enthusiast'}</h4>
                      <p className="text-gray-300 text-sm">{trip.creatorBio || 'Passionate about exploring new places'}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-400">{trip.creatorTripsCount || 1} trips shared</span>
                        <span className="text-sm text-gray-400">{trip.creatorRating || 4.5}⭐ rating</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      View Profile
                    </button>
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                      Message
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl p-6 mb-6"
            >
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-navy mx-auto mb-3" />
                <h3 className="text-xl font-bold text-navy mb-2">
                  Use This Plan for Better Experience
                </h3>
                <p className="text-navy/80 text-sm mb-4">
                  Get this amazing travel plan and customize it according to your preferences for a perfect trip to new areas.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUseTrip}
                  disabled={actionLoading}
                  className="w-full px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy/90 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? 'Processing...' : 'Use This Plan'}
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-navy/50 rounded-xl p-6 mb-6"
            >
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setIsRating(true)}
                  className="w-full flex items-center gap-3 p-3 bg-yellow-500/20 text-yellow-300 rounded-lg hover:bg-yellow-500/30 transition-colors"
                >
                  <Star className="w-5 h-5" />
                  <span>Rate This Trip</span>
                </button>
                
                <button 
                  onClick={handleSaveTrip}
                  className="w-full flex items-center gap-3 p-3 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'Saved' : 'Save Trip'}</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>Share Trip</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-3 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </motion.div>

            {/* Similar Trips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-navy/50 rounded-xl p-6"
            >
              <h3 className="font-bold text-white mb-4">Similar Trips</h3>
              <div className="space-y-3">
                {sharedTrips.filter(t => t.id !== trip.id && t.category === trip.category).slice(0, 3).map((similarTrip, index) => (
                  <motion.div
                    key={similarTrip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer"
                    onClick={() => navigate(`/trip-details/${similarTrip.id}`, { state: { trip: similarTrip } })}
                  >
                    <img 
                      src={similarTrip.image} 
                      alt={similarTrip.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white text-sm truncate">{similarTrip.name}</h4>
                      <p className="text-gray-400 text-xs truncate">{similarTrip.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs text-gray-300">{similarTrip.averageRating?.toFixed(1) || 0}</span>
                        </div>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{similarTrip.duration} days</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {isRating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Rate This Trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`w-8 h-8 ${
                        star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                  <span className="text-white ml-2">{userRating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comment (optional)
                </label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full p-3 bg-navy/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Share your experience with this trip..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setIsRating(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRateTrip}
                  disabled={userRating === 0}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <BottomNavbar />
    </div>
  )
}

export default TripDetailsView
