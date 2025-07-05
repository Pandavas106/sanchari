import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, Phone, Sun, Moon, Plane } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  })
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/profile-setup')
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

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
        {/* Glass Card */}
        <div className="glass-morphism rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`}>
              <Plane className={`w-8 h-8 ${isDark ? 'text-navy' : 'text-white'}`} />
            </div>
            <h1 className={`text-3xl font-bold font-playfair ${
              isDark ? 'text-yellow-400' : 'text-blue-600'
            }`}>
              Sanchari
            </h1>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Travel. Discover. Live.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className={`flex rounded-2xl p-1 mb-6 ${
            isDark ? 'bg-navy/50' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                isLogin
                  ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                  : (isDark ? 'text-yellow-400' : 'text-blue-600')
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                !isLogin
                  ? (isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white')
                  : (isDark ? 'text-yellow-400' : 'text-blue-600')
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                    isDark 
                      ? 'bg-navy/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-navy placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            )}

            <div className="relative">
              <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                    isDark 
                      ? 'bg-navy/50 text-white placeholder-gray-400' 
                      : 'bg-white/50 text-navy placeholder-gray-500'
                  } focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            )}

            <div className="relative">
              <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-12 pr-12 py-4 rounded-xl border-0 ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 ${
                isDark 
                  ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6 space-y-3">
            <div className="flex space-x-3">
              <button className="flex-1 py-3 px-4 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                Google
              </button>
              <button className="flex-1 py-3 px-4 bg-blue-600 rounded-xl font-semibold text-white hover:bg-blue-700 transition-all">
                Facebook
              </button>
            </div>
            <button className="w-full py-3 px-4 bg-black rounded-xl font-semibold text-white hover:bg-gray-800 transition-all">
              Apple
            </button>
          </div>

          <p className={`text-center mt-6 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Need help?
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginSignup