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
        const placeResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/${placeId}`);
        setPlace(placeResponse.data);

        const reviewsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/${placeId}/reviews`);
        setReviews(reviewsResponse.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [placeId]);

  const [reviewOwners, setReviewOwners] = useState({});
  
  useEffect(() => {
    const fetchReviewOwners = async () => {
      try {
        const reviewOwners = [];
        for (const review of reviews) {
          if (review.userId === null) {
            reviewOwners.push('Anonymous');
          } else {
            try {
              const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/find/${review.userId}`);
              reviewOwners.push(response.data.name);
            } catch (err) {
            reviewOwners.push('Anonymous');
            }
          }
        }
        setReviewOwners(reviewOwners);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchReviewOwners();
  }, [reviews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  

  const fetchBySorted = async (filter) => {
    try {
      const reviewsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/${placeId}/reviews/${filter}`);
      setReviews(reviewsResponse.data);
      setActiveFilter(filter);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteReview = (reviewId) => {
    try {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews/delete/${reviewId}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  if (!place || !reviews) {
    return (
      <div className='readexpro rp2 loading'>
        Loading...
      </div>
    );
      }

  return (
    <div>
      <div className="placepage-title flex">
      <button onClick={handleBackClick} className='h-b6 readexpro white back-button'>&larr;</button>
        <div className='title-image-section'>
          <img src={place.img} alt='place-pic' className='title-image'/>
        </div>
        <div>
          <h1 className='readexpro rp2 red mobile-name'>{place.name}</h1>
          <h2 className='readexpro white mobile-add'>{place.address}</h2>
          {place.website && (
            <a className='readexpro mobile-web blue' href={place.website} target='_blank' rel="noreferrer">
              Visit Website
            </a>
          )}
        </div>
      </div>
      <div className='placepage-middle flex'>
        <div className='place-options'>
          <button onClick={() => openModalWithPlaceName(place.name)} className='h-b3 h-b3a readexpro rp3 bold mobile-review'>
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
                starDimension="5vh" // Adjust the size of the stars
                starSpacing="2px" // Adjust the spacing between stars
              />
              <h2 className='readexpro rp3 white ml mobile-rating'>({place.numRatings})</h2>
            </div>
            <div className="filters">
              <h2 className="readexpro rp1 white mr mobile-filter">SORT BY</h2>
              <button
                onClick={() => fetchBySorted('toprated')}
                className={`h-b4 readexpro rp1 bold mr mobile-filter ${activeFilter === 'toprated' ? 'active' : ''}`}
              >
                TOP RATED
              </button>
              <button
                onClick={() => fetchBySorted('lowestrated')}
                className={`h-b4 readexpro rp1 bold mr mobile-filter ${activeFilter === 'lowestrated' ? 'active' : ''}`}
              >
                LOWEST RATED
              </button>
              <button
                onClick={() => fetchBySorted('newest')}
                className={`h-b4 readexpro rp1 bold mr mobile-filter ${activeFilter === 'newest' ? 'active' : ''}`}
              >
                NEWEST
              </button>
              <button
                onClick={() => fetchBySorted('oldest')}
                className={`h-b4 readexpro rp1 bold mr mobile-filter ${activeFilter === 'oldest' ? 'active' : ''}`}
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
          {reviews.map((review, index) => (
            <div className="review-entry profile-review" key={review._id}>
              <div className='rating-top-portion'>
                <h2 className='readexpro'>{reviewOwners[index]}</h2>
                <h2 className={`h-b2 h-b2a readexpro rp1 ${review.category === 'Ghosts' ? 'ghosts-color' : ''} ${review.category === 'Aliens' ? 'aliens-color' : ''} ${review.category === 'Cryptids' ? 'cryptids-color' : ''} ${review.category === 'Unexplained' ? 'unexplained-color' : ''}`}>
                  {review.category}
                </h2>
                <h2 className='italic mobile-date'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: enUS })}</h2>
              </div>
              <StarRatings
                  rating={review.rating} // Replace with your actual rating value
                  starRatedColor="red" // Customize the color of the filled stars
                  starEmptyColor="lightgray" // Customize the color of the empty stars
                  starDimension="4vh" // Adjust the size of the stars
                  starSpacing="2px" // Adjust the spacing between stars
                />
              <p className='readexpro rp1'>{review.description}</p>
              {review.img && (
                <img className='review-img' src={review.img} alt='review-pic'/>
              )}
              <br />
                <button className="h-b3 rp1" onClick={() => handleDeleteReview(review._id)}>
                  Delete Review
                </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
