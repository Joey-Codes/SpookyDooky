import React, { useState} from 'react';
import { Waypoint } from 'react-waypoint';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import sample_review from '../../images/sample-review.png';
import '../../styles/homepage/home-featured.css';

const slideImages = [
  {
    url: sample_review
  },
  {
    url: sample_review
  },
  {
    url: sample_review
  }
];

export const HomeFeatured = () => {
  const [fadeUp, setFadeUp] = useState(false);

  return (
    <div className="home-featured">
      <div className="hf-title flex">
        <h1 className="readexpro rp2 red mr">REVIEWS</h1>
        <h1 className="readexpro rp2 white">FOR ALL THINGS SPOOKY</h1>
      </div>
      <br />
      <br />
      <Slide autoplay={true} duration={3000}>
        {slideImages.map((slideImage, index) => (
           <Waypoint onEnter={() => setFadeUp(true)}>
          <div key={index} className={`each-slide-effect ${fadeUp ? 'fade-up' : ''}`}>
            <img src={slideImage.url} alt="sample review" className='slide-image' />
          </div>
          </Waypoint>
        ))}
      </Slide>
      <Link to="/places">
        <button className="h-b rammettoone r1 more-reviews">MORE REVIEWS</button>
      </Link>
    </div>
  );
};
