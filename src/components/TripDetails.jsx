import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import Navbar from './Navbar'
import BottomNavbar from './BottomNavbar'

const TripDetails = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)

  const trip = {
    title: "Kerala Backwaters & Hills",
    price: "₹45,000",
    originalPrice: "₹52,000",
    subtitle: "Experience the serene backwaters and misty hills",
    days: "6 Days",
    rating: "4.8",
    reviews: "324",
    people: "2 people",
    location: "Kerala, India",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Private houseboat stay in Alleppey",
      "Ayurvedic spa treatments", 
      "Cultural performances",
      "Premium tea estate resort in Munnar",
      "Explore tea plantations & waterfalls",
      "Private transportation & curated experiences"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kochi",
        activities: ["Airport pickup", "Check-in to heritage hotel", "Kochi city tour", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Kochi to Alleppey",
        activities: ["Drive to Alleppey", "Houseboat check-in", "Backwater cruise", "Traditional Kerala lunch"]
      },
      {
        day: 3,
        title: "Alleppey Backwaters",
        activities: ["Morning cruise", "Village visit", "Ayurvedic massage", "Sunset viewing"]
      },
      {
        day: 4,
        title: "Alleppey to Munnar",
        activities: ["Check-out", "Drive to Munnar", "Tea plantation visit", "Resort check-in"]
      },
      {
        day: 5,
        title: "Munnar Exploration",
        activities: ["Eravikulam National Park", "Tea museum visit", "Mattupetty Dam", "Local market shopping"]
      },
      {
        day: 6,
        title: "Departure",
        activities: ["Check-out", "Drive to Kochi", "Airport transfer", "Departure"]
      }
    ]
  }

  const included = [
    { icon: "✈️", label: "Flights", description: "Round-trip flights from major cities" },
    { icon: "🏨", label: "Hotels", description: "4-star accommodations with breakfast" },
    { icon: "🍽️", label: "Meals", description: "Daily breakfast and 3 special dinners" },
    { icon: "🚗", label: "Transfers", description: "Private AC vehicle with driver" },
    { icon: "🏖️", label: "Activities", description: "All mentioned activities and tours" },
    { icon: "🤖", label: "AI Guide", description: "24/7 AI travel assistant" }
  ]

  const mediaGallery = [
    { type: 'image', url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80", user: "Alex", likes: 47 },
    { type: 'image', url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80", user: "Sarah", likes: 32 },
    { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", user: "Mike", likes: 89 },
    { type: 'image', url: "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=400&q=80", user: "Emma", likes: 156 },
    { type: 'image', url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=400&q=80", user: "John", likes: 73 },
    { type: 'image', url: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80", user: "Lisa", likes: 91 }
  ]

  const amenities = [
    { icon: Wifi, label: "Free WiFi" },
    { icon: Car, label: "Private Transport" },
    { icon: Utensils, label: "Meals Included" },
    { icon: Shield, label: "Travel Insurance" }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'included', label: "What's Included" },
    { id: 'gallery', label: 'Gallery' }
  ]

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
              <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                {trip.title}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {trip.location}
                </span>
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
                src={trip.image}
                alt={trip.title}
                className="w-full h-64 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                }`}>
                  AI Recommended
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {trip.title}
                    </h2>
                    <p className="text-white/90 text-lg">
                      {trip.subtitle}
                    </p>
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

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {trip.rating}
                  </span>
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    ({trip.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {trip.days}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                {amenities.map((amenity, index) => {
                  const Icon = amenity.icon
                  return (
                    <div
                      key={index}
                      className={`p-2 rounded-lg ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
                      title={amenity.label}
                    >
                      <Icon className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className={`font-bold text-2xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Trip Highlights
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {trip.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className={`w-6 h-6 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-blue-600'} flex-shrink-0`} />
                          <span className={`${isDark ? 'text-white' : 'text-navy'} font-medium`}>
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`font-bold text-2xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                      About This Trip
                    </h3>
                    <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      Embark on an unforgettable journey through Kerala's most enchanting landscapes. 
                      This carefully curated experience combines the tranquil backwaters of Alleppey 
                      with the misty hills of Munnar, offering you the perfect blend of relaxation and adventure. 
                      Stay in premium accommodations, enjoy authentic Kerala cuisine, and immerse yourself 
                      in the rich culture and natural beauty of God's Own Country.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="space-y-6">
                  <h3 className={`font-bold text-2xl mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Day-by-Day Itinerary
                  </h3>
                  {trip.itinerary.map((day, index) => (
                    <div key={index} className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-white/30'} backdrop-blur-sm`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                        }`}>
                          {day.day}
                        </div>
                        <h4 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>
                          {day.title}
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`} />
                            <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                              {activity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'included' && (
                <div className="space-y-6">
                  <h3 className={`font-bold text-2xl mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {included.map((item, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl text-center ${isDark ? 'bg-navy/30' : 'bg-white/30'} backdrop-blur-sm`}
                      >
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                          {item.label}
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-navy'}`}>
                      Photo Gallery
                    </h3>
                    <div className="flex space-x-3">
                      <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                        isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                      }`}>
                        <ImageIcon className="w-5 h-5" />
                        <span>Photos (184)</span>
                      </button>
                      <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                        isDark ? 'bg-navy/50 text-white' : 'bg-gray-200 text-navy'
                      }`}>
                        <Video className="w-5 h-5" />
                        <span>Videos (12)</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaGallery.map((media, index) => (
                      <div key={index} className="relative rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={media.url}
                          alt="Trip media"
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute top-3 left-3">
                          <div className="bg-white/80 px-2 py-1 rounded-full flex items-center space-x-1">
                            <div className="w-4 h-4 bg-gray-300 rounded-full" />
                            <span className="text-xs font-semibold text-gray-800">{media.user}</span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3">
                          <div className="bg-black/50 px-2 py-1 rounded-full">
                            <span className="text-xs text-white">{media.likes} likes</span>
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <Heart className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Booking Card */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className={`text-3xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      {trip.price}
                    </span>
                    {trip.originalPrice && (
                      <span className={`text-lg line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {trip.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Per person • {trip.days} • All inclusive
                  </p>
                  {trip.originalPrice && (
                    <div className="mt-2">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                        Save ₹7,000
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      className={`w-full p-3 rounded-xl border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white' 
                          : 'bg-white text-navy'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Travelers
                    </label>
                    <select className={`w-full p-3 rounded-xl border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white' 
                        : 'bg-white text-navy'
                    } focus:ring-2 focus:ring-blue-500`}>
                      <option>2 Adults</option>
                      <option>1 Adult</option>
                      <option>3 Adults</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/cart')}
                  className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 mb-4 ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } transition-all`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Book Now</span>
                </motion.button>

                <p className={`text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Free cancellation up to 24 hours before departure
                </p>
              </div>

              {/* Trip Highlights */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Why Choose This Trip?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      AI-optimized itinerary
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      Highly rated experiences
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      24/7 travel support
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Need Help?
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Our travel experts are here to help you plan the perfect trip
                </p>
                <button className={`w-full py-3 rounded-xl font-semibold ${
                  isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                } hover:opacity-90 transition-opacity`}>
                  Chat with Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default TripDetails