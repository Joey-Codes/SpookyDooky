import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import '../styles/map.css';
import StarRatings from "react-star-ratings";

const libraries = ["places"];

export const Map = ({ mapViewClick }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });
  const [center, setCenter] = useState({
    lat: 27,
    lng: -100
  });
  const [mapZoom, setMapZoom] = useState(4);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(mapViewClick);

  useEffect(() => {
    if (mapViewClick) {
    setSelectedPlace(mapViewClick);
    setMapZoom(13);
     setCenter(prevState => ({
      ...prevState,
      lat: mapViewClick.lat,
      lng: mapViewClick.long,
    })); 
    }
  }, [mapViewClick]);

  const navigate = useNavigate();
  const handlePlaceClick = () => {
    navigate(`/places/${selectedPlace._id}`);
  }

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:3001/places"); 
        setPlaces(response.data);
      } catch (error) {
        console.log("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="map-container">
      <GoogleMap
        zoom={mapZoom}
        center={center}
        mapContainerClassName="map-container"
      >
        {places.map((place) => (
          <Marker
            key={place._id}
            position={{ lat: place.lat, lng: place.long }}
            onClick={() => handleMarkerClick(place)}
/*             icon={{
              url: glasses_ghost, // Specify the URL of the custom marker image
              scaledSize: new window.google.maps.Size(40, 40), // Set the size of the marker
              origin: new window.google.maps.Point(0, 0), // Set the origin point of the marker image
              anchor: new window.google.maps.Point(20, 40), // Set the anchor point of the marker image
            }} */
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.long }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h3 className="readexpro">{selectedPlace.name}</h3>
              <div className="flex">
                <StarRatings
                  rating={selectedPlace.rating} // Replace with your actual rating value
                  starRatedColor="red" // Customize the color of the filled stars
                  starEmptyColor="lightgray" // Customize the color of the empty stars
                  starDimension="20px" // Adjust the size of the stars
                  starSpacing="2px" // Adjust the spacing between stars
                />
                <h3>{selectedPlace.numRatings}</h3>
              </div>
              <p className="readexpro"> {selectedPlace.address}</p>
              <button onClick={handlePlaceClick} className="readexpro h-b5">Go to review page</button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
