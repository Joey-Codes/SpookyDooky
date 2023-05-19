import '../../styles/homepage/home-community.css'
import glasses_ghost from '../../images/glasses_ghost.png'
import React from "react";

export const HomeCommunity = () => {
  return (
    <div className="home-community">
        <h1 className='readexpro rp2'>JOIN OUR COMMUNITY</h1>
        <br />
        <br />
      <div className='flex'>
        <div className='community-section'>
          <img src={glasses_ghost} alt="p1" className="community-example"/>
          <h2 className='carterone ct1 red'>PARANORMAL INVESTIGATORS</h2>
          <p className='readexpro rp1'>CREATE AN ACCOUNT FOR YOUR ORGANIZATION AND CONNECT WITH OTHER GROUPS</p>
        </div>
        <div className='community-section'>
          <img  src={glasses_ghost} alt="p2" className="community-example"/>
          <h2 className='carterone ct1 red'>FIND NEW PLACES TO VISIT</h2>
          <p className='readexpro rp1'>USE REVIEW LIKES AND SORTING TO FIND PLACES NEAR YOU</p>
        </div>
      </div>
    </div>
  );
}
