import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, AlertTriangle, Coffee, Wrench, Search, Crosshair, ShieldAlert } from 'lucide-react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.2090 // Delhi
};

export const MapScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [markers, setMarkers] = useState<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'dummy_key'
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

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

  return (
    <div className="relative h-[calc(100vh-64px)] md:h-[calc(100vh-64px)] w-full bg-slate-800 overflow-hidden flex flex-col">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-full flex items-center px-4 py-3 shadow-lg">
          <Search size={20} className="text-slate-400 mr-3" />
          <input 
            type="text" 
            placeholder="Search route, dhaba, or mechanic..." 
            className="bg-transparent border-none outline-none text-white w-full placeholder-slate-400"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="absolute top-20 left-4 right-4 z-10 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition shadow-md border ${
                activeFilter === filter.id 
                  ? 'bg-orange-600 text-white border-orange-500' 
                  : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <filter.icon size={16} className="mr-2" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Google Map */}
      <div className="flex-grow relative bg-[#1e293b] w-full h-full">
        {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-center p-6 z-20">
            <AlertTriangle size={48} className="text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Google Maps API Key Missing</h2>
            <p className="text-slate-400 max-w-md">
              Please add your Google Maps API key to the environment variables (VITE_GOOGLE_MAPS_API_KEY) to view the map.
            </p>
          </div>
        ) : loadError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800 text-center p-6 z-20">
            <AlertTriangle size={48} className="text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Error Loading Map</h2>
            <p className="text-slate-400 max-w-md">
              There was a problem loading Google Maps. Please check your API key and network connection.
            </p>
          </div>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: [
                { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                {
                  featureType: "administrative.locality",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#d59563" }],
                },
                {
                  featureType: "poi",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#d59563" }],
                },
                {
                  featureType: "poi.park",
                  elementType: "geometry",
                  stylers: [{ color: "#263c3f" }],
                },
                {
                  featureType: "poi.park",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#6b9a76" }],
                },
                {
                  featureType: "road",
                  elementType: "geometry",
                  stylers: [{ color: "#38414e" }],
                },
                {
                  featureType: "road",
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#212a37" }],
                },
                {
                  featureType: "road",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#9ca5b3" }],
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry",
                  stylers: [{ color: "#746855" }],
                },
                {
                  featureType: "road.highway",
                  elementType: "geometry.stroke",
                  stylers: [{ color: "#1f2835" }],
                },
                {
                  featureType: "road.highway",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#f3d19c" }],
                },
                {
                  featureType: "transit",
                  elementType: "geometry",
                  stylers: [{ color: "#2f3948" }],
                },
                {
                  featureType: "transit.station",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#d59563" }],
                },
                {
                  featureType: "water",
                  elementType: "geometry",
                  stylers: [{ color: "#17263c" }],
                },
                {
                  featureType: "water",
                  elementType: "labels.text.fill",
                  stylers: [{ color: "#515c6d" }],
                },
                {
                  featureType: "water",
                  elementType: "labels.text.stroke",
                  stylers: [{ color: "#17263c" }],
                },
              ],
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
            {filteredMarkers.map((marker) => (
              <MarkerF
                key={marker.id}
                position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
                onClick={() => setSelectedMarker(marker)}
                icon={{
                  url: marker.type === 'dhaba' ? 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png' :
                       marker.type === 'mistri' ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' :
                       'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                }}
              />
            ))}

            {selectedMarker && (
              <InfoWindowF
                position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng) }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-2 text-slate-900 max-w-[200px]">
                  <h3 className="font-bold text-lg mb-1">{selectedMarker.title}</h3>
                  <p className="text-sm text-slate-600 mb-2">{selectedMarker.description}</p>
                  <button className="w-full bg-orange-500 text-white py-1.5 rounded-md text-sm font-medium">
                    Navigate
                  </button>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 right-4 flex flex-col space-y-3 z-10">
        <button 
          onClick={() => {
            if (map) {
              map.panTo(defaultCenter);
              map.setZoom(14);
            }
          }}
          className="bg-slate-800 p-3 rounded-full shadow-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          <Crosshair size={24} />
        </button>
        <button className="bg-orange-600 p-4 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.4)] border border-orange-500 text-white hover:bg-orange-500 transition">
          <Navigation size={24} />
        </button>
      </div>
    </div>
  );
};
