import { MapContainer } from 'react-leaflet';

import { useState } from 'react';
import LoadingButton from './components/LoadingButton';
import { Main } from './components/Main';
import { MapLogic } from './components/Map';

const INITIAL_CORDS = [39.43333, -0.41667];

const BackDrop = () => {
  return (
    <div className="z-20 bg-gray-600 bg-opacity-80 h-full absolute top-0 left-0 w-full" />
  );
};

function App() {
  const [isSelecting, setIsSelecting] = useState(false);

  return (
    <div className="relative">
      {isSelecting ? <BackDrop /> : null}
      <div className="container mx-auto md:p-4">
        <Main />
        <div className="flex place-content-center md:place-content-end w-full py-3 z-30 relative">
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

        <div
          className={` w-full z-30 relative md:border-2 md:rounded ${
            isSelecting ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <MapContainer
            center={INITIAL_CORDS}
            zoom={12}
            zoomControl={true}
            scrollWheelZoom={true}
            className="h-[600px] w-full"
          >
            <MapLogic
              isSelecting={isSelecting}
              setIsSelecting={setIsSelecting}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
