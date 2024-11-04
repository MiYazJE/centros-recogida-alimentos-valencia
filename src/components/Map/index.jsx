import 'leaflet-geosearch/dist/geosearch.css';
import { useSiteMutation } from "@/hooks/useSites";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import NewSiteForm from "../NewSiteForm";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import spainGeoJson from "../../data/map.json";
import { DEFAULT_ZOOM, INITIAL_CORDS, TAGS } from "@/enums";
import LoadingButton from "../LoadingButton";
import { GeoSearchControl, GoogleProvider} from "leaflet-geosearch";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const DEFAULT_MARKET_PAIPORTA = { lat: 0, lng: 0 };

export const MapLogic = ({ setIsSelecting, isSelecting, query, isFullscreen, setIsFullscreen }) => {
  const map = useMap();
  const providerRef = useRef(null);
  const [selectedPosition, setSelectedPosition] = useState(
    DEFAULT_MARKET_PAIPORTA
  );
  const [searchResultAddress, setSearchResultAddress] = useState("");
  const popupRef = useRef();

  const toggleFullscreen = () => {
    if (isFullscreen) {
      setIsSelecting(false);
    }
    setIsFullscreen((prev) => !prev);
  }

  const callbackOnSuccess = () => {
    setSelectedPosition(DEFAULT_MARKET_PAIPORTA);
    setIsSelecting(false);
  };

 const mutation = useSiteMutation({ callbackOnSuccess });

  useEffect(() => {
    map.invalidateSize();
  }, [isFullscreen, map]);

  useEffect(() => {
    if (
      !map.getCenter().equals(INITIAL_CORDS) ||
      map.getZoom() !== DEFAULT_ZOOM
    ) {
      map.setView(INITIAL_CORDS, DEFAULT_ZOOM);
    }

    const bounds = L.geoJSON(spainGeoJson).getBounds();
    const padding = 0.2;
    const expandedBounds = bounds.pad(padding);

    map.setMaxBounds(expandedBounds);
  }, [map]);

  useEffect(() => {
    providerRef.current = new GoogleProvider({
      apiKey: GOOGLE_MAPS_API_KEY,
      language: "es",
      region: "ES",
      params: {
        country: "ES",
      },
    });
    const searchControl = new GeoSearchControl({
      provider: providerRef.current,
      style: "button",
      showMarker: false,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Buscar dirección",
      keepResult: false,
    });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", (e) => {
      if (isSelecting) {
        setSelectedPosition({ lat: e.location.y, lng: e.location.x });
      }
    });
    return () => map.removeControl(searchControl);
  }, [map, isSelecting]);

  const fetchAddress = async (latlng) => {
    if (!providerRef.current) return;

    const response = await providerRef.current.search({
      query: `${latlng.lat}, ${latlng.lng}`,
    });

    if (response && response.length > 0) {
      setSearchResultAddress(response[0].label);
    }
  };

  useEffect(() => {
    if (selectedPosition && isSelecting) {
      fetchAddress(selectedPosition);
    }
  }, [selectedPosition, isSelecting]);

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
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    navigator.share({
      title: "Compartir punto de recogida",
      text: "Aquí está la ubicación en Google Maps:",
      url,
    });
  };

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={spainGeoJson}
        style={() => ({
          fillOpacity: 0,
        })}
      />
      {isSelecting ? <MapClickHandler /> : null}
      {isSelecting && selectedPosition ? (
        <Marker position={selectedPosition}>
          <Popup className="w-[350px]" ref={popupRef}>
            <NewSiteForm
              open
              onSubmit={handleCreateNewSite}
              position={selectedPosition}
              address={searchResultAddress}
              loading={mutation.isPending}
            />
          </Popup>
        </Marker>
      ) : null}
      <Button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 z-[999] p-2 shadow-lg"
      >
        {isFullscreen ? "Salir" : "Pantalla completa"}
      </Button>

      {isFullscreen && (
        <LoadingButton
          variant={isSelecting ? "outline" : undefined}
          onClick={() => setIsSelecting((prev) => !prev)}
          loading={isSelecting}
          className="md:w-fit min-w-96 absolute bottom-4 transform -translate-x-1/2 left-1/2  z-[999]"
        >
          {!isSelecting
            ? "+ Añade un punto de recogida"
            : "Selecciona un punto en el mapa"}
        </LoadingButton>
      )}

      <MarkerClusterGroup chunkedLoading>
        {query.data?.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.location.lat, marker.location.lng]}
          >
            <Popup>
              <div className="flex flex-col space-y-3">
                <h2 className="font-bold">{marker.title}</h2>
                <p>
                  <span className="font-semibold">Dirección:</span>{" "}
                  {marker.address}
                </p>

                <p>
                  <span className="font-semibold">Horario:</span>{" "}
                  {marker?.hours?.trim() || "-"}
                </p>

                <div>
                  <p className="!mt-0 !mb-1 font-semibold">Categorías:</p>
                  <div className="flex gap-2 flex-wrap">
                    {marker.tags?.length
                      ? marker.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={
                              TAGS.find(({ value }) => value === tag)?.label
                            }
                            selected
                          />
                        ))
                      : null}
                  </div>
                </div>

                <div className="flex intems-center justify-between gap-2">
                  <Button
                    variant="link"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${marker.location.lat},${marker.location.lng}`,
                        "__blank"
                      )
                    }
                  >
                    ¿Cómo llegar?
                  </Button>
                  {navigator.share ? (
                    <Button
                      variant="outline"
                      onClick={() => handleShare(marker)}
                    >
                      Compartir
                      <ExternalLink />
                    </Button>
                  ) : null}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
};
