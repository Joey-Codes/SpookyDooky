import React, { useState, useRef } from "react";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";
import "../styles/searchbar.css";

const libraries = ["places"];

export const SearchBar = ({ onPlaceSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "",
    libraries,
  });

  const [selectedPlace, setSelectedPlace] = useState(null);
  const autocompleteRef = useRef(null);

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    // Ensure that a valid place is selected
    if (place && place.geometry && place.geometry.location) {
      setSelectedPlace(place);
      onPlaceSelect(place); // Pass the selected place to the parent component
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSelectedPlace(null); // Clear the selected place when the input value changes
    autocompleteRef.current.setFields([{ value: '' }]); // Clear the autocomplete field value
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
          onChange={handleInputChange} // Handle input change event
        />
      </Autocomplete>
    </div>
  );
};
