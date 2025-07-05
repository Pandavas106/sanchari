import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sun, Moon, Plane, Star, Users, Globe } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const onboardingData = [
  {
    title: "Your Journey, Curated by AI",
    subtitle: "Discover premium travel experiences, tailored just for you with cutting-edge artificial intelligence.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    features: ["AI-Powered Recommendations", "Personalized Itineraries", "Smart Budget Planning"]
  },
  {
    title: "Luxury Travel, Smarter Planning",
    subtitle: "AI-crafted itineraries that match your dreams, not just your budget. Experience travel like never before.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    features: ["Premium Destinations", "Exclusive Deals", "24/7 Concierge Support"]
  },
  {
    title: "Wander. Discover. Live.",
    subtitle: "From flights to flavors — explore every detail with elegance and sophistication.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    features: ["Complete Travel Solutions", "Local Experiences", "Seamless Booking"]
  }
]

const stats = [
  { number: "50K+", label: "Happy Travelers" },
  { number: "200+", label: "Destinations" },
  { number: "4.9", label: "Average Rating" },
  { number: "24/7", label: "Support" }
]

const WelcomeOnboarding = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const nextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      navigate('/login')
    }
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient} relative overflow-hidden`}>
      {/* Header */}
      <header className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <Plane className={`w-7 h-7 ${isDark ? 'text-navy' : 'text-white'}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold font-playfair ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`}>
                  Sanchari
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Travel. Discover. Live.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button className={`font-semibold hover:opacity-80 transition-opacity ${
                isDark ? 'text-white' : 'text-navy'
              }`}>
                Features
              </button>
              <button className={`font-semibold hover:opacity-80 transition-opacity ${
                isDark ? 'text-white' : 'text-navy'
              }`}>
                Destinations
              </button>
              <button className={`font-semibold hover:opacity-80 transition-opacity ${
                isDark ? 'text-white' : 'text-navy'
              }`}>
                About
              </button>
              <button className={`font-semibold hover:opacity-80 transition-opacity ${
                isDark ? 'text-white' : 'text-navy'
              }`}>
                Contact
              </button>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2">
                {isDark ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </button>
              <button 
                onClick={() => navigate('/login')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Title */}
                <h1 className={`text-4xl lg:text-6xl font-bold font-playfair leading-tight ${
                  isDark ? 'text-white' : 'text-navy'
                }`}>
                  {onboardingData[currentPage].title.split(' ').map((word, index) => {
                    const isHighlighted = ['Journey', 'AI', 'Luxury', 'Planning', 'Discover'].includes(word)
                    return (
                      <span
                        key={index}
                        className={isHighlighted ? (isDark ? 'text-yellow-400' : 'text-blue-600') : ''}
                      >
                        {word}{' '}
                      </span>
                    )
                  })}
                </h1>

                {/* Subtitle */}
                <p className={`text-xl lg:text-2xl leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {onboardingData[currentPage].subtitle}
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {onboardingData[currentPage].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-yellow-400' : 'bg-blue-600'
                      }`}>
                        <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                          ✓
                        </span>
                      </div>
                      <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
                  <button
                    onClick={nextPage}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 ${
                      isDark 
                        ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <span>{currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all ${
                      isDark 
                        ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy' 
                        : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    Skip to Login
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Page Indicators */}
            <div className="flex space-x-3">
              {onboardingData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-12 h-3 rounded-full transition-all ${
                    index === currentPage
                      ? (isDark ? 'bg-yellow-400' : 'bg-blue-600')
                      : (isDark ? 'bg-white/30' : 'bg-gray-400')
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src={onboardingData[currentPage].image}
                  alt="Travel"
                  className="w-full h-96 lg:h-[600px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl" />
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 lg:-left-12">
                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/90' : 'bg-white/90'} backdrop-blur-md shadow-xl`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-yellow-400' : 'bg-blue-600'
                      }`}>
                        <Star className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                          4.9/5
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          User Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 lg:-right-12">
                  <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/90' : 'bg-white/90'} backdrop-blur-md shadow-xl`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isDark ? 'bg-yellow-400' : 'bg-blue-600'
                      }`}>
                        <Users className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
                      </div>
                      <div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                          50K+
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Happy Travelers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl lg:text-5xl font-bold mb-2 ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`}>
                  {stat.number}
                </div>
                <div className={`text-lg font-semibold ${
                  isDark ? 'text-white' : 'text-navy'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`mt-20 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md bg-white/10`}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <Plane className={`w-5 h-5 ${isDark ? 'text-navy' : 'text-white'}`} />
              </div>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                © 2024 Sanchari. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className={`text-sm hover:opacity-80 transition-opacity ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Privacy Policy
              </button>
              <button className={`text-sm hover:opacity-80 transition-opacity ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Terms of Service
              </button>
              <button className={`text-sm hover:opacity-80 transition-opacity ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WelcomeOnboarding