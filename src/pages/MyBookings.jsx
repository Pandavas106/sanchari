import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  PlayCircle,
  ShoppingCart,
  Info
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, BottomNavbar, LoadingSpinner } from '../components'
import { useUserBookings } from '../hooks/useUserData'

const MyBookings = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)
  const [expandedSteps, setExpandedSteps] = useState(new Set([0, 1])) // Start with first two steps expanded
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  // Get trip name from navigation state (when coming from TripDetails)
  const tripName = location.state?.tripName || null

  // Dynamic bookings - fetches booking by trip name or shows the most recent booking
  const { bookings, loading, error } = useUserBookings(tripName)

  // Helper to get action button info from activity text
  function getActivityAction(activity) {
    if (/🚗|taxi|drive|travel|airport|station|ghat/i.test(activity)) {
      return { label: 'Open Maps', url: 'https://maps.google.com', icon: Map };
    }
    if (/🛕|temple|stupa|sightseeing|explore|visit/i.test(activity)) {
      return { label: 'View on Guide App', url: 'https://guide.sanchari.com', icon: ExternalLink };
    }
    if (/🍽️|breakfast|lunch|dinner|food|restaurant|cafe/i.test(activity)) {
      return { label: 'Reserve on Zomato', url: 'https://zomato.com', icon: Utensils };
    }
    if (/🛏️|hotel|check-in|stay/i.test(activity)) {
      return { label: 'Open Booking', url: 'https://booking.com', icon: Bed };
    }
    if (/🎭|concert|event|aarti|music|cultural/i.test(activity)) {
      return { label: 'Explore More', url: 'https://events.sanchari.com', icon: Star };
    }
    if (/🛍️|shop|market/i.test(activity)) {
      return { label: 'Details', url: 'https://shopping.sanchari.com', icon: ShoppingCart };
    }
    return { label: 'Details', url: 'https://sanchari.com', icon: Info };
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setLocationLoading(false);
        },
        () => {
          setUserLocation(null);
          setLocationLoading(false);
        }
      );
    } else {
      setUserLocation(null);
      setLocationLoading(false);
    }
  }, []);

  const bgGradient = 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'

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
                  {tripName ? `My Booking - ${tripName}` : 'My Bookings'}
                </h1>
              </div>
            </div>
            {/* Action Buttons (optional) */}
          </div>
        </motion.div>

        {/* Timeline Container */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <LoadingSpinner size="xl" text="Loading your bookings..." />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-semibold py-12">{error}</div>
        ) : !bookings || bookings.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold py-12">
            {tripName ? `No booking found for "${tripName}".` : 'No bookings found.'}
          </div>
        ) : (
          <div className="space-y-16">
            {bookings.map((booking, bookingIdx) => {
              // Build timelineSteps for this booking
              let timelineSteps = []
              // Home step (current location)
              timelineSteps.push({
                id: `home-${bookingIdx}`,
                type: 'home',
                title: 'Home (Current Location)',
                subtitle: locationLoading ? 'Detecting your location...' : userLocation ? `Current Location: ${userLocation}` : '',
                status: 'completed',
                icon: Home,
                details: {
                  address: booking.homeAddress || '',
                  estimatedTime: booking.homeEstimatedTime || ''
                },
                action: {
                  label: 'Get Directions',
                  icon: Navigation,
                  url: 'https://maps.google.com'
                }
              })
              // Recommended Stay step (if available)
              if (booking.accommodation) {
                timelineSteps.push({
                  id: `accommodation-${bookingIdx}`,
                  type: 'accommodation',
                  title: 'Recommended Stay',
                  subtitle: booking.accommodation.hotelName || '',
                  status: 'upcoming',
                  icon: Bed,
                  details: booking.accommodation,
                  action: {
                    label: 'Book Now',
                    icon: ExternalLink,
                    url: booking.accommodation.bookingUrl || 'https://booking.com'
                  }
                })
              }
              // Itinerary days
              if (booking.itinerary && Array.isArray(booking.itinerary)) {
                booking.itinerary.forEach((day, idx) => {
                  timelineSteps.push({
                    id: `itinerary-day-${day.day}-${bookingIdx}`,
                    type: 'itinerary-day',
                    title: `Day ${day.day}: ${day.title}`,
                    subtitle: '',
                    status: idx < 1 ? 'completed' : idx === 1 ? 'active' : 'upcoming',
                    icon: Mountain,
                    details: { activities: day.activities },
                    date: day.date || new Date(Date.now() + idx * 86400000).toISOString().slice(0, 10),
                  })
                })
              }
              // Return step (if available)
              if (booking.returnJourney) {
                timelineSteps.push({
                  id: `return-${bookingIdx}`,
                  type: 'return',
                  title: 'Return Journey',
                  subtitle: booking.returnJourney.subtitle || '',
                  status: 'upcoming',
                  icon: Train,
                  details: booking.returnJourney,
                  action: {
                    label: 'Track Train',
                    icon: PlayCircle,
                    url: '#'
                  }
                })
              }
              // Back Home step
              timelineSteps.push({
                id: `back-home-${bookingIdx}`,
                type: 'home',
                title: 'Back Home',
                subtitle: 'Trip Complete',
                status: 'upcoming',
                icon: Home,
                details: {
                  estimatedArrival: booking.estimatedArrival || '',
                  totalDistance: booking.totalDistance || '',
                  tripDuration: booking.tripDuration || ''
                },
                action: {
                  label: 'Share Experience',
                  icon: Share2,
                  url: '#'
                }
              })
              return (
                <div key={booking.id || bookingIdx} className="bg-white/70 dark:bg-navy/60 rounded-2xl shadow-lg p-6">
                  {/* Booking Header */}
                  <div className="mb-8">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>{booking.destinationName || booking.title}</h2>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{booking.checkInDate || ''} – {booking.checkOutDate || ''} • {booking.travelers || ''} travelers</p>
                  </div>
                  {/* Timeline for this booking */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-blue-500 to-green-400"></div>
          {/* Timeline Steps */}
          <div className="space-y-8">
                      {timelineSteps.map((step, index) => {
              const Icon = step.icon
              const isExpanded = expandedSteps.has(step.id)
              const isActive = step.status === 'active'
              const isCompleted = step.status === 'completed'
                        const isItineraryDay = step.type === 'itinerary-day'
                        let displaySubtitle = step.subtitle
                        if (step.type === 'home' && step.id.startsWith('home')) {
                          displaySubtitle = locationLoading ? 'Detecting your location...' : userLocation ? `Current Location: ${userLocation}` : ''
                        }
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
                                      {/* Highlight if today */}
                                      {isItineraryDay && step.date === new Date().toISOString().slice(0, 10) && (
                                        <span className="ml-2 px-2 py-1 rounded bg-yellow-400 text-navy text-xs font-bold">Today</span>
                            )}
                          </div>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                      {displaySubtitle}
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
                                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.details.address}</span>
                  </div>
                              <div className="flex items-center space-x-2">
                                <Clock className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                                          <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.details.estimatedTime}</span>
                                        </div>
                                      </div>
                                    )}
                                    {step.type === 'accommodation' && step.details && (
                                      <div className="space-y-4">
                                        {step.details.image && (
                                          <img
                                            src={step.details.image}
                                            alt={step.details.hotelName}
                                            className="w-full h-48 object-cover rounded-xl"
                                          />
                                        )}
                                        <div className="space-y-3">
                                          <div className="flex items-center justify-between">
                                            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.hotelName}</h4>
                                            {step.details.rating && (
                                              <div className="flex items-center space-x-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.rating}</span>
                                              </div>
                                            )}
                                          </div>
                                          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{step.details.address}</p>
                                          <div className="flex items-center justify-between">
                                            {step.details.price && (
                                              <span className={`text-lg font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>{step.details.price}</span>
                                            )}
                                            <div className="flex space-x-1">
                                              {step.details.amenities && step.details.amenities.map((amenity, idx) => (
                                                <span
                                                  key={idx}
                                                  className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-white/10 text-white' : 'bg-navy/10 text-navy'}`}
                                                >
                                                  {amenity}
                                </span>
                                              ))}
                                            </div>
                                          </div>
            </div>
          </div>
                          )}
                                    {step.type === 'return' && step.details && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Train</span>
                                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.trainNumber} - {step.details.trainName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Time</span>
                                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.departureTime}</span>
                    </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Platform</span>
                                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.platform}</span>
                    </div>
                  </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Coach</span>
                                            <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{step.details.coach}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Status</span>
                                            <span className={`font-semibold ${step.details.status === 'On Time' ? 'text-green-400' : step.details.status === 'Delayed' ? 'text-red-400' : isDark ? 'text-white' : 'text-navy'}`}>{step.details.status}</span>
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
                                    {step.type === 'itinerary-day' && step.details && (
                                      <div className="space-y-4 pl-4 border-l-2 border-yellow-400">
                                        {step.details.activities && step.details.activities.map((activity, idx) => {
                                          const action = getActivityAction(activity)
                                          return (
                                            <div key={idx} className="flex items-center justify-between mb-2">
                                              <div className="flex items-center gap-2">
                                                <span className="text-lg">{activity[0]}</span>
                                                <span className="text-base">{activity.slice(2)}</span>
                    </div>
                                              <a
                                                href={action.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`ml-4 px-3 py-1 rounded-lg font-semibold text-xs flex items-center gap-1 transition-all ${isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                              >
                                                <action.icon className="w-4 h-4" />
                                                {action.label}
                                              </a>
                    </div>
                                          )
                                        })}
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
              )
            })}
          </div>
        )}
      </div>
      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  )
}

export default MyBookings
