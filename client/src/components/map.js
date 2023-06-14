import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const [map, setMap] = useState(null);

  const onMapLoad = (map) => {
    setMap(map);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <TheMap onMapLoad={onMapLoad} />
    </div>
  );
};

function TheMap({ onMapLoad }) {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 38, lng: -77 }}
      mapContainerClassName="map-container"
      onLoad={onMapLoad}
    />
  );
}
