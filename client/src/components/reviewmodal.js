import Modal from 'react-modal';
import { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ReviewModal = ({ isOpen, closeModal, placeId, userID, placeName}) => {
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
    // Do something with the selected file
    console.log('Selected file:', file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/reviews", newReview);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    closeModal();
  };


  console.log(placeName);
  return (
    <Modal isOpen={isOpen} style={customStyles}>
      <div className='modal-form'>
        <h1 className='readexpro rp2 red'>{placeName}</h1>
        <br />
        <br />
        <div className='modal-row'>
          <h2 className='readexpro form-font mr'>SCARINESS RATING -</h2>
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
            value="Paranormal"
            onClick={handleCategoryChange}
            className={`h-b4 readexpro rp1 bold mr ${
              selectedCategory === 'Paranormal' ? 'active' : ''
            }`}
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
              <h2 className='readexpro form-font'>DESCRIPTION:</h2>
              <textarea className="description-field" name="description" onChange={handleChange} type='text'></textarea>
        <br />
                      <div className='modal-row'>
                <h2 className='readexpro form-font mr'>ADD PHOTO (optional) -</h2>
                <input className='readexpro' type="file" onChange={handleFileChange} />
              </div>
              <br />
        <div className='modal-row'>
          <button onClick={closeModal} className='h-b3 h-b3a readexpro form-font'>
            Cancel
          </button>
          <button onClick={onSubmit} className='h-b3 readexpro form-font'>
            Add Review
          </button>
        </div>
      </div>
    </Modal>
  );
};