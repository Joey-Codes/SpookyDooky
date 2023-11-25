import '../styles/profile.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import { useGetUserID } from '../hooks/useGetUserID';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import axios from 'axios';
import '../styles/profile.css';

const customStyles = {
  content: {
    top: '50%',
    background: 'black',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Profile = () => {
  const userID = useGetUserID();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState({});

  const toggleShowFullDescription = (index) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/reviews/delete/${reviewId}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  }

  const handleDeleteUser = () => {
    try {
      axios.delete(`${process.env.REACT_APP_SERVER_URL}/auth/delete/${userID}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/reviews/find/${userID}`)
        setMyReviews(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchMyReviews();
  }, [userID]);

  const [placeNames, setPlaceNames] = useState({});

  useEffect(() => {
    const fetchPlaceNames = async () => {
      try {
        const placeNames = [];
        for (const review of myReviews) {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/find/${review.placeId}`);
          placeNames.push(response.data.name);
        }
        setPlaceNames(placeNames);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchPlaceNames();
  }, [myReviews]);

  useEffect(() => {
    const editedReviewId = localStorage.getItem('editedReviewId');
    if (editedReviewId) {
      const editedReviewElement = document.getElementById(`review-${editedReviewId}`);
      if (editedReviewElement) {
        editedReviewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  
      localStorage.removeItem('editedReviewId');
    }
  }, []);

  const [editingReviewIndex, setEditingReviewIndex] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (index, description) => {
    setEditingReviewIndex(index);
    setEditedDescription(description);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (reviewId) => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/reviews/edit/${reviewId}`, {
        description: editedDescription,
      });

      localStorage.setItem('editedReviewId', reviewId);
      setEditingReviewIndex(null);
      setIsEditModalOpen(false);

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditingReviewIndex(null);
  };

  return (
  <div className="profile-tabs"> 
  <Tabs>
    <TabList>
      <Tab>MY REVIEWS</Tab>
      <Tab>ACCOUNT SETTINGS</Tab>
    </TabList>

    <TabPanel>
    <div style={{'min-height':'600px'}}>
    {myReviews.length === 0 ? (
          <h2 className='readexpro white'>You have no reviews yet!</h2>
      ) : (
      <ul className='review-list'>
        {myReviews.map((review, index) => (
              <div className="review-entry" id={`review-${review._id}`} key={review._id}>
                <h2 className='readexpro italic'>Your review for {placeNames[index]}</h2>
                <StarRatings
                    rating={review.rating} 
                    starRatedColor="red" 
                    starEmptyColor="lightgray" 
                    starDimension="4vh" 
                    starSpacing="2px" 
                  />
                <div className='rating-top-portion'>
                  <h2 className={`h-b2 h-b2a readexpro rp1 ${review.category === 'Ghosts' ? 'ghosts-color' : ''} ${review.category === 'Aliens' ? 'aliens-color' : ''} ${review.category === 'Cryptids' ? 'cryptids-color' : ''} ${review.category === 'Unexplained' ? 'unexplained-color' : ''}`}>
                    {review.category}
                  </h2>
                  <h3 className='italic'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: enUS })}</h3>
                </div>
                <p className={`readexpro rp1 ${showFullDescription[index] ? 'expanded' : 'collapsed'}`}>
                  {review.description.length > 400 && !showFullDescription[index]
                    ? `${review.description.substring(0, 400)}...`
                    : review.description}
                </p>
                <br />
                {review.description.length > 400 && (
                  <button
                    className="readexpro rp1"
                    onClick={() => toggleShowFullDescription(index)}
                  >
                    {showFullDescription[index] ? 'Show less' : 'Show more'}
                  </button>
                )}
                <br />
                <div className='image-display'>
                  {review.img && (
                    <img className='review-img' src={review.img} alt='review-pic' />
                  )}
                  <br />
                  {review.img2 && (
                    <img className='review-img' src={review.img2} alt='review-pic2' />
                  )}
                </div>
                <br />
                <br />
                <button
                  className="h-b3 rp1 mr"
                  onClick={() => handleEditClick(index, review.description)}
                >
                  Edit Review
                </button>
                  <button className="h-b3 rp1" onClick={() => setIsOpen2(true)}>
                    Delete Review
                  </button>
                  <Modal isOpen={isOpen2} style={customStyles}>
                    <h2 className='readexpro white'>Are you sure you wish to delete this review?</h2>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <button className='h-b3 readexpro rp1 mr' onClick={() => setIsOpen2(false)}>Cancel</button>
                      <button className='h-b3 readexpro rp1 mr' onClick={() => handleDeleteReview(review._id)}>Yes</button>
                    </div>
                  </Modal>
              </div>
            ))}
      </ul>
      )}
      <Modal isOpen={isEditModalOpen} style={customStyles}>
        <h2 className='readexpro white'>Edit Review Description</h2>
        <textarea
          className='edit-review'
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
        />
        <br />
        <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <button className='h-b3 readexpro rp1 mr' onClick={handleEditModalClose}>Cancel</button>
          <button className='h-b3 readexpro rp1 mr' onClick={() => handleSaveEdit(myReviews[editingReviewIndex]._id, editedDescription)}>Save Edit</button>
        </div>
      </Modal>
    </div>
    </TabPanel>
    <TabPanel>
      <br />
      <br />
      <div className='setting'>
        <h2 className='readexpro'>DELETE MY ACCOUNT</h2>
        <h3 className='readexpro'>Warning: This action is irreversible and cannot be undone!</h3>
        <h3 className='readexpro'>Note: If you delete your account, your existing reviews will not be automatically deleted and will still be visible. </h3>
        <h3 className='readexpro'>If you wish to delete them, please do so in the 'My Reviews' tab before deleting your account.</h3>
        <button className='h-b3 rp1 readexpro' onClick={handleDeleteClick}>Delete Account</button>
        <Modal isOpen={isOpen} style={customStyles}>
            <h2 className='readexpro white'>Choose 'YES' to confirm you want to delete your account. No takebacks!</h2>
            <div className='flex'>
              <button className='h-b3 readexpro rp1 mr' onClick={() => setIsOpen(false)}>Cancel</button>
              <button className='h-b3 readexpro rp1' onClick={handleDeleteUser}>Yes</button>
            </div>
        </Modal>
      </div>
      <div className='setting'>      
        <h2 className='readexpro'>GOT QUESTIONS OR FEEDBACK? CONTACT US @</h2>
        <h3 className='readexpro'>Email: spookydooky35@gmail.com</h3>
      </div>
    </TabPanel>
  </Tabs>
  </div>
  )
};