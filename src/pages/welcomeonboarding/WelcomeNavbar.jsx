import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const WelcomeNavbar = ({ activeSection = 'home', setActiveSection }) => {
  const [isHovering, setIsHovering] = useState(false)
  const navigate = useNavigate()
  const { isDark } = useTheme()

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Destinations', id: 'destinations' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ]

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId)
    // Smooth scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            onClick={() => {
              setActiveSection('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}
              animate={{ 
                rotate: isHovering ? 360 : 0,
                scale: isHovering ? 1.1 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <Plane className={`w-7 h-7 ${isDark ? 'text-navy' : 'text-white'}`} />
            </motion.div>
            <div>
              <motion.h1 
                className={`text-2xl font-bold font-playfair ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`}
                animate={{ 
                  color: isHovering ? (isDark ? '#fbbf24' : '#2563eb') : undefined 
                }}
              >
                Sanchari
              </motion.h1>
              <motion.p 
                className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Travel. Discover. Live.
              </motion.p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-semibold hover:opacity-80 transition-opacity relative ${
                  isDark ? 'text-white' : 'text-navy'
                } ${activeSection === item.id ? 'opacity-100' : 'opacity-80'}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <motion.div
                  className={`absolute -bottom-1 left-0 h-0.5 ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === item.id ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <motion.button 
              onClick={() => navigate('/login')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all relative overflow-hidden ${
                isDark 
                  ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10">Sign In</span>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default WelcomeNavbar
