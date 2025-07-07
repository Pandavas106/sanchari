import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { LoadingSpinner } from '../index'
import { useTheme } from '../../contexts/ThemeContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const { isDark } = useTheme()
  const location = useLocation()

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark 
          ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
          : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100'
      }`}>
        <LoadingSpinner size="xl" text="Authenticating..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute