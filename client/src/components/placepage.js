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
      </div>
      <div className='placepage-middle flex'>
        <div className='place-options'> 
          <button className='h-b3 h-b3a rammettoone r1'>REVIEW THIS PLACE</button>
          <button className='h-b3 h-b3b rammettoone r1'>SEE PHOTOS</button>
        </div>
        <br />
        <br />
        <div className='page-ratings'>
          <div>
            <h2 className='bangers b2 white h-b3a'>Scariness Rating</h2>
            <StarRatings
              rating={3.21837} // Replace with your actual rating value
              starRatedColor="red" // Customize the color of the filled stars
              starEmptyColor="lightgray" // Customize the color of the empty stars
              starDimension="40px" // Adjust the size of the stars
              starSpacing="2px" // Adjust the spacing between stars
            />
            <div className="dropdown">
              <button className="readepxpro rp1 dropdown-toggle">SORT BY</button>
              <div className="dropdown-menu">
                <button className='h-b readexpro rp1'>OPTION</button>
                <button className='h-b readexpro rp1'>OPTION</button>
                <button className='h-b readexpro rp1'>OPTION</button>
              </div>
            </div>
          </div>
          <div className='h-b3a'>
            <h2 className='white'>review distribution goes here</h2>
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
              <h2>&#128077;</h2>
              <p className='readexpro rp1 likes'>{review.likes}</p>
              <h2>&#128078;</h2>
              <p className='readexpro rp1 '>{review.dislikes}</p>
            </div>
            <p className='readexpro rp1'>Description: {review.description}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
