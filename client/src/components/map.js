import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import '../styles/map.css';
import StarRatings from "react-star-ratings";

const libraries = ["places"];

export const Map = ({ mapViewClick, showMap }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const[mapVisibility, setMapVisibility] = useState(showMap);

  useEffect(() => {
    setMapVisibility(showMap);
  }, [showMap]);

  const [center, setCenter] = useState({ lat: 27, lng: -100 });
  const [mapZoom, setMapZoom] = useState(4);
  const [places, setPlaces] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  useEffect(() => {
    if (mapViewClick) {
      setSelectedMarker(mapViewClick);
      setMapZoom(13);
      setCenter(prevState => ({
        ...prevState,
        lat: mapViewClick.lat,
        lng: mapViewClick.long,
      }));
    }
  }, [mapViewClick]);

  const navigate = useNavigate();
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handlePlaceClick = () => {
    navigate(`/places/${selectedMarker._id}`);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className={`map-container ${mapVisibility ? 'show-map' : ''}`}>
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
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.long }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <button onClick={handlePlaceClick} className="readexpro bold h-b5 flex">{selectedMarker.name}</button>
              <br />
              <div className="map-flex">
                <StarRatings
                  rating={selectedMarker.rating}
                  starRatedColor="red"
                  starEmptyColor="lightgray"
                  starDimension="20px"
                  starSpacing="2px" 
                />
              </div>
              <p className="readexpro">{selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};
