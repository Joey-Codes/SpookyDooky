import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import '../styles/map.css';
import StarRatings from "react-star-ratings";

const libraries = ["places"];

export const Map = ({ mapViewClick, showMap, mapPlaces }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const [mapVisibility, setMapVisibility] = useState(showMap);
  const [mapMarkers, setMapMarkers] = useState(mapPlaces);

  useEffect(() => {
    setMapMarkers(mapPlaces);
  }, [mapPlaces]);

  useEffect(() => {
    setMapVisibility(showMap);
  }, [showMap]);

  const [center, setCenter] = useState({ lat: 27, lng: -100 });
  const [mapZoom, setMapZoom] = useState(4);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
        {mapMarkers.map((marker) => (
          <Marker
            key={marker._id}
            position={{ lat: marker.lat, lng: marker.long }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.long }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <button onClick={handlePlaceClick} className="readexpro bold rp1 h-b5 flex aqua " style={{border:'none'}}>{selectedMarker.name}</button>
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
