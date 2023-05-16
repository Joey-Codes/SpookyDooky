import '../../styles/homepage/home-places.css'
import glasses_ghost from '../../images/glasses_ghost.png'
import React from 'react';

export const HomePlaces = () => {
  return (
    <div className='home-places flex'>
      <div className='left-side ls2'>
        <h1 className='readexpro rp2 white'>FIND</h1>
        <h1 className='readexpro rp2 white'>NEW</h1>
        <h1 className='readexpro rp2 red'>PLACES</h1>
        <br />
        <button className='h-b rammettoone r1'>GO!</button>
      </div>
      <div className='home-places-right'>
        <img src={glasses_ghost} alt="Placeholder 1" className='sample-place'/>
        <img src={glasses_ghost} alt="Placeholder 2" className='sample-place'/>
        <img src={glasses_ghost} alt="Placeholder 3" className='sample-place'/>
      </div>
    </div>
  );
}
