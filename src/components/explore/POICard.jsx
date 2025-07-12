import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mountain, Landmark, Waves } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const categoryIcon = {
  Temple: Landmark,
  Beach: Waves,
  Mountain: Mountain,
  POI: MapPin,
};

const placeholderImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/512px-No-Image-Placeholder.svg.png';

const POICard = ({ poi, index, onClick }) => {
  const { isDark } = useTheme();
  const Icon = categoryIcon[poi.category] || MapPin;

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
        src={poi.image || placeholderImg}
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