import '../../styles/homepage/home-featured.css';
import glasses_ghost from '../../images/glasses_ghost.png';
import { Link } from 'react-router-dom';

export const HomeFeatured = () => {
  return (
    <div className='home-featured flex'>
      <div>
        <h1 className='readexpro rp2 red'>REVIEWS</h1>
        <h1 className='readexpro rp2 white'>FOR ALL THINGS SPOOKY</h1>
      </div>
      <br />
      <div>
        <img src={glasses_ghost} alt="Placeholder 1" className='fade-in sample-review'/>
        <img src={glasses_ghost} alt="Placeholder 2" className='fade-in sample-review'/>
        <img src={glasses_ghost} alt="Placeholder 3" className='fade-in sample-review'/>
      </div>
      <Link to="/places">
        <button className='h-b rammettoone r1'>MORE REVIEWS</button>
      </Link>
      <br />
      <br />
    </div>
  );
}
