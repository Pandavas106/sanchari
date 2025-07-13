import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronRight, Plane, Star, Users, Globe, Play, Pause, Volume2, VolumeX, ArrowDown, MapPin, Calendar, Heart, Award, Shield, Zap } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { WelcomeNavbar, WelcomeFooter, Features, Destinations, About, Contact } from './welcomeonboarding/index'

const onboardingData = [
  {
    title: "Your Journey, Curated by AI",
    subtitle: "Discover premium travel experiences, tailored just for you with cutting-edge artificial intelligence.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
    features: ["AI-Powered Recommendations", "Personalized Itineraries", "Smart Budget Planning"],
    color: "from-blue-600 to-purple-600"
  },
  {
    title: "Luxury Travel, Smarter Planning",
    subtitle: "AI-crafted itineraries that match your dreams, not just your budget. Experience travel like never before.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    features: ["Premium Destinations", "Exclusive Deals", "24/7 Concierge Support"],
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Wander. Discover. Live.",
    subtitle: "From flights to flavors — explore every detail with elegance and sophistication.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    features: ["Complete Travel Solutions", "Local Experiences", "Seamless Booking"],
    color: "from-pink-600 to-orange-600"
  }
]

const stats = [
  { number: "50K+", label: "Happy Travelers", icon: Users, color: "text-blue-500" },
  { number: "200+", label: "Destinations", icon: Globe, color: "text-green-500" },
  { number: "4.9", label: "Average Rating", icon: Star, color: "text-yellow-500" },
  { number: "24/7", label: "Support", icon: Shield, color: "text-purple-500" }
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    quote: "Sanchari transformed how I plan my trips. The AI recommendations were spot-on!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Business Traveler",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "The luxury experiences curated by Sanchari exceeded all my expectations.",
    rating: 5
  },
  {
    name: "Emma Rodriguez",
    role: "Adventure Seeker",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    quote: "Found hidden gems I never would have discovered on my own. Amazing!",
    rating: 5
  }
]

const WelcomeOnboarding = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setCurrentPage(prev => (prev + 1) % onboardingData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Testimonial auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'destinations', 'about', 'contact']
      const scrollPos = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section === 'home' ? 'hero' : section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Parallax Background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-3xl" />
      </motion.div>

      {/* Header */}
      <WelcomeNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 relative">
              <motion.div
                style={{
                  transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                }}
              >
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
                    <motion.h1 
                      className={`text-4xl lg:text-6xl font-bold font-playfair leading-tight ${
                        isDark ? 'text-white' : 'text-navy'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {onboardingData[currentPage].title.split(' ').map((word, index) => {
                        const isHighlighted = ['Journey', 'AI', 'Luxury', 'Planning', 'Discover'].includes(word)
                        return (
                          <motion.span
                            key={index}
                            className={isHighlighted ? (isDark ? 'text-yellow-400' : 'text-blue-600') : ''}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {word}{' '}
                          </motion.span>
                        )
                      })}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                      className={`text-xl lg:text-2xl leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {onboardingData[currentPage].subtitle}
                    </motion.p>

                    {/* Features */}
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {onboardingData[currentPage].features.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ x: 10, scale: 1.02 }}
                        >
                          <motion.div 
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isDark ? 'bg-yellow-400' : 'bg-blue-600'
                            }`}
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                              ✓
                            </span>
                          </motion.div>
                          <span className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div 
                      className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        onClick={nextPage}
                        className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all transform relative overflow-hidden ${
                          isDark 
                            ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">{currentPage === onboardingData.length - 1 ? 'Get Started' : 'Next'}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ChevronRight className="w-5 h-5 relative z-10" />
                        </motion.div>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => navigate('/login')}
                        className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all relative overflow-hidden ${
                          isDark 
                            ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy' 
                            : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Skip to Login</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Page Indicators with Controls */}
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex space-x-3">
                  {onboardingData.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`h-3 rounded-full transition-all ${
                        index === currentPage
                          ? (isDark ? 'bg-yellow-400 w-12' : 'bg-blue-600 w-12')
                          : (isDark ? 'bg-white/30 w-3' : 'bg-gray-400 w-3')
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
                
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={() => setIsAutoPlay(!isAutoPlay)}
                    className={`p-2 rounded-full ${
                      isDark ? 'bg-navy/50 text-yellow-400' : 'bg-white/50 text-blue-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-2 rounded-full ${
                      isDark ? 'bg-navy/50 text-yellow-400' : 'bg-white/50 text-blue-600'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Content - Interactive Image */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.2, rotateY: -90 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                  style={{
                    transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                  }}
                >
                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={onboardingData[currentPage].image}
                      alt="Travel"
                      className="w-full h-96 lg:h-[600px] object-cover"
                    />
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-t ${onboardingData[currentPage].color} opacity-20`}
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>
                  
                  {/* Floating Stats */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 lg:-left-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/90' : 'bg-white/90'} backdrop-blur-md shadow-xl`}>
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-yellow-400' : 'bg-blue-600'
                          }`}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                          <Star className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
                        </motion.div>
                        <div>
                          <motion.div 
                            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            4.9/5
                          </motion.div>
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            User Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="absolute -top-6 -right-6 lg:-right-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/90' : 'bg-white/90'} backdrop-blur-md shadow-xl`}>
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            isDark ? 'bg-yellow-400' : 'bg-blue-600'
                          }`}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Users className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
                        </motion.div>
                        <div>
                          <motion.div 
                            className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            50K+
                          </motion.div>
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Happy Travelers
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex flex-col items-center space-y-2 ${isDark ? 'text-white' : 'text-navy'}`}
            >
              <span className="text-sm font-medium">Scroll to explore</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* Destinations Section */}
      <Destinations />

      {/* Testimonials Section */}
      <motion.div 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-4xl lg:text-5xl font-bold font-playfair mb-6 ${
              isDark ? 'text-white' : 'text-navy'
            }`}>
              What Our Travelers Say
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className={`max-w-4xl mx-auto p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center`}
              >
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <blockquote className={`text-2xl lg:text-3xl font-medium mb-8 ${
                  isDark ? 'text-white' : 'text-navy'
                }`}>
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <motion.img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {testimonials[activeTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial
                      ? (isDark ? 'bg-yellow-400' : 'bg-blue-600')
                      : (isDark ? 'bg-white/30' : 'bg-gray-400')
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-all`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </motion.div>
                  <motion.div 
                    className={`text-4xl lg:text-5xl font-bold mb-2 ${
                      isDark ? 'text-yellow-400' : 'text-blue-600'
                    }`}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-navy'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <WelcomeFooter />
    </div>
  )
}

export default WelcomeOnboarding
