import '../../styles/homepage/home-places.css';
import ghosts from '../../images/ghosts.png'
import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { Link } from 'react-router-dom';

export const HomePlaces = () => {
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeLeftFull, setFadeLeftFull] = useState(false);
  const [fadeDown, setFadeDown] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  return (
    <div className='home-places flex'>
      <img src={ghosts} alt="Placeholder 1" className={`moving-ghost ${fadeLeftFull ? 'fade-left-full' : ''}`}/>
      <Waypoint onEnter={() => { setFadeIn(true) }}>
        <div className={`left-side ls2 ${fadeDown ? 'fade-down' : ''} ${fadeIn ? 'fade-in' : ''}`}>
          <h1 className='readexpro rp2 white'>DISCOVER</h1>
          <h1 className='readexpro rp2 white'>NEW</h1>
          <h1 className='readexpro rp2 red'>PLACES</h1>
          <br />
        </div>
      </Waypoint>
      <Waypoint onEnter={() => { setFadeLeft(true); setFadeLeftFull(true); setFadeDown(true); }}>
        <div className='home-places-right'>
          <Link to="/places/64e4260ca679aebfbba1026e">
            <img
              src='https://res.cloudinary.com/duj0zlvda/image/upload/v1692673544/Places_Thumbnails/byqqxz5dhejd4n1qrnsb.jpg'
              alt="Placeholder 1"
              className={`sample-place ${fadeLeft ? 'fade-left1' : ''} ${fadeIn ? 'fade-in' : ''}`}
            />
          </Link>
          <Link to="/places/64f13b6ee01afb496190c1c0">
            <img
              src='https://res.cloudinary.com/duj0zlvda/image/upload/v1693530991/Places_Thumbnails/wyfardcxrxlwmjx9ylre.jpg'
              alt="Placeholder 2"
              className={`sample-place ${fadeLeft ? 'fade-left2' : ''} ${fadeIn ? 'fade-in' : ''}`}
            />
          </Link>
          <Link to="/places/64f1369399e9b437be22afce">
            <img
              src='https://res.cloudinary.com/duj0zlvda/image/upload/v1693529746/Places_Thumbnails/xk9yyqpufmfx9uwwmtag.jpg'
              alt="Placeholder 3"
              className={`sample-place ${fadeLeft ? 'fade-left3' : ''} ${fadeIn ? 'fade-in' : ''}`}
            />
          </Link>
        </div>
      </Waypoint>
    </div>
  );
}
