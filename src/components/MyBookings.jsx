import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const MyBookings = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const bookings = [
    {
      status: "ACTIVE",
      statusColor: "bg-green-500",
      date: "Dec 15–22, 2024",
      title: "Maldives Luxury Retreat",
      location: "Conrad Maldives Rangali",
      price: "₹1,44,000",
      buttonLabel: "View Details",
      buttonColor: isDark ? "bg-navy" : "bg-purple-600",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      status: "UPCOMING", 
      statusColor: "bg-orange-500",
      date: "Jan 10–18, 2025",
      title: "Bali Private Villa",
      location: "Ubud, Bali",
      price: "₹1,30,000",
      buttonLabel: "Manage",
      buttonColor: isDark ? "bg-navy" : "bg-purple-600",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80"
    },
    {
      status: "COMPLETED",
      statusColor: "bg-purple-500", 
      date: "Oct 5–12, 2024",
      title: "Dubai Luxury Experience",
      location: "Burj Al Arab, Dubai",
      price: "₹2,10,000",
      buttonLabel: "Review",
      buttonColor: "bg-yellow-500",
      showStars: true,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80"
    },
    {
      status: "COMPLETED",
      statusColor: "bg-purple-500",
      date: "Aug 20–28, 2024", 
      title: "Santorini Greek Islands",
      location: "Oia, Santorini",
      price: "₹1,85,000",
      buttonLabel: "Review",
      buttonColor: "bg-yellow-500",
      showStars: true,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80"
    }
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
            onClick={() => navigate('/profile')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            My Bookings
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Bookings List */}
        <div className="px-6 space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold text-white ${booking.statusColor}`}>
                      {booking.status}
                    </span>
                    <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {booking.date}
                    </span>
                  </div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {booking.title}
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {booking.location}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {booking.price}
                    </span>
                    <div className="flex items-center space-x-2">
                      {booking.showStars && (
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      )}
                      <button className={`px-4 py-2 rounded-xl font-semibold text-sm text-white ${booking.buttonColor}`}>
                        {booking.buttonLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBookings