import { useState, useEffect } from 'react'
import { getDocuments, getDocument, subscribeToUserNotifications, subscribeToUserCart } from '../firebase/firestore'

// Hook for fetching a collection
export const useCollection = (collectionName, conditions = [], dependencies = []) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getDocuments(collectionName, conditions)
        
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName, JSON.stringify(conditions), ...dependencies])

  const refetch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await getDocuments(collectionName, conditions)
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Hook for fetching a single document
export const useDocument = (collectionName, docId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!docId) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getDocument(collectionName, docId)
        
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [collectionName, docId])

  const refetch = async () => {
    if (!docId) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await getDocument(collectionName, docId)
      
      if (result.success) {
        setData(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Hook for real-time notifications
export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const unsubscribe = subscribeToUserNotifications(
      userId,
      (notificationData) => {
        setNotifications(notificationData)
        setLoading(false)
      }
    )

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [userId])

  return { notifications, loading, error, count: notifications.length }
}

// Hook for real-time cart
export const useCart = (userId) => {
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalAmount: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    const unsubscribe = subscribeToUserCart(
      userId,
      (cartData) => {
        setCart(cartData)
        setLoading(false)
      }
    )

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [userId])

  return { cart, loading, error, itemCount: cart.totalItems || 0 }
}

// Hook for paginated data
export const usePaginatedCollection = (collectionName, conditions = [], pageSize = 10) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  const loadMore = async () => {
    if (!hasMore || loading) return

    setLoading(true)
    setError(null)

    try {
      const paginatedConditions = [
        ...conditions,
        { type: 'limit', value: pageSize * page }
      ]

      const result = await getDocuments(collectionName, paginatedConditions)
      
      if (result.success) {
        setData(result.data)
        setHasMore(result.data.length === pageSize * page)
        setPage(prev => prev + 1)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      setError(null)
      setPage(1)
      
      try {
        const initialConditions = [
          ...conditions,
          { type: 'limit', value: pageSize }
        ]

        const result = await getDocuments(collectionName, initialConditions)
        
        if (result.success) {
          setData(result.data)
          setHasMore(result.data.length === pageSize)
          setPage(2)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [collectionName, JSON.stringify(conditions), pageSize])

  const reset = () => {
    setData([])
    setPage(1)
    setHasMore(true)
    setError(null)
  }

  return { data, loading, error, hasMore, loadMore, reset }
}