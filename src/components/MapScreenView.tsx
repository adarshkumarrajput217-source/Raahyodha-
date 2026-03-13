import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, AlertTriangle, Coffee, Wrench, Search, Crosshair, ShieldAlert } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-leaflet-icon',
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const icons = {
  dhaba: createCustomIcon('#FF6200'), // primary
  mistri: createCustomIcon('#3b82f6'), // blue
  alert: createCustomIcon('#ef4444'), // red
  bribe: createCustomIcon('#ef4444'), // red
};

const defaultCenter: [number, number] = [28.6139, 77.2090]; // Delhi

// Component to handle map panning
const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export const MapScreen = () => {
  return <MapScreenContent />;
};

const MapScreenContent = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [mapZoom, setMapZoom] = useState(10);

  useEffect(() => {
    // Fetch real-time alerts and rest stops from Firestore
    let unsubscribeAlerts = () => {};
    let unsubscribeStops = () => {};

    if (db) {
      unsubscribeAlerts = onSnapshot(collection(db, 'alerts'), (snapshot) => {
        const newAlerts = snapshot.docs.map(doc => ({ id: doc.id, type: 'alert', ...doc.data() }));
        setMarkers(prev => [...prev.filter(m => m.type !== 'alert' && m.type !== 'bribe'), ...newAlerts]);
      }, (error) => {
        console.error("Error fetching alerts:", error);
        // Fallback demo data
        setMarkers(prev => {
          const filtered = prev.filter(m => m.id !== '1' && m.id !== '2');
          return [...filtered, 
            { id: '1', type: 'alert', lat: 28.5, lng: 77.1, title: 'Traffic Jam', description: 'Heavy traffic near toll plaza' },
            { id: '2', type: 'bribe', lat: 28.7, lng: 77.3, title: 'Police Check', description: 'Checking documents' }
          ];
        });
      });

      unsubscribeStops = onSnapshot(collection(db, 'rest_stops'), (snapshot) => {
        const newStops = snapshot.docs.map(doc => ({ id: doc.id, type: 'stop', ...doc.data() }));
        setMarkers(prev => [...prev.filter(m => m.type !== 'stop' && m.type !== 'dhaba' && m.type !== 'mistri'), ...newStops]);
      }, (error) => {
        console.error("Error fetching rest stops:", error);
        // Fallback demo data
        setMarkers(prev => {
          const filtered = prev.filter(m => m.id !== '3' && m.id !== '4');
          return [...filtered, 
            { id: '3', type: 'dhaba', lat: 28.6, lng: 77.4, title: 'Sher-e-Punjab Dhaba', description: 'Pure Veg & Non-Veg' },
            { id: '4', type: 'mistri', lat: 28.4, lng: 77.0, title: 'Raju Auto Works', description: 'Tyre & Engine Repair' }
          ];
        });
      });
    } else {
      // Fallback demo data if db is not initialized
      setMarkers([
        { id: '1', type: 'alert', lat: 28.5, lng: 77.1, title: 'Traffic Jam', description: 'Heavy traffic near toll plaza' },
        { id: '2', type: 'bribe', lat: 28.7, lng: 77.3, title: 'Police Check', description: 'Checking documents' },
        { id: '3', type: 'dhaba', lat: 28.6, lng: 77.4, title: 'Sher-e-Punjab Dhaba', description: 'Pure Veg & Non-Veg' },
        { id: '4', type: 'mistri', lat: 28.4, lng: 77.0, title: 'Raju Auto Works', description: 'Tyre & Engine Repair' }
      ]);
    }

    return () => {
      unsubscribeAlerts();
      unsubscribeStops();
    };
  }, []);

  const filters = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'dhaba', label: 'Dhabas', icon: Coffee },
    { id: 'mistri', label: 'Mechanics', icon: Wrench },
    { id: 'alert', label: 'Alerts', icon: AlertTriangle },
    { id: 'bribe', label: 'Police/Bribe', icon: ShieldAlert },
  ];

  const filteredMarkers = activeFilter === 'all' 
    ? markers 
    : markers.filter(m => m.type === activeFilter || (activeFilter === 'alert' && m.type === 'bribe'));

  const handleRecenter = () => {
    setMapCenter([...defaultCenter]);
    setMapZoom(14);
  };

  return (
    <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] w-full bg-card overflow-hidden flex flex-col">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000]">
        <div className="bg-card/90 backdrop-blur-md border border-slate-700 rounded-full flex items-center px-4 py-3 shadow-lg">
          <Search size={20} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search route, dhaba, or mechanic..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder-slate-400"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="absolute top-20 left-4 right-4 z-[1000] overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition shadow-md border ${
                activeFilter === filter.id 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-card/90 text-textLight border-slate-700 hover:bg-slate-700'
              }`}
            >
              <filter.icon size={16} className="mr-2" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="flex-grow relative bg-[#1e293b] w-full h-full z-0">
        <MapContainer 
          center={defaultCenter} 
          zoom={10} 
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <MapController center={mapCenter} zoom={mapZoom} />
          
          {filteredMarkers.map((marker) => {
            const iconType = marker.type as keyof typeof icons;
            const icon = icons[iconType] || icons.alert;
            
            return (
              <Marker
                key={marker.id}
                position={[Number(marker.lat), Number(marker.lng)]}
                icon={icon}
                eventHandlers={{
                  click: () => setSelectedMarker(marker),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1 text-slate-900 max-w-[200px]">
                    <h3 className="font-heading font-bold text-lg mb-1">{marker.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{marker.description}</p>
                    <button className="w-full bg-primary text-white py-1.5 rounded-md text-sm font-heading font-bold">
                      Navigate
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col space-y-3 z-[1000]">
        <button 
          onClick={handleRecenter}
          className="bg-card p-3 rounded-full shadow-lg border border-slate-700 text-textLight hover:text-white hover:bg-slate-700 transition"
        >
          <Crosshair size={24} />
        </button>
        <button className="bg-primary p-4 rounded-full shadow-[0_0_20px_rgba(255,98,0,0.4)] border border-primary text-white hover:bg-primary transition">
          <Navigation size={24} />
        </button>
      </div>
    </div>
  );
};
