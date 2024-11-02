import { useSites } from '@/hooks/useSites';
import { useEffect, useRef, useState } from 'react';
import { Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import NewSiteForm from '../NewSiteForm';

export const MapLogic = ({ isSelecting }) => {
  const query = useSites();
  const map = useMap();

  const [selectedPosition, setSelectedPosition] = useState(null);
  const popupRef = useRef();

  // Este componente maneja el clic en el mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        console.log(e);
        setSelectedPosition(e.latlng); // Guarda la posición seleccionada
      },
    });
    return null; // No renderiza nada
  };

  if (popupRef?.current) {
    popupRef.current.openOn?.(map);
  }

  console.log(popupRef.current);

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
