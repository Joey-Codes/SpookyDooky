import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../styles/reviewmodal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%', // Adjust the maximum width to fit smaller screens
    maxHeight: '90vh', // Limit the maximum height to the viewport height
    overflow: 'auto', // Enable scrolling if the modal content overflows
  },
};


export const ReviewModal = ({ isOpen, closeModal, placeId, userID, placeName}) => {
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newReview, setNewReview] = useState({
    rating: 0,
    category: "",
    likes: 0,
    dislikes: 0,
    description: "",
    userId: userID,
    placeId: placeId,
    img: null
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    const { value } = event.target;
    setNewReview({ ...newReview, category: value });
  };
  
  const handleRatingChange = (newRating) => {
    setStarRating(newRating);
    setNewReview({ ...newReview, rating: newRating });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewReview({ ...newReview, img: file });
  };


   const deletePlace = async () => {
    try {
      const currentPath = window.location.pathname;
      const targetPath = `/places/${placeId}`;
  
      if (currentPath === targetPath) {
          closeModal();
          return; // Exit the function without making the delete request
      }
  
      await axios.delete(`http://localhost:3001/places/delete/${placeId}`);
    } catch (err) {
      console.log(err);
    }
  };   

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/reviews", newReview);
      const currentPath = window.location.pathname;
      const targetPath = `/places/${placeId}`;
  
      if (currentPath === targetPath) {
        window.location.reload(); 
      } else {
        navigate(targetPath); 
      }
    } catch (err) {
      console.log(err);
    }
    closeModal();
  };  

  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className='modal-form'>
        <h1 className='readexpro rp2 red'>{placeName}</h1>
        <br />
        <br />
        <div className='readexpro italic'>Note: If you wish to keep track of all your reviews, please sign in.</div>
        <div className='readexpro italic'>Otherwise, this review will be labeled as from 'Anonymous'.</div>
        <div className='modal-row'>
          <h2 className='readexpro form-font mr mrp1'>SCARINESS RATING -</h2>
          <StarRatings
            rating={starRating}
            starRatedColor="red"
            starHoverColor="red"
            changeRating={handleRatingChange}
            numberOfStars={5}
            starDimension="40px"
            starSpacing="2px"
          />
        </div>
        <br />
        <div className='modal-row'>
          <h2 className='readexpro form-font mr'>CATEGORY -</h2>
          <button
            name="category"
            value="Ghosts"
            onClick={handleCategoryChange}
            className={`h-b4 readexpro rp1 bold mr${
              selectedCategory === 'Ghosts' ? 'active' : ''
            }`}
          >
            GHOSTS
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
              <h2 className='readexpro form-font'>DESCRIPTION:</h2>
              <textarea className="description-field" name="description" onChange={handleChange} type='text'></textarea>
        <br />
                      <div className='modal-row'>
                <h2 className='readexpro form-font mr'>ADD PHOTO (optional) -</h2>
                <input className='readexpro' type="file" onChange={handleFileChange} />
              </div>
              <br />
        <div className='modal-row'>
          <div>
          <button onClick={() => {
            closeModal();
            deletePlace();
          }} className='h-b3 h-b3a readexpro form-font mr'>
            Cancel
          </button>
          <button onClick={onSubmit} className='h-b3 readexpro form-font'>
            Add Review
          </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};