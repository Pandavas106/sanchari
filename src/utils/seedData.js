import { createDocument } from '../firebase/firestore'

// Sample destinations data
const destinationsData = [
  {
    name: "Santorini, Greece",
    location: "Cyclades, Greece",
    price: "From ₹45,000",
    originalPrice: "₹55,000",
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=400&q=80",
    tag: "Featured",
    category: "Beach",
    description: "Stunning sunsets and white-washed buildings overlooking the Aegean Sea",
    duration: "5-7 days",
    bestTime: "Apr-Oct",
    highlights: ["Sunset Views", "Wine Tasting", "Volcanic Beaches"],
    trending: true,
    discount: 18,
    aiMatch: 95,
    aiReasons: ["Matches your love for scenic beauty", "Perfect for romantic getaways", "Ideal weather in selected months"]
  },
  {
    name: "Kyoto, Japan",
    location: "Kansai, Japan",
    price: "From ₹65,000",
    rating: 4.9,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80",
    tag: "Cultural",
    category: "Culture",
    description: "Ancient temples, traditional gardens, and authentic Japanese culture",
    duration: "6-8 days",
    bestTime: "Mar-May, Sep-Nov",
    highlights: ["Temples", "Gardens", "Traditional Culture"],
    trending: true,
    aiMatch: 92,
    aiReasons: ["Cultural exploration interest", "Photography opportunities", "Spiritual experiences"]
  },
  {
    name: "Maldives",
    location: "Indian Ocean",
    price: "From ₹85,000",
    originalPrice: "₹95,000",
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    tag: "Luxury",
    category: "Beach",
    description: "Overwater bungalows and pristine coral reefs in paradise",
    duration: "4-6 days",
    bestTime: "Nov-Apr",
    highlights: ["Overwater Villas", "Diving", "Spa Resorts"],
    trending: false,
    discount: 11,
    aiMatch: 88,
    aiReasons: ["Luxury preference match", "Beach lover profile", "Honeymoon destination"]
  },
  {
    name: "Swiss Alps",
    location: "Switzerland",
    price: "From ₹75,000",
    rating: 4.6,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
    tag: "Adventure",
    category: "Mountains",
    description: "Breathtaking alpine scenery and world-class skiing",
    duration: "7-10 days",
    bestTime: "Dec-Mar, Jun-Sep",
    highlights: ["Skiing", "Hiking", "Mountain Views"],
    trending: true,
    aiMatch: 85,
    aiReasons: ["Adventure seeker profile", "Mountain lover", "Winter sports interest"]
  },
  {
    name: "Dubai, UAE",
    location: "United Arab Emirates",
    price: "From ₹55,000",
    rating: 4.5,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80",
    tag: "Luxury",
    category: "City",
    description: "Modern marvels, luxury shopping, and desert adventures",
    duration: "4-6 days",
    bestTime: "Nov-Mar",
    highlights: ["Shopping", "Architecture", "Desert Safari"],
    trending: true,
    aiMatch: 90,
    aiReasons: ["Luxury preference match", "Shopping interests", "Modern architecture lover"]
  },
  {
    name: "Bali, Indonesia",
    location: "Indonesia",
    price: "From ₹35,000",
    originalPrice: "₹42,000",
    rating: 4.7,
    reviews: 756,
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=400&q=80",
    tag: "Popular",
    category: "Culture",
    description: "Tropical paradise with rich culture and stunning landscapes",
    duration: "6-8 days",
    bestTime: "Apr-Oct",
    highlights: ["Temples", "Rice Terraces", "Beaches"],
    trending: true,
    discount: 17,
    aiMatch: 87,
    aiReasons: ["Cultural exploration interest", "Beach lover profile", "Photography opportunities"]
  },
  {
    name: "Paris, France",
    location: "Île-de-France, France",
    price: "From ₹70,000",
    rating: 4.8,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=400&q=80",
    tag: "Classic",
    category: "City",
    description: "The City of Light with iconic landmarks and world-class cuisine",
    duration: "5-7 days",
    bestTime: "Apr-Jun, Sep-Oct",
    highlights: ["Eiffel Tower", "Museums", "Cuisine"],
    trending: false,
    aiMatch: 83,
    aiReasons: ["Art and culture lover", "Culinary interests", "Historic architecture"]
  },
  {
    name: "Iceland",
    location: "Nordic Island",
    price: "From ₹80,000",
    rating: 4.9,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80",
    tag: "Adventure",
    category: "Nature",
    description: "Land of fire and ice with stunning natural phenomena",
    duration: "8-10 days",
    bestTime: "Jun-Aug",
    highlights: ["Northern Lights", "Geysers", "Waterfalls"],
    trending: true,
    aiMatch: 89,
    aiReasons: ["Nature lover profile", "Adventure seeker", "Photography enthusiast"]
  },
  {
    name: "Kerala Backwaters",
    location: "Kerala, India",
    price: "From ₹25,000",
    originalPrice: "₹30,000",
    rating: 4.6,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
    tag: "Peaceful",
    category: "Nature",
    description: "Serene backwaters, houseboats, and lush green landscapes",
    duration: "4-6 days",
    bestTime: "Oct-Mar",
    highlights: ["Houseboat Stay", "Ayurvedic Spa", "Local Culture"],
    trending: false,
    discount: 17,
    aiMatch: 91,
    aiReasons: ["Peaceful retreat seeker", "Cultural immersion", "Nature lover"]
  },
  {
    name: "New York City",
    location: "New York, USA",
    price: "From ₹90,000",
    rating: 4.4,
    reviews: 2156,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80",
    tag: "Urban",
    category: "City",
    description: "The city that never sleeps with iconic skylines and Broadway shows",
    duration: "5-7 days",
    bestTime: "Apr-Jun, Sep-Nov",
    highlights: ["Broadway Shows", "Museums", "Central Park"],
    trending: true,
    aiMatch: 86,
    aiReasons: ["Urban explorer", "Entertainment lover", "Cultural enthusiast"]
  },
  {
    name: "Machu Picchu, Peru",
    location: "Cusco Region, Peru",
    price: "From ₹60,000",
    rating: 4.9,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=400&q=80",
    tag: "Historic",
    category: "Culture",
    description: "Ancient Incan citadel perched high in the Andes Mountains",
    duration: "7-9 days",
    bestTime: "May-Sep",
    highlights: ["Inca Trail", "Ancient Ruins", "Mountain Views"],
    trending: true,
    aiMatch: 94,
    aiReasons: ["History enthusiast", "Adventure seeker", "Cultural explorer"]
  },
  {
    name: "Serengeti, Tanzania",
    location: "Northern Tanzania",
    price: "From ₹95,000",
    rating: 4.8,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80",
    tag: "Wildlife",
    category: "Nature",
    description: "Witness the Great Migration and incredible wildlife in their natural habitat",
    duration: "8-12 days",
    bestTime: "Jun-Oct",
    highlights: ["Safari", "Great Migration", "Wildlife Photography"],
    trending: false,
    aiMatch: 87,
    aiReasons: ["Wildlife enthusiast", "Photography lover", "Adventure seeker"]
  }
]

// Function to seed destinations
export const seedDestinations = async () => {
  try {
    console.log('🌱 Seeding destinations...')
    
    let successCount = 0
    let errorCount = 0
    
    for (const destination of destinationsData) {
      const result = await createDocument('destinations', destination)
      if (result.success) {
        console.log(`✅ Created destination: ${destination.name}`)
        successCount++
      } else {
        console.error(`❌ Failed to create destination ${destination.name}:`, result.error)
        errorCount++
      }
    }
    
    console.log(`🎉 Destinations seeding completed! Success: ${successCount}, Errors: ${errorCount}`)
    return { success: true, successCount, errorCount, total: destinationsData.length }
  } catch (error) {
    console.error('❌ Error seeding destinations:', error)
    return { success: false, error: error.message }
  }
}

// Sample user data for demo
export const createDemoUser = async () => {
  try {
    console.log('👤 Creating demo user data...')
    
    // This will be used when demo user signs up
    const demoUserData = {
      email: 'demo@sanchari.com',
      firstName: 'Demo',
      lastName: 'User',
      displayName: 'Demo User',
      travelPoints: 2450,
      memberSince: new Date(),
      preferences: ['Beach', 'Culture', 'Luxury'],
      profileComplete: true,
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      location: 'New York, NY',
      bio: 'Travel enthusiast who loves exploring new cultures and destinations.'
    }
    
    console.log('✅ Demo user data prepared')
    return { success: true, data: demoUserData }
  } catch (error) {
    console.error('❌ Error creating demo user:', error)
    return { success: false, error: error.message }
  }
}

// Function to seed sample bookings for demo user
export const seedDemoBookings = async (userId) => {
  try {
    console.log('📅 Seeding demo bookings...')
    
    const demoBookings = [
      {
        destinationId: 'maldives-001',
        destinationName: 'Maldives Luxury Retreat',
        status: 'ACTIVE',
        checkInDate: new Date('2024-12-15'),
        checkOutDate: new Date('2024-12-22'),
        travelers: 2,
        totalAmount: 144000,
        bookingReference: 'BK001',
        confirmationCode: 'CMD123456'
      },
      {
        destinationId: 'bali-001',
        destinationName: 'Bali Private Villa',
        status: 'UPCOMING',
        checkInDate: new Date('2025-01-10'),
        checkOutDate: new Date('2025-01-18'),
        travelers: 2,
        totalAmount: 130000,
        bookingReference: 'BK002',
        confirmationCode: 'BLI789012'
      }
    ]
    
    let successCount = 0
    for (const booking of demoBookings) {
      const result = await createDocument('bookings', { ...booking, userId })
      if (result.success) {
        successCount++
      }
    }
    
    console.log(`✅ Demo bookings seeded: ${successCount}`)
    return { success: true, count: successCount }
  } catch (error) {
    console.error('❌ Error seeding demo bookings:', error)
    return { success: false, error: error.message }
  }
}

// Function to seed all data
export const seedAllData = async () => {
  console.log('🚀 Starting comprehensive data seeding process...')
  
  const results = {
    destinations: await seedDestinations(),
    demoUser: await createDemoUser()
  }
  
  console.log('📊 Seeding Results:', results)
  return results
}

// Function to check if data already exists
export const checkDataExists = async () => {
  try {
    const { getDocuments } = await import('../firebase/firestore')
    const result = await getDocuments('destinations', [{ type: 'limit', value: 1 }])
    return result.success && result.data.length > 0
  } catch (error) {
    console.error('Error checking data:', error)
    return false
  }
}

// Function to seed data for a specific user (called after signup)
export const seedUserData = async (userId) => {
  try {
    console.log(`🌱 Seeding data for user: ${userId}`)
    
    const results = {
      bookings: await seedDemoBookings(userId)
    }
    
    console.log('✅ User data seeding completed:', results)
    return results
  } catch (error) {
    console.error('❌ Error seeding user data:', error)
    return { success: false, error: error.message }
  }
}