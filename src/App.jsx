import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { Main } from './components/Main';
import { useSites } from './hooks/useSites';

const INITIAL_CORDS = [39.39928, -0.568566];

function App() {
  const query = useSites();

  return (
    <>
      <Main />
      <MapContainer
        center={INITIAL_CORDS}
        zoom={9}
        scrollWheelZoom={false}
        className="h-96 w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {query.data?.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>
              <h2 className="font-bold">{marker.title}</h2>
              <p>{marker.address}</p>
              <p>
                <strong>Horario:</strong> {marker.hours}
              </p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default App;
