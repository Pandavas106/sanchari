import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage'
import { storage } from './config'

// Upload file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return { success: true, url: downloadURL, path: snapshot.ref.fullPath }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: error.message }
  }
}

// Delete file from Firebase Storage
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    return { success: false, error: error.message }
  }
}

// Upload profile picture
export const uploadProfilePicture = async (userId, file) => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Please select an image file' }
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return { success: false, error: 'File size must be less than 5MB' }
    }
    
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const path = `profile-pictures/${userId}/${timestamp}.${fileExtension}`
    
    return await uploadFile(file, path)
  } catch (error) {
    console.error('Profile picture upload error:', error)
    return { success: false, error: error.message }
  }
}

// Upload destination images (admin function)
export const uploadDestinationImage = async (destinationId, file) => {
  try {
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Please select an image file' }
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: 'File size must be less than 10MB' }
    }
    
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const path = `destinations/${destinationId}/${timestamp}.${fileExtension}`
    
    return await uploadFile(file, path)
  } catch (error) {
    console.error('Destination image upload error:', error)
    return { success: false, error: error.message }
  }
}

// Upload multiple files
export const uploadMultipleFiles = async (files, basePath) => {
  try {
    const uploadPromises = files.map((file, index) => {
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop()
      const path = `${basePath}/${timestamp}_${index}.${fileExtension}`
      return uploadFile(file, path)
    })
    
    const results = await Promise.all(uploadPromises)
    const successfulUploads = results.filter(result => result.success)
    const failedUploads = results.filter(result => !result.success)
    
    return {
      success: failedUploads.length === 0,
      successfulUploads,
      failedUploads,
      totalUploaded: successfulUploads.length,
      totalFailed: failedUploads.length
    }
  } catch (error) {
    console.error('Multiple upload error:', error)
    return { success: false, error: error.message }
  }
}

// Get all files in a directory
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path)
    const result = await listAll(storageRef)
    
    const files = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef)
        return {
          name: itemRef.name,
          fullPath: itemRef.fullPath,
          url
        }
      })
    )
    
    return { success: true, files }
  } catch (error) {
    console.error('List files error:', error)
    return { success: false, error: error.message }
  }
}

// Get user's profile pictures
export const getUserProfilePictures = async (userId) => {
  return await listFiles(`profile-pictures/${userId}`)
}

// Delete old profile pictures (keep only the latest)
export const cleanupOldProfilePictures = async (userId, keepLatest = 1) => {
  try {
    const result = await getUserProfilePictures(userId)
    
    if (!result.success || result.files.length <= keepLatest) {
      return { success: true, deletedCount: 0 }
    }
    
    // Sort by name (which includes timestamp) and keep only the latest
    const sortedFiles = result.files.sort((a, b) => b.name.localeCompare(a.name))
    const filesToDelete = sortedFiles.slice(keepLatest)
    
    const deletePromises = filesToDelete.map(file => deleteFile(file.fullPath))
    const deleteResults = await Promise.all(deletePromises)
    
    const successfulDeletes = deleteResults.filter(result => result.success).length
    
    return {
      success: true,
      deletedCount: successfulDeletes,
      totalFiles: result.files.length
    }
  } catch (error) {
    console.error('Cleanup error:', error)
    return { success: false, error: error.message }
  }
}

// Compress image before upload (client-side)
export const compressImage = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      canvas.toBlob(resolve, 'image/jpeg', quality)
    }
    
    img.src = URL.createObjectURL(file)
  })
}

// Upload compressed profile picture
export const uploadCompressedProfilePicture = async (userId, file) => {
  try {
    const compressedFile = await compressImage(file)
    return await uploadProfilePicture(userId, compressedFile)
  } catch (error) {
    console.error('Compressed upload error:', error)
    return { success: false, error: error.message }
  }
}