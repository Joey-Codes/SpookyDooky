import '../../styles/homepage/home-intro.css'
import ghost from '../../images/ghosts.png';
import glasses_ghost from '../../images/glasses_ghost.png'
import weightlifting_ghost from '../../images/weightlifting_ghost.png'

import React from 'react';

export const HomeIntro = () => {
  return (
    <div className='home-intro'>
      <div className='left-side'>
        <h1 className='chango white'>SPOOKY</h1>
        <h1 className='chango red'> DOOKY</h1>
        <h2 className='readexpro white'>FIND AND RATE SPOOKY PLACES</h2>
        <br />
        <button className='h-b rammettoone'>SIGN UP</button>
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
