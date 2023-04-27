import React, { useEffect, useState } from "react";
import axios from "axios";

export const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:3001/places");
        setPlaces(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div>
        <h1>Places</h1>
        <ul>
            {places.map((place) => (
                <li key={place._id}>
                    <div>
                        <button>{place.name}</button>
                        <h2>{place.address}</h2>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};