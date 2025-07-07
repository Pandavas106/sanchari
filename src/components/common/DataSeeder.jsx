import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Check, AlertCircle, Loader } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { seedAllData, checkDataExists } from '../../utils/seedData'

const DataSeeder = () => {
  const { isDark } = useTheme()
  const [seeding, setSeeding] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState(null)
  const [dataExists, setDataExists] = useState(false)

  useEffect(() => {
    checkExistingData()
  }, [])

  const checkExistingData = async () => {
    try {
      const exists = await checkDataExists()
      setDataExists(exists)
      setSeeded(exists)
    } catch (err) {
      console.error('Error checking data:', err)
    }
  }

  const handleSeedData = async () => {
    setSeeding(true)
    setError(null)

    try {
      const results = await seedAllData()
      
      if (results.destinations.success) {
        setSeeded(true)
        setDataExists(true)
        console.log('✅ Data seeded successfully!')
      } else {
        setError('Failed to seed destinations')
      }
    } catch (err) {
      setError(err.message)
      console.error('❌ Seeding error:', err)
    } finally {
      setSeeding(false)
    }
  }

  if (dataExists && !error) {
    return null // Don't show if data already exists
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-xl ${
        isDark ? 'bg-navy/90' : 'bg-white/90'
      } backdrop-blur-md border ${
        isDark ? 'border-gray-600' : 'border-gray-200'
      } shadow-lg max-w-sm`}
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          seeded ? 'bg-green-500' : error ? 'bg-red-500' : isDark ? 'bg-yellow-400' : 'bg-blue-600'
        }`}>
          {seeding ? (
            <Loader className="w-5 h-5 text-white animate-spin" />
          ) : seeded ? (
            <Check className="w-5 h-5 text-white" />
          ) : error ? (
            <AlertCircle className="w-5 h-5 text-white" />
          ) : (
            <Database className={`w-5 h-5 ${isDark ? 'text-navy' : 'text-white'}`} />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-navy'}`}>
            {seeded ? 'Data Ready!' : error ? 'Seeding Failed' : 'Seed Sample Data'}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {seeded 
              ? 'Sample destinations and data have been loaded.'
              : error 
              ? error
              : 'Load sample destinations to explore the app.'
            }
          </p>
          
          {!seeded && !seeding && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSeedData}
              className={`mt-2 px-4 py-2 rounded-lg font-semibold text-sm ${
                isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
              } hover:opacity-90 transition-opacity`}
            >
              Seed Data Now
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DataSeeder