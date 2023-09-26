import "../../styles/homepage/home-community.css";
import glasses_ghost from "../../images/glasses_ghost.png";
import { Waypoint } from "react-waypoint";
import { useState } from "react";

export const HomeCommunity = () => {
  const [leftPopIn, setLeftPopIn] = useState(false);

  return (
    <div className="home-community">
      <h1 className="readexpro rp2">JOIN OUR COMMUNITY</h1>
      <br />
      <br />
      <div className="flex">
        <Waypoint onEnter={() => setLeftPopIn(true)}>
          <div className={`community-section ${leftPopIn ? 'left-popin' : ''}`}>
            <img src={glasses_ghost} alt="p1" className="community-example" />
            <h2 className="carterone ct1 red">PARANORMAL INVESTIGATORS</h2>
            <p className="readexpro rp1 white">
              (COMING SOON) INVESTIGATORS CAN CREATE ACCOUNTS AND CONNECT WITH OTHER GROUPS
            </p>
          </div>
        </Waypoint>
          <div className={`community-section ${leftPopIn ? 'left-popin' : ''}`}>
            <img src={glasses_ghost} alt="p2" className="community-example" />
            <h2 className="carterone ct1 red">FIND NEW PLACES TO VISIT</h2>
            <p className="readexpro rp1 white">
              USE THE MAP AND VARIOUS FILTERS TO FIND LOCATIONS OF INTEREST NEAR YOU 
            </p>
          </div>
      </div>
    </div>
  );
};
