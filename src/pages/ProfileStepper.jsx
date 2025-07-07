import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sun, Moon, Plane, User, Calendar, Heart, Mail, Lock, Eye, EyeOff, Phone, MapPin } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'

const steps = [
  {
    type: 'welcome',
    title: 'Welcome to Sanchari!',
    subtitle: 'We\'re excited to help you plan your next adventure. Let\'s create your account to get started.',
    icon: Plane
  },
  {
    title: "What's your full name?",
    subtitle: "Help us personalize your experience",
    field: 'name',
    type: 'name',
    icon: User
  },
  {
    title: "What's your email address?",
    subtitle: "We'll use this to send you trip updates and for login",
    field: 'email',
    type: 'email',
    icon: Mail
  },
  {
    title: "Create a secure password",
    subtitle: "Choose a strong password to protect your account",
    field: 'password',
    type: 'password',
    icon: Lock
  },
  {
    title: "What's your phone number?",
    subtitle: "For important travel notifications and account security",
    field: 'phone',
    type: 'tel',
    placeholder: 'Enter your phone number',
    icon: Phone
  },
  {
    title: "Tell us about yourself",
    subtitle: "This helps us recommend better experiences",
    field: 'personal',
    type: 'personal',
    icon: Calendar
  },
  {
    title: "What are your travel preferences?",
    subtitle: "Select all that interest you",
    field: 'preferences',
    type: 'preferences',
    icon: Heart
  }
]

const preferences = [
  { name: 'Beach', emoji: '🏖️' },
  { name: 'Mountains', emoji: '🏔️' },
  { name: 'Luxury Hotels', emoji: '🏨' },
  { name: 'Adventure', emoji: '🎯' },
  { name: 'Culture', emoji: '🎭' },
  { name: 'Food', emoji: '🍽️' },
  { name: 'Nightlife', emoji: '🌃' },
  { name: 'History', emoji: '🏛️' },
  { name: 'Art', emoji: '🎨' },
  { name: 'Photography', emoji: '📸' },
  { name: 'Wildlife', emoji: '🦁' },
  { name: 'Shopping', emoji: '🛍️' }
]

const ProfileStepper = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    gender: '',
    dob: '',
    location: '',
    preferences: []
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { signUp } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const validateStep = () => {
    const step = steps[currentStep]
    const newErrors = {}

    switch (step.type) {
      case 'name':
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required'
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required'
        }
        break
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required'
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address'
        }
        break
      case 'password':
        if (!formData.password) {
          newErrors.password = 'Password is required'
        } else if (!validatePassword(formData.password)) {
          newErrors.password = 'Password must be at least 6 characters long'
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password'
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }
        break
      case 'tel':
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required'
        }
        break
      case 'personal':
        if (!formData.gender) {
          newErrors.gender = 'Please select your gender'
        }
        if (!formData.dob) {
          newErrors.dob = 'Date of birth is required'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (currentStep === 0) {
      setCurrentStep(currentStep + 1)
      return
    }

    if (!validateStep()) {
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await handleSignUp()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setErrors({})
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const togglePreference = (pref) => {
    setFormData({
      ...formData,
      preferences: formData.preferences.includes(pref)
        ? formData.preferences.filter(p => p !== pref)
        : [...formData.preferences, pref]
    })
  }

  const handleSignUp = async () => {
    setIsSubmitting(true)
    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dob,
        location: formData.location,
        preferences: formData.preferences,
        profileComplete: true
      }

      const result = await signUp(formData.email, formData.password, userData)
      
      if (result.success) {
        navigate('/dashboard')
      } else {
        setErrors({ submit: result.error })
        setCurrentStep(2) // Go back to password step if signup fails
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' })
      setCurrentStep(2)
    } finally {
      setIsSubmitting(false)
    }
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const renderStepContent = () => {
    const step = steps[currentStep]

    if (step.type === 'welcome') {
      return (
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-yellow-400' : 'bg-blue-600'
          }`}>
            <Plane className={`w-12 h-12 ${isDark ? 'text-navy' : 'text-white'}`} />
          </div>
          <h2 className={`text-3xl lg:text-4xl font-bold font-playfair mb-2 ${
            isDark ? 'text-yellow-400' : 'text-blue-600'
          }`}>
            {step.title}
          </h2>
          <p className={`text-lg text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {step.subtitle}
          </p>
        </div>
      )
    }

    switch (step.type) {
      case 'name':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  errors.firstName 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:border-blue-500 focus:outline-none`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  errors.lastName 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:border-blue-500 focus:outline-none`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  errors.email 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:border-blue-500 focus:outline-none`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                This will be your login email address
              </p>
            </div>
          </div>
        )

      case 'password':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full p-4 pr-12 rounded-xl border-2 text-lg ${
                    errors.password 
                      ? 'border-red-500' 
                      : isDark 
                        ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                  } focus:border-blue-500 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full p-4 pr-12 rounded-xl border-2 text-lg ${
                    errors.confirmPassword 
                      ? 'border-red-500' 
                      : isDark 
                        ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                  } focus:border-blue-500 focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'}`}>
              <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Password Requirements:
              </h4>
              <ul className="text-sm space-y-1">
                <li className={`flex items-center space-x-2 ${
                  formData.password.length >= 6 ? 'text-green-500' : (isDark ? 'text-gray-300' : 'text-gray-600')
                }`}>
                  <span>{formData.password.length >= 6 ? '✓' : '○'}</span>
                  <span>At least 6 characters</span>
                </li>
                <li className={`flex items-center space-x-2 ${
                  /[A-Z]/.test(formData.password) ? 'text-green-500' : (isDark ? 'text-gray-300' : 'text-gray-600')
                }`}>
                  <span>{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                  <span>One uppercase letter (recommended)</span>
                </li>
                <li className={`flex items-center space-x-2 ${
                  /[0-9]/.test(formData.password) ? 'text-green-500' : (isDark ? 'text-gray-300' : 'text-gray-600')
                }`}>
                  <span>{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                  <span>One number (recommended)</span>
                </li>
              </ul>
            </div>

            {errors.submit && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
                <p className="text-red-500 text-sm font-medium">{errors.submit}</p>
              </div>
            )}
          </div>
        )

      case 'tel':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  errors.phone 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:border-blue-500 focus:outline-none`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
              <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                We'll use this for important travel notifications and account security
              </p>
            </div>
          </div>
        )

      case 'personal':
        return (
          <div className="space-y-6">
            <div>
              <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Gender *
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: gender.toLowerCase() })}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.gender === gender.toLowerCase()
                        ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                        : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white border-gray-300 text-navy hover:border-blue-600')
                    } ${errors.gender ? 'border-red-500' : ''}`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
            
            <div>
              <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  errors.dob 
                    ? 'border-red-500' 
                    : isDark 
                      ? 'bg-navy/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-navy'
                } focus:border-blue-500 focus:outline-none`}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            <div>
              <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-navy'}`}>
                Location (Optional)
              </label>
              <input
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-4 rounded-xl border-2 text-lg ${
                  isDark 
                    ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-navy placeholder-gray-500'
                } focus:border-blue-500 focus:outline-none`}
              />
            </div>
          </div>
        )

      case 'preferences':
        return (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {preferences.map((pref) => (
              <button
                key={pref.name}
                type="button"
                onClick={() => togglePreference(pref.name)}
                className={`p-6 rounded-xl border-2 font-semibold transition-all text-center ${
                  formData.preferences.includes(pref.name)
                    ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                    : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white border-gray-300 text-navy hover:border-blue-600')
                }`}
              >
                <div className="text-3xl mb-2">{pref.emoji}</div>
                <div className="text-sm font-semibold">{pref.name}</div>
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${bgGradient}`}>
        <div className="flex flex-col items-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${
            isDark ? 'border-yellow-400' : 'border-blue-600'
          }`} />
          <span className={`mt-6 text-xl font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
            Loading...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isDark ? 'bg-yellow-400' : 'bg-blue-600'
              }`}>
                <Plane className={`w-6 h-6 ${isDark ? 'text-navy' : 'text-white'}`} />
              </div>
              <h1 className={`text-2xl font-bold font-playfair ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`}>
                Sanchari
              </h1>
            </div>

            {/* Progress */}
            <div className="hidden lg:flex items-center space-x-4">
              <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                Step {currentStep === 0 ? 0 : currentStep} of {steps.length - 1}
              </span>
              <div className={`w-32 h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}
                  style={{ width: `${(currentStep === 0 ? 0 : (currentStep) / (steps.length - 1)) * 100}%` }}
                />
              </div>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-morphism rounded-3xl p-8 lg:p-12 shadow-2xl"
            >
              {/* Progress Bar - Mobile */}
              <div className="lg:hidden mb-8">
                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isDark ? 'bg-yellow-400' : 'bg-blue-600'
                    }`}
                    style={{ width: `${(currentStep === 0 ? 0 : (currentStep) / (steps.length - 1)) * 100}%` }}
                  />
                </div>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Step {currentStep === 0 ? 0 : currentStep} of {steps.length - 1}
                </p>
              </div>

              {/* Step Icon */}
              {steps[currentStep].type !== 'welcome' && (
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    isDark ? 'bg-yellow-400' : 'bg-blue-600'
                  }`}>
                    {React.createElement(steps[currentStep].icon, {
                      className: `w-10 h-10 ${isDark ? 'text-navy' : 'text-white'}`
                    })}
                  </div>
                  <h2 className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-navy'
                  }`}>
                    {steps[currentStep].title}
                  </h2>
                  <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {steps[currentStep].subtitle}
                  </p>
                </div>
              )}

              {/* Step Content */}
              <div className={`${steps[currentStep].type === 'welcome' ? 'text-center' : ''} mb-8`}>
                {renderStepContent()}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                {currentStep > 0 ? (
                  <button
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className={`px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 ${
                      isDark 
                        ? 'bg-navy/50 text-yellow-400 hover:bg-navy/70' 
                        : 'bg-gray-200 text-blue-600 hover:bg-gray-300'
                    } transition-all disabled:opacity-50`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 ${
                    isDark 
                      ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-all disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {currentStep === 0
                          ? 'Get Started'
                          : currentStep === steps.length - 1
                          ? 'Create Account'
                          : 'Continue'}
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Progress Overview */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm mb-6`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Account Setup Progress
              </h3>
              <div className="space-y-3">
                {steps.slice(1).map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < currentStep - 1
                        ? 'bg-green-500 text-white'
                        : index === currentStep - 1
                        ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                        : (isDark ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500')
                    }`}>
                      {index < currentStep - 1 ? '✓' : index + 1}
                    </div>
                    <span className={`text-sm font-semibold ${
                      index <= currentStep - 1
                        ? (isDark ? 'text-white' : 'text-navy')
                        : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {step.title.replace('?', '')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm mb-6`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Why Create an Account?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">🎯</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Personalized Recommendations
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Get AI-powered suggestions tailored to your preferences
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">💰</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Exclusive Deals
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Access member-only discounts and offers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                      Seamless Booking
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Save time with pre-filled information and quick checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Already have account */}
            <div className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-blue-600'} text-center`}>
              <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-navy' : 'text-white'}`}>
                Already have an account?
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-navy' : 'text-white'}`}>
                Sign in to access your existing profile and bookings
              </p>
              <button 
                onClick={() => navigate('/login')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  isDark ? 'bg-navy text-white' : 'bg-white text-blue-600'
                } hover:opacity-90 transition-opacity`}
              >
                Sign In Instead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileStepper