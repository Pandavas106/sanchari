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
    aiReasons: ["Matches your love for scenic beauty", "Perfect for romantic getaways", "Ideal weather in selected months"],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Santorini",
        activities: ["Airport pickup", "Hotel check-in", "Sunset viewing at Oia", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Island Exploration",
        activities: ["Visit Akrotiri ruins", "Red Beach visit", "Wine tasting tour", "Traditional Greek dinner"]
      }
    ],
    included: [
      { icon: "✈️", label: "Flights", description: "Round-trip flights included" },
      { icon: "🏨", label: "Hotels", description: "4-star accommodation with breakfast" },
      { icon: "🍽️", label: "Meals", description: "Daily breakfast and 2 dinners" },
      { icon: "🚗", label: "Transfers", description: "Airport and local transfers" }
    ],
    amenities: ["Free WiFi", "Private Transport", "Meals Included", "Travel Insurance"]
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
  }
]

// Function to seed destinations
export const seedDestinations = async () => {
  try {
    console.log('Seeding destinations...')
    
    for (const destination of destinationsData) {
      const result = await createDocument('destinations', destination)
      if (result.success) {
        console.log(`Created destination: ${destination.name}`)
      } else {
        console.error(`Failed to create destination ${destination.name}:`, result.error)
      }
    }
    
    console.log('Destinations seeded successfully!')
  } catch (error) {
    console.error('Error seeding destinations:', error)
  }
}

// Function to seed all data
export const seedAllData = async () => {
  await seedDestinations()
  // Add more seed functions here as needed
}