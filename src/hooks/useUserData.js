import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getUserBookings, getUserSavedItems, getUserCart, getUserNotifications } from '../firebase/firestore'

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

  return { bookings, loading, error }
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

  return { savedItems, loading, error }
}

export const useUserCart = () => {
  const { user } = useAuth()
  const [cart, setCart] = useState({ items: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchCart = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getUserCart(user.uid)
        
        if (result.success) {
          setCart(result.data)
        } else {
          // If cart doesn't exist, initialize empty cart
          setCart({ items: [] })
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
  }, [user?.uid])

  return { cart, loading, error }
}

export const useUserNotifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false)
      return
    }

    const fetchNotifications = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getUserNotifications(user.uid)
        
        if (result.success) {
          setNotifications(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [user?.uid])

  return { notifications, loading, error }
}