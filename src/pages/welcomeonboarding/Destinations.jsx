import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Star, 
  Calendar, 
  Users, 
  ArrowRight, 
  Heart,
  Filter,
  Search,
  Globe,
  Mountain,
  Sun,
  Building,
  TreePine,
  Waves
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Destinations = () => {
  const { isDark } = useTheme()
  const [activeCategory, setActiveCategory] = useState('all')
  const [favorites, setFavorites] = useState(new Set())

  const categories = [
    { id: 'all', name: 'All Destinations', icon: Globe },
    { id: 'beach', name: 'Beach', icon: Waves },
    { id: 'mountain', name: 'Mountains', icon: Mountain },
    { id: 'city', name: 'Cities', icon: Building },
    { id: 'nature', name: 'Nature', icon: TreePine },
    { id: 'cultural', name: 'Cultural', icon: Sun }
  ]

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      category: 'beach',
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80",
      price: "From ₹45,000",
      originalPrice: "₹55,000",
      rating: 4.8,
      reviews: 324,
      duration: "5-7 days",
      highlights: ["Sunset Views", "Wine Tasting", "Volcanic Beaches"],
      description: "Stunning sunsets and white-washed buildings overlooking the Aegean Sea",
      discount: 18
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      category: 'cultural',
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      price: "From ₹65,000",
      rating: 4.9,
      reviews: 567,
      duration: "6-8 days",
      highlights: ["Temples", "Gardens", "Traditional Culture"],
      description: "Ancient temples, traditional gardens, and authentic Japanese culture"
    },
    {
      id: 3,
      name: "Swiss Alps, Switzerland",
      category: 'mountain',
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      price: "From ₹85,000",
      rating: 4.7,
      reviews: 412,
      duration: "7-10 days",
      highlights: ["Alpine Views", "Skiing", "Mountain Hiking"],
      description: "Breathtaking alpine scenery and world-class skiing resorts"
    },
    {
      id: 4,
      name: "Bali, Indonesia",
      category: 'beach',
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=80",
      price: "From ₹35,000",
      originalPrice: "₹42,000",
      rating: 4.6,
      reviews: 756,
      duration: "6-8 days",
      highlights: ["Temples", "Rice Terraces", "Beach Clubs"],
      description: "Tropical paradise with rich culture and stunning landscapes",
      discount: 16
    },
    {
      id: 5,
      name: "Dubai, UAE",
      category: 'city',
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      price: "From ₹55,000",
      rating: 4.5,
      reviews: 892,
      duration: "4-6 days",
      highlights: ["Luxury Shopping", "Desert Safari", "Modern Architecture"],
      description: "Modern marvels, luxury shopping, and desert adventures"
    },
    {
      id: 6,
      name: "Iceland",
      category: 'nature',
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      price: "From ₹75,000",
      rating: 4.8,
      reviews: 234,
      duration: "8-10 days",
      highlights: ["Northern Lights", "Geysers", "Glaciers"],
      description: "Land of fire and ice with spectacular natural phenomena"
    },
    {
      id: 7,
      name: "Paris, France",
      category: 'city',
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=800&q=80",
      price: "From ₹60,000",
      rating: 4.7,
      reviews: 1203,
      duration: "5-7 days",
      highlights: ["Eiffel Tower", "Louvre Museum", "Seine River"],
      description: "The City of Light with world-class art, cuisine, and romance"
    },
    {
      id: 8,
      name: "Maldives",
      category: 'beach',
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      price: "From ₹95,000",
      rating: 4.9,
      reviews: 445,
      duration: "5-7 days",
      highlights: ["Overwater Villas", "Coral Reefs", "Luxury Resorts"],
      description: "Pristine beaches and crystal-clear waters in the Indian Ocean"
    }
  ]

  const filteredDestinations = activeCategory === 'all' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeCategory)

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  return (
    <section id="destinations" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl font-bold font-playfair mb-6 ${
            isDark ? 'text-white' : 'text-navy'
          }`}>
            Discover Amazing <span className={isDark ? 'text-yellow-400' : 'text-blue-600'}>Destinations</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Explore handpicked destinations curated by our travel experts and AI algorithms
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search destinations..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                isDark 
                  ? 'bg-navy/50 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-navy placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                isDark ? 'focus:ring-yellow-400' : 'focus:ring-blue-500'
              }`}
            />
          </div>
          
          <motion.button
            className={`flex items-center space-x-2 px-4 py-3 rounded-xl border ${
              isDark 
                ? 'border-gray-600 text-gray-300 hover:bg-navy/50' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-all`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </motion.button>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                    activeCategory === category.id
                      ? (isDark 
                          ? 'bg-yellow-400 border-yellow-400 text-navy' 
                          : 'bg-blue-600 border-blue-600 text-white'
                        )
                      : (isDark 
                          ? 'border-gray-600 text-gray-300 hover:border-yellow-400' 
                          : 'border-gray-300 text-gray-700 hover:border-blue-500'
                        )
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.name}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`rounded-2xl ${
                isDark ? 'bg-navy/50' : 'bg-white/50'
              } backdrop-blur-sm overflow-hidden group cursor-pointer`}
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Discount Badge */}
                {destination.discount && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      {destination.discount}% OFF
                    </span>
                  </div>
                )}

                {/* Favorite Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(destination.id)
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={`w-4 h-4 ${
                    favorites.has(destination.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                  }`} />
                </motion.button>

                {/* Price */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold">{destination.price}</span>
                    {destination.originalPrice && (
                      <span className="text-sm line-through opacity-75">
                        {destination.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className={`font-bold text-xl mb-2 ${isDark ? 'text-white' : 'text-navy'}`}>
                  {destination.name}
                </h3>
                
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {destination.description}
                </p>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-navy'}`}>
                      {destination.rating}
                    </span>
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {destination.reviews} reviews
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {destination.duration}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.highlights.slice(0, 3).map((highlight, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all ${
                    isDark 
                      ? 'bg-yellow-400 text-navy hover:bg-yellow-300' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all ${
              isDark 
                ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-navy' 
                : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More Destinations
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Destinations
