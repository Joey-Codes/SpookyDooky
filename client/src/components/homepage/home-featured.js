import '../../styles/homepage/home-featured.css';
import glasses_ghost from '../../images/glasses_ghost.png';
import { Link } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { useState } from 'react';

export const HomeFeatured = () => {
  const [fadeUp, setFadeUp] = useState(false);

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
        <div>
          <img src={glasses_ghost} alt="Placeholder 1" className={`sample-review ${fadeUp ? 'fade-up' : ''}`} />
          <img src={glasses_ghost} alt="Placeholder 2" className={`sample-review ${fadeUp ? 'fade-up' : ''}`} />
          <img src={glasses_ghost} alt="Placeholder 3" className={`sample-review ${fadeUp ? 'fade-up' : ''}`} />
        </div>
      </Waypoint>
      <Link to="/places">
        <button className='h-b rammettoone r1'>MORE REVIEWS</button>
      </Link>
      <br />
      <br />
    </div>
  );
}
