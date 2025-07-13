import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute, SessionTimeout } from './components'
import WelcomeOnboarding from './pages/WelcomeOnboardingNew'
import LoginSignup from './pages/LoginSignup'
import ProfileStepper from './pages/ProfileStepper'
import Dashboard from './pages/Dashboard'
import TripPlanner from './pages/TripPlanner'
import Explore from './pages/Explore'
import TripDetails from './pages/TripDetails'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Saved from './pages/Saved'
import MyBookings from './pages/MyBookings'
import NearbyPOIs from './pages/NearbyPOIs';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<WelcomeOnboarding />} />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="/profile-setup" element={<ProfileStepper />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/trip-planner" element={
                <ProtectedRoute>
                  <TripPlanner />
                </ProtectedRoute>
              } />
              <Route path="/explore" element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              } />
              <Route path="/trip-details" element={
                <ProtectedRoute>
                  <TripDetails />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <Saved />
                </ProtectedRoute>
              } />
              <Route path="/mybookings" element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              } />
              <Route path="/nearby-pois" element={<ProtectedRoute><NearbyPOIs /></ProtectedRoute>} />
            </Routes>
            
            {/* Global Components */}
            <SessionTimeout />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App