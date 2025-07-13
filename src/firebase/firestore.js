import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment,
  writeBatch,
  runTransaction
} from 'firebase/firestore'
import { db } from './config'

// Generic CRUD operations
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('Error creating document:', error)
    return { success: false, error: error.message }
  }
}

export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
    } else {
      return { success: false, error: 'Document not found' }
    }
  } catch (error) {
    console.error('Error getting document:', error)
    return { success: false, error: error.message }
  }
}

export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating document:', error)
    return { success: false, error: error.message }
  }
}

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    return { success: true }
  } catch (error) {
    console.error('Error deleting document:', error)
    return { success: false, error: error.message }
  }
}

export const getDocuments = async (collectionName, conditions = []) => {
  try {
    let q = collection(db, collectionName)
    
    // Apply conditions
    conditions.forEach(condition => {
      if (condition.type === 'where') {
        q = query(q, where(condition.field, condition.operator, condition.value))
      } else if (condition.type === 'orderBy') {
        q = query(q, orderBy(condition.field, condition.direction))
      } else if (condition.type === 'limit') {
        q = query(q, limit(condition.value))
      }
    })
    
    const querySnapshot = await getDocs(q)
    const documents = []
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    
    return { success: true, data: documents }
  } catch (error) {
    console.error('Error getting documents:', error)
    return { success: false, error: error.message }
  }
}

// User-specific operations
export const createUserProfile = async (userId, userData) => {
  try {
    const docRef = doc(db, 'users', userId)
    await setDoc(docRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error creating user profile:', error)
    return { success: false, error: error.message }
  }
}

export const getUserProfile = async (userId) => {
  return await getDocument('users', userId)
}

export const updateUserProfile = async (userId, userData) => {
  return await updateDocument('users', userId, userData)
}

// Destinations operations
export const getDestinations = async (filters = {}) => {
  const conditions = []
  
  if (filters.category && filters.category !== 'All') {
    conditions.push({ type: 'where', field: 'category', operator: '==', value: filters.category })
  }
  
  if (filters.trending) {
    conditions.push({ type: 'where', field: 'trending', operator: '==', value: true })
  }
  
  if (filters.orderBy) {
    conditions.push({ type: 'orderBy', field: filters.orderBy, direction: filters.direction || 'desc' })
  }
  
  if (filters.limit) {
    conditions.push({ type: 'limit', value: filters.limit })
  }
  
  return await getDocuments('destinations', conditions)
}

export const getDestinationById = async (destinationId) => {
  return await getDocument('destinations', destinationId)
}

// Bookings operations
export const createBooking = async (userId, bookingData) => {
  try {
    const booking = {
      ...bookingData,
      userId,
      status: 'UPCOMING',
      bookingDate: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    const result = await createDocument('bookings', booking)
    
    if (result.success) {
      // Update user's travel points
      await updateUserTravelPoints(userId, 100) // Award 100 points for booking
    }
    
    return result
  } catch (error) {
    console.error('Error creating booking:', error)
    return { success: false, error: error.message }
  }
}

export const getUserBookings = async (userId, tripName = null) => {
  try {
    let conditions = [
      { type: 'where', field: 'userId', operator: '==', value: userId },
      { type: 'orderBy', field: 'createdAt', direction: 'desc' }
    ]
    
    // If tripName is provided, filter by trip name
    if (tripName) {
      conditions.unshift({ type: 'where', field: 'tripName', operator: '==', value: tripName })
    }
    
    const result = await getDocuments('bookings', conditions)
    
    if (!result.success) {
      return result
    }
    
    // Filter bookings that have itinerary data (created from trip details)
    const filteredBookings = result.data.filter(booking => 
      booking.itinerary && Array.isArray(booking.itinerary) && booking.itinerary.length > 0
    )
    
    // If tripName is provided, return the specific booking, otherwise return the most recent
    const bookingsToReturn = tripName 
      ? filteredBookings 
      : (filteredBookings.length > 0 ? [filteredBookings[0]] : [])
    
    return { success: true, data: bookingsToReturn }
  } catch (error) {
    console.error('Error getting user bookings:', error)
    return { success: false, error: error.message }
  }
}

export const getAllUserBookings = async (userId) => {
  return await getDocuments('bookings', [
    { type: 'where', field: 'userId', operator: '==', value: userId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

export const updateBookingStatus = async (bookingId, status) => {
  return await updateDocument('bookings', bookingId, { status })
}

export const cancelBooking = async (bookingId) => {
  return await updateDocument('bookings', bookingId, { 
    status: 'CANCELLED',
    cancelledAt: serverTimestamp()
  })
}

// Saved items operations
export const addToSaved = async (userId, itemData) => {
  try {
    const savedItem = {
      ...itemData,
      userId,
      savedDate: serverTimestamp(),
      createdAt: serverTimestamp()
    }
    
    return await createDocument('savedItems', savedItem)
  } catch (error) {
    console.error('Error adding to saved:', error)
    return { success: false, error: error.message }
  }
}

export const removeFromSaved = async (savedItemId) => {
  return await deleteDocument('savedItems', savedItemId)
}

export const getUserSavedItems = async (userId) => {
  return await getDocuments('savedItems', [
    { type: 'where', field: 'userId', operator: '==', value: userId },
    { type: 'orderBy', field: 'savedDate', direction: 'desc' }
  ])
}

export const checkIfItemSaved = async (userId, itemId) => {
  try {
    const result = await getDocuments('savedItems', [
      { type: 'where', field: 'userId', operator: '==', value: userId },
      { type: 'where', field: 'itemId', operator: '==', value: itemId }
    ])
    
    return { success: true, isSaved: result.data.length > 0, data: result.data[0] || null }
  } catch (error) {
    console.error('Error checking saved item:', error)
    return { success: false, error: error.message }
  }
}

// Cart operations
export const updateUserCart = async (userId, cartItems) => {
  try {
    const cartRef = doc(db, 'carts', userId)
    await setDoc(cartRef, {
      userId,
      items: cartItems,
      lastUpdated: serverTimestamp(),
      totalItems: cartItems.length,
      totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    }, { merge: true })
    return { success: true }
  } catch (error) {
    console.error('Error updating cart:', error)
    return { success: false, error: error.message }
  }
}

export const getUserCart = async (userId) => {
  const result = await getDocument('carts', userId)
  if (!result.success) {
    // Return empty cart if none exists
    return { success: true, data: { items: [], totalItems: 0, totalAmount: 0 } }
  }
  return result
}

export const addToCart = async (userId, item) => {
  try {
    const cartResult = await getUserCart(userId)
    const currentItems = cartResult.data.items || []
    
    // Check if item already exists
    const existingItemIndex = currentItems.findIndex(cartItem => cartItem.id === item.id)
    
    if (existingItemIndex >= 0) {
      // Update quantity
      currentItems[existingItemIndex].quantity += 1
    } else {
      // Add new item
      currentItems.push({ ...item, quantity: 1, addedAt: new Date() })
    }
    
    return await updateUserCart(userId, currentItems)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return { success: false, error: error.message }
  }
}

export const removeFromCart = async (userId, itemId) => {
  try {
    const cartResult = await getUserCart(userId)
    const currentItems = cartResult.data.items || []
    
    const updatedItems = currentItems.filter(item => item.id !== itemId)
    return await updateUserCart(userId, updatedItems)
  } catch (error) {
    console.error('Error removing from cart:', error)
    return { success: false, error: error.message }
  }
}

export const clearCart = async (userId) => {
  return await updateUserCart(userId, [])
}

// Reviews operations
export const createReview = async (userId, reviewData) => {
  try {
    const review = {
      ...reviewData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
    
    const result = await createDocument('reviews', review)
    
    if (result.success) {
      // Update user's travel points for writing a review
      await updateUserTravelPoints(userId, 50)
    }
    
    return result
  } catch (error) {
    console.error('Error creating review:', error)
    return { success: false, error: error.message }
  }
}

export const getDestinationReviews = async (destinationId) => {
  return await getDocuments('reviews', [
    { type: 'where', field: 'destinationId', operator: '==', value: destinationId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

export const getUserReviews = async (userId) => {
  return await getDocuments('reviews', [
    { type: 'where', field: 'userId', operator: '==', value: userId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

// Notifications operations
export const createNotification = async (userId, notificationData) => {
  try {
    const notification = {
      ...notificationData,
      userId,
      read: false,
      createdAt: serverTimestamp()
    }
    
    return await createDocument('notifications', notification)
  } catch (error) {
    console.error('Error creating notification:', error)
    return { success: false, error: error.message }
  }
}

export const getUserNotifications = async (userId) => {
  return await getDocuments('notifications', [
    { type: 'where', field: 'userId', operator: '==', value: userId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

export const markNotificationAsRead = async (notificationId) => {
  return await updateDocument('notifications', notificationId, { read: true })
}

export const markAllNotificationsAsRead = async (userId) => {
  try {
    const notifications = await getUserNotifications(userId)
    const batch = writeBatch(db)
    
    notifications.data.forEach(notification => {
      if (!notification.read) {
        const notificationRef = doc(db, 'notifications', notification.id)
        batch.update(notificationRef, { read: true })
      }
    })
    
    await batch.commit()
    return { success: true }
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    return { success: false, error: error.message }
  }
}

// Travel Points operations
export const updateUserTravelPoints = async (userId, points) => {
  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      travelPoints: increment(points),
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    console.error('Error updating travel points:', error)
    return { success: false, error: error.message }
  }
}

// Real-time listeners
export const subscribeToUserNotifications = (userId, callback) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false),
    orderBy('createdAt', 'desc')
  )
  
  return onSnapshot(q, (querySnapshot) => {
    const notifications = []
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() })
    })
    callback(notifications)
  }, (error) => {
    console.error('Error in notifications listener:', error)
  })
}

export const subscribeToUserCart = (userId, callback) => {
  const cartRef = doc(db, 'carts', userId)
  
  return onSnapshot(cartRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() })
    } else {
      callback({ items: [], totalItems: 0, totalAmount: 0 })
    }
  }, (error) => {
    console.error('Error in cart listener:', error)
  })
}

// Analytics and tracking
export const trackUserActivity = async (userId, activity) => {
  try {
    const activityData = {
      userId,
      activity,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    
    return await createDocument('userActivities', activityData)
  } catch (error) {
    console.error('Error tracking user activity:', error)
    return { success: false, error: error.message }
  }
}

// Search functionality
export const searchDestinations = async (searchQuery, filters = {}) => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This is a basic implementation. For production, consider using Algolia or similar
    const conditions = []
    
    if (filters.category && filters.category !== 'All') {
      conditions.push({ type: 'where', field: 'category', operator: '==', value: filters.category })
    }
    
    conditions.push({ type: 'orderBy', field: 'name', direction: 'asc' })
    
    const result = await getDocuments('destinations', conditions)
    
    if (result.success && searchQuery) {
      // Client-side filtering for search query
      const filteredData = result.data.filter(destination => 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      return { success: true, data: filteredData }
    }
    
    return result
  } catch (error) {
    console.error('Error searching destinations:', error)
    return { success: false, error: error.message }
  }
}