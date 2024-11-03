import { MapContainer } from 'react-leaflet';

import { useState } from 'react';
import LoadingButton from './components/LoadingButton';
import { Main } from './components/Main';
import { MapLogic } from './components/Map';

const INITIAL_CORDS = [39.43333, -0.41667];

function App() {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <div className="container mx-auto md:p-4">
      <Main />
      <div className="flex place-content-center md:place-content-end w-full py-3">
        <LoadingButton
          variant={isSelecting ? 'outline' : undefined}
          onClick={() => setIsSelecting((prev) => !prev)}
          loading={isSelecting}
          className="md:w-fit min-w-96"
        >
          {!isSelecting
            ? '+ Añade un punto de recogida'
            : 'Selecciona un punto en el mapa'}
        </LoadingButton>
      </div>
      <MapContainer
        center={INITIAL_CORDS}
        zoom={12}
        zoomControl={true}
        scrollWheelZoom={true}
        className="h-[600px] w-full z-10 md:border-2 md:rounded md:border-gray-900"
      >
        <MapLogic isSelecting={isSelecting} setIsSelecting={setIsSelecting} />
      </MapContainer>
    </div>
  );
}

export default App;
