import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const steps = [
  {
    title: "What's your full name?",
    field: 'name',
    type: 'text',
    placeholder: 'Full Name'
  },
  {
    title: "What's your email address?",
    field: 'email',
    type: 'email',
    placeholder: 'Email'
  },
  {
    title: "What's your phone number?",
    field: 'phone',
    type: 'tel',
    placeholder: 'Phone'
  },
  {
    title: "Tell us about yourself",
    field: 'personal',
    type: 'personal'
  },
  {
    title: "What are your travel preferences?",
    field: 'preferences',
    type: 'preferences'
  }
]

const preferences = ['Beach', 'Mountains', 'Luxury Hotels', 'Adventure', 'Culture', 'Food']

const ProfileStepper = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    preferences: []
  })
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      navigate('/dashboard')
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const togglePreference = (pref) => {
    setFormData({
      ...formData,
      preferences: formData.preferences.includes(pref)
        ? formData.preferences.filter(p => p !== pref)
        : [...formData.preferences, pref]
    })
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (step.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={step.type}
            name={step.field}
            placeholder={step.placeholder}
            value={formData[step.field]}
            onChange={handleInputChange}
            className={`w-full p-4 rounded-xl border-2 text-lg ${
              isDark 
                ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-navy placeholder-gray-500'
            } focus:border-blue-500 focus:outline-none`}
          />
        )

      case 'personal':
        return (
          <div className="space-y-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className={`w-full p-4 rounded-xl border-2 text-lg ${
                isDark 
                  ? 'bg-navy/50 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-navy'
              } focus:border-blue-500 focus:outline-none`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`w-full p-4 rounded-xl border-2 text-lg ${
                isDark 
                  ? 'bg-navy/50 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-navy'
              } focus:border-blue-500 focus:outline-none`}
            />
          </div>
        )

      case 'preferences':
        return (
          <div className="grid grid-cols-2 gap-3">
            {preferences.map((pref) => (
              <button
                key={pref}
                onClick={() => togglePreference(pref)}
                className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                  formData.preferences.includes(pref)
                    ? (isDark ? 'bg-yellow-400 border-yellow-400 text-navy' : 'bg-blue-600 border-blue-600 text-white')
                    : (isDark ? 'bg-navy/50 border-gray-600 text-white hover:border-yellow-400' : 'bg-white border-gray-300 text-navy hover:border-blue-600')
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${bgGradient} flex items-center justify-center p-6`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
      >
        {isDark ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-blue-600" />
        )}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-morphism rounded-3xl p-8 shadow-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isDark ? 'bg-yellow-400' : 'bg-blue-600'
                }`}
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h2 className={`text-2xl font-bold font-playfair mb-6 ${
              isDark ? 'text-yellow-400' : 'text-blue-600'
            }`}>
              {steps[currentStep].title}
            </h2>
            {renderStepContent()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-all`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 ${
                isDark 
                  ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-all`}
            >
              <span>{currentStep === steps.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentStep
                    ? (isDark ? 'bg-yellow-400' : 'bg-blue-600')
                    : (isDark ? 'bg-gray-600' : 'bg-gray-300')
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfileStepper