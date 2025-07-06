import React, { useState } from 'react'
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
  PiggyBank,
  Lock,
  Sun,
  Moon,
  CreditCard,
  Shield,
  Truck
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { Navbar, BottomNavbar } from '../components'

const Cart = () => {
  const navigate = useNavigate()
  const { isDark } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)

  const cartItems = [
    {
      title: "Maldives Luxury Retreat",
      date: "Dec 15-22, 2024",
      people: "2 adults",
      price: "₹1,44,000",
      oldPrice: "₹1,60,000",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      duration: "7 nights",
      type: "Resort Package"
    },
    {
      title: "Bali Private Villa",
      date: "Jan 10-18, 2025", 
      people: "2 adults",
      price: "₹1,30,000",
      oldPrice: null,
      image: "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80",
      duration: "8 nights",
      type: "Villa Rental"
    }
  ]

  const bgGradient = isDark 
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      {/* Navigation */}
      <Navbar 
        onSearchOpen={() => {}}
        onNotificationOpen={() => {}}
        notificationCount={notificationCount}
        cartCount={cartItems.length}
      />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4">
            <h1 className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
              Shopping Cart
            </h1>
            <div className={`px-3 py-1 rounded-full ${
              isDark ? 'bg-yellow-400' : 'bg-blue-600'
            }`}>
              <span className={`text-sm font-bold ${isDark ? 'text-navy' : 'text-white'}`}>
                {cartItems.length} items
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0 lg:space-x-6">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full lg:w-48 h-48 lg:h-32 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                            }`}>
                              {item.type}
                            </span>
                            {item.oldPrice && (
                              <span className="px-2 py-1 rounded-lg text-xs font-semibold bg-green-500 text-white">
                                Save ₹16,000
                              </span>
                            )}
                          </div>
                          <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                            {item.title}
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Calendar className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {item.date} • {item.duration}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className={`w-4 h-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                {item.people}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-4">
                          <button className={`p-2 ${isDark ? 'text-yellow-400 hover:bg-yellow-400/20' : 'text-blue-600 hover:bg-blue-600/20'} rounded-lg transition-colors`}>
                            <X className="w-5 h-5" />
                          </button>
                          <div className="flex items-center space-x-3">
                            <button className={`p-2 rounded-lg ${isDark ? 'bg-navy/50 text-yellow-400' : 'bg-white/50 text-blue-600'} hover:opacity-80 transition-opacity`}>
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`font-bold text-lg px-4 ${isDark ? 'text-white' : 'text-navy'}`}>1</span>
                            <button className={`p-2 rounded-lg ${isDark ? 'bg-navy/50 text-yellow-400' : 'bg-white/50 text-blue-600'} hover:opacity-80 transition-opacity`}>
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                              {item.price}
                            </div>
                            {item.oldPrice && (
                              <div className={`text-sm line-through ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {item.oldPrice}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Promo Code */}
            <div className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Promo Code
              </h3>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="flex-1 relative">
                  <Tag className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    isDark ? 'text-yellow-400' : 'text-blue-600'
                  }`} />
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl border-0 ${
                      isDark 
                        ? 'bg-navy/50 text-white placeholder-gray-400' 
                        : 'bg-white/50 text-navy placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
                <button className={`px-8 py-4 rounded-xl font-semibold ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                } hover:opacity-90 transition-opacity`}>
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Price Breakdown */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-navy/70' : 'bg-blue-100'}`}>
                <h3 className={`font-bold text-xl mb-6 ${isDark ? 'text-white' : 'text-navy'}`}>
                  Order Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Subtotal (2 items)</span>
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
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between">
                      <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-navy'}`}>Total</span>
                      <span className={`font-bold text-xl ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                        ₹2,68,520
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Banner */}
              <div className="bg-green-800/80 p-4 rounded-xl flex items-center space-x-3">
                <PiggyBank className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-green-400 font-bold">You're saving ₹43,400!</div>
                  <div className="text-green-300 text-sm">Compared to booking separately</div>
                </div>
              </div>

              {/* Security Features */}
              <div className={`p-4 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-white/50'} backdrop-blur-sm`}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      Secure payment processing
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-500" />
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      Free cancellation up to 24 hours
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-purple-500" />
                    <span className={`text-sm ${isDark ? 'text-white' : 'text-navy'}`}>
                      Pay in installments available
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className={`p-6 rounded-2xl ${isDark ? 'bg-yellow-400' : 'bg-white'}`}>
                <div className="text-center mb-4">
                  <div className={`text-sm ${isDark ? 'text-navy' : 'text-blue-600'} mb-1`}>
                    Total for 2 people • 2 destinations
                  </div>
                  <div className={`text-3xl font-bold ${isDark ? 'text-navy' : 'text-blue-600'}`}>
                    ₹2,68,520
                  </div>
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
                <p className={`text-center text-xs mt-3 ${isDark ? 'text-navy' : 'text-gray-600'}`}>
                  By proceeding, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar cartCount={cartItems.length} />
    </div>
  )
}

export default Cart