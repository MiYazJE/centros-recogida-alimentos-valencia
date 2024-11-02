import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { Main } from './components/Main';
import { useSites } from './hooks/useSites';

const INITIAL_CORDS = [39.39928, -0.568566];

function App() {
  const query = useSites();

  return (
    <div className="container mx-auto md:p-4">
      <Main />
      <MapContainer
        center={INITIAL_CORDS}
        zoom={9}
        zoomControl={true}
        scrollWheelZoom={true}
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
      </MapContainer>
    </div>
  );
}

export default App;
