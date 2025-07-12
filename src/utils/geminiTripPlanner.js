// Gemini Trip Planner API utility
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyCDDABUuK8I57G_EOV31lgZOIlI5rKIukE';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Mock response for testing when API fails
const mockTripResponse = {
  trip: {
    title: "Himalayan Adventure",
    price: "₹45,000",
    originalPrice: "₹52,000",
    subtitle: "Experience the majestic Himalayas with trekking and camping",
    days: "7 Days",
    rating: "4.8",
    reviews: "324",
    people: "1 people",
    location: "Himachal Pradesh, India",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    highlights: [
      "Trek to Triund Peak",
      "Camp under the stars",
      "Visit McLeod Ganj",
      "Explore Dharamshala",
      "Bhagsu Waterfall adventure",
      "Dalai Lama Temple visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dharamshala",
        activities: ["Airport pickup", "Check-in to hotel", "Local market visit", "Welcome dinner"]
      },
      {
        day: 2,
        title: "Explore McLeod Ganj",
        activities: ["Bhagsu Waterfall trek", "McLeod Ganj exploration", "Tibetan food tasting", "Sunset at viewpoint"]
      },
      {
        day: 3,
        title: "Start Trek to Triund",
        activities: ["Trek preparation", "Begin ascent to Triund", "Camp setup", "Stargazing night"]
      },
      {
        day: 4,
        title: "Triund Peak Summit",
        activities: ["Sunrise at Triund", "Peak summit trek", "Mountain photography", "Camp activities"]
      },
      {
        day: 5,
        title: "Return to Dharamshala",
        activities: ["Descent from Triund", "Hotel check-in", "Hot shower", "Rest and recovery"]
      },
      {
        day: 6,
        title: "Cultural Experience",
        activities: ["Dalai Lama Temple", "Tibetan cooking class", "Local shopping", "Cultural performance"]
      },
      {
        day: 7,
        title: "Departure",
        activities: ["Final breakfast", "Hotel checkout", "Airport transfer", "Farewell"]
      }
    ]
  },
  included: [
    {
      icon: "✈️",
      label: "Flights",
      description: "Round-trip flights from major cities"
    },
    {
      icon: "🏨",
      label: "Hotels",
      description: "3-star accommodations with breakfast"
    },
    {
      icon: "🍽️",
      label: "Meals",
      description: "Daily breakfast and 3 special dinners"
    },
    {
      icon: "🚗",
      label: "Transfers",
      description: "Private AC vehicle with driver"
    },
    {
      icon: "🏖️",
      label: "Activities",
      description: "All mentioned activities and tours"
    },
    {
      icon: "🤖",
      label: "AI Guide",
      description: "24/7 AI travel assistant"
    }
  ]
};

/**
 * Calls Gemini API to generate a trip plan.
 * @param {Object} params - Trip planner parameters
 * @param {number} params.budget
 * @param {number} params.budgetType
 * @param {number} params.selectedDays
 * @param {number} params.selectedType
 * @param {number} params.selectedCompanion
 * @param {number} params.adults
 * @param {number} params.children
 * @param {boolean} params.autoLocation
 * @param {string} params.currentLocation
 * @returns {Promise<{trip: any, included: any}>}
 */
export async function generateGeminiTrip({
  budget,
  budgetType,
  selectedDays,
  selectedType,
  selectedCompanion,
  adults,
  children,
  autoLocation,
  currentLocation,
}) {
  // Validate API key
  console.log('API Key (first 10 chars):', GEMINI_API_KEY.substring(0, 10) + '...');
  if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
    console.error('Invalid API key format');
    return mockTripResponse;
  }

  const prompt = `Generate a detailed trip plan for: 
Budget: ₹${budget}, 
Budget Type: ${budgetType === 0 ? 'Budget' : budgetType === 1 ? 'Comfort' : 'Luxury'}, 
Duration: ${selectedDays} days, 
Trip Type: ${selectedType === 0 ? 'Adventure' : selectedType === 1 ? 'Relaxation' : 'Spiritual'}, 
Companion: ${selectedCompanion === 0 ? 'Solo' : selectedCompanion === 1 ? 'Couple' : 'Family'}, 
Adults: ${adults}, 
Children: ${children}, 
Location: ${currentLocation}.

IMPORTANT: Return ONLY a valid JSON object. Do not include any explanations, markdown formatting, or additional text. Start with { and end with }.

Return this exact JSON structure:
{
  "trip": {
    "title": "Trip Title",
    "price": "₹XX,XXX",
    "originalPrice": "₹XX,XXX",
    "subtitle": "Brief description of the trip experience",
    "days": "${selectedDays} Days",
    "rating": "4.X",
    "reviews": "XXX",
    "people": "${adults + children} people",
    "location": "Destination, Country",
    "image": "https://images.unsplash.com/photo-[UNIQUE_ID]?auto=format&fit=crop&w=800&q=80",
    "highlights": [
      "Highlight 1",
      "Highlight 2",
      "Highlight 3",
      "Highlight 4",
      "Highlight 5",
      "Highlight 6"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1 Title",
        "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"]
      },
      {
        "day": 2,
        "title": "Day 2 Title", 
        "activities": ["Activity 1", "Activity 2", "Activity 3", "Activity 4"]
      }
    ]
  },
  "included": [
    {
      "icon": "✈️",
      "label": "Flights",
      "description": "Round-trip flights from major cities"
    },
    {
      "icon": "🏨", 
      "label": "Hotels",
      "description": "4-star accommodations with breakfast"
    },
    {
      "icon": "🍽️",
      "label": "Meals", 
      "description": "Daily breakfast and 3 special dinners"
    },
    {
      "icon": "🚗",
      "label": "Transfers",
      "description": "Private AC vehicle with driver"
    },
    {
      "icon": "🏖️",
      "label": "Activities",
      "description": "All mentioned activities and tours"
    },
    {
      "icon": "🤖",
      "label": "AI Guide",
      "description": "24/7 AI travel assistant"
    }
  ]
}

Requirements:
- Generate a realistic price based on the budget and trip type
- Create an original price that's 10-20% higher than the actual price
- Choose an appropriate destination based on the trip type and location
- Generate a high-quality Unsplash image URL that matches the destination and trip type. Use search terms like "destination name landscape", "destination name travel", "destination name tourism" to get relevant images
- Example image URLs for reference:
  * Mountains: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80
  * Beaches: https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80
  * Cities: https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80
  * Temples: https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80
- Create 6 meaningful highlights for the trip
- Generate a day-by-day itinerary with 4 activities per day
- Use appropriate emojis for the included services
- Make the response realistic and detailed for the given parameters
- Return ONLY the JSON object, no other text.`;

  const body = {
    contents: [
      { parts: [{ text: prompt }] }
    ]
  };

  try {
    console.log('Calling Gemini API...');
    console.log('API URL:', GEMINI_URL);
    console.log('Request body:', body);
    
    const response = await axios.post(GEMINI_URL, body, {
      headers: { 'Content-Type': 'application/json' }
    });

    // Log the raw response
    console.log('Raw Gemini API Response:', response.data);

    // Gemini returns the response in response.data.candidates[0].content.parts[0].text
    const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No response from Gemini API');

    // Log the text content
    console.log('Gemini Response Text:', text);

    // Try to parse the JSON from the text
    let tripObj;
    try {
      // Clean the text - remove markdown code blocks, extra text, etc.
      let jsonText = text.trim();
      
      // Remove markdown code blocks
      jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
      
      // Try to find JSON object boundaries
      const jsonStart = jsonText.indexOf('{');
      const jsonEnd = jsonText.lastIndexOf('}');
      
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        jsonText = jsonText.substring(jsonStart, jsonEnd + 1);
      }
      
      // Remove any text before the first { and after the last }
      jsonText = jsonText.replace(/^[^{]*/, '').replace(/}[^}]*$/, '}');
      
      console.log('Cleaned JSON text:', jsonText);
      
      tripObj = JSON.parse(jsonText);
    } catch (e) {
      console.error('JSON Parse Error:', e);
      console.error('Original text:', text);
      
      // Try alternative parsing - look for JSON-like structure
      try {
        // Extract just the JSON part using regex
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const extractedJson = jsonMatch[0];
          console.log('Extracted JSON:', extractedJson);
          tripObj = JSON.parse(extractedJson);
        } else {
          throw new Error('No JSON object found in response');
        }
      } catch (secondError) {
        console.error('Second parsing attempt failed:', secondError);
        throw new Error('Failed to parse Gemini response as JSON. Response was: ' + text.substring(0, 200) + '...');
      }
    }
    
    // Log the parsed trip object
    console.log('Parsed Trip Object:', tripObj);
    
    if (!tripObj.trip) throw new Error('No trip found in Gemini response');
    return tripObj;
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Log detailed error information
    if (error.response) {
      console.error('Error Response Status:', error.response.status);
      console.error('Error Response Data:', error.response.data);
      console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
    
    console.log('Using mock response as fallback...');
    
    // Return mock response as fallback
    return mockTripResponse;
  }
} 