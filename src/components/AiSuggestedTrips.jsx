import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Star, Edit, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const AiSuggestedTrips = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [trips, setTrips] = useState(null)
  const [loading, setLoading] = useState(true)

  // Simulate API call
  useEffect(() => {
    const fetchTrips = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setTrips([
        {
          title: "Kerala Backwaters & Hills",
          description: "Experience the serene backwaters of Alleppey and the misty hills of Munnar in this carefully curated Kerala journey.",
          price: "₹45,000",
          duration: "6 Days",
          rating: "4.8",
          imageUrl: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Rajasthan Royal Heritage",
          description: "Discover the royal palaces and vibrant culture of Rajasthan with stays in heritage hotels.",
          price: "₹65,000", 
          duration: "8 Days",
          rating: "4.9",
          imageUrl: "https://images.unsplash.com/photo-1599661046827-dacde6976549?auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Himalayan Adventure",
          description: "Trek through the stunning landscapes of Himachal Pradesh with mountain views and adventure activities.",
          price: "₹35,000",
          duration: "5 Days", 
          rating: "4.7",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
        }
      ])
      setLoading(false)
    }

    fetchTrips()
  }, [])

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const ShimmerCard = () => (
    <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm mb-4`}>
      <div className="animate-pulse">
        <div className={`h-32 rounded-xl mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div className={`h-6 rounded mb-2 ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
        <div className={`h-4 rounded mb-4 w-3/4 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
        <div className="flex justify-between items-center">
          <div className={`h-4 rounded w-20 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
          <div className={`h-8 rounded w-24 ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            AI Suggested Trips
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Budget Recommendation */}
        <div className="px-6 mb-6">
          <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Perfect for your budget
                </h3>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Based on ₹50,000 budget preference
                </p>
              </div>
              <button className={`p-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
                <Edit className={`w-5 h-5 ${isDark ? 'text-navy' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Trip Cards */}
        <div className="px-6 space-y-4">
          {loading ? (
            <>
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </>
          ) : (
            trips?.map((trip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`rounded-2xl overflow-hidden ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
                onClick={() => navigate('/trip-details')}
              >
                <img
                  src={trip.imageUrl}
                  alt={trip.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {trip.title}
                  </h3>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {trip.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {trip.duration}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {trip.rating}
                        </span>
                      </div>
                    </div>
                    <span className={`font-bold text-lg ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      {trip.price}
                    </span>
                  </div>
                  <button className={`w-full py-3 rounded-xl font-semibold ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-all`}>
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AiSuggestedTrips