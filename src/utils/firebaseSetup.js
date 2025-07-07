import { seedAllData } from './seedData'

// Function to set up Firebase project with initial data
export const setupFirebaseProject = async () => {
  try {
    console.log('Setting up Firebase project...')
    
    // Seed initial data
    await seedAllData()
    
    console.log('Firebase project setup complete!')
    return { success: true }
  } catch (error) {
    console.error('Error setting up Firebase project:', error)
    return { success: false, error: error.message }
  }
}

// Function to check if Firebase is properly configured
export const checkFirebaseConfig = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ]

  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName])
  
  if (missingVars.length > 0) {
    console.warn('Missing Firebase environment variables:', missingVars)
    return false
  }
  
  return true
}