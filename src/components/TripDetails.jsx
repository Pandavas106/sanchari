import React from 'react'
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
  Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const TripDetails = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const trip = {
    title: "Kerala Backwaters & Hills",
    price: "₹45,000",
    subtitle: "Experience the serene backwaters and misty hills",
    days: "6 Days",
    rating: "4.8",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
    highlights: [
      "Private houseboat stay in Alleppey",
      "Ayurvedic spa treatments", 
      "Cultural performances",
      "Premium tea estate resort in Munnar",
      "Explore tea plantations & waterfalls",
      "Private transportation & curated experiences"
    ]
  }

  const included = [
    { icon: "✈️", label: "Flights" },
    { icon: "🏨", label: "Hotels" },
    { icon: "🍽️", label: "Meals" },
    { icon: "🚗", label: "Transfers" },
    { icon: "🏖️", label: "Activities" },
    { icon: "🤖", label: "AI Assistance" }
  ]

  const mediaGallery = [
    { type: 'image', url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80", user: "Alex", likes: 47 },
    { type: 'image', url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80", user: "Sarah", likes: 32 },
    { type: 'image', url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80", user: "Mike", likes: 89 },
    { type: 'image', url: "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=400&q=80", user: "Emma", likes: 156 }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button 
            onClick={() => navigate('/ai-trips')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Trip Image */}
        <div className="px-6 mb-6">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={trip.image}
              alt={trip.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
              }`}>
                AI Recommended
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <button className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-800">{trip.days}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Info */}
        <div className="px-6 mb-6">
          <div className="flex items-start justify-between mb-2">
            <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              {trip.title}
            </h1>
            <div className={`px-4 py-2 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
              <span className={`font-bold text-lg ${isDark ? 'text-navy' : 'text-white'}`}>
                {trip.price}
              </span>
            </div>
          </div>
          <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {trip.subtitle}
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {trip.rating}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                {trip.people}
              </span>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="px-6 mb-6">
          <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
            What's Included
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {included.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl text-center ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="px-6 mb-6">
          <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
            Highlights
          </h3>
          <div className="space-y-3">
            {trip.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className={`w-5 h-5 mt-0.5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <span className={`${isDark ? 'text-white' : 'text-navy'}`}>
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Section */}
        <div className="px-6 mb-6">
          <div className="flex space-x-3 mb-4">
            <button className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
            }`}>
              <ImageIcon className="w-5 h-5" />
              <span>Photos (184)</span>
            </button>
            <button className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 ${
              isDark ? 'bg-navy/50 text-white' : 'bg-gray-200 text-navy'
            }`}>
              <Video className="w-5 h-5" />
              <span>Videos (63)</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {mediaGallery.map((media, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden">
                <img
                  src={media.url}
                  alt="Trip media"
                  className="w-full h-32 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <div className="bg-white/80 px-2 py-1 rounded-full flex items-center space-x-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full" />
                    <span className="text-xs font-semibold text-gray-800">{media.user}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="bg-black/50 px-2 py-1 rounded-full">
                    <span className="text-xs text-white">{media.likes} likes</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="px-6 pb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/cart')}
            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
            } transition-all`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Book Now</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default TripDetails