import React, { useState} from 'react';
import { Waypoint } from 'react-waypoint';
import { Slide } from 'react-slideshow-image';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import 'react-slideshow-image/dist/styles.css';
import '../../styles/homepage/home-featured.css';

const slideImagesPC = [
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1693619567/sample-review_m6mubp.png'
  },
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1693619567/sample-review_m6mubp.png'
  },
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1693619567/sample-review_m6mubp.png'
  }
];

const slideImagesMobile = [
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1695689034/sample-review2_mbjpx0.png'
  },
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1695689034/sample-review2_mbjpx0.png'
  },
  {
    url: 'https://res.cloudinary.com/duj0zlvda/image/upload/v1695689034/sample-review2_mbjpx0.png'
  }
];

export const HomeFeatured = () => {
  const [fadeUp, setFadeUp] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const currentSlideImages = isMobile ? slideImagesMobile : slideImagesPC;


  return (
    <div className="home-featured">
      <div className="hf-title flex">
        <h1 className="readexpro rp2 red">REVIEWS</h1>
        <h1 className="readexpro rp2 white">FOR ALL THINGS SPOOKY</h1>
      </div>
      <Slide autoplay={true} duration={3000}>
        {currentSlideImages.map((slideImage, index) => (
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
