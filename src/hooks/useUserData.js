import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  getUserBookings, 
  getUserSavedItems, 
  getUserCart, 
  getUserNotifications,
  getUserReviews
} from '../firebase/firestore'
import { useNotifications, useCart } from './useFirestore'

export const useUserBookings = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchBookings = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getUserBookings(user.uid)
        
        if (result.success) {
          setBookings(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [user?.uid])

  const refetch = async () => {
    if (!user?.uid) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getUserBookings(user.uid)
      
      if (result.success) {
        setBookings(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter bookings by status
  const getBookingsByStatus = (status) => {
    return bookings.filter(booking => booking.status === status)
  }

  return { 
    bookings, 
    loading, 
    error, 
    refetch,
    upcomingBookings: getBookingsByStatus('UPCOMING'),
    activeBookings: getBookingsByStatus('ACTIVE'),
    completedBookings: getBookingsByStatus('COMPLETED'),
    cancelledBookings: getBookingsByStatus('CANCELLED')
  }
}

export const useUserSavedItems = () => {
  const { user } = useAuth()
  const [savedItems, setSavedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchSavedItems = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getUserSavedItems(user.uid)
        
        if (result.success) {
          setSavedItems(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedItems()
  }, [user?.uid])

  const refetch = async () => {
    if (!user?.uid) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getUserSavedItems(user.uid)
      
      if (result.success) {
        setSavedItems(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Filter saved items by type
  const getSavedItemsByType = (type) => {
    return savedItems.filter(item => item.itemType === type)
  }

  return { 
    savedItems, 
    loading, 
    error, 
    refetch,
    savedPlaces: getSavedItemsByType('Destination'),
    savedHotels: getSavedItemsByType('Hotel'),
    savedActivities: getSavedItemsByType('Activity'),
    savedRestaurants: getSavedItemsByType('Restaurant')
  }
}

// Use the real-time cart hook from useFirestore
export const useUserCart = () => {
  const { user } = useAuth()
  return useCart(user?.uid)
}

// Use the real-time notifications hook from useFirestore
export const useUserNotifications = () => {
  const { user } = useAuth()
  return useNotifications(user?.uid)
}

export const useUserReviews = () => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchReviews = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getUserReviews(user.uid)
        
        if (result.success) {
          setReviews(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [user?.uid])

  const refetch = async () => {
    if (!user?.uid) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getUserReviews(user.uid)
      
      if (result.success) {
        setReviews(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { reviews, loading, error, refetch }
}

// Combined user stats hook
export const useUserStats = () => {
  const { user } = useAuth()
  const { bookings } = useUserBookings()
  const { savedItems } = useUserSavedItems()
  const { reviews } = useUserReviews()
  const { cart } = useUserCart()

  const stats = {
    totalTrips: bookings.length,
    completedTrips: bookings.filter(b => b.status === 'COMPLETED').length,
    upcomingTrips: bookings.filter(b => b.status === 'UPCOMING').length,
    savedItems: savedItems.length,
    reviews: reviews.length,
    cartItems: cart.totalItems || 0,
    travelPoints: user?.travelPoints || 0,
    memberSince: user?.memberSince
  }

  return stats
}