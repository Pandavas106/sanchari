import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import WelcomeOnboarding from './components/WelcomeOnboarding'
import LoginSignup from './components/LoginSignup'
import ProfileStepper from './components/ProfileStepper'
import Dashboard from './components/Dashboard'
import TripPlanner from './components/TripPlanner'
import Explore from './components/Explore'
import AiSuggestedTrips from './components/AiSuggestedTrips'
import TripDetails from './components/TripDetails'
import Cart from './components/Cart'
import Profile from './components/Profile'
import Settings from './components/Settings'
import Saved from './components/Saved'
import MyBookings from './components/MyBookings'

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