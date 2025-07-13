import { createSharedTrip } from '../firebase/firestore'

export const seedSharedTrips = async () => {
  const sampleSharedTrips = [
    {
      name: 'Himalayan Adventure Trek',
      description: 'Experience the breathtaking beauty of the Himalayas with this carefully planned 7-day trek. Includes accommodation, meals, and professional guides.',
      location: 'Himachal Pradesh, India',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      days: 7,
      minBudget: 25000,
      maxBudget: 35000,
      type: 0, // Adventure
      companion: 0, // Solo
      difficulty: 'hard',
      season: 'summer',
      category: 'Adventure',
      tags: ['trekking', 'mountains', 'adventure', 'hiking', 'nature'],
      creatorName: 'Rajesh Kumar',
      itinerary: [
        { day: 1, title: 'Arrival in Manali', activities: ['Hotel check-in', 'Local market visit', 'Gear check'] },
        { day: 2, title: 'Manali to Solang Valley', activities: ['Early morning start', 'Cable car ride', 'Acclimatization trek'] },
        { day: 3, title: 'Trek to Beas Kund', activities: ['Morning trek', 'Lunch at basecamp', 'Photography session'] },
        { day: 4, title: 'Summit Day', activities: ['Early morning summit', 'Panoramic views', 'Descent to camp'] },
        { day: 5, title: 'Rest and Explore', activities: ['Local village visit', 'Cultural activities', 'Rest day'] },
        { day: 6, title: 'Trek Back', activities: ['Morning trek', 'Scenic route', 'Celebration dinner'] },
        { day: 7, title: 'Departure', activities: ['Breakfast', 'Shopping', 'Departure'] }
      ],
      includes: ['Professional guide', 'Accommodation', 'Meals', 'Permits', 'Safety equipment'],
      excludes: ['Personal expenses', 'Insurance', 'Tips', 'Alcohol']
    },
    {
      name: 'Kerala Backwaters & Spice Gardens',
      description: 'Discover the serene backwaters of Kerala and aromatic spice gardens. Perfect for couples seeking romance and relaxation.',
      location: 'Kerala, India',
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      days: 5,
      minBudget: 30000,
      maxBudget: 50000,
      type: 1, // Relaxation
      companion: 1, // Couple
      difficulty: 'easy',
      season: 'winter',
      category: 'Relaxation',
      tags: ['backwaters', 'houseboat', 'spices', 'kerala', 'romantic', 'peaceful'],
      creatorName: 'Priya Sharma',
      itinerary: [
        { day: 1, title: 'Arrival in Kochi', activities: ['Airport pickup', 'Hotel check-in', 'Fort Kochi exploration'] },
        { day: 2, title: 'Kochi to Munnar', activities: ['Scenic drive', 'Tea plantation visit', 'Spice garden tour'] },
        { day: 3, title: 'Munnar Sightseeing', activities: ['Echo Point', 'Mattupetty Dam', 'Elephant rides'] },
        { day: 4, title: 'Alleppey Houseboat', activities: ['Houseboat check-in', 'Backwater cruise', 'Sunset viewing'] },
        { day: 5, title: 'Departure', activities: ['Morning cruise', 'Kochi transfer', 'Departure'] }
      ],
      includes: ['Accommodation', 'Houseboat stay', 'Meals', 'Transfers', 'Sightseeing'],
      excludes: ['Airfare', 'Personal expenses', 'Tips', 'Alcohol']
    },
    {
      name: 'Spiritual Journey to Varanasi',
      description: 'Immerse yourself in the spiritual heart of India. Experience ancient rituals, temple visits, and the sacred Ganges.',
      location: 'Varanasi, India',
      image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
      days: 4,
      minBudget: 15000,
      maxBudget: 25000,
      type: 2, // Spiritual
      companion: 2, // Family
      difficulty: 'easy',
      season: 'any',
      category: 'Spiritual',
      tags: ['spiritual', 'temples', 'ganges', 'rituals', 'meditation', 'heritage'],
      creatorName: 'Anand Mishra',
      itinerary: [
        { day: 1, title: 'Arrival & Ganga Aarti', activities: ['Hotel check-in', 'Evening Ganga Aarti', 'Boat ride'] },
        { day: 2, title: 'Temple Tour', activities: ['Kashi Vishwanath Temple', 'Sankat Mochan Temple', 'Silk weaving center'] },
        { day: 3, title: 'Sarnath Excursion', activities: ['Sarnath visit', 'Buddha temples', 'Archaeological museum'] },
        { day: 4, title: 'Morning Ritual & Departure', activities: ['Sunrise boat ride', 'Final temple visit', 'Departure'] }
      ],
      includes: ['Accommodation', 'Temple visits', 'Boat rides', 'Guide', 'Transfers'],
      excludes: ['Meals', 'Personal expenses', 'Donations', 'Shopping']
    },
    {
      name: 'Rajasthan Cultural Heritage',
      description: 'Explore the royal heritage of Rajasthan with visits to majestic palaces, forts, and desert landscapes.',
      location: 'Rajasthan, India',
      image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80',
      days: 8,
      minBudget: 40000,
      maxBudget: 70000,
      type: 3, // Cultural
      companion: 2, // Family
      difficulty: 'medium',
      season: 'winter',
      category: 'Cultural',
      tags: ['rajasthan', 'palaces', 'forts', 'desert', 'cultural', 'heritage', 'royal'],
      creatorName: 'Meera Rajput',
      itinerary: [
        { day: 1, title: 'Arrival in Jaipur', activities: ['Hotel check-in', 'City Palace visit', 'Local market'] },
        { day: 2, title: 'Jaipur Sightseeing', activities: ['Amber Fort', 'Hawa Mahal', 'Jantar Mantar'] },
        { day: 3, title: 'Jaipur to Jodhpur', activities: ['Travel to Jodhpur', 'Mehrangarh Fort', 'Blue city walk'] },
        { day: 4, title: 'Jodhpur to Jaisalmer', activities: ['Journey to Jaisalmer', 'Fort exploration', 'Sunset point'] },
        { day: 5, title: 'Desert Safari', activities: ['Camel safari', 'Desert camping', 'Folk performances'] },
        { day: 6, title: 'Jaisalmer to Udaipur', activities: ['Travel to Udaipur', 'Lake Pichola', 'City Palace'] },
        { day: 7, title: 'Udaipur Sightseeing', activities: ['Jagdish Temple', 'Saheliyon ki Bari', 'Boat ride'] },
        { day: 8, title: 'Departure', activities: ['Shopping', 'Last-minute sightseeing', 'Departure'] }
      ],
      includes: ['Accommodation', 'Transfers', 'Sightseeing', 'Desert safari', 'Guide'],
      excludes: ['Meals', 'Personal expenses', 'Tips', 'Camera fees']
    },
    {
      name: 'Goa Beach Paradise',
      description: 'Relax on pristine beaches, enjoy water sports, and experience the vibrant nightlife of Goa.',
      location: 'Goa, India',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      days: 6,
      minBudget: 20000,
      maxBudget: 40000,
      type: 1, // Relaxation
      companion: 3, // Friends
      difficulty: 'easy',
      season: 'winter',
      category: 'Beach',
      tags: ['goa', 'beaches', 'nightlife', 'water sports', 'relaxation', 'party'],
      creatorName: 'Arjun Patel',
      itinerary: [
        { day: 1, title: 'Arrival & North Goa', activities: ['Hotel check-in', 'Baga Beach', 'Tito\'s Lane'] },
        { day: 2, title: 'North Goa Beaches', activities: ['Calangute Beach', 'Anjuna Beach', 'Parasailing'] },
        { day: 3, title: 'Old Goa Heritage', activities: ['Churches tour', 'Spice plantation', 'River cruise'] },
        { day: 4, title: 'South Goa Beaches', activities: ['Colva Beach', 'Palolem Beach', 'Sunset viewing'] },
        { day: 5, title: 'Adventure & Relaxation', activities: ['Water sports', 'Spa session', 'Beach shacks'] },
        { day: 6, title: 'Departure', activities: ['Shopping', 'Beach walk', 'Departure'] }
      ],
      includes: ['Accommodation', 'Breakfast', 'Transfers', 'Sightseeing', 'Water sports'],
      excludes: ['Lunch & dinner', 'Personal expenses', 'Alcohol', 'Tips']
    },
    {
      name: 'Andaman Island Escape',
      description: 'Dive into crystal clear waters, explore coral reefs, and enjoy pristine beaches in the Andaman Islands.',
      location: 'Andaman Islands, India',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80',
      days: 7,
      minBudget: 50000,
      maxBudget: 80000,
      type: 0, // Adventure
      companion: 1, // Couple
      difficulty: 'medium',
      season: 'winter',
      category: 'Adventure',
      tags: ['andaman', 'islands', 'diving', 'snorkeling', 'beaches', 'coral reefs'],
      creatorName: 'Kavya Nair',
      itinerary: [
        { day: 1, title: 'Arrival in Port Blair', activities: ['Airport pickup', 'Hotel check-in', 'Cellular Jail'] },
        { day: 2, title: 'Ross Island & North Bay', activities: ['Ferry ride', 'Snorkeling', 'Glass bottom boat'] },
        { day: 3, title: 'Havelock Island', activities: ['Ferry to Havelock', 'Radhanagar Beach', 'Sunset point'] },
        { day: 4, title: 'Scuba Diving', activities: ['Scuba diving', 'Coral reef exploration', 'Beach relaxation'] },
        { day: 5, title: 'Neil Island', activities: ['Ferry to Neil Island', 'Bharatpur Beach', 'Sitapur Beach'] },
        { day: 6, title: 'Return to Port Blair', activities: ['Ferry back', 'Shopping', 'Samudrika Museum'] },
        { day: 7, title: 'Departure', activities: ['Final sightseeing', 'Souvenir shopping', 'Departure'] }
      ],
      includes: ['Accommodation', 'Inter-island transfers', 'Scuba diving', 'Snorkeling', 'Sightseeing'],
      excludes: ['Airfare', 'Meals', 'Personal expenses', 'Tips']
    }
  ]

  console.log('Seeding shared trips...')
  
  for (const trip of sampleSharedTrips) {
    try {
      // Use a dummy creator ID for seeding
      const creatorId = 'sample-creator-' + Math.random().toString(36).substr(2, 9)
      const result = await createSharedTrip(creatorId, trip)
      
      if (result.success) {
        console.log(`✅ Created shared trip: ${trip.name}`)
      } else {
        console.log(`❌ Failed to create shared trip: ${trip.name}`, result.error)
      }
    } catch (error) {
      console.error(`❌ Error creating shared trip: ${trip.name}`, error)
    }
  }
  
  console.log('Shared trips seeding completed!')
}

// Function to seed individual shared trip
export const createSampleSharedTrip = async (userId, tripData) => {
  try {
    const result = await createSharedTrip(userId, tripData)
    return result
  } catch (error) {
    console.error('Error creating sample shared trip:', error)
    return { success: false, error: error.message }
  }
}
