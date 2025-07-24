import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle, onAuthStateChange } from '../firebase/auth'
import { 
  createUserProfile, 
  getUserProfile, 
  updateUserProfile,
  createNotification,
  trackUserActivity
} from '../firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// ErrorBoundary component for robust error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error info here or send to a service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: 24 }}>
        <h2>Something went wrong.</h2>
        <pre>{this.state.error?.toString()}</pre>
      </div>;
    }
    return this.props.children;
  }
}

export const AuthProvider = ({ children }) => {
  // Google sign-in handler must be defined inside AuthProvider
  const signInGoogle = async () => {
    try {
      setLoading(true)
      const result = await signInWithGoogle()
      if (result.success) {
        return { success: true, user: result.user }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }
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
            
            // Track login activity
            await trackUserActivity(firebaseUser.uid, {
              type: 'login',
              timestamp: new Date(),
              method: 'email'
            })
          } else {
            // Create basic user profile if it doesn't exist
            const basicProfile = {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || null,
              emailVerified: firebaseUser.emailVerified,
              travelPoints: 0,
              memberSince: new Date(),
              preferences: [],
              profileComplete: false
            }
            
            await createUserProfile(firebaseUser.uid, basicProfile)
            
            // Send welcome notification
            await createNotification(firebaseUser.uid, {
              type: 'welcome',
              title: 'Welcome to Sanchari!',
              message: 'Start exploring amazing destinations and plan your dream trips.',
              icon: '🎉'
            })
            
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
          preferences: userData.preferences || [],
          profileComplete: true
        }
        
        await createUserProfile(authResult.user.uid, profileData)
        
        // Send welcome notification
        await createNotification(authResult.user.uid, {
          type: 'welcome',
          title: 'Welcome to Sanchari!',
          message: 'Your account has been created successfully. Start exploring amazing destinations!',
          icon: '🎉'
        })
        
        // Track signup activity
        await trackUserActivity(authResult.user.uid, {
          type: 'signup',
          timestamp: new Date(),
          method: 'email'
        })
        
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
      
      // Track logout activity
      if (user?.uid) {
        await trackUserActivity(user.uid, {
          type: 'logout',
          timestamp: new Date()
        })
      }
      
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
          
          // Track profile update
          await trackUserActivity(user.uid, {
            type: 'profile_update',
            timestamp: new Date(),
            fields: Object.keys(updates)
          })
          
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
      const result = await firebaseResetPassword(email)
      
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

  const changePassword = async (currentPassword, newPassword) => {
    try {
      setLoading(true)
      const result = await updateUserPassword(currentPassword, newPassword)
      
      if (result.success) {
        // Track password change
        if (user?.uid) {
          await trackUserActivity(user.uid, {
            type: 'password_change',
            timestamp: new Date()
          })
          
          // Send notification
          await createNotification(user.uid, {
            type: 'security',
            title: 'Password Changed',
            message: 'Your password has been successfully updated.',
            icon: '🔒'
          })
        }
        
        return { success: true, message: 'Password updated successfully' }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Change password error:', error)
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteAccount = async () => {
    try {
      setLoading(true)
      
      // Track account deletion
      if (user?.uid) {
        await trackUserActivity(user.uid, {
          type: 'account_deletion',
          timestamp: new Date()
        })
      }
      
      const result = await firebaseDeleteAccount()
      
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

  const sendEmailVerification = async () => {
    try {
      const result = await sendVerificationEmail()
      
      if (result.success) {
        // Send notification
        if (user?.uid) {
          await createNotification(user.uid, {
            type: 'info',
            title: 'Verification Email Sent',
            message: 'Please check your email and click the verification link.',
            icon: '📧'
          })
        }
        
        return { success: true, message: 'Verification email sent' }
      } else {
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Send verification error:', error)
      return { success: false, error: error.message }
    }
  }

  const refreshUserProfile = async () => {
    try {
      if (user?.uid) {
        const profileResult = await getUserProfile(user.uid)
        
        if (profileResult.success) {
          setUser(prevUser => ({
            ...prevUser,
            ...profileResult.data
          }))
          return { success: true }
        }
      }
      return { success: false, error: 'No user logged in' }
    } catch (error) {
      console.error('Refresh profile error:', error)
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    signIn,
    signInGoogle,
    signUp,
    signOut,
    updateProfile,
    resetPassword,
    changePassword,
    deleteAccount,
    sendEmailVerification,
    refreshUserProfile
  }

  return (
    <ErrorBoundary>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </ErrorBoundary>
  )
}