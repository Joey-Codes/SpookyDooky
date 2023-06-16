import '../styles/places.css';
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SearchBar } from '../components/searchbar';
import { Map } from '../components/map';  
import { ReviewModal } from '../components/reviewmodal';
import { useGetUserID } from '../hooks/useGetUserID';

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

export const Places = () => {
  const userID = useGetUserID();
  const [filter, setFilter] = useState("All Places");
  const [places, setPlaces] = useState([]);
  const [newPlaceId, setNewPlaceId] = useState('');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [result, setResult] = useState('');
  const [placeExists, setPlaceExists] = useState('');
  const [isInitialSelection, setIsInitialSelection] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    rating: 1,
    numRatings: 0,
    address: "",
    description: "",
  });

  const handleQuerySearch = async (event) => {
    event.preventDefault(); 
    try {
      const response = await axios.get(`http://localhost:3001/places/searchquery/${query}`)
      setPlaces(response.data);
      console.log(response.data);
      setFilter("Search Results");
      if (response.data.length === 0) {
        setFilter("No Results!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const encodedPlaceAddress = encodeURIComponent(newPlace.address);

  const handlePlaceSelect = (place) => {
    setNewPlace(prevState => ({
      ...prevState,
      name: place.name,
      address: place.formatted_address
    }));
  };  

  const createPlace = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/places", newPlace);
      const placeId = response.data._id; // Retrieve the _id property from the response
      setNewPlaceId(placeId); // Update the newPlaceId state with the place ID
      openReviewModal();
    } catch (err) {
      console.log(err);
    }
  };  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openReviewModal = () => {
    setReviewModalIsOpen(true)
  }

  const closeReviewModal = () => {
    setReviewModalIsOpen(false);
    setModalIsOpen(false);
    setNewPlaceId("");
  };

  const handlePlaceClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  const handleExistingPlaceClick = () => {
    navigate(`/places/${placeExists[0]._id}`);
  }

  const fetchByFilter = async (filter) => {
    try {
      const response = await axios.get(`http://localhost:3001/places/sorted/${filter}`);
      setPlaces(response.data);
      if (filter === "toprated") {
        setFilter("Top Rated");
      } else if (filter === "lowestrated") {
        setFilter("Lowest Rated");
      } 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get("http://localhost:3001/places");
        setPlaces(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (encodedPlaceAddress && isInitialSelection) {
      const fetchSelectedPlace = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/places/search/address/${encodedPlaceAddress}`);
          if (response.data.length === 0) {
            setResult("There are no reviews for this place yet! Be the first!");
          } else {
            setPlaceExists(response.data);
            setResult("There are already reviews for this place!");
          }
        } catch (err) {
          setResult("There was an error! Try again later");
        }
      };
  
      fetchSelectedPlace();
    } else {
      setIsInitialSelection(true);
    }
  }, [encodedPlaceAddress, isInitialSelection, newPlaceId]);


  return (
    <div>
        <div className="places-title flex">
          <div>
            <br />
            <br />
            <br />
            <h1 className='readexpro white rp1'>SEARCH FOR A PLACE &#x1F50D;</h1>
            <br />
            <form onSubmit={handleQuerySearch}>
              <input
                className='h-b5 search'
                type='text'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <button type='submit' className='h-b5 readexpro search'>Go</button>
            </form>
            <h2 className='white'>You can also search with the map</h2>
          </div>
          <div>
            <h1 className='readexpro white rp1'>SORT BY</h1>
            <br />
            <button onClick={() => fetchByFilter('toprated')} className='h-b5 readexpro r1 mr'>Top Rated</button>
            <button  onClick={() => fetchByFilter('lowestrated')} className='h-b5 readexpro r1'>Lowest Rated</button>
          </div>
          <div>
            <h2 className='readexpro white rp1'>IF PLACE DOESN'T EXIST YET, ADD IT HERE</h2>
            <br />
            <button onClick={openModal} className='h-b5 readexpro r1'>ADD A NEW PLACE &#10133;</button>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
            >
              <div className='modal-form'>
                <h1 className='readexpro rp2 red'>Choose A New Place To Review</h1>
                <br />
                <br />
                <div>
                  <SearchBar onPlaceSelect={handlePlaceSelect}/>
                </div>
                <br />
                <h1 className='readexpro bold'>{newPlace.name}</h1>
                <h2 className='readexpro italic'>{newPlace.address}</h2>
                <h2 className='readexpro red'>{result}</h2>
                {result === "There are already reviews for this place!" && (
                  <button className='h-b3 readexpro form-font' onClick={handleExistingPlaceClick}>Go to {newPlace.name} page</button>
                )}
                {result === "There are no reviews for this place yet! Be the first!" && (
                  <button onClick={createPlace} className='h-b3 readexpro form-font'>Add The First Review!</button>
                )}
                <br />
                <br />
                <button onClick={() => {
                  closeModal();
                }} className='h-b3 readexpro rp1'>CANCEL</button>
              </div>
            </Modal>
          </div>
          {newPlaceId && (
      <ReviewModal isOpen={reviewModalIsOpen} closeModal={closeReviewModal} placeId={newPlaceId} userID={userID} placeName={newPlace.name}/>
    )}
        </div>
        <br />
        <h1 className='readexpro rp2 bold filter'>{filter}</h1>
        {filter === "No Results!" && (
          <h2 className='readexpro filter'>Try checking your spelling!</h2>
        )}
        <div className='places-display'>
          <Map />
          <div className='place-list'>
              {places.map((place) => (
                  <div className="place-entry" key={place._id}>
                      <div className='entry-format'>
                          <div className='place-info'>
                            <h1 className="red readexpro name" onClick={() => handlePlaceClick(place._id)}>{place.name}</h1>
                            <br />
                            <div className="place-rating">
                              <StarRatings
                                rating={place.rating} // Replace with your actual rating value
                                starRatedColor="red" // Customize the color of the filled stars
                                starEmptyColor="lightgray" // Customize the color of the empty stars
                                starDimension="40px" // Adjust the size of the stars
                                starSpacing="2px" // Adjust the spacing between stars
                              />
                              <h2 className='readexpro num-ratings white'>({place.numRatings})</h2>
                            </div>
                            <h2 className='readexpro italic white'>{place.address}</h2>
                            <h2 className='readexpro white'>Description- {place.description}</h2>
                          </div>
                          <div className='place-image'>
                            <img className="test" alt='place-pic'></img>
                          </div>
                          <br />
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};
