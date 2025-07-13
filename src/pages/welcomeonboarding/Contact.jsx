import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Headphones,
  Globe,
  CheckCircle,
  User,
  Building,
  Calendar,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Contact = () => {
  const { isDark } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "support@sanchari.com",
      description: "Get in touch for any inquiries",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 99999 99999",
      description: "Available 24/7 for urgent matters",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Mumbai, India",
      description: "Come visit our headquarters",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "24/7 Support",
      description: "We're here whenever you need us",
      color: "from-orange-500 to-red-500"
    }
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Support' },
    { value: 'technical', label: 'Technical Issue' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media & Press' }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-700' }
  ]

  const faqItems = [
    {
      question: "How does AI trip planning work?",
      answer: "Our AI analyzes your preferences, budget, and travel style to create personalized itineraries that match your unique needs."
    },
    {
      question: "Can I modify my booking after confirmation?",
      answer: "Yes, most bookings can be modified up to 24 hours before your trip. Check your booking details for specific policies."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, net banking, and popular digital wallets like UPI, Paytm, and Google Pay."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use enterprise-grade encryption and follow strict data protection guidelines to keep your information safe."
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      })
    }, 3000)
  }

  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
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
            Get in <span className={isDark ? 'text-yellow-400' : 'text-blue-600'}>Touch</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Have questions? We're here to help you plan your perfect journey
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm text-center group cursor-pointer`}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 mx-auto`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {info.title}
                </h3>
                <p className={`font-semibold text-lg mb-2 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                  {info.value}
                </p>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {info.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Main Content - Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
              Send us a Message
            </h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-yellow-400' : 'text-green-500'}`} />
                <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Message Sent Successfully!
                </h4>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          isDark 
                            ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                        }`}
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          isDark 
                            ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                        }`}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                          isDark 
                            ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                          isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                        }`}
                        placeholder="+91 99999 99999"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDark 
                          ? 'bg-navy/50 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-navy'
                      } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                        isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                      }`}
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                    }`}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDark 
                        ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
                    } resize-none`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all ${
                    isDark 
                      ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* FAQ Section */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`border-b ${isDark ? 'border-gray-600' : 'border-gray-200'} pb-4`}
                  >
                    <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                      {item.question}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                Follow Us
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Stay connected with us on social media for the latest updates and travel inspiration.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`w-12 h-12 rounded-full ${
                        isDark ? 'bg-navy/50' : 'bg-white/50'
                      } flex items-center justify-center ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      } ${social.color} transition-colors`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.a>
                  )
                })}
              </div>
            </div>

            {/* Support Hours */}
            <div className={`p-8 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                Support Hours
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Headphones className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      24/7 Live Chat
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Always available for urgent matters
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Phone Support
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Mon-Fri: 9AM-6PM IST
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Email Support
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
