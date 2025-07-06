import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Headphones, MessageCircle, Phone, Mail, Search, ChevronDown, ChevronRight } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const HelpSupportModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('faq')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  })

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: Search },
    { id: 'contact', label: 'Contact Us', icon: MessageCircle },
    { id: 'live-chat', label: 'Live Chat', icon: Headphones }
  ]

  const faqs = [
    {
      id: 1,
      question: 'How do I cancel my booking?',
      answer: 'You can cancel your booking up to 24 hours before departure. Go to My Bookings, select your trip, and click Cancel. Refund policies vary by booking type.',
      category: 'Bookings'
    },
    {
      id: 2,
      question: 'How does AI trip planning work?',
      answer: 'Our AI analyzes your preferences, budget, travel dates, and millions of data points to create personalized itineraries. It considers weather, local events, and your interests.',
      category: 'AI Features'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are securely processed.',
      category: 'Payments'
    },
    {
      id: 4,
      question: 'Can I modify my trip after booking?',
      answer: 'Yes, you can modify most bookings. Changes may incur fees depending on the supplier and timing. Contact our support team for assistance with modifications.',
      category: 'Bookings'
    },
    {
      id: 5,
      question: 'How do I earn and use travel points?',
      answer: 'Earn points with every booking, review, and referral. 100 points = $1. Use points at checkout or save them for bigger discounts on future trips.',
      category: 'Rewards'
    },
    {
      id: 6,
      question: 'Is my personal data secure?',
      answer: 'Yes, we use enterprise-grade encryption and follow strict privacy policies. Your data is never shared without consent and is protected by industry-leading security measures.',
      category: 'Privacy'
    }
  ]

  const contactOptions = [
    {
      type: 'email',
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@sanchari.com',
      icon: Mail,
      available: '24/7'
    },
    {
      type: 'phone',
      title: 'Phone Support',
      description: 'Speak with our travel experts',
      contact: '+1 (555) 123-4567',
      icon: Phone,
      available: '9 AM - 9 PM EST'
    },
    {
      type: 'chat',
      title: 'Live Chat',
      description: 'Instant help from our support team',
      contact: 'Start Chat',
      icon: MessageCircle,
      available: '24/7'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleContactSubmit = () => {
    console.log('Contact form submitted:', contactForm)
    setContactForm({ subject: '', message: '', priority: 'medium' })
    // Show success message
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-200'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 p-6 border-b border-gray-300 bg-inherit rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Headphones className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Help & Support
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 mt-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                      activeTab === tab.id
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'text-white hover:bg-white/10' : 'text-navy hover:bg-navy/10')
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search frequently asked questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white placeholder-gray-400' 
                        : 'bg-gray-100 text-navy placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`rounded-xl border ${
                        isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30'
                      } backdrop-blur-sm overflow-hidden`}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full p-6 text-left flex items-center justify-between hover:bg-opacity-80 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                            }`}>
                              {faq.category}
                            </span>
                          </div>
                          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                            {faq.question}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedFaq === faq.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedFaq === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-6 pb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-12">
                    <Search className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                    <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      No results found
                    </h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Try different keywords or contact our support team
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8">
                {/* Contact Options */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Contact Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {contactOptions.map((option, index) => {
                      const Icon = option.icon
                      return (
                        <motion.div
                          key={option.type}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} text-center`}
                        >
                          <Icon className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                          <h4 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                            {option.title}
                          </h4>
                          <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {option.description}
                          </p>
                          <div className={`font-semibold mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                            {option.contact}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Available: {option.available}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Send us a Message
                  </h3>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} space-y-4`}>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        placeholder="What can we help you with?"
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white placeholder-gray-400' 
                            : 'bg-white text-navy placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        Priority
                      </label>
                      <select
                        value={contactForm.priority}
                        onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white' 
                            : 'bg-white text-navy'
                        } focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="low">Low - General inquiry</option>
                        <option value="medium">Medium - Need assistance</option>
                        <option value="high">High - Urgent issue</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                        Message
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        placeholder="Please describe your issue or question in detail..."
                        rows={6}
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white placeholder-gray-400' 
                            : 'bg-white text-navy placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>

                    <button
                      onClick={handleContactSubmit}
                      className={`w-full py-3 rounded-xl font-semibold ${
                        isDark 
                          ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } transition-colors`}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'live-chat' && (
              <div className="space-y-6">
                {/* Chat Interface */}
                <div className={`h-96 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} p-6 flex flex-col`}>
                  <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-300">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                        Support Agent
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Online
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">S</span>
                      </div>
                      <div className={`p-3 rounded-xl max-w-xs ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-navy'}`}>
                        <p className="text-sm">
                          Hi! I'm here to help you with any questions about your travel plans. How can I assist you today?
                        </p>
                        <span className={`text-xs mt-1 block ${isDark ? 'text-blue-200' : 'text-blue-600'}`}>
                          Just now
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className={`flex-1 p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white placeholder-gray-400' 
                            : 'bg-white text-navy placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      <button className={`px-6 py-3 rounded-xl font-semibold ${
                        isDark 
                          ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      } transition-colors`}>
                        Send
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      'Booking Help',
                      'Payment Issues',
                      'Trip Changes',
                      'Refund Request'
                    ].map((action, index) => (
                      <motion.button
                        key={action}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-xl border-2 border-dashed ${
                          isDark ? 'border-gray-600 hover:border-yellow-400 text-white' : 'border-gray-300 hover:border-blue-600 text-navy'
                        } transition-colors text-center font-semibold`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {action}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default HelpSupportModal