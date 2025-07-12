import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Navbar, BottomNavbar, LoadingSpinner } from '../components';
import POICard from '../components/explore/POICard';
import { useNearbyPOIs } from '../hooks/useNearbyPOIs';

const groupPOIsByCategory = (pois) => {
  return pois.reduce((acc, poi) => {
    if (!acc[poi.category]) acc[poi.category] = [];
    acc[poi.category].push(poi);
    return acc;
  }, {});
};

const NearbyPOIs = () => {
  const { isDark } = useTheme();
  const [userLocation, setUserLocation] = useState(null);
  const { pois, loading, error } = useNearbyPOIs(userLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {
          setUserLocation(null);
        }
      );
    }
  }, []);

  const bgGradient = isDark
    ? 'bg-gradient-to-br from-navy via-gray-900 to-blue-900'
    : 'bg-gradient-to-br from-amber-100 via-blue-50 to-purple-100';

  const grouped = groupPOIsByCategory(pois);
  const categoryOrder = Object.keys(grouped).sort();

  return (
    <div className={`min-h-screen ${bgGradient} pb-20 md:pb-0`}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className={`font-bold text-3xl mb-8 ${isDark ? 'text-white' : 'text-navy'}`}>Nearby Points of Interest</h2>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="xl" text="Loading nearby places..." />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : pois.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No nearby points of interest found.</div>
        ) : (
          categoryOrder.map((category) => (
            <div key={category} className="mb-10">
              <h3 className={`font-bold text-2xl mb-4 ${isDark ? 'text-yellow-400' : 'text-blue-600'}`}>{category}</h3>
              <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
                {grouped[category].map((poi, idx) => (
                  <POICard key={poi.id} poi={poi} index={idx} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default NearbyPOIs; 