import '../../styles/homepage/home-intro.css'

import React from 'react';

export const HomeIntro = () => {
  return (
    <div className='home-intro'>
      <div className='left-side'>
        <h1 className='chango white'>SPOOKY</h1>
        <h1 className='chango red'> DOOKY</h1>
        <h2 className='rammettoone white'>find and review spooky places</h2>
        <br />
        <button className='h-b rammettoone'>SIGN UP</button>
        <br />
        <br />
      </div>
      <div className='right-side'>
        <img src="" alt="Placeholder 1" />
        <img src="" alt="Placeholder 2" />
        <img src="" alt="Placeholder 3" />
      </div>
    </div>
  );
}
