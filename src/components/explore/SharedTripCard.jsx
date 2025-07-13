import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { 
  Star, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Heart,
  Share2,
  Clock,
  Tag,
  User,
  ArrowRight,
  CheckCircle,
  Eye,
  MessageCircle,
  DollarSign,
  Mountain,
  Compass
} from 'lucide-react'

const SharedTripCard = ({ 
  trip, 
  index, 
  viewMode = 'grid', 
  onUse, 
  onRate, 
  onSave, 
  isSaved = false,
  currentUserId
}) => {
  const navigate = useNavigate()
  const [isRating, setIsRating] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [ratingComment, setRatingComment] = useState('')
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleUseTrip = () => {
    if (onUse) {
      onUse(trip.id)
    }
  }

  const handleViewDetails = () => {
    navigate(`/trip-details/${trip.id}`, { state: { trip } })
  }

  const handleRateTrip = async () => {
    if (userRating > 0) {
      const result = await onRate(trip.id, userRating, ratingComment)
      if (result?.success) {
        setIsRating(false)
        setUserRating(0)
        setRatingComment('')
      }
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢'
      case 'medium': return '🟡'
      case 'hard': return '🔴'
      default: return '⚪'
    }
  }

  const formatBudget = (min, max) => {
    if (min && max) {
      return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`
    }
    return 'Budget varies'
  }

  const getCompanionLabel = (companion) => {
    const companions = {
      0: { label: 'Solo', icon: '👤' },
      1: { label: 'Couple', icon: '💕' },
      2: { label: 'Family', icon: '👨‍👩‍👧‍👦' },
      3: { label: 'Friends', icon: '👥' }
    }
    return companions[companion] || { label: 'Any', icon: '👥' }
  }

  const getTripTypeLabel = (type) => {
    const types = {
      0: { label: 'Adventure', icon: '🏔️' },
      1: { label: 'Relaxation', icon: '🧘' },
      2: { label: 'Spiritual', icon: '🕉️' },
      3: { label: 'Cultural', icon: '🏛️' },
      4: { label: 'Nature', icon: '🌲' }
    }
    return types[type] || { label: 'Mixed', icon: '🌍' }
  }

  const hasUserRated = trip.ratings?.some(rating => rating.userId === currentUserId)
  const userExistingRating = trip.ratings?.find(rating => rating.userId === currentUserId)

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-navy/30 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
      >
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Trip Image */}
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative h-48 md:h-40 rounded-lg overflow-hidden">
                <img 
                  src={trip.image || '/api/placeholder/400/200'} 
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)} text-white`}>
                    {getDifficultyIcon(trip.difficulty)} {trip.difficulty}
                  </span>
                  {trip.usageCount > 10 && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-navy">
                      🔥 Popular
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="md:w-2/3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{trip.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{trip.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{trip.duration || trip.days} days</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">{getCompanionLabel(trip.companion).label}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={onSave}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{trip.averageRating?.toFixed(1) || 0}</span>
                    <span className="text-gray-300">({trip.totalRatings || 0})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{trip.usageCount || 0} uses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">{formatBudget(trip.minBudget, trip.maxBudget)}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {trip.description}
                </p>

                {trip.tags && trip.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {trip.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {trip.tags.length > 4 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
                        +{trip.tags.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700/50 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">by {trip.creatorName || 'Anonymous'}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {trip.shareDate?.toDate?.()?.toLocaleDateString() || 'Recently'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {!hasUserRated && (
                    <button 
                      onClick={() => setIsRating(true)}
                      className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors"
                    >
                      Rate
                    </button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleViewDetails}
                    className="px-3 py-2 bg-gray-600/50 text-gray-300 rounded-lg font-medium hover:bg-gray-600/70 transition-all flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleUseTrip}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
                  >
                    <span>Use Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-navy/30 backdrop-blur-sm rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 overflow-hidden group h-full flex flex-col"
    >
      {/* Trip Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img 
          src={trip.image || '/api/placeholder/400/200'} 
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)} text-white`}>
            {getDifficultyIcon(trip.difficulty)} {trip.difficulty}
          </span>
          {trip.usageCount > 10 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-navy">
              🔥 Popular
            </span>
          )}
        </div>

        {/* Save button */}
        <button 
          onClick={onSave}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{trip.averageRating?.toFixed(1) || 0}</span>
              <span className="text-xs text-gray-300">({trip.totalRatings || 0})</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{trip.usageCount || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and Location - Fixed Height */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors line-clamp-1">
            {trip.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{trip.location}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Calendar className="w-4 h-4" />
              <span>{trip.days} days</span>
            </div>
          </div>
        </div>

        {/* Trip Type and Companion - Fixed Height */}
        <div className="flex items-center gap-2 text-sm mb-3">
          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs whitespace-nowrap">
            {getTripTypeLabel(trip.type).icon} {getTripTypeLabel(trip.type).label}
          </span>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs whitespace-nowrap">
            {getCompanionLabel(trip.companion).icon} {getCompanionLabel(trip.companion).label}
          </span>
        </div>

        {/* Description - Fixed Height */}
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-3 min-h-[3.75rem]">
          {trip.description}
        </p>

        {/* Budget and Creator - Fixed Height */}
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">{formatBudget(trip.minBudget, trip.maxBudget)}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300 truncate max-w-[120px]">{trip.creatorName || 'Anonymous'}</span>
          </div>
        </div>

        {/* Tags - Fixed Height */}
        <div className="min-h-[2rem] mb-3">
          {trip.tags && trip.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {trip.tags.slice(0, 2).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
              {trip.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded-full text-xs">
                  +{trip.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons - Fixed at Bottom */}
        <div className="flex items-center justify-between pt-2 mt-auto">
          <div className="flex-shrink-0">
            {!hasUserRated && (
              <button 
                onClick={() => setIsRating(true)}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors"
              >
                Rate
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewDetails}
              className="px-3 py-2 bg-gray-600/50 text-gray-300 rounded-lg font-medium hover:bg-gray-600/70 transition-all flex items-center gap-2 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">View</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUseTrip}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2 text-sm"
            >
              <span>Use Plan</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {isRating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-4">Rate this trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`w-8 h-8 ${
                        star <= userRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                  <span className="text-white ml-2">{userRating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Comment (optional)
                </label>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  className="w-full p-3 bg-navy/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  placeholder="Share your experience with this trip..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => setIsRating(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRateTrip}
                  disabled={userRating === 0}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default SharedTripCard
