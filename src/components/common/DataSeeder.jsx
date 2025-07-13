import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Database, Check, AlertCircle, Loader, RefreshCw } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { seedAllData, checkDataExists, seedUserData } from '../../utils/seedData'
import { seedSharedTrips } from '../../utils/seedSharedTrips'

const DataSeeder = () => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const [seeding, setSeeding] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState(null)
  const [dataExists, setDataExists] = useState(false)
  const [seedingProgress, setSeedingProgress] = useState('')

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
    setSeedingProgress('Initializing...')

    try {
      setSeedingProgress('Seeding destinations...')
      const results = await seedAllData()
      
      if (results.destinations.success) {
        setSeedingProgress('Destinations seeded successfully!')
        
        // Seed shared trips
        setSeedingProgress('Setting up shared trips...')
        await seedSharedTrips()
        setSeedingProgress('Shared trips seeded successfully!')
        
        // If user is logged in, seed user-specific data
        if (user?.uid) {
          setSeedingProgress('Setting up your personal data...')
          await seedUserData(user.uid)
          setSeedingProgress('Personal data setup complete!')
        }
        
        setSeeded(true)
        setDataExists(true)
        setSeedingProgress('All data seeded successfully!')
        console.log('✅ Data seeded successfully!')
        
        // Clear progress message after 3 seconds
        setTimeout(() => setSeedingProgress(''), 3000)
      } else {
        setError('Failed to seed destinations')
        setSeedingProgress('')
      }
    } catch (err) {
      setError(err.message)
      setSeedingProgress('')
      console.error('❌ Seeding error:', err)
    } finally {
      setSeeding(false)
    }
  }

  const handleRefreshData = async () => {
    await checkExistingData()
  }

  // Don't show if data already exists and no error
  if (dataExists && !error && !seeding) {
    return null
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
          seeded ? 'bg-green-500' : error ? 'bg-red-500' : seeding ? 'bg-blue-500' : isDark ? 'bg-yellow-400' : 'bg-blue-600'
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
            {seeded ? 'Data Ready!' : error ? 'Seeding Failed' : seeding ? 'Setting Up Data...' : 'Setup Required'}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {seeded 
              ? 'Sample destinations and data have been loaded.'
              : error 
              ? error
              : seeding
              ? seedingProgress || 'Please wait while we set up your data...'
              : 'Load sample destinations to explore the app.'
            }
          </p>
          
          <div className="flex space-x-2 mt-3">
            {!seeded && !seeding && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSeedData}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  isDark ? 'bg-yellow-400 text-navy' : 'bg-blue-600 text-white'
                } hover:opacity-90 transition-opacity`}
              >
                Setup Now
              </motion.button>
            )}
            
            {(seeded || error) && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefreshData}
                className={`px-3 py-2 rounded-lg font-semibold text-sm ${
                  isDark ? 'bg-gray-600 text-white' : 'bg-gray-200 text-navy'
                } hover:opacity-90 transition-opacity flex items-center space-x-1`}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Refresh</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DataSeeder