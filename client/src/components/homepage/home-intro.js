import '../../styles/homepage/home-intro.css'

import React from 'react';

export const HomeIntro = () => {
  return (
    <div className='home-intro'>
      <div>
        <h1 className='samplefont white'>SPOOKY</h1>
        <h1 className='samplefont red'>DOOKY</h1>
        <h2 className='white'>find and review spooky places</h2>
        <button>Sign Up</button>
      </div>
      <div className='right-side'>
        <img src="" alt="Placeholder 1" />
        <img src="" alt="Placeholder 2" />
        <img src="" alt="Placeholder 3" />
      </div>
    </div>
  );
}
