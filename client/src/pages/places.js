import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Places = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  const handlePlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

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
        <br />
        <h1>Top Rated</h1>
        <ul>
            {places.map((place) => (
                <li key={place._id}>
                    <div>
                        <button onClick={() => handlePlaceClick(place._id)}>{place.name}</button>
                        <h2>{place.rating}</h2>
                        <h2>{place.numRatings}</h2>
                        <h2>{place.address}</h2>
                        <h2>{place.description}</h2>
                        <br />
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
};
