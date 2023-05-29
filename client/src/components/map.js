import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const libraries = ["places"]; // Add "places" to the libraries array

export const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries, // Pass the libraries array to useLoadScript
  });

  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [places, setPlaces] = useState([]);

  const onMapLoad = (map) => {
    setMap(map);
  };

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const newPlaces = searchBox.getPlaces();
    setPlaces(newPlaces);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <TheMap onMapLoad={onMapLoad} />
      <SearchBox onSearchBoxLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged} />
      <PlacesList places={places} />
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

function SearchBox({ onSearchBoxLoad, onPlacesChanged }) {
  return (
    <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
      <input type="text" placeholder="Search for a place" />
    </StandaloneSearchBox>
  );
}

function PlacesList({ places }) {
  return (
    <div>
      <h2>Places</h2>
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>{place.name}</li>
        ))}
      </ul>
    </div>
  );
}
