import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import WelcomeOnboarding from './pages/WelcomeOnboarding'
import LoginSignup from './pages/LoginSignup'
import ProfileStepper from './pages/ProfileStepper'
import Dashboard from './pages/Dashboard'
import TripPlanner from './pages/TripPlanner'
import Explore from './pages/Explore'
import AiSuggestedTrips from './pages/AiSuggestedTrips'
import TripDetails from './pages/TripDetails'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Saved from './pages/Saved'
import MyBookings from './pages/MyBookings'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<WelcomeOnboarding />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/profile-setup" element={<ProfileStepper />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trip-planner" element={<TripPlanner />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/ai-trips" element={<AiSuggestedTrips />} />
            <Route path="/trip-details" element={<TripDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App