import React, { useState } from 'react';
import '../../styles/homepage/home-featured.css';
import glasses_ghost from '../../images/glasses_ghost.png';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

export const HomeFeatured = () => {
  const [fadeUp, setFadeUp] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  return (
    <div className='home-featured flex'>
      <br />
      <br />
      <br />
      <div className='hf-title'>
        <h1 className='readexpro rp2 red mr'>REVIEWS</h1>
        <h1 className='readexpro rp2 white'>FOR ALL THINGS SPOOKY</h1>
      </div>
      <br />
      <Waypoint onEnter={() => setFadeUp(true)}>
        <div className="slideshow-container">
          <img src={glasses_ghost} alt="Placeholder 1" className={`sample-review ${fadeUp ? 'fade-up' : ''} ${currentSlide === 0 ? 'active' : ''}`} />
          <img src={glasses_ghost} alt="Placeholder 2" className={`sample-review ${fadeUp ? 'fade-up' : ''} ${currentSlide === 1 ? 'active' : ''}`} />
          <img src={glasses_ghost} alt="Placeholder 3" className={`sample-review ${fadeUp ? 'fade-up' : ''} ${currentSlide === 2 ? 'active' : ''}`} />
          <div className="arrow-container">
            <button className="arrow left" onClick={handlePrevSlide}>
              &lt;
            </button>
            <button className="arrow right" onClick={handleNextSlide}>
              &gt;
            </button>
          </div>
        </div>
      </Waypoint>
      <Link to="/places">
        <button className='h-b rammettoone r1'>MORE REVIEWS</button>
      </Link>
      <br />
      <br />
    </div>
  );
};
