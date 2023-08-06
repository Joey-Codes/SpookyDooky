import '../styles/profile.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useGetUserID } from '../hooks/useGetUserID';
import 'react-tabs/style/react-tabs.css';
import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import axios from 'axios';
import '../styles/profile.css';

export const Profile = () => {
  const userID = useGetUserID();

  const handleDeleteReview = (reviewId) => {
    try {
      axios.delete(`http://localhost:3001/reviews/delete/${reviewId}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reviews/find/${userID}`)
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
          const response = await axios.get(`http://localhost:3001/places/find/${review.placeId}`);
          placeNames.push(response.data.name);
        }
        setPlaceNames(placeNames);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchPlaceNames();
  }, [myReviews]);

  return (
  <div className="profile-tabs"> 
  <Tabs>
    <TabList>
      <Tab>MY REVIEWS</Tab>
      <Tab>ACCOUNT SETTINGS</Tab>
    </TabList>

    <TabPanel>
      <ul className='review-list'>
        {myReviews.map((review, index) => (
              <div className="review-entry" key={review._id}>
                <h2 className='red readexpro italic'>Review for {placeNames[index]}</h2>
                <div className='rating-top-portion'>
                  <StarRatings
                    rating={review.rating} // Replace with your actual rating value
                    starRatedColor="red" // Customize the color of the filled stars
                    starEmptyColor="lightgray" // Customize the color of the empty stars
                    starDimension="40px" // Adjust the size of the stars
                    starSpacing="2px" // Adjust the spacing between stars
                  />
                  <h2 className={`h-b2 h-b2a readexpro rp1 ${review.category === 'Ghosts' ? 'ghosts-color' : ''} ${review.category === 'Aliens' ? 'aliens-color' : ''} ${review.category === 'Cryptids' ? 'cryptids-color' : ''} ${review.category === 'Unexplained' ? 'unexplained-color' : ''}`}>
                    {review.category}
                  </h2>
                  <h2 className='italic'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true, locale: enUS })}</h2>
                </div>
                <p className='readexpro rp1'>{review.description}</p>
                <br />
                  <button className="h-b3 rp1" onClick={() => handleDeleteReview(review._id)}>
                    Delete Review
                  </button>
              </div>
            ))}
      </ul>
    </TabPanel>
    <TabPanel>
      <h2 className='readexpro white'>Delete my Account</h2>
      <h3 className='readexpro white'>Warning: This action is irreversible and cannot be undone!</h3>
      <button className='h-b3 rp1 readexpro white'>Delete Account</button>
      <br />
      <h2 className='readexpro white'>Questions? Contact</h2>
      <h3 className='readexpro white'>email:</h3>
    </TabPanel>
  </Tabs>
  </div>
  )
};