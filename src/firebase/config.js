import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDduqEsMkkP9HVzXkdiDuxdR3i6Y36uDs",
  authDomain: "sanchari-d123c.firebaseapp.com",
  projectId: "sanchari-d123c",
  storageBucket: "sanchari-d123c.firebasestorage.app",
  messagingSenderId: "908808918153",
  appId: "1:908808918153:web:bee7b19fde74de5d0d6258",
  measurementId: "G-3EJ61YBQ5Q"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
 
// Initialize Analytics (optional)
let analytics = null
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}
export { analytics }

// Connect to emulators in development (only if explicitly enabled)
if (import.meta.env.DEV && import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
    connectFirestoreEmulator(db, 'localhost', 8080)
    connectStorageEmulator(storage, 'localhost', 9199)
    console.log('Connected to Firebase emulators')
  } catch (error) {
    console.log('Emulators already connected or not available')
  }
}

export default app