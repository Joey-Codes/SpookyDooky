import '../styles/places.css';
import StarRatings from 'react-star-ratings';
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
          <div>
            <h1 className='readexpro white rp1'>SEARCH ALL PLACES</h1>
            <h2 className='white italic'>searchbar goes here</h2>
            <h2 className='white'>You can also search with the map</h2>
          </div>
          <div>
            <h2 className='readexpro rp2 white'>OR</h2>
          </div>
          <div>
            <h2 className='readexpro white rp1'>ADD A NEW PLACE</h2>
            <button className='h-b readexpro r1'>ADD +</button>
          </div>
        </div>
        <br />
        <h1 className='readexpro rp2 bold top-rated'>Top Rated</h1>
        <ul className='place-list'>
            {places.map((place) => (
                <div className="place-entry" key={place._id}>
                    <div className='entry-format'>
                        <div className='place-info'>
                          <h1 className="red readexpro name" onClick={() => handlePlaceClick(place._id)}>{place.name}</h1>
                          <br />
                          <div className="place-rating">
                            <StarRatings
                              rating={place.rating} // Replace with your actual rating value
                              starRatedColor="red" // Customize the color of the filled stars
                              starEmptyColor="lightgray" // Customize the color of the empty stars
                              starDimension="40px" // Adjust the size of the stars
                              starSpacing="2px" // Adjust the spacing between stars
                            />
                            <h2 className='readexpro num-ratings white'>({place.numRatings})</h2>
                          </div>
                          <h2 className='readexpro italic white'>Address- {place.address}</h2>
                          <h2 className='readexpro white'>Description- {place.description}</h2>
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
