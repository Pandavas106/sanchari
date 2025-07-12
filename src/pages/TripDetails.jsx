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
import { Navbar, BottomNavbar } from '../components'
import { generateGeminiTrip } from '../utils/geminiTripPlanner';

const TripDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [imageError, setImageError] = useState(false)

  // Get trip and included from navigation state
  const trip = location.state?.trip
  const included = location.state?.included

  // Log the trip data for debugging
  console.log('Trip Details - Trip Data:', trip)
  console.log('Trip Details - Image URL:', trip?.image)

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  // Fallback image if the trip image fails to load
  const fallbackImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'included', label: "What's Included" },
  ]

  if (!trip) {
    return (
      <div className={`min-h-screen ${bgGradient} flex items-center justify-center`}>
        <div className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>No trip data found</h2>
          <button
            onClick={() => navigate(-1)}
            className={`mt-4 px-6 py-3 rounded-xl font-semibold ${isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'}`}
          >
            Go Back
          </button>
        </div>
      </div>
    )
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>{trip.title}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{trip.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
              >
                <Heart className={`w-6 h-6 ${isSaved ? 'text-red-500 fill-current' : (isDark ? 'text-white' : 'text-navy')}`} />
              </button>
              <button className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <Share className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <img
                src={imageError || !trip.image ? fallbackImage : trip.image}
                alt={trip.title}
                className="w-full h-64 lg:h-96 object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'}`}>AI Recommended</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">{trip.title}</h2>
                    <p className="text-white/90 text-lg">{trip.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{trip.days}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <Users className="w-5 h-5 text-white" />
                      <span className="text-white font-semibold">{trip.people}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8 flex space-x-4 border-b border-gray-300">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-semibold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? (isDark ? 'border-yellow-400 text-yellow-400' : 'border-blue-600 text-blue-600')
                      : (isDark ? 'border-transparent text-gray-300' : 'border-transparent text-gray-600')
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div>
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <Star className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{trip.rating}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>({trip.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <ShoppingCart className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`font-semibold text-lg ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>{trip.price}</span>
                    {trip.originalPrice && (
                      <span className={`line-through text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{trip.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <Clock className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{trip.days}</span>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>Highlights</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {trip.highlights?.map((item, idx) => (
                      <li key={idx} className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>Itinerary</h3>
                <div className="space-y-6">
                  {trip.itinerary?.map((day, idx) => (
                    <div key={idx} className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-blue-100'}`}> 
                      <div className="flex items-center space-x-4 mb-2">
                        <span className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>Day {day.day}</span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{day.title}</span>
                      </div>
                      <ul className="list-disc pl-6 space-y-1">
                        {day.activities?.map((activity, i) => (
                          <li key={i} className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'included' && (
              <div>
                <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {included?.map((item, idx) => (
                    <div key={idx} className={`flex items-start space-x-4 p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-blue-100'}`}>
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>{item.label}</div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (optional, can add more trip info here) */}
          <div className="lg:col-span-4"></div>
        </div>
      </div>
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default TripDetails