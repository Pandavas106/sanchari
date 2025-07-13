import { useState, useEffect } from 'react'
import { 
  getSharedTrips, 
  getUserSharedTrips, 
  getPopularSharedTrips, 
  getTrendingSharedTrips,
  searchSharedTrips,
  useSharedTrip,
  rateSharedTrip
} from '../firebase/firestore'

// Fallback data for when Firebase permissions are not configured
const getFallbackSharedTrips = () => [
  {
    id: 'demo-1',
    name: 'Himalayan Adventure Trek',
    description: 'Experience the breathtaking beauty of the Himalayas with this carefully planned 7-day trek. Includes accommodation, meals, and professional guides.',
    location: 'Himachal Pradesh, India',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    days: 7,
    minBudget: 25000,
    maxBudget: 35000,
    type: 0,
    companion: 0,
    difficulty: 'hard',
    season: 'summer',
    category: 'Adventure',
    tags: ['trekking', 'mountains', 'adventure', 'hiking', 'nature'],
    creatorName: 'Rajesh Kumar',
    usageCount: 45,
    averageRating: 4.8,
    totalRatings: 12,
    ratings: []
  },
  {
    id: 'demo-2',
    name: 'Kerala Backwaters & Spice Gardens',
    description: 'Discover the serene backwaters of Kerala and aromatic spice gardens. Perfect for couples seeking romance and relaxation.',
    location: 'Kerala, India',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    days: 5,
    minBudget: 30000,
    maxBudget: 50000,
    type: 1,
    companion: 1,
    difficulty: 'easy',
    season: 'winter',
    category: 'Relaxation',
    tags: ['backwaters', 'houseboat', 'spices', 'kerala', 'romantic', 'peaceful'],
    creatorName: 'Priya Sharma',
    usageCount: 32,
    averageRating: 4.6,
    totalRatings: 8,
    ratings: []
  },
  {
    id: 'demo-3',
    name: 'Rajasthan Cultural Heritage',
    description: 'Explore the royal heritage of Rajasthan with visits to majestic palaces, forts, and desert landscapes.',
    location: 'Rajasthan, India',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
    days: 8,
    minBudget: 40000,
    maxBudget: 70000,
    type: 3,
    companion: 2,
    difficulty: 'medium',
    season: 'winter',
    category: 'Cultural',
    tags: ['rajasthan', 'palaces', 'forts', 'desert', 'cultural', 'heritage', 'royal'],
    creatorName: 'Meera Rajput',
    usageCount: 28,
    averageRating: 4.7,
    totalRatings: 10,
    ratings: []
  },
  {
    id: 'demo-4',
    name: 'Goa Beach Paradise',
    description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa.',
    location: 'Goa, India',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    days: 6,
    minBudget: 20000,
    maxBudget: 40000,
    type: 1,
    companion: 3,
    difficulty: 'easy',
    season: 'winter',
    category: 'Beach',
    tags: ['goa', 'beaches', 'nightlife', 'water sports', 'relaxation', 'party'],
    creatorName: 'Arjun Patel',
    usageCount: 67,
    averageRating: 4.5,
    totalRatings: 15,
    ratings: []
  },
  {
    id: 'demo-5',
    name: 'Spiritual Journey to Varanasi',
    description: 'Immerse yourself in the spiritual heart of India. Experience ancient rituals, temple visits, and the sacred Ganges.',
    location: 'Varanasi, India',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    days: 4,
    minBudget: 15000,
    maxBudget: 25000,
    type: 2,
    companion: 2,
    difficulty: 'easy',
    season: 'any',
    category: 'Spiritual',
    tags: ['spiritual', 'temples', 'ganges', 'rituals', 'meditation', 'heritage'],
    creatorName: 'Anand Mishra',
    usageCount: 23,
    averageRating: 4.9,
    totalRatings: 6,
    ratings: []
  },
  {
    id: 'demo-6',
    name: 'Andaman Island Escape',
    description: 'Dive into crystal clear waters, explore coral reefs, and enjoy pristine beaches in the Andaman Islands.',
    location: 'Andaman Islands, India',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
    days: 7,
    minBudget: 50000,
    maxBudget: 80000,
    type: 0,
    companion: 1,
    difficulty: 'medium',
    season: 'winter',
    category: 'Adventure',
    tags: ['andaman', 'islands', 'diving', 'snorkeling', 'beaches', 'coral reefs'],
    creatorName: 'Kavya Nair',
    usageCount: 19,
    averageRating: 4.8,
    totalRatings: 5,
    ratings: []
  }
]

// Hook for fetching all shared trips
export const useSharedTrips = (filters = {}) => {
  const [sharedTrips, setSharedTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSharedTrips = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getSharedTrips(filters)
        
        if (result.success) {
          setSharedTrips(result.data || [])
        } else {
          console.error('Failed to fetch shared trips:', result.error)
          // If it's a permissions error, provide fallback data
          if (result.error?.includes('permissions') || result.error?.includes('Missing or insufficient')) {
            setSharedTrips(getFallbackSharedTrips())
            setError('Using demo data - Firebase permissions need to be configured')
          } else {
            setError(result.error)
          }
        }
      } catch (err) {
        console.error('Error fetching shared trips:', err)
        setError(err.message)
        // Provide fallback data on error
        setSharedTrips(getFallbackSharedTrips())
      } finally {
        setLoading(false)
      }
    }

    fetchSharedTrips()
  }, [JSON.stringify(filters)])

  const refetch = () => {
    fetchSharedTrips()
  }

  return { sharedTrips, loading, error, refetch }
}

// Hook for fetching user's shared trips
export const useUserSharedTrips = (userId) => {
  const [userSharedTrips, setUserSharedTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserSharedTrips = async () => {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const result = await getUserSharedTrips(userId)
        
        if (result.success) {
          setUserSharedTrips(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserSharedTrips()
  }, [userId])

  return { userSharedTrips, loading, error }
}

// Hook for fetching popular shared trips
export const usePopularSharedTrips = (limit = 10) => {
  const [popularTrips, setPopularTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPopularTrips = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getPopularSharedTrips(limit)
        
        if (result.success) {
          setPopularTrips(result.data || [])
        } else {
          console.error('Failed to fetch popular trips:', result.error)
          // Use fallback data sorted by usage count
          const fallbackData = getFallbackSharedTrips()
            .sort((a, b) => b.usageCount - a.usageCount)
            .slice(0, limit)
          setPopularTrips(fallbackData)
          if (result.error?.includes('permissions') || result.error?.includes('Missing or insufficient')) {
            setError('Using demo data - Firebase permissions need to be configured')
          } else {
            setError(result.error)
          }
        }
      } catch (err) {
        console.error('Error fetching popular trips:', err)
        setError(err.message)
        // Use fallback data on error
        const fallbackData = getFallbackSharedTrips()
          .sort((a, b) => b.usageCount - a.usageCount)
          .slice(0, limit)
        setPopularTrips(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularTrips()
  }, [limit])

  return { popularTrips, loading, error }
}

// Hook for fetching trending shared trips
export const useTrendingSharedTrips = (limit = 10) => {
  const [trendingTrips, setTrendingTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrendingTrips = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const result = await getTrendingSharedTrips(limit)
        
        if (result.success) {
          setTrendingTrips(result.data || [])
        } else {
          console.error('Failed to fetch trending trips:', result.error)
          // Use fallback data sorted by rating
          const fallbackData = getFallbackSharedTrips()
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, limit)
          setTrendingTrips(fallbackData)
          if (result.error?.includes('permissions') || result.error?.includes('Missing or insufficient')) {
            setError('Using demo data - Firebase permissions need to be configured')
          } else {
            setError(result.error)
          }
        }
      } catch (err) {
        console.error('Error fetching trending trips:', err)
        setError(err.message)
        // Use fallback data on error
        const fallbackData = getFallbackSharedTrips()
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, limit)
        setTrendingTrips(fallbackData)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingTrips()
  }, [limit])

  return { trendingTrips, loading, error }
}

// Hook for searching shared trips
export const useSearchSharedTrips = (searchQuery, filters = {}) => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const performSearch = async (query, searchFilters = {}) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      const result = await searchSharedTrips(query, searchFilters)
      
      if (result.success) {
        setSearchResults(result.data)
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
    const debounceTimer = setTimeout(() => {
      performSearch(searchQuery, filters)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, JSON.stringify(filters)])

  return { searchResults, loading, error, performSearch }
}

// Hook for shared trip actions
export const useSharedTripActions = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const useTrip = async (sharedTripId, userId) => {
    try {
      setLoading(true)
      setError(null)
      
      // Check if this is a demo trip
      if (sharedTripId.startsWith('demo-')) {
        console.log('Demo trip usage - redirecting to trip planner')
        return { success: true, message: 'Demo trip - proceeding to customization' }
      }
      
      const result = await useSharedTrip(sharedTripId, userId)
      
      if (!result.success) {
        console.error('Failed to use trip:', result.error)
        setError(result.error)
      }
      
      return result
    } catch (err) {
      console.error('Error using trip:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const rateTrip = async (sharedTripId, userId, rating, comment = '') => {
    try {
      setLoading(true)
      setError(null)
      
      // Check if this is a demo trip
      if (sharedTripId.startsWith('demo-')) {
        console.log('Demo trip rating - simulating success')
        return { success: true, message: 'Demo trip rating simulated' }
      }
      
      const result = await rateSharedTrip(sharedTripId, userId, rating, comment)
      
      if (!result.success) {
        console.error('Failed to rate trip:', result.error)
        setError(result.error)
      }
      
      return result
    } catch (err) {
      console.error('Error rating trip:', err)
      setError(err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return { useTrip, rateTrip, loading, error }
}
