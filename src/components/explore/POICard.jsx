import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mountain, Landmark, Waves, Building, TreePine, Camera, Castle, Home, Users, Film, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Category images mapping to Cloudinary URLs
const categoryImages = {
  temple: [
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304202/temple_1_ieqr33.jpg',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304229/temple_2_q1hteg.jpg',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304246/temple_3_vtm25s.jpg',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304265/temple_4_tvgdy5.jpg',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304286/temple_5_wkfhci.jpg'
  ],
  attraction: [
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304402/Attraction_1_sontrz.avif',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304420/Attraction_2_foiwac.avif',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304478/Attraction_3_kydpj0.avif',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304492/Attraction_4_glwl5n.avif',
    'https://res.cloudinary.com/dvoh0lat7/image/upload/v1752304504/Attraction_5_z9l2s0.avif'
  ]
};

// Enhanced category icon mapping with available lucide-react icons
const categoryIcon = {
  Temple: Landmark,
  Beach: Waves,
  Mountain: Mountain,
  'Mountain Peak': Mountain,
  Attraction: Camera,
  Museum: Building,
  Park: TreePine,
  Garden: TreePine,
  Castle: Castle,
  Theatre: Users,
  Cinema: Film,
  Zoo: Home,
  Waterfall: Waves,
  Cave: Mountain,
  Historic: Landmark,
  'Theme Park': Zap,
  Aquarium: Waves,
  Gallery: Camera,
  Viewpoint: Camera,
  Ruins: Landmark,
  POI: MapPin,
};

const placeholderImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/512px-No-Image-Placeholder.svg.png';

const POICard = ({ poi, index, onClick }) => {
  const { isDark } = useTheme();
  const Icon = categoryIcon[poi.category] || MapPin;

  // Get dynamic image based on category
  const getCategoryImage = (category) => {
    const categoryKey = category.toLowerCase();
    const imagePool = categoryImages[categoryKey] || [];
    
    console.log(`POI Category: ${category}, Key: ${categoryKey}, Available images: ${imagePool.length}`);
    
    if (imagePool.length === 0) {
      console.log(`No images available for category: ${categoryKey}`);
      return null; // No images available for this category
    }
    
    // Randomly select an image from the pool
    const randomIndex = Math.floor(Math.random() * imagePool.length);
    const selectedImage = imagePool[randomIndex];
    console.log(`Selected image for ${categoryKey}: ${selectedImage}`);
    
    return selectedImage;
  };

  const dynamicImage = getCategoryImage(poi.category);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-56 min-w-[14rem] max-w-xs rounded-xl overflow-hidden cursor-pointer group shadow-lg ${
        isDark ? 'bg-navy/70' : 'bg-white/80'
      }`}
      onClick={onClick}
    >
      <img
        src={dynamicImage || placeholderImg}
        alt={poi.name}
        className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <span className={`p-2 rounded-full ${isDark ? 'bg-yellow-400' : 'bg-blue-600'}`}>
          <Icon className={`w-5 h-5 ${isDark ? 'text-navy' : 'text-white'}`} />
        </span>
        <span className={`text-xs font-bold ${isDark ? 'text-yellow-400' : 'text-white'}`}>{poi.category}</span>
      </div>
      <div className="absolute bottom-2 left-2 right-2">
        <h4 className="font-bold text-white text-lg truncate drop-shadow-sm">{poi.name}</h4>
        <div className="flex items-center space-x-1 text-xs text-white/80">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{poi.location || `${poi.lat?.toFixed(2)}, ${poi.lon?.toFixed(2)}`}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default POICard; 