import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  arrayUnion,
  arrayRemove
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
    return { success: false, error: error.message }
  }
}

export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    return { success: true }
  } catch (error) {
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
    return { success: false, error: error.message }
  }
}

// User-specific operations
export const createUserProfile = async (userId, userData) => {
  try {
    await updateDoc(doc(db, 'users', userId), {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
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

// Bookings operations
export const createBooking = async (userId, bookingData) => {
  return await createDocument('bookings', {
    ...bookingData,
    userId,
    status: 'UPCOMING'
  })
}

export const getUserBookings = async (userId) => {
  return await getDocuments('bookings', [
    { type: 'where', field: 'userId', operator: '==', value: userId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

export const updateBookingStatus = async (bookingId, status) => {
  return await updateDocument('bookings', bookingId, { status })
}

// Saved items operations
export const addToSaved = async (userId, itemData) => {
  return await createDocument('savedItems', {
    ...itemData,
    userId
  })
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

// Cart operations
export const updateUserCart = async (userId, cartItems) => {
  try {
    const cartRef = doc(db, 'carts', userId)
    await updateDoc(cartRef, {
      userId,
      items: cartItems,
      lastUpdated: serverTimestamp()
    })
    return { success: true }
  } catch (error) {
    // If cart doesn't exist, create it
    try {
      await updateDoc(cartRef, {
        userId,
        items: cartItems,
        lastUpdated: serverTimestamp()
      })
      return { success: true }
    } catch (createError) {
      return { success: false, error: createError.message }
    }
  }
}

export const getUserCart = async (userId) => {
  return await getDocument('carts', userId)
}

// Reviews operations
export const createReview = async (userId, reviewData) => {
  return await createDocument('reviews', {
    ...reviewData,
    userId
  })
}

export const getDestinationReviews = async (destinationId) => {
  return await getDocuments('reviews', [
    { type: 'where', field: 'destinationId', operator: '==', value: destinationId },
    { type: 'orderBy', field: 'createdAt', direction: 'desc' }
  ])
}

// Notifications operations
export const createNotification = async (userId, notificationData) => {
  return await createDocument('notifications', {
    ...notificationData,
    userId,
    read: false
  })
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
  })
}