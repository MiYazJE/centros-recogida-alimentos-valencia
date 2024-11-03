import { Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import NewSiteForm from '../NewSiteForm';
import { useState, useRef, useEffect } from 'react';
import { useSiteMutation, useSites } from '@/hooks/useSites';
import MarkerClusterGroup from 'react-leaflet-cluster';

const DEFAULT_MARKET_PAIPORTA = { lat: 0, lng: 0 };

export const MapLogic = ({ setIsSelecting, isSelecting }) => {
  const query = useSites();
  const map = useMap();

  const [selectedPosition, setSelectedPosition] = useState(
    DEFAULT_MARKET_PAIPORTA
  );
  const popupRef = useRef();

  const callbackOnSuccess = () => {
    setSelectedPosition(DEFAULT_MARKET_PAIPORTA);
    setIsSelecting(false);
  };

  const mutation = useSiteMutation({ callbackOnSuccess });

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

  const handleCreateNewSite = (site) => {
    mutation.mutate({ ...site, location: selectedPosition });
  };

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
            <NewSiteForm
              open
              onSubmit={handleCreateNewSite}
              position={selectedPosition}
              loading={mutation.isPending}
            />
          </Popup>
        </Marker>
      ) : null}

      <MarkerClusterGroup chunkedLoading>
        {query.data?.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.location.lat, marker.location.lng]}
          >
            <Popup>
              <h2 className="font-bold">{marker.title}</h2>
              <p>{marker.address}</p>
              {marker?.hours?.trim() ? (
                <p>
                  <strong>Horario:</strong> {marker?.hours?.trim()}
                </p>
              ) : null}
              <a
                href={`http://maps.google.com/maps?z=12&t=m&q=loc:${marker.location.lat}+${marker.location.lng}`}
                target="__blank"
              >
                ¿Cómo llegar?
              </a>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};
