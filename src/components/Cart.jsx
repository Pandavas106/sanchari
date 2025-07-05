import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Minus, 
  Plus, 
  X, 
  Tag, 
  Savings,
  Lock,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const Cart = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()

  const cartItems = [
    {
      title: "Maldives Luxury Retreat",
      date: "Dec 15-22, 2024",
      people: "2 adults",
      price: "₹1,44,000",
      oldPrice: "₹1,60,000",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Bali Private Villa",
      date: "Jan 10-18, 2025", 
      people: "2 adults",
      price: "₹1,30,000",
      oldPrice: null,
      image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80"
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
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-full ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
          >
            <ArrowLeft className={`w-6 h-6 ${isDark ? 'text-white' : 'text-navy'}`} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
            My Cart
          </h1>
          <div className="flex items-center space-x-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`}>
              <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                2
              </span>
            </div>
            <button onClick={toggleTheme} className="p-2">
              {isDark ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-6 space-y-4 mb-6">
          {cartItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Users className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.people}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <button className={`p-1 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-2 mt-2">
                    <button className={`p-1 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>1</span>
                    <button className={`p-1 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2">
                    <span className={`font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                      {item.price}
                    </span>
                    {item.oldPrice && (
                      <div className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {item.oldPrice}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="px-6 mb-6">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDark ? 'text-yellow-400' : 'text-blue-600'
              }`} />
              <input
                type="text"
                placeholder="Enter promo code"
                className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 text-center ${
                  isDark 
                    ? 'bg-navy/50 text-white placeholder-gray-400' 
                    : 'bg-white/50 text-navy placeholder-gray-500'
                } focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <button className={`px-6 py-4 rounded-xl font-semibold ${
              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
            }`}>
              Apply
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="px-6 mb-6">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}>
            <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
              Price Breakdown
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subtotal</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>₹2,74,000</span>
              </div>
              <div className="flex justify-between">
                <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Taxes & Fees</span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-navy'}`}>₹21,920</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-500 font-semibold">Discount (FIRST10)</span>
                <span className="text-green-500 font-bold">-₹27,400</span>
              </div>
              <div className="border-t border-gray-300 pt-2 mt-2">
                <div className="flex justify-between">
                  <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-navy'}`}>Total</span>
                  <span className={`font-bold text-lg ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    ₹2,68,520
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Banner */}
        <div className="px-6 mb-6">
          <div className="bg-green-800/80 p-4 rounded-xl flex items-center space-x-3">
            <Savings className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-bold">You're saving ₹43,400!</span>
          </div>
        </div>

        {/* Checkout */}
        <div className="px-6 pb-8">
          <div className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`font-bold text-lg ${isDark ? 'text-navy' : 'text-blue-600'}`}>
                Total Amount
              </span>
              <div className="text-right">
                <div className={`text-sm ${isDark ? 'text-navy' : 'text-blue-600'}`}>
                  For 2 people
                </div>
                <div className={`text-sm ${isDark ? 'text-navy' : 'text-blue-600'}`}>
                  2 destinations
                </div>
              </div>
            </div>
            <div className={`text-3xl font-bold mb-4 ${isDark ? 'text-navy' : 'text-blue-600'}`}>
              ₹2,68,520
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 ${
                isDark ? 'bg-navy text-white' : 'bg-blue-600 text-white'
              } transition-all`}
            >
              <Lock className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart