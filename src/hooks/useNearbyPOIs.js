import { useState, useEffect } from 'react';
import axios from 'axios';

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';

const buildOverpassQuery = (lat, lon, radius = 50000) => `
[out:json][timeout:25];
(
  node["amenity"="place_of_worship"](around:${radius},${lat},${lon});
  node["amenity"="theatre"](around:${radius},${lat},${lon});
  node["amenity"="cinema"](around:${radius},${lat},${lon});
  node["tourism"="attraction"](around:${radius},${lat},${lon});
  node["tourism"="museum"](around:${radius},${lat},${lon});
  node["tourism"="zoo"](around:${radius},${lat},${lon});
  node["tourism"="theme_park"](around:${radius},${lat},${lon});
  node["tourism"="aquarium"](around:${radius},${lat},${lon});
  node["tourism"="gallery"](around:${radius},${lat},${lon});
  node["tourism"="viewpoint"](around:${radius},${lat},${lon});
  node["tourism"="castle"](around:${radius},${lat},${lon});
  node["tourism"="ruins"](around:${radius},${lat},${lon});
  node["historic"](around:${radius},${lat},${lon});
  node["leisure"="park"](around:${radius},${lat},${lon});
  node["leisure"="garden"](around:${radius},${lat},${lon});
  node["natural"="beach"](around:${radius},${lat},${lon});
  node["natural"="peak"](around:${radius},${lat},${lon});
  node["natural"="mountain"](around:${radius},${lat},${lon});
  node["natural"="cave_entrance"](around:${radius},${lat},${lon});
  node["natural"="waterfall"](around:${radius},${lat},${lon});
);
out center tags;
`;

const getPOICategory = (tags) => {
  if (tags.tourism) {
    if (tags.tourism === 'attraction') return 'Attraction';
    if (tags.tourism === 'museum') return 'Museum';
    if (tags.tourism === 'zoo') return 'Zoo';
    if (tags.tourism === 'theme_park') return 'Theme Park';
    if (tags.tourism === 'aquarium') return 'Aquarium';
    if (tags.tourism === 'gallery') return 'Gallery';
    if (tags.tourism === 'viewpoint') return 'Viewpoint';
    if (tags.tourism === 'castle') return 'Castle';
    if (tags.tourism === 'ruins') return 'Ruins';
  }
  if (tags.historic) return 'Historic';
  if (tags.leisure) {
    if (tags.leisure === 'park') return 'Park';
    if (tags.leisure === 'garden') return 'Garden';
  }
  if (tags.natural) {
    if (tags.natural === 'beach') return 'Beach';
    if (tags.natural === 'peak') return 'Mountain Peak';
    if (tags.natural === 'mountain') return 'Mountain';
    if (tags.natural === 'cave_entrance') return 'Cave';
    if (tags.natural === 'waterfall') return 'Waterfall';
  }
  if (tags.amenity) {
    if (tags.amenity === 'place_of_worship') return 'Temple';
    if (tags.amenity === 'theatre') return 'Theatre';
    if (tags.amenity === 'cinema') return 'Cinema';
  }
  return 'POI';
};

export const useNearbyPOIs = (location) => {
  const [pois, setPOIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    setError(null);
    setPOIs([]);

    const fetchPOIs = async () => {
      try {
        const query = buildOverpassQuery(location.lat, location.lon);
        const { data } = await axios.post(OVERPASS_URL, query, {
          headers: { 'Content-Type': 'text/plain' },
        });
        const elements = data.elements || [];
        // Limit to 20 POIs for performance
        const limited = elements.slice(0, 20);
        const poisData = limited.map((el) => ({
          id: el.id,
          name: el.tags.name || 'Unknown',
          category: getPOICategory(el.tags),
          location: el.tags['addr:city'] || el.tags['addr:town'] || el.tags['addr:state'] || '',
          lat: el.lat,
          lon: el.lon,
        }));
        setPOIs(poisData);
      } catch (err) {
        setError('Failed to fetch POIs');
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, [location]);

  return { pois, loading, error };
}; 