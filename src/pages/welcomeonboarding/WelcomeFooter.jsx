import React from 'react'
import { motion } from 'framer-motion'
import { Plane, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const WelcomeFooter = () => {
  const { isDark } = useTheme()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#team' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press', href: '#press' }
    ],
    services: [
      { name: 'Trip Planning', href: '#trip-planning' },
      { name: 'Destinations', href: '#destinations' },
      { name: 'Travel Insurance', href: '#insurance' },
      { name: 'Group Bookings', href: '#group-bookings' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact Us', href: '#contact' },
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' }
    ]
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' }
  ]

  const contactInfo = [
    { icon: Mail, text: 'support@sanchari.com', href: 'mailto:support@sanchari.com' },
    { icon: Phone, text: '+91 99999 99999', href: 'tel:+919999999999' },
    { icon: MapPin, text: 'Mumbai, India', href: '#' }
  ]

  return (
    <motion.footer 
      className={`mt-20 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-md bg-white/10`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-yellow-400' : 'bg-blue-600'
                }`}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Plane className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
              </motion.div>
              <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                Sanchari
              </span>
            </motion.div>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
              Your AI-powered travel companion, crafting unforgettable journeys with personalized recommendations and premium experiences.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    className={`flex items-center space-x-3 text-sm ${
                      isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{info.text}</span>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className={`text-sm ${
                      isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
              Services
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className={`text-sm ${
                      isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
              Support
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className={`text-sm ${
                      isDark ? 'text-gray-300 hover:text-yellow-400' : 'text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div 
          className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-8 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
              Stay Updated
            </h3>
            <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Subscribe to our newsletter for exclusive deals and travel tips
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 rounded-lg border ${
                  isDark 
                    ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                  isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                }`}
              />
              <motion.button
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-8`}>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="mb-4 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                © 2024 Sanchari. All rights reserved.
              </span>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-navy/50 text-gray-300 hover:text-yellow-400' : 'bg-white/50 text-gray-600 hover:text-blue-600'
                    } transition-colors`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

export default WelcomeFooter
