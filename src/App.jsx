import { MapContainer } from 'react-leaflet';

import { useState } from "react";
import LoadingButton from "./components/LoadingButton";
import { Main } from "./components/Main";
import { MapLogic } from "./components/Map";
import { useSites } from "./hooks/useSites";
import DotPattern from "./components/ui/dot-pattern";
import { cn } from "./lib/utils";
import { DEFAULT_ZOOM, INITIAL_CORDS } from "./enums";


const BackDrop = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="z-20 bg-gray-600 bg-opacity-80 h-full absolute top-0 left-0 w-full"
    />
  );
};

function App() {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const query = useSites(selectedTags);

  return (
    <div className="relative">
      {isSelecting ? <BackDrop onClick={() => setIsSelecting(false)} /> : null}
      <div className="container mx-auto md:p-4">
        <Main selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
        <div className="flex place-content-center md:place-content-end w-full py-3 z-30 relative">
          <LoadingButton
            variant={isSelecting ? "outline" : undefined}
            onClick={() => setIsSelecting((prev) => !prev)}
            loading={isSelecting}
            className="md:w-fit min-w-96"
          >
            {!isSelecting
              ? "+ Añade un punto de recogida"
              : "Selecciona un punto en el mapa"}
          </LoadingButton>
        </div>

        <div
          className={` w-full z-30 relative md:border-2 md:rounded ${
            isSelecting ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <MapContainer
            center={INITIAL_CORDS}
            zoom={DEFAULT_ZOOM}
            zoomControl={true}
            scrollWheelZoom={true}
            className="h-[600px] w-full"
          >
            <MapLogic
              isSelecting={isSelecting}
              setIsSelecting={setIsSelecting}
              query={query}
            />
          </MapContainer>
        </div>
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={0.3}
        className={cn(
          "[mask-image:linear-gradient(to bottom, #00000000, #000000ff)]"
        )}
      />
    </div>
  );
}

export default App;
