import React, { useState, useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import "../styles/searchbar.css";

const libraries = ["places"];
const options = {
  types: ["establishment"], // Restrict to businesses
};

export const SearchBar = ({ whenPlaceSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);

  console.log(selectedPlace);

  const onPlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    setSelectedPlace(place);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceSelect}
        options={options} // Apply the options to the Autocomplete component
      >
        <input className="searchbar" type="text" placeholder="Search for a place" />
      </Autocomplete>
      {selectedPlace && (
        <div>
          <h2>Selected Place</h2>
          <p>{selectedPlace.name}</p>
          <p>Address: {selectedPlace.formatted_address}</p>
        </div>
      )}
    </div>
  );
};
