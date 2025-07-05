import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Star, Sun, Moon, Calendar, MapPin, Users, Download, MessageCircle, Phone } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const MyBookings = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled']

  const bookings = [
    {
      id: "BK001",
      status: "ACTIVE",
      statusColor: "bg-green-500",
      date: "Dec 15–22, 2024",
      title: "Maldives Luxury Retreat",
      location: "Conrad Maldives Rangali",
      price: "₹1,44,000",
      buttonLabel: "View Details",
      buttonColor: "bg-green-600",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      travelers: "2 adults",
      bookingDate: "Nov 15, 2024",
      confirmationCode: "CMD123456"
    },
    {
      id: "BK002",
      status: "UPCOMING", 
      statusColor: "bg-orange-500",
      date: "Jan 10–18, 2025",
      title: "Bali Private Villa",
      location: "Ubud, Bali",
      price: "₹1,30,000",
      buttonLabel: "Manage",
      buttonColor: "bg-orange-600",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
      travelers: "2 adults",
      bookingDate: "Oct 20, 2024",
      confirmationCode: "BLI789012"
    },
    {
      id: "BK003",
      status: "COMPLETED",
      statusColor: "bg-purple-500", 
      date: "Oct 5–12, 2024",
      title: "Dubai Luxury Experience",
      location: "Burj Al Arab, Dubai",
      price: "₹2,10,000",
      buttonLabel: "Review",
      buttonColor: "bg-yellow-500",
      showStars: true,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
      travelers: "2 adults",
      bookingDate: "Aug 15, 2024",
      confirmationCode: "DXB345678",
      rating: 5
    },
    {
      id: "BK004",
      status: "COMPLETED",
      statusColor: "bg-purple-500",
      date: "Aug 20–28, 2024", 
      title: "Santorini Greek Islands",
      location: "Oia, Santorini",
      price: "₹1,85,000",
      buttonLabel: "Review",
      buttonColor: "bg-yellow-500",
      showStars: true,
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
      travelers: "2 adults",
      bookingDate: "Jun 10, 2024",
      confirmationCode: "GRC901234",
      rating: 4
    }
  ]

  const filteredBookings = bookings.filter(booking => 
    activeFilter === 'All' || booking.status === activeFilter.toUpperCase()
  )

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/profile')}
                className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm lg:hidden`}
              >
                <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
              </button>
              <h1 className={`text-xl lg:text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                My Bookings
              </h1>
              <div className={`px-3 py-1 rounded-full ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                  {bookings.length} trips
                </span>
              </div>
            </div>
            <button onClick={toggleTheme} className="p-2">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Filter Tabs */}
            <div className="mb-8">
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-6 py-3 rounded-full whitespace-nowrap font-semibold transition-all ${
                      activeFilter === filter
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 text-white hover:bg-navy/70' : 'bg-white/50 text-navy hover:bg-white/70')
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-6">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full lg:w-48 h-48 lg:h-32 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white ${booking.statusColor}`}>
                              {booking.status}
                            </span>
                            <span className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              Booking ID: {booking.id}
                            </span>
                          </div>
                          <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                            {booking.title}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <MapPin className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {booking.location}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {booking.date}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {booking.travelers}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-4">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                              {booking.price}
                            </div>
                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              Booked on {booking.bookingDate}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            {booking.showStars && (
                              <div className="flex space-x-1 mb-2 sm:mb-0">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${
                                      i < (booking.rating || 0) 
                                        ? 'text-yellow-400 fill-current' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            )}
                            <button className={`px-4 py-2 rounded-xl font-semibold text-sm text-white ${booking.buttonColor} hover:opacity-90 transition-opacity`}>
                              {booking.buttonLabel}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-300">
                        <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm ${
                          isDark ? 'bg-navy/50 text-yellow-400' : 'bg-gray-200 text-blue-600'
                        } hover:opacity-80 transition-opacity`}>
                          <Download className="w-4 h-4" />
                          <span>Download Voucher</span>
                        </button>
                        <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm ${
                          isDark ? 'bg-navy/50 text-yellow-400' : 'bg-gray-200 text-blue-600'
                        } hover:opacity-80 transition-opacity`}>
                          <MessageCircle className="w-4 h-4" />
                          <span>Contact Support</span>
                        </button>
                        {booking.status === 'ACTIVE' && (
                          <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-sm ${
                            isDark ? 'bg-navy/50 text-yellow-400' : 'bg-gray-200 text-blue-600'
                          } hover:opacity-80 transition-opacity`}>
                            <Phone className="w-4 h-4" />
                            <span>Emergency Contact</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Booking Summary */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Booking Summary
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {bookings.filter(b => b.status === 'ACTIVE').length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Active
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {bookings.filter(b => b.status === 'UPCOMING').length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Upcoming
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {bookings.filter(b => b.status === 'COMPLETED').length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                      {bookings.length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Total
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/trip-planner')}
                  className={`w-full p-4 rounded-xl font-semibold text-left ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                >
                  Plan New Trip
                </button>
                <button className={`w-full p-4 rounded-xl font-semibold text-left ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:opacity-80 transition-opacity`}>
                  Modify Existing Booking
                </button>
                <button className={`w-full p-4 rounded-xl font-semibold text-left ${
                  isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                } hover:opacity-80 transition-opacity`}>
                  Travel Insurance
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="mb-8">
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Need Help?
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Our 24/7 support team is here to assist you
                </p>
                <div className="space-y-2">
                  <button className={`w-full py-3 rounded-xl font-semibold ${
                    isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                  } hover:opacity-90 transition-opacity`}>
                    Live Chat
                  </button>
                  <button className={`w-full py-3 rounded-xl font-semibold border-2 ${
                    isDark 
                      ? 'border-navy text-navy hover:bg-navy hover:text-white' 
                      : 'border-white text-white hover:bg-white hover:text-blue-600'
                  } transition-all`}>
                    Call Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBookings