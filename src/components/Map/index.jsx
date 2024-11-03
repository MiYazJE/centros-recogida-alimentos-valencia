import { Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import NewSiteForm from '../NewSiteForm';
import { useState, useRef, useEffect } from 'react';
import { useSiteMutation, useSites } from '@/hooks/useSites';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

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

  const handleShare = (marker) => {
    const {
      location: { lng, lat },
    } = marker;
    const url = `https://maps.google.com/maps?z=12&t=m&q=loc:${lat}+${lng}`;

    navigator.share({
      title: 'Compartir punto de recogida',
      text: 'Aquí está la ubicación en Google Maps:',
      url,
    });
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

              <div className="flex intems-center justify-between gap-2">
                <Button
                  variant="link"
                  onClick={() =>
                    window.open(
                      `http://maps.google.com/maps?z=12&t=m&q=loc:${marker.location.lat}+${marker.location.lng}`,
                      '__blank'
                    )
                  }
                >
                  ¿Cómo llegar?
                </Button>
                {navigator.share ? (
                  <Button variant="outline" onClick={() => handleShare(marker)}>
                    Compartir
                    <ExternalLink />
                  </Button>
                ) : null}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};
