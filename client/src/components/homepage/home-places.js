import '../../styles/homepage/home-places.css';
import glasses_ghost from '../../images/glasses_ghost.png';
import ghosts from '../../images/ghosts.png'
import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

export const HomePlaces = () => {
  const [fadeLeft, setFadeLeft] = useState(false);
  const [fadeLeftFull, setFadeLeftFull] = useState(false);
  const [fadeDown, setFadeDown] = useState(false);

  return (
    <div className='home-places flex'>
      <img src={ghosts} alt="Placeholder 1" className={`moving-ghost ${fadeLeftFull ? 'fade-left-full' : ''}`}/>
      <div className={`left-side ls2 ${fadeDown ? 'fade-down' : ''}`}>
        <h1 className='readexpro rp2 white'>FIND</h1>
        <h1 className='readexpro rp2 white'>NEW</h1>
        <h1 className='readexpro rp2 red'>PLACES</h1>
        <br />
{/*         <Link to="/places">
          <button className='h-b rammettoone r1'>GO!</button>
        </Link> */}
      </div>
      <Waypoint onEnter={() => { setFadeLeft(true); setFadeLeftFull(true); setFadeDown(true); }}>
         <div className='home-places-right'>
          <img src={glasses_ghost} alt="Placeholder 1" className={`sample-place ${fadeLeft ? 'fade-left1' : ''}`}  />
          <img src={glasses_ghost} alt="Placeholder 2" className={`sample-place ${fadeLeft ? 'fade-left2' : ''}`}  />
          <img src={glasses_ghost} alt="Placeholder 3" className={`sample-place ${fadeLeft ? 'fade-left3' : ''}`}  />
         </div>
      </Waypoint>
    </div>
  );
}
