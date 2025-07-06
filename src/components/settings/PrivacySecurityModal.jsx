import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Shield, Lock, Eye, EyeOff, Smartphone, Key, AlertTriangle, Check } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const PrivacySecurityModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState('security')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    loginNotifications: true,
    deviceTracking: true,
    dataSharing: false,
    marketingEmails: true,
    profileVisibility: 'public'
  })

  const tabs = [
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'data', label: 'Data', icon: Lock }
  ]

  const handlePasswordChange = (field, value) => {
    setPasswordForm({
      ...passwordForm,
      [field]: value
    })
  }

  const handleSecurityToggle = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting]
    })
  }

  const handlePasswordUpdate = () => {
    // Simulate password update
    console.log('Password updated')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
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
                <Shield className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Privacy & Security
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
            {activeTab === 'security' && (
              <div className="space-y-8">
                {/* Password Change */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Change Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                          Current Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            isDark ? 'text-yellow-400' : 'text-blue-600'
                          }`} />
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={passwordForm.currentPassword}
                            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl border-0 ${
                              isDark 
                                ? 'bg-navy/50 text-white placeholder-gray-400' 
                                : 'bg-gray-100 text-navy placeholder-gray-500'
                            } focus:ring-2 focus:ring-blue-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            isDark ? 'text-yellow-400' : 'text-blue-600'
                          }`} />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordForm.newPassword}
                            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl border-0 ${
                              isDark 
                                ? 'bg-navy/50 text-white placeholder-gray-400' 
                                : 'bg-gray-100 text-navy placeholder-gray-500'
                            } focus:ring-2 focus:ring-blue-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                            isDark ? 'text-yellow-400' : 'text-blue-600'
                          }`} />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                            className={`w-full pl-12 pr-12 py-3 rounded-xl border-0 ${
                              isDark 
                                ? 'bg-navy/50 text-white placeholder-gray-400' 
                                : 'bg-gray-100 text-navy placeholder-gray-500'
                            } focus:ring-2 focus:ring-blue-500`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5 text-gray-400" />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handlePasswordUpdate}
                        className={`w-full py-3 rounded-xl font-semibold ${
                          isDark 
                            ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                      >
                        Update Password
                      </button>
                    </div>

                    <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'}`}>
                      <h4 className={`font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                        Password Requirements
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            At least 8 characters
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            One uppercase letter
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            One lowercase letter
                          </span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                            One number
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Two-Factor Authentication
                  </h3>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                        <div>
                          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                            SMS Authentication
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            Receive verification codes via SMS
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.twoFactorAuth}
                          onChange={() => handleSecurityToggle('twoFactorAuth')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Login Notifications */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Login Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} flex items-center justify-between`}>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          Email notifications for new logins
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Get notified when someone logs into your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.loginNotifications}
                          onChange={() => handleSecurityToggle('loginNotifications')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} flex items-center justify-between`}>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          Device tracking
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Track devices that access your account
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.deviceTracking}
                          onChange={() => handleSecurityToggle('deviceTracking')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-8">
                {/* Profile Visibility */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Profile Visibility
                  </h3>
                  <div className="space-y-4">
                    {['public', 'friends', 'private'].map((option) => (
                      <label key={option} className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer ${
                        securitySettings.profileVisibility === option
                          ? (isDark ? 'bg-yellow-400/20 border-2 border-yellow-400' : 'bg-blue-600/20 border-2 border-blue-600')
                          : (isDark ? 'bg-navy/30 border-2 border-transparent' : 'bg-gray-100 border-2 border-transparent')
                      }`}>
                        <input
                          type="radio"
                          name="profileVisibility"
                          value={option}
                          checked={securitySettings.profileVisibility === option}
                          onChange={(e) => setSecuritySettings({...securitySettings, profileVisibility: e.target.value})}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <h4 className={`font-semibold capitalize ${isDark ? 'text-white' : 'text-navy'}`}>
                            {option}
                          </h4>
                          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {option === 'public' && 'Anyone can see your profile'}
                            {option === 'friends' && 'Only your friends can see your profile'}
                            {option === 'private' && 'Only you can see your profile'}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Data Sharing */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Data Sharing
                  </h3>
                  <div className="space-y-4">
                    <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} flex items-center justify-between`}>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          Share data with partners
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Allow us to share anonymized data with travel partners
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.dataSharing}
                          onChange={() => handleSecurityToggle('dataSharing')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'} flex items-center justify-between`}>
                      <div>
                        <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          Marketing emails
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          Receive promotional emails and travel deals
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securitySettings.marketingEmails}
                          onChange={() => handleSecurityToggle('marketingEmails')}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-8">
                {/* Data Export */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                    Data Export
                  </h3>
                  <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'}`}>
                    <p className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Download a copy of all your data including bookings, preferences, and activity history.
                    </p>
                    <button className={`px-6 py-3 rounded-xl font-semibold ${
                      isDark 
                        ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}>
                      Request Data Export
                    </button>
                  </div>
                </div>

                {/* Account Deletion */}
                <div>
                  <h3 className={`font-bold text-lg mb-4 text-red-500`}>
                    Delete Account
                  </h3>
                  <div className={`p-6 rounded-xl border-2 border-red-500/20 ${isDark ? 'bg-red-500/10' : 'bg-red-50'}`}>
                    <div className="flex items-start space-x-3 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className={`font-semibold text-red-500 mb-2`}>
                          Permanently delete your account
                        </h4>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                          This action cannot be undone. All your data, bookings, and preferences will be permanently deleted.
                        </p>
                        <ul className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} space-y-1 mb-4`}>
                          <li>• All booking history will be deleted</li>
                          <li>• Saved preferences and favorites will be lost</li>
                          <li>• You will lose access to all travel points</li>
                          <li>• This action is irreversible</li>
                        </ul>
                      </div>
                    </div>
                    <button className="px-6 py-3 rounded-xl font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">
                      Delete My Account
                    </button>
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

export default PrivacySecurityModal