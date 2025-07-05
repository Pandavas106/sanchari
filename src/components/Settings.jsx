import React from 'react'
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
  Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Settings = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { icon: User, title: "Personal Information", subtitle: "Name, email, phone number", color: "text-amber-500" },
        { icon: CreditCard, title: "Payment Methods", subtitle: "Cards, wallets, billing", color: "text-blue-500" },
        { icon: Shield, title: "Privacy & Security", subtitle: "Password, biometrics, data", color: "text-purple-500" }
      ]
    },
    {
      title: "Preferences", 
      items: [
        { icon: Palette, title: "Theme", subtitle: "Dark mode", color: "text-amber-500", toggle: true },
        { icon: Globe, title: "Language", subtitle: "English (US)", color: "text-brown-500" },
        { icon: DollarSign, title: "Currency", subtitle: "USD ($)", color: "text-green-500" },
        { icon: MapPin, title: "Location Services", subtitle: "Always allow", color: "text-blue-500", toggle: true }
      ]
    },
    {
      title: "Support & About",
      items: [
        { icon: Headphones, title: "Help & Support", subtitle: "", color: "text-amber-500" },
        { icon: FileText, title: "Terms & Conditions", subtitle: "", color: "text-brown-500" },
        { icon: Shield, title: "Privacy Policy", subtitle: "", color: "text-green-500" },
        { icon: Info, title: "About Sanchari", subtitle: "Version 2.4.1", color: "text-blue-500" }
      ]
    }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-12">
          <button 
            onClick={() => navigate('/profile')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            Settings
          </h1>
          <button onClick={toggleTheme} className="p-2">
            {isDark ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Profile Preview */}
        <div className="px-6 mb-6">
          <div className={`p-4 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}>
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-navy">S</span>
              </div>
              <div className="flex-1">
                <h2 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                  Sarah Johnson
                </h2>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  sarah.johnson@email.com
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full" />
                  <span className={`text-sm font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    Premium Member
                  </span>
                </div>
              </div>
              <div className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                →
              </div>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        <div className="px-6 space-y-6 mb-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm cursor-pointer`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl ${item.color} bg-opacity-20 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${item.color}`} />
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
                                checked={item.title === 'Theme' ? isDark : true}
                                onChange={item.title === 'Theme' ? toggleTheme : undefined}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                        ) : (
                          <div className={`w-6 h-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            →
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sign Out */}
        <div className="px-6 pb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-red-500 rounded-2xl font-semibold text-white flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Settings