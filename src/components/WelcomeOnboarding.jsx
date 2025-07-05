import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const onboardingData = [
  {
    title: "Your Journey, Curated by AI",
    subtitle: "Discover premium travel experiences, tailored just for you.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Luxury Travel, Smarter Planning",
    subtitle: "AI-crafted itineraries that match your dreams, not just your budget.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Wander. Discover. Live.",
    subtitle: "From flights to flavors — explore every detail with elegance.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
  }
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
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-600" />
        )}
      </button>

      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md mx-auto"
          >
            {/* Image */}
            <div className="mb-8">
              <img
                src={onboardingData[currentPage].image}
                alt="Travel"
                className="w-80 h-80 object-cover rounded-3xl mx-auto shadow-2xl"
              />
            </div>

            {/* Title */}
            <h1 className={`text-3xl font-bold font-playfair mb-4 ${
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
            <p className={`text-lg mb-12 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              {onboardingData[currentPage].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex flex-col items-center space-y-8">
          {/* Next Button */}
          <button
            onClick={nextPage}
            className={`px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all transform hover:scale-105 ${
              isDark 
                ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <span>{currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Page Indicators */}
          <div className="flex space-x-3">
            {onboardingData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPage
                    ? (isDark ? 'bg-yellow-400' : 'bg-blue-600')
                    : (isDark ? 'bg-white/30' : 'bg-gray-400')
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeOnboarding