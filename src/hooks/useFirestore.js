import { useState, useEffect } from 'react'
import { getDocuments, getDocument } from '../firebase/firestore'

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
  }, [collectionName, ...dependencies])

  return { data, loading, error, refetch: () => fetchData() }
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

  return { data, loading, error }
}