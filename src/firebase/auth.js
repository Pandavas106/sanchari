import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { auth } from './config'

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Sign in error:', error)
    return { success: false, error: getAuthErrorMessage(error.code) }
  }
}

// Create user with email and password
export const createUserWithEmail = async (email, password, userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with additional data
    if (userData.firstName && userData.lastName) {
      await updateProfile(userCredential.user, {
        displayName: `${userData.firstName} ${userData.lastName}`,
        photoURL: userData.photoURL || null
      })
    }
    
    // Send email verification
    await sendEmailVerification(userCredential.user)
    
    return { success: true, user: userCredential.user }
  } catch (error) {
    console.error('Sign up error:', error)
    return { success: false, error: getAuthErrorMessage(error.code) }
  }
}

// Sign out
export const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    return { success: true }
  } catch (error) {
    console.error('Sign out error:', error)
    return { success: false, error: error.message }
  }
}

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error) {
    console.error('Reset password error:', error)
    return { success: false, error: getAuthErrorMessage(error.code) }
  }
}

// Update user password
export const updateUserPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser
    if (!user) {
      return { success: false, error: 'No user logged in' }
    }

    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)
    
    // Update password
    await updatePassword(user, newPassword)
    return { success: true }
  } catch (error) {
    console.error('Update password error:', error)
    return { success: false, error: getAuthErrorMessage(error.code) }
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
    console.error('Delete account error:', error)
    return { success: false, error: getAuthErrorMessage(error.code) }
  }
}

// Send email verification
export const sendVerificationEmail = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser)
      return { success: true }
    }
    return { success: false, error: 'No user logged in' }
  } catch (error) {
    console.error('Send verification error:', error)
    return { success: false, error: error.message }
  }
}

// Auth state observer
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Helper function to get user-friendly error messages
const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'No account found with this email address.'
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.'
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.'
    case 'auth/requires-recent-login':
      return 'Please log in again to perform this action.'
    default:
      return 'An error occurred. Please try again.'
  }
}