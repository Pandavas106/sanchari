import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

// Upload file to Firebase Storage
export const uploadFile = async (file, path) => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return { success: true, url: downloadURL }
  } catch (error) {
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
    return { success: false, error: error.message }
  }
}

// Upload profile picture
export const uploadProfilePicture = async (userId, file) => {
  const path = `profile-pictures/${userId}/${Date.now()}_${file.name}`
  return await uploadFile(file, path)
}

// Upload destination images
export const uploadDestinationImage = async (destinationId, file) => {
  const path = `destinations/${destinationId}/${Date.now()}_${file.name}`
  return await uploadFile(file, path)
}