import Modal from 'react-modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import { RegExpMatcher, englishDataset, englishRecommendedTransformers } from 'obscenity';
import '../styles/reviewmodal.css'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '90vh', 
    overflow: 'auto', 
  },
};


export const ReviewModal = ({ isOpen, closeModal, placeId, userID, placeName}) => {
  const navigate = useNavigate();
  const [starRating, setStarRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [areRequiredFieldsEmpty, setAreRequiredFieldsEmpty] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false); 
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    category: "",
    likes: 0,
    dislikes: 0,
    description: "",
    userId: userID,
    placeId: placeId,
    img: "",
  });

  const matcher = new RegExpMatcher({
    ...englishDataset.build(),
    ...englishRecommendedTransformers,
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

const handleFileChange = async (event) => {
  setIsImageUploading(true);
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,
      formData,
      {
        params: {
          folder: "Review_Photos",
          upload_preset: process.env.REACT_APP_CLOUDINARY_UNSIGNED_PRESET,
        },
      }
    );

    const imageUrl = cloudinaryResponse.data.secure_url;

    const nsfwCheckResponse = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/reviews/checkimage`,
      { imageUrl }, 
      config
    );

    if (nsfwCheckResponse.data.isNSFW) {
      alert('ATTENTION: Our AI has detected NSFW content in your image! Please ensure your image is appropriate. Thanks!');
      return;
    }

    setNewReview((prevState) => ({
      ...prevState,
      img: imageUrl,
    }));

    setIsImageUploading(false);
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    setIsImageUploading(false);
  }
};

  
  const deletePlace = async () => {
    try {
      const currentPath = window.location.pathname;
      const targetPath = `/places/${placeId}`;
  
      if (currentPath === targetPath) {
          closeModal();
          return; 
      }
  
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/places/delete/${placeId}`);
    } catch (err) {
      console.log(err);
    }
  };   

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if (isSubmitDisabled) {
      return; 
    }
    
    const requiredFields = ['rating', 'category', 'description'];
    const isEmpty = requiredFields.some((field) => !newReview[field]);
    setAreRequiredFieldsEmpty(isEmpty);
    
    if (isEmpty) {
      return; 
    }
  
    if (isImageUploading) {
      setIsSubmitDisabled(true); 
      setTimeout(() => {
        setIsSubmitDisabled(false); 
      }, 3000); 
      return;
    }

    if (matcher.hasMatch(newReview.description)) {
      alert('Review description contains profanity. Please ensure your language is appropriate. Thanks!');
      return;
    }
  
    try {
      if (newReview.img instanceof File) {
        await handleFileChange(event);
      }
  
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/reviews`, newReview);
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
        {userID == null && (
          <div>
            <div className='readexpro italic'>Note: If you wish to keep track of this review, please sign in. 
                                              Otherwise, this review will be labeled as from 'Anonymous'
            </div>
          </div>
        )}
        {areRequiredFieldsEmpty && <h2 className='readexpro italic bold red'>You must fill out all required fields before submitting.</h2>}
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
              className={`h-b4 readexpro rp1 bold mr ${selectedCategory === 'Ghosts' ? 'active' : ''}`}
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
              {isSubmitDisabled && <h2 className='readexpro italic bold red'>Checking image upload- please wait until message disappears</h2>}
          <div className='modal-row'>
          <div>
          <button onClick={() => {
            closeModal();
            deletePlace();
          }} className='h-b3 h-b3a readexpro form-font mr'>
            Cancel
          </button>
          <button onClick={onSubmit} className='h-b3 readexpro form-font' disabled={isSubmitDisabled}>
            Add Review
          </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};