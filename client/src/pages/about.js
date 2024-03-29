import '../styles/about.css';
import StarRatings from 'react-star-ratings';
import { useEffect } from 'react';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex about">
      <div>
        <br />
        <br />
        <div className='about-row'>
          <h1 className='italic mr about-title'>ABOUT</h1>
          <h1 className='red italic about-title'>SPOOKY DOOKY</h1>
        </div>
        <br />
        <br />
        <div className='introduction'>
          <h2 className='readexpro about-intro about-text'>
            Spooky Dooky allows anyone to rate spooky places and share their experiences with different types of phenomena. You can choose to review places anonymously or create an account to keep track of all your reviews. Also note that the site is intended for real experiences, and while we cannot verify the truthfulness of reviews, we ask that users not fabricate stories or images.
          </h2>
          <br />
          <div class="wave1">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
          </div>
        </div>
        <div className='locations'>
            <h1 className='readexpro rp2 italic white location-title about-title'>FINDING A LOCATION</h1>
            <h2 className='readexpro white about-text'>
              You can find a location to review in the 'Places' tab, where you can use the search bar to quickly find a place or use the filters to look for specific categories, such as locations by rating or geographic area.
              If you would like to add a new place to review, click on the 'Add' button and search for a location. If the location already has reviews, you will be redirected to its specific page.
            </h2>
            <br />
            <h2 className='readexpro white about-text'>
              When it comes to places with repeated names, such as franchises, please check to make sure you have selected the correct address. For example, if you want to add a review for a McDonalds location, include the address
              in the searchbar to ensure that you have selected the right location, as each McDonalds page will have the same title. 
            </h2>
            <br />
            <div class="wave2">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
    </svg>
    </div>
        </div>
      </div>
      <div className='reviews'>
        <div>
          <h1 className='readexpro rp2 white italic review-title about-title'>CREATING REVIEWS</h1>
          <h2 className='readexpro white about-text'>
            The first aspect of a review is its Spookiness Rating. This is a subjective measure, from 1 to 5 stars, of how scary you found the location to be, which contributes to its overall score.
          </h2>
          <StarRatings
            className="star-rating"
            rating={5} 
            starRatedColor="red" 
            starEmptyColor="lightgray" 
            starDimension="70px" 
            starSpacing="2px" 
          />
        </div>
        <br />
        <br />
        <br />
        <h2 className='readexpro white about-text'>
            The next part of a review is its category. All reviews are categorized by the type of phenomena they describe. The four categories - Ghosts, Aliens, Cryptids, and Unexplained - are explained below.
          </h2>
        <div className='about-text'>
          <br />
          <div className='about-row'>
            <button className='h-b2 h-b2a bangers b2 mr category-fit'>Ghosts &#x1F47B;</button>
            <h2 className='readexpro text white category-text'>
              This includes ghosts, spirits, poltergeists, and any other related entities. It also includes any type of phenomena usually associated with hauntings.
            </h2>
          </div>
          <br />
          <div className='about-row'>
            <button className='h-b2 h-b2b bangers b2 mr category-fit'>ALIENS &#x1F47D;</button>
            <h2 className='readexpro text white category-text'>
              This includes things like suspected alien encounters, alien abductions, UFO sightings or encounters, and any other related direct or indirect phenomena.
            </h2>
          </div>
          <br />
          <div className='about-row'>
            <button className='h-b2 h-b2c bangers b2 mr category-fit'>CRYPTIDS &#x1F479;</button>
            <h2 className='readexpro text white category-text'>
              This includes animals or creatures not yet officially confirmed to exist, often being the subject of legends and myths. Some notable examples include Bigfoot, the Yeti, Chupacabra, and Mothman.
            </h2>
          </div>
          <br />
          <div className='about-row'>
            <button className='h-b2 h-b2d bangers b2 mr category-fit'>UNEXPLAINED &#x2754;</button>
            <h2 className='readexpro text white category-text'>
              This category includes anything paranormal or unexplained that does not neatly fit into any of the categories listed above.
            </h2>
          </div>
          <br />
          <br />
          <br />
        </div>
        <h2 className='readexpro white about-text'>
            All reviews include a description of the experience, which can be as detailed as you like. Additionally, you can also add photos to the review if there is a specific phenomenon you believe you have captured.
          </h2>
      </div>
    </div>
  );
};
