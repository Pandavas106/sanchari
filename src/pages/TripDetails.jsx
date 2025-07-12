import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  ShoppingCart,
  CheckCircle,
  Image as ImageIcon,
  Video,
  Sun,
  Moon,
  MapPin,
  Clock,
  Wifi,
  Car,
  Utensils,
  Shield,
  Share
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, LoadingSpinner } from '../components'
import { generateGeminiTrip } from '../utils/geminiTripPlanner';
import { createBooking } from '../firebase/firestore'
import { useAuth } from '../contexts/AuthContext'

const TripDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [imageError, setImageError] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const { user } = useAuth()

  // Get trip and included from navigation state
  const trip = location.state?.trip
  const included = location.state?.included

  // Fallback image if the trip image fails to load
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'included', label: "What's Included" },
  ]

  if (!trip) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-navy">No trip data found</h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-3 rounded-xl font-semibold bg-blue-600 text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (isBooking) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto px-6">
          <LoadingSpinner size="xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4"
          >
            <h2 className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Booking your trip...</h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Please wait while we confirm your booking and prepare your itinerary.</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900' : 'bg-gray-50'}`}>
      {/* Navbar */}
      <Navbar 
        onSearchOpen={() => {}}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={2}
      />

      {/* Breadcrumb */}
      <div className={`max-w-7xl mx-auto w-full px-6 pt-6 pb-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
          <button onClick={() => navigate('/')} className={`${isDark ? 'hover:underline text-yellow-400' : 'hover:underline text-blue-600'}`}>Home</button>
          <span>/</span>
          <button onClick={() => navigate(-1)} className={`${isDark ? 'hover:underline text-yellow-400' : 'hover:underline text-blue-600'}`}>Trips</button>
          <span>/</span>
          <span className={`${isDark ? 'text-yellow-400' : 'text-navy'} font-semibold`}>{trip.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="relative w-full">
        <img
          src={imageError || !trip.image ? fallbackImage : trip.image}
          alt={trip.title}
          className="w-full h-80 object-cover object-center"
          onError={() => setImageError(true)}
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-navy/90 via-navy/60 to-transparent' : 'bg-gradient-to-t from-black/70 to-transparent'}`} />
        <div className="absolute bottom-0 left-0 w-full px-8 py-6 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 drop-shadow ${isDark ? 'text-yellow-400' : 'text-white'}`}>{trip.title}</h1>
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-400'}`} />
              <span className={`text-lg font-medium drop-shadow ${isDark ? 'text-white' : 'text-white'}`}>{trip.location}</span>
            </div>
            <p className={`text-lg drop-shadow ${isDark ? 'text-gray-200' : 'text-white/90'}`}>{trip.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className={`flex items-center space-x-2 ${isDark ? 'bg-navy/70' : 'bg-white/20'} backdrop-blur-sm px-3 py-2 rounded-lg`}>
              <Calendar className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-white'}`} />
              <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-white'}`}>{trip.days} days</span>
            </div>
            <div className={`flex items-center space-x-2 ${isDark ? 'bg-navy/70' : 'bg-white/20'} backdrop-blur-sm px-3 py-2 rounded-lg`}>
              <Users className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-white'}`} />
              <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-white'}`}>{trip.people} people</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Main Column */}
        <div className="w-full md:w-2/3">
          {/* Tabs as horizontal nav */}
          <div className={`border-b ${isDark ? 'border-navy' : 'border-gray-200'} mb-8`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-lg transition-all ${
                    activeTab === tab.id
                      ? (isDark ? 'border-yellow-400 text-yellow-400' : 'border-blue-600 text-blue-600')
                      : (isDark ? 'border-transparent text-gray-400 hover:text-yellow-400 hover:border-yellow-400/60' : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300')
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className={`${isDark ? 'bg-navy/70 text-white' : 'bg-white'} rounded-xl shadow p-8 mb-8`}>
            {activeTab === 'overview' && (
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Highlights</h2>
                <ul className={`list-disc pl-6 space-y-2 text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {trip.highlights?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Itinerary</h2>
                <div className="space-y-8">
                  {trip.itinerary?.map((day, idx) => (
                    <div key={idx} className={`${isDark ? 'bg-navy/50 border-l-4 border-yellow-400' : 'bg-blue-50 border-l-4 border-blue-600'} p-6 rounded-xl`}>
                      <div className="flex items-center space-x-4 mb-2">
                        <span className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>Day {day.day}</span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{day.title}</span>
                      </div>
                      <ul className={`list-disc pl-6 space-y-1 text-base ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {day.activities?.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'included' && (
              <div>
                <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {included?.map((item, idx) => (
                    <div key={idx} className={`${isDark ? 'bg-navy/50' : 'bg-blue-50'} flex items-start space-x-4 p-4 rounded-xl`}>
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{item.label}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-1/3 flex flex-col gap-8">
          {/* Trip Summary Card */}
          <div className={`${isDark ? 'bg-navy/70 text-white' : 'bg-white'} rounded-xl shadow p-8 mb-4`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Trip Summary</h2>
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full border ${isSaved ? (isDark ? 'border-red-400 bg-red-900/30' : 'border-red-400 bg-red-50') : (isDark ? 'border-gray-600 bg-navy/50' : 'border-gray-200 bg-gray-50')} transition-all`}
                aria-label="Save trip"
              >
                <Heart className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-current' : (isDark ? 'text-yellow-400' : 'text-gray-400')}`} />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Price:</span>
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'} text-lg`}>{trip.price}</span>
              </div>
              {trip.originalPrice && (
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Original:</span>
                  <span className="line-through text-gray-400">{trip.originalPrice}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Duration:</span>
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{trip.days} days</span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>People:</span>
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{trip.people}</span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Rating:</span>
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-yellow-500'} flex items-center gap-1`}>{trip.rating} <Star className="w-4 h-4 inline" /></span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-500'}`}>Reviews:</span>
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-navy'}`}>{trip.reviews}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <button
                className={`flex-1 px-6 py-3 rounded-lg font-semibold text-lg transition-all shadow ${isDark ? 'bg-yellow-400 text-navy hover:bg-yellow-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                onClick={async () => {
                  setIsBooking(true)
                  try {
                    await createBooking(user.uid, {
                      ...trip,
                      createdAt: new Date(),
                    })
                    setTimeout(() => {
                      navigate('/mybookings')
                    }, 1800)
                  } catch (err) {
                    setIsBooking(false)
                    alert('Booking failed: ' + (err.message || err))
                  }
                }}
              >
                Book Now
              </button>
              <button className={`p-2 rounded-full border ml-2 ${isDark ? 'border-gray-600 bg-navy/50' : 'border-gray-200 bg-gray-50'}`} aria-label="Share trip">
                <Share className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>

          {/* Contact/Help or Related Trips (placeholder) */}
          <div className={`${isDark ? 'bg-navy/70 text-white' : 'bg-white'} rounded-xl shadow p-6`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-navy'}`}>Need Help?</h3>
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Contact our travel experts for personalized assistance or questions about this trip.</p>
            <a href="mailto:help@sanchari.com" className={`${isDark ? 'text-yellow-400' : 'text-blue-600'} font-semibold hover:underline`}>help@sanchari.com</a>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-navy text-yellow-400' : 'bg-navy text-white'} w-full py-8 mt-auto`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
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

export default TripDetails