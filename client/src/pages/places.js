import '../styles/places.css'
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
        <div className="places-title flex">
          <p className='white'>Search bar will go here</p>
          <h1 className='readexpro rp2 red'>FIND SPOOKY PLACES</h1>
        </div>
        <br />
        <h1 className='readexpro rp2 bold top-rated'>TOP RATED</h1>
        <ul className='place-list'>
            {places.map((place) => (
                <div className="place-entry" key={place._id}>
                    <div className='entry-format'>
                        <div className='place-info'>
                          <h1 className="red readexpro name" onClick={() => handlePlaceClick(place._id)}>{place.name}</h1>
                          <h2 className='readexpro'>{place.rating} stars</h2>
                          <h2 className='readexpro'>Ratings- {place.numRatings}</h2>
                          <h2 className='readexpro'>Address- {place.address}</h2>
                          <h2>Description- {place.description}</h2>
                        </div>
                        <div className='place-image'>
                          <img className="test" alt='place-pic'></img>
                        </div>
                        <br />
                    </div>
                </div>
            ))}
        </ul>
    </div>
  );
};
