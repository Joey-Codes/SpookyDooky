import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';
import StarRatings from 'react-star-ratings';
import { ReviewModal } from './reviewmodal';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Modal from 'react-modal';
import "../styles/placepage.css";

const customStyles = {
  content: {
    position: "fixed",
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    transform: 'translate(0, 0)',
    overflow: 'auto',
    padding: 0,
  },
};

export const PlacePage = ({ query }) => {
  const navigate = useNavigate();
  const userID = useGetUserID();
  const { placeId } = useParams();
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const toggleShowFullDescription = (index) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  

  const handleBackClick = () => {
    navigate('/places');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalWithPlaceName = () => {
    setModalIsOpen(true);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setIsImageModalOpen(false);
  };
 
  const isImageWiderThanTaller = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;

    return img.width > img.height;
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

  if (!place || !reviews) {
    return (
      <div className='readexpro loading'>
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
          <h9 className='red readexpro disclaimer'>Disclaimer: Please ensure to obey all laws and regulations before visiting a location. 
            Never trespass onto a property. Always be sure to obtain site owner's permission before 
            conducting an investigation.
          </h9>
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
                rating={place.rating}  
                starRatedColor="red" 
                starEmptyColor="white" 
                starDimension="5vh" 
                starSpacing="2px"
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
                <div className='readexpro username bold'>{reviewOwners[index]}</div>
                <div className={`h-b2 h-b2a readexpro rp1 ${review.category === 'Ghosts' ? 'ghosts-color' : ''} ${review.category === 'Aliens' ? 'aliens-color' : ''} ${review.category === 'Cryptids' ? 'cryptids-color' : ''} ${review.category === 'Unexplained' ? 'unexplained-color' : ''}`}>
                  {review.category}
                </div>
                <div className='italic bold date'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: enUS })}</div>
              </div>
              <StarRatings
                  rating={review.rating} 
                  starRatedColor="red"
                  starEmptyColor="lightgray" 
                  starDimension="4vh"
                  starSpacing="2px" 
                />
               <p className={`readexpro rp1 ${showFullDescription[index] ? 'expanded' : 'collapsed'}`}>
                  {review.description.length > 400 && !showFullDescription[index]
                    ? `${review.description.substring(0, 400)}...`
                    : review.description}
              </p>
              <br />
              {review.description.length > 400 && (
                <button
                  className="readexpro rp1 show-more-button"
                  onClick={() => toggleShowFullDescription(index)}
                >
                  {showFullDescription[index] ? 'Show less' : 'Show more'}
                </button>
              )}
              <br />
              {review.img && (
                <img 
                  className='review-img' 
                  src={review.img} 
                  alt='review-pic'
                  onClick={() => openImageModal(review.img)}
                />
              )}
            </div>
          ))}
        </ul>
      )}
          <Modal 
            isOpen={isImageModalOpen}
            onClose={closeImageModal}
            style={customStyles}
          >
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              <img
                className={`image-popup ${isImageWiderThanTaller(selectedImage) ? 'rotated-image' : ''}`}
                src={selectedImage}
                alt='review-pic-popup'
              />
              <br />  
              <button
                className="h-b3 readexpro"
                onClick={closeImageModal}
                style={{ 
                  position: "absolute", 
                  bottom: 0, 
                  left: 0,
                  right: 0,
                  margin: "auto",
                  fontSize: "30px",
                }}
              >
                CLOSE
              </button>
            </div>
          </Modal>  
    </div>
  );
};
