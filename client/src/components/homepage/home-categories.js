import '../../styles/homepage/home-categories.css';
import { Link } from 'react-router-dom';

export const HomeCategories = () => {
  return (
    <div className="home-categories flex">
      <div className="test">
        <button className='h-b2 h-b2a bangers b2'>PARANORMAL &#x1F47B;</button>
        <button className='h-b2 h-b2b bangers b2'>ALIENS &#x1F47D;</button>
        <button className='h-b2 h-b2c bangers b2'>CRYPTIDS &#x1F479;</button>
        <button className='h-b2 h-b2d bangers b2'>UNEXPLAINED &#x2754;</button>
      </div>
      <div>
        <h1 className='readexpro rp2 white'>PICK FROM</h1>
        <h1 className='readexpro rp2 white'>DIFFERENT</h1>
        <h1 className='readexpro rp2 red'>CATEGORIES</h1>
        <br />
        <Link to="/about">
          <button className='h-b rammettoone r1'>WHAT ARE THESE ?</button>
        </Link>
      </div>
    </div>
  );
}
