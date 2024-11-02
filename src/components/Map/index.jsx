import { Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import NewSiteForm from '../NewSiteForm';
import { useState, useRef, useEffect } from 'react';
import { useSites } from '@/hooks/useSites';

export const MapLogic = ({ isSelecting }) => {
  const query = useSites();
  const map = useMap();

  const [selectedPosition, setSelectedPosition] = useState({ lat: 0, lng: 0 });
  const popupRef = useRef();

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
      },
    });
    return null; // No renderiza nada
  };

  useEffect(() => {
    if (selectedPosition && popupRef.current) {
      popupRef.current.openOn(map);
    }
  }, [selectedPosition, map]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isSelecting ? <MapClickHandler /> : null}
      {isSelecting && selectedPosition ? (
        <Marker position={selectedPosition}>
          <Popup ref={popupRef}>
            <NewSiteForm open />
          </Popup>
        </Marker>
      ) : null}
      {query.data?.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.location.lat, marker.location.lon]}
        >
          <Popup>
            <h2 className="font-bold">{marker.title}</h2>
            <p>{marker.address}</p>
            {marker?.hours?.trim() ? (
              <p>
                <strong>Horario:</strong> {marker?.hours?.trim()}
              </p>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </>
  );
};
