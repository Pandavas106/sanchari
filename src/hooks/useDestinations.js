import { useState, useEffect } from 'react'
import { getDestinations, searchDestinations } from '../firebase/firestore'

export const useDestinations = (filters = {}) => {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = await getDestinations(filters)
        
        if (result.success) {
          setDestinations(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [JSON.stringify(filters)])

  const searchDestinationsData = async (searchQuery, searchFilters = {}) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await searchDestinations(searchQuery, { ...filters, ...searchFilters })
      
      if (result.success) {
        setDestinations(result.data)
        return { success: true, data: result.data }
      } else {
        setError(result.error)
        return { success: false, error: result.error }
      }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await getDestinations(filters)
      
      if (result.success) {
        setDestinations(result.data)
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { 
    destinations, 
    loading, 
    error, 
    refetch,
    searchDestinations: searchDestinationsData
  }
}

// Hook for featured destinations
export const useFeaturedDestinations = (limit = 4) => {
  return useDestinations({
    trending: true,
    limit,
    orderBy: 'rating',
    direction: 'desc'
  })
}

// Hook for destinations by category
export const useDestinationsByCategory = (category) => {
  return useDestinations({
    category: category !== 'All' ? category : undefined,
    orderBy: 'rating',
    direction: 'desc'
  })
}

// Hook for trending destinations
export const useTrendingDestinations = (limit = 6) => {
  return useDestinations({
    trending: true,
    limit,
    orderBy: 'reviews',
    direction: 'desc'
  })
}