import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Users, 
  Download, 
  MessageCircle, 
  Phone,
  Share2,
  Map,
  Edit3,
  Home,
  Train,
  Bed,
  Utensils,
  Mountain,
  Clock,
  Navigation,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, BottomNavbar } from '../components'

const MyBookings = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [activeFilter, setActiveFilter] = useState('All')
  const [notificationCount, setNotificationCount] = useState(3)
  const [expandedSteps, setExpandedSteps] = useState(new Set([0, 1])) // Start with first two steps expanded
  const [currentStep, setCurrentStep] = useState(1) // Current active step

  const filters = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled']

  // Sample trip data with timeline structure
  const currentTrip = {
    id: "TRIP001",
    title: "Mumbai to Goa Adventure",
      status: "ACTIVE",
      date: "Dec 15–22, 2024",
      travelers: "2 adults",
    totalSteps: 7,
    steps: [
      {
        id: 1,
        type: "home",
        title: "Home (Current Location)",
        subtitle: "Mumbai, Maharashtra",
        status: "completed",
        icon: Home,
        details: {
          address: "Andheri West, Mumbai, Maharashtra 400058",
          coordinates: "19.1197° N, 72.8464° E",
          estimatedTime: "30 mins to station"
        },
        action: {
          label: "Get Directions",
          icon: Navigation,
          url: "https://maps.google.com"
        }
      },
      {
        id: 2,
        type: "departure",
        title: "Mumbai Central Station",
        subtitle: "Platform 3 • Departure",
        status: "active",
        icon: Train,
        details: {
          trainNumber: "12345",
          trainName: "Mumbai Central - Goa Express",
          departureTime: "08:30 AM",
          platform: "Platform 3",
          coach: "B2 - Seat 45",
          status: "On Time",
          delay: null
        },
        action: {
          label: "Track Train",
          icon: PlayCircle,
          url: "#"
        }
      },
      {
        id: 3,
        type: "accommodation",
        title: "Recommended Stay",
        subtitle: "Goa Beach Resort & Spa",
        status: "upcoming",
        icon: Bed,
        details: {
          hotelName: "Goa Beach Resort & Spa",
          address: "Calangute Beach, Goa",
          rating: 4.5,
          price: "₹8,500/night",
          amenities: ["Beach View", "Pool", "Spa", "Restaurant"],
          image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
        },
        action: {
          label: "Book Now",
          icon: ExternalLink,
          url: "https://booking.com"
        }
      },
      {
        id: 4,
        type: "food",
        title: "Local Food Recommendations",
        subtitle: "Popular restaurants nearby",
        status: "upcoming",
        icon: Utensils,
        details: {
          restaurants: [
            {
              name: "Spice Garden",
              cuisine: "Goan & Continental",
              rating: 4.3,
              priceRange: "₹₹",
              tags: ["Veg", "Non-Veg", "Seafood"],
              distance: "0.5 km",
              image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Beach Shack Cafe",
              cuisine: "Local Goan",
              rating: 4.1,
              priceRange: "₹",
              tags: ["Veg", "Non-Veg"],
              distance: "0.2 km",
              image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Fisherman's Wharf",
              cuisine: "Seafood Special",
              rating: 4.6,
              priceRange: "₹₹₹",
              tags: ["Non-Veg", "Seafood"],
              distance: "1.2 km",
              image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=300&q=80"
            }
          ]
        },
        action: {
          label: "View All",
          icon: ExternalLink,
          url: "#"
        }
      },
      {
        id: 5,
        type: "activities",
        title: "Local Activities",
        subtitle: "Must-visit attractions",
        status: "upcoming",
        icon: Mountain,
        details: {
          activities: [
            {
              name: "Calangute Beach",
              description: "Famous beach known for water sports and nightlife",
              duration: "Half day",
              price: "Free entry",
              rating: 4.4,
              image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Fort Aguada",
              description: "Historic Portuguese fort with panoramic views",
              duration: "2-3 hours",
              price: "₹50 entry",
              rating: 4.2,
              image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Dudhsagar Waterfalls",
              description: "Majestic four-tiered waterfall in the Western Ghats",
              duration: "Full day",
              price: "₹200 entry",
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=300&q=80"
            }
          ]
        },
        action: {
          label: "Book Activities",
          icon: ExternalLink,
          url: "#"
        }
      },
      {
        id: 6,
        type: "return",
        title: "Return Journey",
        subtitle: "Goa to Mumbai",
        status: "upcoming",
        icon: Train,
        details: {
          trainNumber: "12346",
          trainName: "Goa - Mumbai Central Express",
          departureTime: "06:00 PM",
          platform: "Platform 1",
          coach: "A1 - Seat 12",
          status: "Scheduled",
          delay: null
        },
        action: {
          label: "Track Train",
          icon: PlayCircle,
          url: "#"
        }
      },
      {
        id: 7,
        type: "home",
        title: "Back Home",
        subtitle: "Trip Complete",
        status: "upcoming",
        icon: Home,
        details: {
          estimatedArrival: "08:00 AM (Next day)",
          totalDistance: "1,200 km",
          tripDuration: "7 days"
        },
        action: {
          label: "Share Experience",
          icon: Share2,
          url: "#"
        }
      }
    ]
  }

  const toggleStepExpansion = (stepId) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(stepId)) {
      newExpanded.delete(stepId)
    } else {
      newExpanded.add(stepId)
    }
    setExpandedSteps(newExpanded)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'active': return 'text-yellow-400'
      case 'upcoming': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-400'
      case 'active': return 'bg-yellow-400'
      case 'upcoming': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

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
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-lg ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                } transition-colors`}
              >
                <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
              </button>
              <div>
            <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {currentTrip.title}
            </h1>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {currentTrip.date} • {currentTrip.travelers}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share Trip</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70'
                }`}
              >
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">View on Map</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Trip</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-blue-500 to-green-400"></div>
          
          {/* Timeline Steps */}
          <div className="space-y-8">
            {currentTrip.steps.map((step, index) => {
              const Icon = step.icon
              const isExpanded = expandedSteps.has(step.id)
              const isActive = step.status === 'active'
              const isCompleted = step.status === 'completed'
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-6 top-6 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10">
                    <div className={`w-full h-full rounded-full ${getStatusBgColor(step.status)}`}></div>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-yellow-400"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                          </div>

                  {/* Step Content */}
                  <div className={`ml-16 p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                    isDark ? 'bg-navy/50 border border-white/10' : 'bg-white/50 border border-gray-200'
                  } ${isActive ? 'ring-2 ring-yellow-400/50' : ''}`}>
                    
                    {/* Step Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl ${
                          isDark ? 'bg-white/10' : 'bg-navy/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${getStatusColor(step.status)}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                              {step.title}
                            </h3>
                            {isCompleted && (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                            {isActive && (
                              <motion.div
                                className="flex items-center space-x-1"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-xs text-yellow-400 font-semibold">LIVE</span>
                              </motion.div>
                            )}
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {step.action && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(step.action.url, '_blank')}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                              isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            <step.action.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{step.action.label}</span>
                          </motion.button>
                        )}
                        
                        <button
                          onClick={() => toggleStepExpansion(step.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isDark ? 'hover:bg-white/10' : 'hover:bg-navy/10'
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronUp className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
                          ) : (
                            <ChevronDown className={`w-5 h-5 ${isDark ? 'text-white' : 'text-navy'}`} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Step Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 pt-6 border-t border-gray-300/20"
                        >
                          {/* Render different content based on step type */}
                          {step.type === 'home' && (
                            <div className="space-y-4">
                              <div className="flex items-center space-x-2">
                                <MapPin className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {step.details.address}
                                </span>
                  </div>
                              <div className="flex items-center space-x-2">
                                <Clock className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                                <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {step.details.estimatedTime}
                                </span>
            </div>
          </div>
                          )}

                          {step.type === 'departure' || step.type === 'return' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Train</span>
                                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                    {step.details.trainNumber} - {step.details.trainName}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Time</span>
                                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                    {step.details.departureTime}
                                  </span>
                    </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Platform</span>
                                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                    {step.details.platform}
                                  </span>
                    </div>
                  </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Coach</span>
                                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                    {step.details.coach}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status</span>
                                  <span className={`font-semibold ${
                                    step.details.status === 'On Time' ? 'text-green-400' : 
                                    step.details.status === 'Delayed' ? 'text-red-400' : 
                                    isDark ? 'text-white' : 'text-navy'
                                  }`}>
                                    {step.details.status}
                                  </span>
                                </div>
                                {step.details.delay && (
                                  <div className="flex justify-between">
                                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Delay</span>
                                    <span className="font-semibold text-red-400">{step.details.delay}</span>
                    </div>
                                )}
                    </div>
                  </div>
                          )}

                          {step.type === 'accommodation' && (
                            <div className="space-y-4">
                              <img
                                src={step.details.image}
                                alt={step.details.hotelName}
                                className="w-full h-48 object-cover rounded-xl"
                              />
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                                    {step.details.hotelName}
                                  </h4>
                                  <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                      {step.details.rating}
                                    </span>
                    </div>
                  </div>
                                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {step.details.address}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                                    {step.details.price}
                                  </span>
                                  <div className="flex space-x-1">
                                    {step.details.amenities.map((amenity, idx) => (
                                      <span
                                        key={idx}
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                          isDark ? 'bg-white/10 text-white' : 'bg-navy/10 text-navy'
                                        }`}
                                      >
                                        {amenity}
                                      </span>
                                    ))}
                    </div>
                  </div>
                </div>
              </div>
                          )}

                          {step.type === 'food' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {step.details.restaurants.map((restaurant, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-4 rounded-xl ${
                                      isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                                    }`}
                                  >
                                    <img
                                      src={restaurant.image}
                                      alt={restaurant.name}
                                      className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'} mb-2`}>
                                      {restaurant.name}
                                    </h4>
                                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                                      {restaurant.cuisine}
                                    </p>
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                          {restaurant.rating}
                                        </span>
                                      </div>
                                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {restaurant.priceRange}
                                      </span>
            </div>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {restaurant.tags.map((tag, tagIdx) => (
                                        <span
                                          key={tagIdx}
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-600/20 text-blue-600'
                                          }`}
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                    <button className={`w-full py-2 rounded-lg font-semibold transition-all ${
                                      isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}>
                                      View Menu
                </button>
                                  </div>
                                ))}
              </div>
            </div>
                          )}

                          {step.type === 'activities' && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {step.details.activities.map((activity, idx) => (
                                  <div
                                    key={idx}
                                    className={`p-4 rounded-xl ${
                                      isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-gray-200'
                                    }`}
                                  >
                                    <img
                                      src={activity.image}
                                      alt={activity.name}
                                      className="w-full h-32 object-cover rounded-lg mb-3"
                                    />
                                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'} mb-2`}>
                                      {activity.name}
                                    </h4>
                                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-3`}>
                                      {activity.description}
                </p>
                <div className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                          Duration
                                        </span>
                                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                          {activity.duration}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                          Price
                                        </span>
                                        <span className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                                          {activity.price}
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                          Rating
                                        </span>
                                        <div className="flex items-center space-x-1">
                                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                            {activity.rating}
                                          </span>
                </div>
              </div>
            </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  )
}

export default MyBookings