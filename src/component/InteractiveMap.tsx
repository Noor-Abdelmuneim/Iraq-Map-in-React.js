import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getLocationDetails } from '../services/geocode';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import { MarkerData } from '../types';

const DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
});

const InteractiveMap: React.FC = () => {
  const [marker, setMarker] = useState<MarkerData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const MapEvents = () => {
    useMapEvents({
      async click(event) {
        const { lat, lng } = event.latlng;
        const details = await getLocationDetails(lat, lng);

        const formattedDetails = [
          details.road,
          details.suburb,
          details.city,
          details.state,
          details.postcode,
          details.country
        ].filter(Boolean).join(', ');

        setMarker({
          lat,
          lng,
          details: formattedDetails,
        });
      },
    });
    return null;
  };

  const handlePopupClick = (details: string) => {
    setSelectedCity(details);
  };

  return (
    <div className="relative">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '100vh', width: '100vw' }}
        className="border-2 border-black"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {marker && (
          <Marker position={[marker.lat, marker.lng]} icon={DefaultIcon}>
            <Popup onClick={() => handlePopupClick(marker.details || '')}>
              <span>{marker.details || 'No details available'}</span>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {selectedCity && (
        <div className="fixed bottom-4 left-4 p-4 bg-white bg-opacity-80 border border-black rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">City Information</h2>
          <p>{selectedCity}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
