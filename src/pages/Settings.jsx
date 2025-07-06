import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Shield, 
  Palette, 
  Globe, 
  DollarSign, 
  MapPin,
  Headphones,
  FileText,
  Info,
  LogOut,
  Sun,
  Moon,
  Bell,
  Smartphone,
  Eye,
  Download,
  Trash2,
  Check,
  AlertTriangle
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, BottomNavbar } from '../components'
import { 
  PersonalInfoModal, 
  PaymentMethodsModal, 
  PrivacySecurityModal, 
  LanguageCurrencyModal, 
  HelpSupportModal 
} from '../components/settings'

const Settings = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  })

  // Modal states
  const [activeModal, setActiveModal] = useState(null)
  
  // User data states
  const [userInfo, setUserInfo] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1990-05-15',
    location: 'New York, NY',
    bio: 'Travel enthusiast who loves exploring new cultures and destinations.',
    profileImage: null
  })

  const [languageCurrencySettings, setLanguageCurrencySettings] = useState({
    language: 'en-US',
    currency: 'USD',
    region: 'US'
  })

  const [locationServices, setLocationServices] = useState(true)

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { 
          icon: User, 
          title: "Personal Information", 
          subtitle: "Name, email, phone number", 
          color: "text-amber-500",
          action: () => setActiveModal('personalInfo')
        },
        { 
          icon: CreditCard, 
          title: "Payment Methods", 
          subtitle: "Cards, wallets, billing", 
          color: "text-blue-500",
          action: () => setActiveModal('paymentMethods')
        },
        { 
          icon: Shield, 
          title: "Privacy & Security", 
          subtitle: "Password, biometrics, data", 
          color: "text-purple-500",
          action: () => setActiveModal('privacySecurity')
        },
        { 
          icon: Bell, 
          title: "Notifications", 
          subtitle: "Email, push, SMS preferences", 
          color: "text-green-500", 
          expandable: true 
        }
      ]
    },
    {
      title: "Preferences", 
      items: [
        { 
          icon: Palette, 
          title: "Theme", 
          subtitle: isDark ? "Dark mode" : "Light mode", 
          color: "text-amber-500", 
          toggle: true,
          action: toggleTheme
        },
        { 
          icon: Globe, 
          title: "Language & Currency", 
          subtitle: `${languageCurrencySettings.language.split('-')[0].toUpperCase()} • ${languageCurrencySettings.currency}`, 
          color: "text-brown-500",
          action: () => setActiveModal('languageCurrency')
        },
        { 
          icon: MapPin, 
          title: "Location Services", 
          subtitle: locationServices ? "Always allow" : "Disabled", 
          color: "text-blue-500", 
          toggle: true,
          action: () => setLocationServices(!locationServices)
        }
      ]
    },
    {
      title: "Data & Privacy",
      items: [
        { 
          icon: Download, 
          title: "Download Data", 
          subtitle: "Export your travel data", 
          color: "text-blue-500",
          action: () => {
            // Simulate data export
            alert('Data export request submitted. You will receive an email with download link within 24 hours.')
          }
        },
        { 
          icon: Eye, 
          title: "Privacy Settings", 
          subtitle: "Control data visibility", 
          color: "text-purple-500",
          action: () => setActiveModal('privacySecurity')
        },
        { 
          icon: Trash2, 
          title: "Delete Account", 
          subtitle: "Permanently remove account", 
          color: "text-red-500",
          action: () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
              alert('Account deletion request submitted. You will receive a confirmation email.')
            }
          }
        }
      ]
    },
    {
      title: "Support & About",
      items: [
        { 
          icon: Headphones, 
          title: "Help & Support", 
          subtitle: "Get assistance", 
          color: "text-amber-500",
          action: () => setActiveModal('helpSupport')
        },
        { 
          icon: FileText, 
          title: "Terms & Conditions", 
          subtitle: "Legal information", 
          color: "text-brown-500",
          action: () => window.open('/terms', '_blank')
        },
        { 
          icon: Shield, 
          title: "Privacy Policy", 
          subtitle: "How we protect your data", 
          color: "text-green-500",
          action: () => window.open('/privacy', '_blank')
        },
        { 
          icon: Info, 
          title: "About Sanchari", 
          subtitle: "Version 2.4.1", 
          color: "text-blue-500",
          action: () => setActiveModal('about')
        }
      ]
    }
  ]

  const [expandedItem, setExpandedItem] = useState(null)

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  const handleUserInfoSave = (newUserInfo) => {
    setUserInfo(newUserInfo)
    // Here you would typically save to backend
    console.log('User info saved:', newUserInfo)
  }

  const handleLanguageCurrencySave = (newSettings) => {
    setLanguageCurrencySettings(newSettings)
    // Here you would typically save to backend
    console.log('Language/Currency settings saved:', newSettings)
  }

  const handleSignOut = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // Clear user data and redirect to login
      navigate('/login')
    }
  }

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => {}}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={2}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            Settings
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Profile Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                    {userInfo.profileImage ? (
                      <img src={userInfo.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-2xl font-bold text-navy">
                        {userInfo.firstName[0]}{userInfo.lastName[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>
                      {userInfo.firstName} {userInfo.lastName}
                    </h2>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {userInfo.email}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                      <span className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                        Premium Member
                      </span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModal('personalInfo')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                    } hover:opacity-90 transition-opacity`}
                  >
                    Edit Profile
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Settings Groups */}
            <div className="space-y-8">
              {settingsGroups.map((group, groupIndex) => (
                <motion.div 
                  key={groupIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    {group.title}
                  </h3>
                  <div className="space-y-3">
                    {group.items.map((item, itemIndex) => {
                      const Icon = item.icon
                      const isExpanded = expandedItem === `${groupIndex}-${itemIndex}`
                      
                      return (
                        <div key={itemIndex}>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            onClick={() => {
                              if (item.expandable) {
                                setExpandedItem(isExpanded ? null : `${groupIndex}-${itemIndex}`)
                              } else if (item.action) {
                                item.action()
                              }
                            }}
                            className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer transition-all hover:shadow-lg`}
                          >
                            <div className="flex items-center space-x-4">
                              <div className={`w-12 h-12 rounded-xl ${item.color} bg-opacity-20 flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${item.color}`} />
                              </div>
                              <div className="flex-1">
                                <h4 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                                  {item.title}
                                </h4>
                                {item.subtitle && (
                                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              {item.toggle ? (
                                <div className="flex items-center space-x-2">
                                  {item.title === 'Theme' && (
                                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                      {isDark ? 'Dark' : 'Light'}
                                    </span>
                                  )}
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="sr-only peer"
                                      checked={item.title === 'Theme' ? isDark : locationServices}
                                      onChange={item.action}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                                  </label>
                                </div>
                              ) : (
                                <div className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {item.expandable ? (isExpanded ? '−' : '+') : '→'}
                                </div>
                              )}
                            </div>
                          </motion.div>

                          {/* Expanded Notifications Section */}
                          {item.expandable && isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className={`mt-3 p-6 rounded-2xl ${isDark ? 'bg-navy/30' : 'bg-white/30'} backdrop-blur-sm`}
                            >
                              <h5 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                                Notification Preferences
                              </h5>
                              <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                  <div key={key} className="flex items-center justify-between">
                                    <div>
                                      <h6 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)} Notifications
                                      </h6>
                                      <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {key === 'email' && 'Receive updates via email'}
                                        {key === 'push' && 'Get push notifications on your device'}
                                        {key === 'sms' && 'Receive SMS for urgent updates'}
                                        {key === 'marketing' && 'Get promotional offers and deals'}
                                      </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                      <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={value}
                                        onChange={() => handleNotificationChange(key)}
                                      />
                                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sign Out */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSignOut}
                className="w-full py-4 bg-red-500/20 rounded-2xl font-semibold text-red-500 flex items-center justify-center space-x-2 hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Account Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Account Overview
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Member Since</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>Jan 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Total Trips</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>24</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Countries Visited</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>12</span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Travel Points</span>
                  <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>2,450</span>
                </div>
              </div>
            </motion.div>

            {/* Security Status */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Security Status
              </h3>
              <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm space-y-4`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Two-Factor Authentication
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Enabled
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Strong Password
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Last updated 2 months ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Email Verification
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Pending verification
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h3 className={`font-bold text-xl mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveModal('paymentMethods')}
                  className={`w-full p-4 rounded-xl font-semibold text-left ${
                    isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                  } hover:opacity-90 transition-opacity`}
                >
                  Update Payment Method
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveModal('privacySecurity')}
                  className={`w-full p-4 rounded-xl font-semibold text-left ${
                    isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                  } hover:opacity-80 transition-opacity`}
                >
                  Change Password
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-4 rounded-xl font-semibold text-left ${
                    isDark ? 'bg-navy/50 text-white' : 'bg-white/50 text-navy'
                  } hover:opacity-80 transition-opacity`}
                >
                  Manage Subscriptions
                </motion.button>
              </div>
            </motion.div>

            {/* App Info */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <div className={`p-6 rounded-xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
                <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                  Sanchari v2.4.1
                </h3>
                <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                  You're using the latest version
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                  } hover:opacity-90 transition-opacity`}
                >
                  Check for Updates
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PersonalInfoModal 
        isOpen={activeModal === 'personalInfo'}
        onClose={() => setActiveModal(null)}
        userInfo={userInfo}
        onSave={handleUserInfoSave}
      />
      
      <PaymentMethodsModal 
        isOpen={activeModal === 'paymentMethods'}
        onClose={() => setActiveModal(null)}
      />
      
      <PrivacySecurityModal 
        isOpen={activeModal === 'privacySecurity'}
        onClose={() => setActiveModal(null)}
      />
      
      <LanguageCurrencyModal 
        isOpen={activeModal === 'languageCurrency'}
        onClose={() => setActiveModal(null)}
        currentSettings={languageCurrencySettings}
        onSave={handleLanguageCurrencySave}
      />
      
      <HelpSupportModal 
        isOpen={activeModal === 'helpSupport'}
        onClose={() => setActiveModal(null)}
      />

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={2} />
    </div>
  )
}

export default Settings