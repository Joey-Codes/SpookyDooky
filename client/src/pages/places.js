import '../styles/places.css';
import Modal from 'react-modal';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from '../components/searchbar';
import { Map } from '../components/map';  
import { ReviewModal } from '../components/reviewmodal';
import { useGetUserID } from '../hooks/useGetUserID';
import LoadingCircle from '../images/red-loading-circle.gif';

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
  const navigate = useNavigate();
  const location = useLocation();
  const userID = useGetUserID();
  const [filter, setFilter] = useState("All Places");
  const [places, setPlaces] = useState([]);
  const [newPlaceId, setNewPlaceId] = useState('');
  const [query, setQuery] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [result, setResult] = useState('');
  const [placeExists, setPlaceExists] = useState('');
  const [isInitialSelection, setIsInitialSelection] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showMap, setShowMap] = useState(true);

  const handleShowMap = () => {
    if (showMap === true) {
      setShowMap(false);
    } else {
      setShowMap(true);
    }  
  };

  const [newPlace, setNewPlace] = useState({
    name: "",
    rating: 1,
    numRatings: 0,
    address: "",
    website: "",
    img: "",
    lat: 0,
    long: 0
  });

  const handleQuerySearch = async (event) => {
    event.preventDefault();
    if (query === "") {
      return; 
    } 
    try {
      navigate(`/places?query=${encodeURIComponent(query)}`);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/searchquery/${query}`);
      setPlaces(response.data);
      setFilter(response.data.length > 0 ? `Search Results` : `No Results!`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleQuerySearch(event);
    }
  };

  const encodedPlaceAddress = encodeURIComponent(newPlace.address);

  const handlePlaceSelect = (place) => {
    setNewPlace(prevState => ({
      ...prevState,
      name: place.name,
      address: place.formatted_address,
      website: place.website,
      img: place.photos ? place.photos[0].getUrl() : null,
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng()
    }));
  };
  
  const createPlace = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/places`, newPlace);
      const placeId = response.data._id; 
      setNewPlaceId(placeId);
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

  const handleMapViewClick = (place) => {
    setShowMap(false);
    setSelectedPlace(place);
    const placesDisplayElement = document.querySelector('.places-display');
    if (placesDisplayElement) {
      placesDisplayElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchByFilter = async (filter) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/sorted/${filter}`);
      setPlaces(response.data);
      if (filter === "toprated") {
        setFilter("Top Rated");
      } else if (filter === "lowestrated") {
        setFilter("Lowest Rated");
      } else if (filter === "mostreviewed") {
        setFilter("Most Reviewed");
      } else if (filter === "recentlyadded") {
        setFilter("Recently Added");
      } 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
  
    const fetchPlaces = async () => {
      try {
        let response;
        if (queryParam) {
          response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/searchquery/${queryParam}`);
          setFilter(response.data.length > 0 ? `Search Results` : `No Results!`);
        } else {
          response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places`);
          setFilter("All Places");
        }
        setPlaces(response.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchPlaces();
  }, [location.search, query]);  
  

  useEffect(() => {
    if (encodedPlaceAddress && isInitialSelection) {
      const fetchSelectedPlace = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/places/search/address/${encodedPlaceAddress}`);
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
            <h1 className='readexpro white rp1 mrp1'>SEARCH FOR A PLACE &#x1F50D;</h1>
            <br />
              <input
                className='h-b5 readexpro search'
                type='text'
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button type='button' className='h-b5 readexpro search' onClick={handleQuerySearch}>Search</button>
            <h2 className='readexpro white mrp1'>You can also find places with the map</h2>
            <button onClick={handleShowMap} className='only-on-mobile h-b5 readexpro mr1 r1'>{showMap ? 'Show Map' : 'Hide Map'}</button>
          </div>
          <div>
            <br />
            <br />
            <h1 className='readexpro white rp1 mrp1'>SORT BY</h1>
            <br />
            <div className='filter-top-row'>
              <button onClick={() => fetchByFilter('toprated')} className='h-b5 readexpro r1 mr1 mr'>Top Rated</button>
              <button  onClick={() => fetchByFilter('mostreviewed')} className='h-b5 readexpro mr1 r1'>Most Reviewed</button>
            </div>
            <div>
              <button  onClick={() => fetchByFilter('lowestrated')} className='h-b5 readexpro r1 mr1 mr'>Lowest Rated</button>
              <button  onClick={() => fetchByFilter('recentlyadded')} className='h-b5 readexpro mr1 r1'>Recently Added</button>
            </div>
          </div>
          <div>
            <h2 className='readexpro white rp1 mrp1'>CHOOSE A NEW PLACE TO REVIEW HERE</h2>
            <br />
            <button onClick={openModal} className='h-b5 readexpro mr1 r1'>REVIEW A NEW PLACE &#10133;</button>
            <Modal
              isOpen={modalIsOpen}
              style={customStyles}
            >
              <div className='modal-form'>
                <h1 className='readexpro rp2 red'>Choose A New Place To Review</h1>
                <br />
                <br />
                <div>
                  <SearchBar onPlaceSelect={handlePlaceSelect} />
                </div>
                <br />
                <h1 className='readexpro bold mrp1'>{newPlace.name}</h1>
                <h2 className='readexpro italic mrp1'>{newPlace.address}</h2>
                <h2 className='readexpro red mrp1'>{result}</h2>
                {result === "There are already reviews for this place!" ? (
                  <button className='h-b3 readexpro form-font' onClick={handleExistingPlaceClick}>Go to {newPlace.name} page</button>
                ) : result === "There are no reviews for this place yet! Be the first!" ? (
                  <button onClick={createPlace} className='h-b3 readexpro form-font'>Add The First Review!</button>
                ) : null}
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
        <div className='places-display'>
        <Map mapViewClick={selectedPlace} showMap={showMap} mapPlaces={places} />
        <div className='place-list'>
          <h1 className='rp2 bold filter'>{filter}</h1>
          {places.length === 0 && filter !== "No Results!" ? (
            <div className='loading-container'>
              <br />
              <br />
              <h2 className='red places-loading italic'>LOADING</h2>
              <img src={LoadingCircle} alt="Loading" className='loading-circle'/>
            </div>
          ) : (
            <>
              {places.map((place) => (
                <div className="place-entry" key={place._id}>
                  <div className='entry-format'>
                    <div className='place-info'>
                      <h1 className="red readexpro name" onClick={() => handlePlaceClick(place._id)}>{place.name}</h1>
                      <br />
                      <div className="place-rating">
                        <StarRatings
                          rating={place.rating} 
                          starRatedColor="red"
                          starEmptyColor="lightgray"
                          starDimension="30px"
                          starSpacing="2px" 
                        />
                        <h2 className='readexpro num-ratings white'>({place.numRatings})</h2>
                      </div>
                      <h2 className='readexpro italic white address'>{place.address}</h2>
                      {place.website && (
                        <a className='readexpro place-link web-view' href={place.website} target='_blank' rel="noreferrer">
                          Website
                        </a>
                      )}
                      <button className="readexpro h-b6 blue" style={{fontSize: "25px"}} onClick={() => handleMapViewClick(place)}>|&nbsp;&nbsp;Map View</button>
                    </div>
                    <div className='place-image'>
                      <img className='img' src={place.img} alt='place-pic' />
                    </div>
                    <br />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
