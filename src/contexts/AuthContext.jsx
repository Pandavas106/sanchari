import React, { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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

  // Mock user data - in real app this would come from Firebase Auth
  const mockUser = {
    uid: 'user123',
    email: 'sarah.johnson@email.com',
    displayName: 'Sarah Johnson',
    photoURL: null,
    emailVerified: true,
    createdAt: new Date('2023-01-15'),
    lastLoginAt: new Date(),
    metadata: {
      creationTime: '2023-01-15',
      lastSignInTime: new Date().toISOString()
    }
  }

  // Demo credentials
  const DEMO_EMAIL = 'sarah.johnson@email.com'
  const DEMO_PASSWORD = 'password123'

  useEffect(() => {
    // Check if user is logged in (localStorage for demo)
    const savedUser = localStorage.getItem('sanchari_user')
    const isLoggedIn = localStorage.getItem('sanchari_auth') === 'true'
    
    if (savedUser && isLoggedIn) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Check demo credentials
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        const userData = { ...mockUser, email }
        setUser(userData)
        setIsAuthenticated(true)
        
        // Save to localStorage for persistence
        localStorage.setItem('sanchari_user', JSON.stringify(userData))
        localStorage.setItem('sanchari_auth', 'true')
        localStorage.setItem('sanchari_login_time', new Date().toISOString())
        
        return { success: true, user: userData }
      } else {
        // For demo purposes, also accept any email with the demo password
        if (password === DEMO_PASSWORD && email) {
          const userData = { ...mockUser, email }
          setUser(userData)
          setIsAuthenticated(true)
          
          // Save to localStorage for persistence
          localStorage.setItem('sanchari_user', JSON.stringify(userData))
          localStorage.setItem('sanchari_auth', 'true')
          localStorage.setItem('sanchari_login_time', new Date().toISOString())
          
          return { success: true, user: userData }
        } else {
          throw new Error('Invalid credentials. Please use the demo credentials provided.')
        }
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser = {
        ...mockUser,
        email,
        displayName: `${userData.firstName} ${userData.lastName}`,
        ...userData
      }
      
      setUser(newUser)
      setIsAuthenticated(true)
      
      // Save to localStorage
      localStorage.setItem('sanchari_user', JSON.stringify(newUser))
      localStorage.setItem('sanchari_auth', 'true')
      localStorage.setItem('sanchari_login_time', new Date().toISOString())
      
      return { success: true, user: newUser }
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Clear user data
      setUser(null)
      setIsAuthenticated(false)
      
      // Clear localStorage
      localStorage.removeItem('sanchari_user')
      localStorage.removeItem('sanchari_auth')
      localStorage.removeItem('sanchari_login_time')
      localStorage.removeItem('sanchari_cart')
      localStorage.removeItem('sanchari_saved_items')
      localStorage.removeItem('sanchari_search_history')
      
      // Clear any other app-specific data
      localStorage.removeItem('theme')
      
      // Navigate to welcome page
      navigate('/')
      
      return { success: true }
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      
      // Update localStorage
      localStorage.setItem('sanchari_user', JSON.stringify(updatedUser))
      
      return { success: true, user: updatedUser }
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In real app, this would send password reset email
      console.log('Password reset email sent to:', email)
      
      return { success: true, message: 'Password reset email sent' }
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
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Clear all data
      setUser(null)
      setIsAuthenticated(false)
      
      // Clear localStorage completely
      localStorage.clear()
      
      // Navigate to welcome page
      navigate('/')
      
      return { success: true }
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