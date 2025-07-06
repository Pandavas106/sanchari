import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Plus, Trash2, Edit, Shield, Check } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const PaymentMethodsModal = ({ isOpen, onClose }) => {
  const { isDark } = useTheme()
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      holderName: 'Sarah Johnson',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2026',
      holderName: 'Sarah Johnson',
      isDefault: false
    }
  ])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newCard, setNewCard] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: ''
  })

  const getCardIcon = (type) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    }
    return icons[type] || '💳'
  }

  const handleAddCard = () => {
    const cardType = newCard.number.startsWith('4') ? 'visa' : 
                    newCard.number.startsWith('5') ? 'mastercard' : 'visa'
    
    const newPaymentMethod = {
      id: Date.now(),
      type: cardType,
      last4: newCard.number.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      holderName: newCard.holderName,
      isDefault: paymentMethods.length === 0
    }

    setPaymentMethods([...paymentMethods, newPaymentMethod])
    setNewCard({ number: '', expiryMonth: '', expiryYear: '', cvv: '', holderName: '' })
    setShowAddForm(false)
  }

  const handleDeleteCard = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
  }

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
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
          className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl ${
            isDark ? 'bg-navy/95' : 'bg-white/95'
          } backdrop-blur-md border ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          } shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 p-6 border-b border-gray-300 bg-inherit rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Payment Methods
                </h2>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${
                  isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                }`}
              >
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Security Notice */}
            <div className={`p-4 rounded-xl ${isDark ? 'bg-blue-600/20' : 'bg-blue-100'} border-l-4 border-blue-500`}>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <div>
                  <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Secure Payment Processing
                  </h3>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your payment information is encrypted and securely stored
                  </p>
                </div>
              </div>
            </div>

            {/* Existing Cards */}
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 ${
                    method.isDefault
                      ? (isDark ? 'border-yellow-400 bg-yellow-400/10' : 'border-blue-600 bg-blue-600/10')
                      : (isDark ? 'border-gray-600 bg-navy/30' : 'border-gray-300 bg-white/30')
                  } backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{getCardIcon(method.type)}</div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            •••• •••• •••• {method.last4}
                          </h3>
                          {method.isDefault && (
                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                            }`}>
                              Default
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {method.holderName} • Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!method.isDefault && (
                        <button
                          onClick={() => handleSetDefault(method.id)}
                          className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                            isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                          } hover:opacity-90 transition-opacity`}
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCard(method.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add New Card Button */}
            {!showAddForm && (
              <motion.button
                onClick={() => setShowAddForm(true)}
                className={`w-full p-6 rounded-xl border-2 border-dashed ${
                  isDark ? 'border-gray-600 hover:border-yellow-400' : 'border-gray-300 hover:border-blue-600'
                } transition-colors flex items-center justify-center space-x-2`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                  Add New Payment Method
                </span>
              </motion.button>
            )}

            {/* Add Card Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-6 rounded-xl ${isDark ? 'bg-navy/50' : 'bg-gray-100'} backdrop-blur-sm space-y-4`}
              >
                <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Add New Card
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCard.number}
                      onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 rounded-xl border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={newCard.holderName}
                      onChange={(e) => setNewCard({...newCard, holderName: e.target.value})}
                      placeholder="John Doe"
                      className={`w-full p-3 rounded-xl border-0 ${
                        isDark 
                          ? 'bg-navy/50 text-white placeholder-gray-400' 
                          : 'bg-white text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Month
                      </label>
                      <select
                        value={newCard.expiryMonth}
                        onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white' 
                            : 'bg-white text-gray-900'
                        } focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">MM</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i+1} value={String(i+1).padStart(2, '0')}>
                            {String(i+1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Year
                      </label>
                      <select
                        value={newCard.expiryYear}
                        onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white' 
                            : 'bg-white text-gray-900'
                        } focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">YYYY</option>
                        {Array.from({length: 10}, (_, i) => (
                          <option key={i} value={2024 + i}>
                            {2024 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newCard.cvv}
                        onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full p-3 rounded-xl border-0 ${
                          isDark 
                            ? 'bg-navy/50 text-white placeholder-gray-400' 
                            : 'bg-white text-gray-900 placeholder-gray-500'
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className={`flex-1 py-3 rounded-xl font-semibold border-2 ${
                      isDark 
                        ? 'border-gray-600 text-white hover:bg-gray-600' 
                        : 'border-gray-300 text-gray-900 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCard}
                    className={`flex-1 py-3 rounded-xl font-semibold ${
                      isDark 
                        ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors`}
                  >
                    Add Card
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PaymentMethodsModal