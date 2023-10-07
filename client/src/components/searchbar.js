import React, { useState, useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import "../styles/searchbar.css";

const libraries = ["places"];

export const SearchBar = ({ onPlaceSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    if (place && place.geometry && place.geometry.location) {
      setSelectedPlace(place);
      onPlaceSelect(place); 
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelectedPlace(null); 
    autocompleteRef.current.setFields([{ value: '' }]); 
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="searchbar-container">
      <Autocomplete
        className="searchbar-autocomplete"
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          className="searchbar-input"
          type="text"
          placeholder="Search for a place..."
          onChange={handleInputChange} 
        />
      </Autocomplete>
    </div>
  );
};
