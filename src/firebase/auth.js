import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from './config'

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Create user with email and password
export const createUserWithEmail = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with additional data
    await updateProfile(userCredential.user, {
      displayName: `${userData.firstName} ${userData.lastName}`,
      photoURL: userData.photoURL || null
    })
    
    return { success: true, user: userCredential.user }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Delete user account
export const deleteUserAccount = async () => {
  try {
    if (auth.currentUser) {
      await deleteUser(auth.currentUser)
      return { success: true }
    }
    return { success: false, error: 'No user logged in' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}