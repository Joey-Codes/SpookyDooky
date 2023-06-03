import '../styles/placepage.css'
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const PlacePage = ({ match }) => {
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);

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
      <div className="placepage-title flex">
        <h1 className='readexpro rp2'>{place.name}</h1>
        <h3 className='readexpro red'>{place.description}</h3>
        <h3 className='readexpro red'>{place.address}</h3>
      </div>
      <div className='placepage-middle flex'>
        <div className='place-options'> 
          <button className='h-b3 h-b3a readexpro rp3 bold'>REVIEW THIS PLACE</button>
        </div>
        <br />
        <br />
        <div className='page-ratings'>
          <div>
            <div className='scariness-rating'>
              <h2 className='bangers b2 white h-b3a'>Scariness Rating</h2>
              <StarRatings
                className="star-rating"
                rating={3.21837} // Replace with your actual rating value
                starRatedColor="red" // Customize the color of the filled stars
                starEmptyColor="lightgray" // Customize the color of the empty stars
                starDimension="50px" // Adjust the size of the stars
                starSpacing="2px" // Adjust the spacing between stars
              />
              <h2 className='readexpro rp3 white ml'>({place.numRatings})</h2>
            </div>
            <div className="filters">
              <h2 className="readexpro rp1 white mr">SORT BY</h2>
              <button className='h-b4 readexpro rp1 bold mr'>TOP RATED</button>
              <button className='h-b4 readexpro rp1 bold mr'>LOWEST RATED</button>
              <button className='h-b4 readexpro rp1 bold mr'>MOST LIKED</button>
              <button className='h-b4 readexpro rp1 bold'>MOST DISLIKED</button>
            </div>
          </div>
        </div>
      </div>
     <h2>Reviews:</h2>
      <ul className='review-list'>
        {reviews.map((review) => (
          <div className="review-entry" key={review._id}>
            <div className='rating-top-portion'>
              <StarRatings
                rating={review.rating} // Replace with your actual rating value
                starRatedColor="red" // Customize the color of the filled stars
                starEmptyColor="lightgray" // Customize the color of the empty stars
                starDimension="40px" // Adjust the size of the stars
                starSpacing="2px" // Adjust the spacing between stars
              />
              <h2 className='h-b2 h-b2a readexpro rp1'>{review.category}</h2>
              <div className='chungus'> 
                <h2 className='mr'>&#128077;</h2>
                <p className='readexpro rp1 likes'>{review.likes}</p>
              </div>
              <div className='chungus'>
                <h2 className='mr'>&#128078;</h2>
                <p className='readexpro rp1 '>{review.dislikes}</p>
              </div>
            </div>
            <p className='readexpro rp1'>{review.description}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
