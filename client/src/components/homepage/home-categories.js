import { useState } from 'react';
import '../../styles/homepage/home-categories.css';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';

export const HomeCategories = () => {
  const [fadeRight, setFadeRight] = useState(false);
  const [fadeRight2, setFadeRight2] = useState(false);
  const [fadeRight3, setFadeRight3] = useState(false);
  const [fadeRight4, setFadeRight4] = useState(false);

  return (
    <div className="home-categories flex">
        <div className="test">
          <Waypoint onEnter={() => setFadeRight(true)}>
            <button className={`h-b2 h-b2a hc bangers b2 ${fadeRight ? 'fade-right' : ''}`}>GHOSTS &#x1F47B;</button>
          </Waypoint>
          <Waypoint onEnter={() => setFadeRight2(true)}>
            <button className={`h-b2 h-b2b hc bangers b2 ${fadeRight2 ? 'fade-right' : ''}`}>ALIENS &#x1F47D;</button>
          </Waypoint>
          <Waypoint onEnter={() => setFadeRight3(true)}>
            <button className={`h-b2 h-b2c hc bangers b2 ${fadeRight3 ? 'fade-right' : ''}`}>CRYPTIDS &#x1F479;</button>
          </Waypoint>
          <Waypoint onEnter={() => setFadeRight4(true)}>
            <button className={`h-b2 h-b2d hc bangers b2 ${fadeRight4 ? 'fade-right' : ''}`}>UNEXPLAINED &#x2754;</button>
          </Waypoint>
        </div>
      <div>
        <h1 className='readexpro rp2 white'>PICK FROM</h1>
        <h1 className='readexpro rp2 white'>DIFFERENT</h1>
        <h1 className='readexpro rp2 red'>CATEGORIES</h1>
        <br />
        <Link to="/about">
          <button className='h-b rammettoone r1'>WHAT ARE THESE ?</button>
        </Link>
      </div>
    </div>
  );
}
