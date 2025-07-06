import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe, DollarSign, Check } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const LanguageCurrencyModal = ({ isOpen, onClose, currentSettings, onSave }) => {
  const { isDark } = useTheme()
  const [settings, setSettings] = useState({
    language: currentSettings?.language || 'en-US',
    currency: currentSettings?.currency || 'USD',
    region: currentSettings?.region || 'US'
  })

  const languages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
    { code: 'ko-KR', name: '한국어', flag: '🇰🇷' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'hi-IN', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' }
  ]

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$' }
  ]

  const handleSave = () => {
    onSave(settings)
    onClose()
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
          className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl ${
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
                <Globe className={`w-6 h-6 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-navy'}`}>
                  Language & Currency
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
          </div>

          {/* Content */}
          <div className="p-6 space-y-8">
            {/* Language Selection */}
            <div>
              <h3 className={`font-bold text-lg mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <Globe className="w-5 h-5" />
                <span>Language</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {languages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => setSettings({...settings, language: language.code})}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      settings.language === language.code
                        ? (isDark ? 'border-yellow-400 bg-yellow-400/20' : 'border-blue-600 bg-blue-600/20')
                        : (isDark ? 'border-gray-600 hover:border-yellow-400' : 'border-gray-300 hover:border-blue-600')
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{language.flag}</span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                          {language.name}
                        </span>
                      </div>
                      {settings.language === language.code && (
                        <Check className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Currency Selection */}
            <div>
              <h3 className={`font-bold text-lg mb-4 flex items-center space-x-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                <DollarSign className="w-5 h-5" />
                <span>Currency</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currencies.map((currency) => (
                  <motion.button
                    key={currency.code}
                    onClick={() => setSettings({...settings, currency: currency.code})}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      settings.currency === currency.code
                        ? (isDark ? 'border-yellow-400 bg-yellow-400/20' : 'border-blue-600 bg-blue-600/20')
                        : (isDark ? 'border-gray-600 hover:border-yellow-400' : 'border-gray-300 hover:border-blue-600')
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`text-xl font-bold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                          {currency.symbol}
                        </span>
                        <div>
                          <div className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                            {currency.code}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {currency.name}
                          </div>
                        </div>
                      </div>
                      {settings.currency === currency.code && (
                        <Check className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`} />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className={`p-6 rounded-xl ${isDark ? 'bg-navy/30' : 'bg-gray-100'}`}>
              <h3 className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-navy'}`}>
                Preview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Language:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {languages.find(l => l.code === settings.language)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Currency:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
                    {currencies.find(c => c.code === settings.currency)?.name} ({currencies.find(c => c.code === settings.currency)?.symbol})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Sample Price:</span>
                  <span className={`font-semibold ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>
                    {currencies.find(c => c.code === settings.currency)?.symbol}1,299
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-6 border-t border-gray-300 bg-inherit rounded-b-2xl">
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className={`flex-1 py-3 rounded-xl font-semibold border-2 ${
                  isDark 
                    ? 'border-gray-600 text-white hover:bg-gray-600' 
                    : 'border-gray-300 text-navy hover:bg-gray-100'
                } transition-colors`}
              >
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                className={`flex-1 py-3 rounded-xl font-semibold ${
                  isDark 
                    ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } transition-colors`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LanguageCurrencyModal