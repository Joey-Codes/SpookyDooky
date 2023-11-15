import '../../styles/homepage/home-intro.css'
import ghost from '../../images/ghosts.png';
import glasses_ghost from '../../images/glasses_ghost.png'
import weightlifting_ghost from '../../images/weightlifting_ghost.png'
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '70vh', 
    overflow: 'auto', 
  },
};

export const HomeIntro = () => {
  const [promotionalModal, setPromotionModal] = useState(false);

  const closeModal = () => {
    setPromotionModal(false);
  };

  return (
    <div className='home-intro flex'>
      <div className='left-side'>
        <h1 className='chango c1 white'>SPOOKY</h1>
        <h1 className='chango c1 red'> DOOKY</h1>
        <h2 className='readexpro rp1 white'>FIND AND RATE SPOOKY PLACES</h2>
        <br />
        <Link to="/places">
          <button className='h-b rammettoone r1'>LET'S GO!</button>
        </Link>
      </div>
      <div className='right-side'>
        <img src={ghost} alt="ghost" className="side-img"/>
        <img src={weightlifting_ghost} alt="weighliting ghost" className="mid-img"  />
        <img src={glasses_ghost} alt="cool glasses ghost" className="side-img"/>
      </div>
      <Modal
        isOpen={promotionalModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <h1 className='readexpro red'>Share Your Story For A Chance To Win $20!</h1>
          <h3 className='readexpro'>Now until 11/31, share your experience with us for a chance to win. 
                                    TWO winners will be randomly selected! How to Enter: </h3>
          <br />
          <h1 className='readexpro red'>STEP 1</h1>
          <h3 className='readexpro'>Create A Free Account via Google Sign-In. This is so you can be notified by email if you win.</h3>
          <h1 className='readexpro red'>STEP 2</h1>
          <h3 className='readexpro'>Write A Review Sharing Your Paranormal Experience.</h3>
          <br />
          <h2 className='readexpro'>That's all, after 11/31 the winners of the contest will be randomly chosen!</h2>
          <h3 className='readexpro'>For questions, please email us at spookydooky35@gmail.com</h3>

          <button className="h-b3 readexpro" style={{margin: "0 25% 0 25%", fontSize: "30px"}} onClick={closeModal}>CLOSE</button>
        </div>
      </Modal>
    </div>
  );
}
