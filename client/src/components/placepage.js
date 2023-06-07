import '../styles/placepage.css'
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

export const PlacePage = ({ match }) => {
  const userID = useGetUserID();
  const { placeId } = useParams();

  const [newReview, setNewReview] = useState({
    rating: 0,
    category: "",
    likes: 0,
    dislikes: 0,
    description: "",
    userId: userID,
    placeId: placeId,
  });

  console.log(newReview)
  const [place, setPlace] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewReview({...newReview, [name]: value });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    const { value } = event.target;
    setNewReview({...newReview, category: value})
  };

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleRatingChange = (newRating) => {
    setStarRating(newRating);
    setNewReview({...newReview, rating: newRating});
  };  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Do something with the selected file
    console.log('Selected file:', file);
  };  

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/reviews", newReview);
      alert("Review added");
    } catch (err) {
      console.log(err);
    }
    setModalIsOpen(false);
  }

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
          <button onClick={openModal} className='h-b3 h-b3a readexpro rp3 bold'>Review This Place</button>
          <Modal
            isOpen={modalIsOpen}
          >
            <div className='modal-form'>
              <h1 className='readexpro rp2 red'>{place.name}</h1>
              <br />
              <br />
              <div className='modal-row'>
                <h2 className='readexpro mr'>SCARINESS RATING</h2>
                <StarRatings
                  rating={starRating} // The initial rating value
                  starRatedColor="red" // Color of the filled-in stars
                  starHoverColor="red" // Color when hovering over stars
                  changeRating={handleRatingChange} // Callback function when rating changes
                  numberOfStars={5} // Total number of stars
                  starDimension="40px" // Size of the stars
                  starSpacing="2px" // Spacing between stars
                />
              </div>
              <br />
              <br />
              <div className='modal-row'>  
                <h2 className='readexpro mr'>CATEGORY</h2>
                <button 
                  name="category" 
                  value="Paranormal" 
                  onClick={handleCategoryChange} 
                  className={`h-b4 readexpro rp1 bold mr ${selectedCategory === 'Paranormal' ? 'active' : ''}`}
                  >
                PARANORMAL
                </button>
                <button 
                  name="category" 
                  value="Aliens" 
                  onClick={handleCategoryChange} 
                  className={`h-b4 readexpro rp1 bold mr ${selectedCategory === 'Aliens' ? 'active' : ''}`}
                >ALIENS
                </button>
                <button 
                  name="category"
                  value="Cryptids"
                  onClick={handleCategoryChange}
                  className={`h-b4 readexpro rp1 bold mr ${selectedCategory === 'Cryptids' ? 'active' : ''}`}
                >CRYPTIDS
                </button>
                <button 
                  name="category"
                  value="Unexplained"
                  onClick={handleCategoryChange}
                  className={`h-b4 readexpro rp1 bold ${selectedCategory === 'Unexplained' ? 'active' : ''}`}
                >UNEXPLAINED
                </button>
              </div>
              <br />
              <br />
              <h2 className='readexpro'>DESCRIPTION</h2>
              <textarea className="description-field" name="description" onChange={handleChange} type='text'></textarea>
              <br />
              <br />
              <div className='modal-row'>
                <h2 className='readexpro mr'>ADD PHOTO (optional)</h2>
                <input className='readexpro' type="file" onChange={handleFileChange} />
              </div>
              <div className='modal-row'>
                <button onClick={closeModal} className='h-b h-b3a readexpro rp1'>CANCEL</button>
                <button onClick={onSubmit} className='h-b readexpro rp1'>ADD REVIEW</button>
              </div>
            </div>
          </Modal>
        </div>
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
