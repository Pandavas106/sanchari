import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChange, signInWithEmail, createUserWithEmail, signOut as firebaseSignOut } from '../firebase/auth'
import { createUserProfile, getUserProfile, updateUserProfile } from '../firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        try {
          // Get user profile from Firestore
          const profileResult = await getUserProfile(firebaseUser.uid)
          
          if (profileResult.success) {
            // Merge Firebase auth data with Firestore profile data
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              emailVerified: firebaseUser.emailVerified,
              ...profileResult.data
            }
            setUser(userData)
          } else {
            // Create basic user profile if it doesn't exist
            const basicProfile = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || null,
              emailVerified: firebaseUser.emailVerified,
              travelPoints: 0,
              memberSince: new Date(),
              preferences: []
            }
            
            await createUserProfile(firebaseUser.uid, basicProfile)
            
            setUser({
              uid: firebaseUser.uid,
              ...basicProfile
            })
          }
          
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Error loading user profile:', error)
          setUser(null)
          setIsAuthenticated(false)
        }
      } else {
        // User is signed out
        setUser(null)
        setIsAuthenticated(false)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const result = await signInWithEmail(email, password)
      
      if (result.success) {
        return { success: true, user: result.user }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email, password, userData) => {
    try {
      setLoading(true)
      
      // Create Firebase auth user
      const authResult = await createUserWithEmail(email, password, userData)
      
      if (authResult.success) {
        // Create user profile in Firestore
        const profileData = {
          ...userData,
          email,
          emailVerified: false,
          travelPoints: 0,
          memberSince: new Date(),
          preferences: userData.preferences || []
        }
        
        await createUserProfile(authResult.user.uid, profileData)
        
        return { success: true, user: authResult.user }
      } else {
        return { success: false, error: authResult.error }
      }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const result = await firebaseSignOut()
      
      if (result.success) {
        setUser(null)
        setIsAuthenticated(false)
        navigate('/')
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates) => {
    try {
      setLoading(true)
      
      if (user?.uid) {
        const result = await updateUserProfile(user.uid, updates)
        
        if (result.success) {
          // Update local user state
          setUser(prevUser => ({ ...prevUser, ...updates }))
          return { success: true }
        } else {
          return { success: false, error: result.error }
        }
      } else {
        return { success: false, error: 'No user logged in' }
      }
    } catch (error) {
      console.error('Update profile error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    try {
      setLoading(true)
      const { resetPassword } = await import('../firebase/auth')
      const result = await resetPassword(email)
      
      if (result.success) {
        return { success: true, message: 'Password reset email sent' }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async () => {
    try {
      setLoading(true)
      const { deleteUserAccount } = await import('../firebase/auth')
      const result = await deleteUserAccount()
      
      if (result.success) {
        setUser(null)
        setIsAuthenticated(false)
        navigate('/')
        return { success: true }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Delete account error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    deleteAccount
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}