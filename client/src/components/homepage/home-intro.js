import '../../styles/homepage/home-intro.css'
import ghost from '../../images/ghosts.png';
import glasses_ghost from '../../images/glasses_ghost.png'
import weightlifting_ghost from '../../images/weightlifting_ghost.png'

import React from 'react';

export const HomeIntro = () => {
  return (
    <div className='home-intro flex'>
      <div className='left-side'>
        <h1 className='chango c1 white'>SPOOKY</h1>
        <h1 className='chango c1 red'> DOOKY</h1>
        <h2 className='readexpro rp1 white'>FIND AND RATE SPOOKY PLACES</h2>
        <br />
        <button className='h-b rammettoone r1'>SIGN UP</button>
        <br />
        <br />
      </div>
      <div className='right-side'>
        <img src={ghost} alt="ghost" className="side-img"/>
        <img src={weightlifting_ghost} alt="weighliting ghost" className="mid-img"  />
        <img src={glasses_ghost} alt="cool glasses ghost" className="side-img"/>
      </div>
    </div>
  );
}
