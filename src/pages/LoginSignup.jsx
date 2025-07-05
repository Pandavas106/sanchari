import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Sun, Moon, Plane } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const LoginSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Sign in - go to dashboard
    navigate('/dashboard')
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
    <div className={`min-h-screen ${bgGradient}`}>
      {/* Header */}
      <header className="backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
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
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button onClick={toggleTheme} className="p-2">
                {isDark ? (
                  <Sun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <Moon className="w-6 h-6 text-blue-600" />
                )}
              </button>
              <button 
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDark 
                    ? 'text-yellow-400 hover:bg-yellow-400/20' 
                    : 'text-blue-600 hover:bg-blue-600/20'
                }`}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Side - Welcome Content */}
          <div className="space-y-8">
            <div>
              <h1 className={`text-4xl lg:text-5xl font-bold font-playfair mb-4 ${
                isDark ? 'text-white' : 'text-navy'
              }`}>
                Welcome back to <span className={isDark ? 'text-yellow-400' : 'text-blue-600'}>Sanchari</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Sign in to continue your journey and explore amazing destinations.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-yellow-400' : 'bg-blue-600'
                }`}>
                  <span className={`text-xl ${isDark ? 'text-navy' : 'text-white'}`}>🤖</span>
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                    AI-Powered Planning
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Personalized itineraries created by advanced AI
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-yellow-400' : 'bg-blue-600'
                }`}>
                  <span className={`text-xl ${isDark ? 'text-navy' : 'text-white'}`}>🌍</span>
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                    Global Destinations
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Access to 200+ premium destinations worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  isDark ? 'bg-yellow-400' : 'bg-blue-600'
                }`}>
                  <span className={`text-xl ${isDark ? 'text-navy' : 'text-white'}`}>💎</span>
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>
                    Luxury Experiences
                  </h3>
                  <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Curated premium experiences and accommodations
                  </p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Side - Form */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              {/* Glass Card */}
              <div className="glass-morphism rounded-3xl p-8 shadow-2xl">
                {/* Only Sign In */}
                <h2 className={`text-2xl font-bold mb-8 text-center ${
                  isDark ? 'text-yellow-400' : 'text-blue-600'
                }`}>
                  Sign In
                </h2>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      isDark ? 'text-yellow-400' : 'text-blue-600'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white/50 text-navy placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

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
                      required
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`ml-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className={`text-sm font-semibold ${
                        isDark ? 'text-yellow-400' : 'text-blue-600'
                      } hover:opacity-80`}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                      isDark 
                        ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Sign In
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                  <span className={`px-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Or continue with
                  </span>
                  <div className={`flex-1 h-px ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`} />
                </div>

                {/* Social Login */}
                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-white rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>🔍</span>
                    <span>Continue with Google</span>
                  </motion.button>
                  <div className="grid grid-cols-1 gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-3 px-4 bg-black rounded-xl font-semibold text-white hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>🍎</span>
                      <span>Apple</span>
                    </motion.button>
                  </div>
                </div>

                <p className={`text-center mt-6 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {"Don't have an account? "}
                  <button
                    onClick={() => navigate('/profile-setup')}
                    className={`font-semibold ${
                      isDark ? 'text-yellow-400' : 'text-blue-600'
                    } hover:opacity-80`}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup