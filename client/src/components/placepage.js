import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PlacePage = ({ match }) => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);

  console.log(placeId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const placeResponse = await axios.get(`http://localhost:3001/places/${placeId}`);
        setPlace(placeResponse.data);
    
        const reviewsResponse = await axios.get(`http://localhost:3001/places/${placeId}/reviews`);
        setReviews(reviewsResponse.data); 
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();
  }, [placeId]);

  if (!place || !reviews) {
    return <div>Loading...</div>
  };

  return (
    <div>
      <h1>{place.name}</h1>
      <p>{place.description}</p>

     <h2>Reviews:</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
