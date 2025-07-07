import { useState, useEffect } from 'react'
import { getDestinations } from '../firebase/firestore'

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

  return { destinations, loading, error }
}