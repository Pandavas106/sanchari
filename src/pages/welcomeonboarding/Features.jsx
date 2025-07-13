import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Heart, 
  Award, 
  Shield, 
  Brain, 
  Globe, 
  Calendar, 
  DollarSign, 
  Users, 
  MapPin, 
  Clock, 
  Star,
  Smartphone,
  Headphones,
  TrendingUp,
  CheckCircle
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Features = () => {
  const { isDark } = useTheme()
  const [activeFeature, setActiveFeature] = useState(0)

  const mainFeatures = [
    {
      icon: Zap,
      title: "AI-Powered Planning",
      description: "Our advanced AI analyzes millions of data points to create your perfect trip in seconds",
      color: "from-yellow-400 to-orange-500",
      details: [
        "Smart destination matching based on your preferences",
        "Real-time price optimization",
        "Weather-based itinerary adjustments",
        "Machine learning from travel patterns"
      ]
    },
    {
      icon: Heart,
      title: "Personalized Experience",
      description: "Every recommendation is tailored to your unique preferences and travel style",
      color: "from-pink-500 to-red-500",
      details: [
        "Custom travel profiles",
        "Preference learning algorithm",
        "Behavioral pattern analysis",
        "Adaptive recommendations"
      ]
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handpicked accommodations and experiences that exceed expectations",
      color: "from-purple-500 to-indigo-500",
      details: [
        "Verified premium partners",
        "Quality assurance system",
        "Expert curation team",
        "Exclusive access to unique experiences"
      ]
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data and bookings are protected with enterprise-grade security",
      color: "from-blue-500 to-cyan-500",
      details: [
        "End-to-end encryption",
        "Secure payment processing",
        "Data privacy compliance",
        "24/7 booking protection"
      ]
    }
  ]

  const additionalFeatures = [
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "AI learns your preferences to suggest better trips over time"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Access to destinations and experiences worldwide"
    },
    {
      icon: Calendar,
      title: "Flexible Booking",
      description: "Easy cancellation and modification policies"
    },
    {
      icon: DollarSign,
      title: "Best Price Guarantee",
      description: "We'll match or beat any comparable price"
    },
    {
      icon: Users,
      title: "Group Travel",
      description: "Special features for family and group bookings"
    },
    {
      icon: MapPin,
      title: "Local Insights",
      description: "Insider tips and hidden gems from locals"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service and assistance"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices"
    },
    {
      icon: Headphones,
      title: "Concierge Service",
      description: "Personal travel assistant for premium bookings"
    },
    {
      icon: TrendingUp,
      title: "Real-time Updates",
      description: "Live notifications for flight changes and updates"
    }
  ]

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className={`text-4xl lg:text-5xl font-bold font-playfair mb-6 ${
              isDark ? 'text-white' : 'text-navy'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Why Choose <span className={isDark ? 'text-yellow-400' : 'text-blue-600'}>Sanchari</span>?
          </motion.h2>
          <motion.p 
            className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Experience the future of travel planning with our cutting-edge AI technology and premium service
          </motion.p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {mainFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-8 rounded-2xl ${
                  isDark ? 'bg-navy/50' : 'bg-white/50'
                } backdrop-blur-sm text-center group cursor-pointer relative overflow-hidden`}
                onClick={() => setActiveFeature(index)}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 mx-auto`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {feature.title}
                </h3>
                
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {feature.description}
                </p>

                <motion.div
                  className={`text-sm ${isDark ? 'text-yellow-400' : 'text-blue-600'} font-medium`}
                  whileHover={{ scale: 1.05 }}
                >
                  Learn More →
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Feature Details Modal */}
        {activeFeature !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-16 p-8 rounded-2xl ${
              isDark ? 'bg-navy/70' : 'bg-white/70'
            } backdrop-blur-sm`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {mainFeatures[activeFeature].title}
                </h3>
                <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {mainFeatures[activeFeature].description}
                </p>
                <div className="space-y-3">
                  {mainFeatures[activeFeature].details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                      <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <motion.div
                  className={`w-32 h-32 rounded-full bg-gradient-to-r ${mainFeatures[activeFeature].color} flex items-center justify-center`}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {React.createElement(mainFeatures[activeFeature].icon, {
                    className: "w-16 h-16 text-white"
                  })}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
            More Features
          </h3>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover all the ways we make your travel experience exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-6 rounded-xl ${
                  isDark ? 'bg-navy/30' : 'bg-white/30'
                } backdrop-blur-sm text-center group cursor-pointer`}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl ${
                    isDark ? 'bg-yellow-400/20' : 'bg-blue-600/20'
                  } flex items-center justify-center mb-4 mx-auto`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Icon className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                </motion.div>
                
                <h4 className={`font-semibold text-sm mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {feature.title}
                </h4>
                
                <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className={`px-8 py-4 rounded-xl font-semibold text-lg ${
              isDark 
                ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } transition-all`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Planning Your Trip
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
