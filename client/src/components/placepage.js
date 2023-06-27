import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import StarRatings from 'react-star-ratings';
import { ReviewModal } from './reviewmodal';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import "../styles/placepage.css";

export const PlacePage = ({ query }) => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(userID);

  const handleBackClick = () => {
    navigate('/places');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalWithPlaceName = () => {
    setModalIsOpen(true);
  };

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

  const fetchBySorted = async (filter) => {
    try {
      const reviewsResponse = await axios.get(`http://localhost:3001/places/${placeId}/reviews/${filter}`);
      setReviews(reviewsResponse.data);
      setActiveFilter(filter);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = (reviewId) => {
    try {
      axios.delete(`http://localhost:3001/reviews/delete/${reviewId}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (reviewId) => {
    if (userID == null) {
      alert("You must be logged in to like a review!");
    }
    if (userID != null) {
      try {
        console.log(reviewId);
        await axios.put(`http://localhost:3001/reviews/${reviewId}/like`);
        const reviewsResponse = await axios.get(`http://localhost:3001/places/${placeId}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDislike = async (reviewId) => {
    if (userID == null) {
      alert("You must be logged in to dislike a review!");
    }
    if (userID != null) {
      try {
        console.log(reviewId);
        await axios.put(`http://localhost:3001/reviews/${reviewId}/dislike`);
        const reviewsResponse = await axios.get(`http://localhost:3001/places/${placeId}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!place || !reviews) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='back-button'>
        
      </div>
      <div className="placepage-title flex">
      <button onClick={handleBackClick} className='h-b6 readexpro white back-button'>&#129044;</button>
        <div className='title-image-section'>
          <img src={place.img} alt='place-pic' className='title-image'/>
        </div>
        <div>
          <h1 className='readexpro rp2 red'>{place.name}</h1>
          <h2 className='readexpro white'>{place.address}</h2>
          {place.website && (
            <a className='readexpro white' href={place.website} target='_blank' rel="noreferrer">
              Visit Website
            </a>
          )}
        </div>
      </div>
      <div className='placepage-middle flex'>
        <div className='place-options'>
          <button onClick={() => openModalWithPlaceName(place.name)} className='h-b3 h-b3a readexpro rp3 bold'>
            Review This Place
          </button>
          <ReviewModal isOpen={modalIsOpen} closeModal={closeModal} placeId={placeId} userID={userID} placeName={place.name} />
        </div>
        <div className='page-ratings'>
          <div>
            <div className='scariness-rating'>
              <h2 className='bangers b2 white h-b3a'>Scariness Rating</h2>
              <StarRatings
                className="star-rating"
                rating={place.rating} // Replace with your actual rating value
                starRatedColor="red" // Customize the color of the filled stars
                starEmptyColor="white" // Customize the color of the empty stars
                starDimension="50px" // Adjust the size of the stars
                starSpacing="2px" // Adjust the spacing between stars
              />
              <h2 className='readexpro rp3 white ml'>({place.numRatings})</h2>
            </div>
            <div className="filters">
              <h2 className="readexpro rp1 white mr">SORT BY</h2>
              <button
                onClick={() => fetchBySorted('toprated')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'toprated' ? 'active' : ''}`}
              >
                TOP RATED
              </button>
              <button
                onClick={() => fetchBySorted('lowestrated')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'lowestrated' ? 'active' : ''}`}
              >
                LOWEST RATED
              </button>
              <button
                onClick={() => fetchBySorted('mostliked')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'mostliked' ? 'active' : ''}`}
              >
                MOST LIKED
              </button>
              <button
                onClick={() => fetchBySorted('mostdisliked')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'mostdisliked' ? 'active' : ''}`}
              >
                MOST DISLIKED
              </button>
              <button
                onClick={() => fetchBySorted('newest')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'newest' ? 'active' : ''}`}
              >
                NEWEST
              </button>
              <button
                onClick={() => fetchBySorted('oldest')}
                className={`h-b4 readexpro rp1 bold mr ${activeFilter === 'oldest' ? 'active' : ''}`}
              >
                OLDEST
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      {reviews.length === 0 ? (
        <div>
          <br />
          <h1 className='review-entry flex readexpro rp2'>There are no reviews yet! Be the first!</h1>
          <br />
        </div>
      ) : (
        <ul className='review-list'>
          {reviews.map((review) => (
            <div className="review-entry" key={review._id}>
              <h2 className='italic'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: enUS })}</h2>
            <div className='rating-top-portion'>
                <StarRatings
                  rating={review.rating} // Replace with your actual rating value
                  starRatedColor="red" // Customize the color of the filled stars
                  starEmptyColor="white" // Customize the color of the empty stars
                  starDimension="40px" // Adjust the size of the stars
                  starSpacing="2px" // Adjust the spacing between stars
                />
                <h2 className={`h-b2 h-b2a readexpro rp1 ${review.category === 'Ghosts' ? 'ghosts-color' : ''} ${review.category === 'Aliens' ? 'aliens-color' : ''} ${review.category === 'Cryptids' ? 'cryptids-color' : ''} ${review.category === 'Unexplained' ? 'unexplained-color' : ''}`}>
                  {review.category}
                </h2>
                <div className='chungus'>
                  <button onClick={() => handleLike(review._id)} className='vote mr'>&#128077;</button>
                  <p className='readexpro rp1 likes'>{review.likes}</p>
                </div>
                <div className='chungus'>
                  <button onClick={() => handleDislike(review._id)} className='vote mr'>&#128078;</button>
                  <p className='readexpro rp1 '>{review.dislikes}</p>
                </div>
              </div>
              <p className='readexpro rp1'>{review.description}</p>
              <button onClick={() => handleDeleteReview(review._id)}>&#128465;</button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
