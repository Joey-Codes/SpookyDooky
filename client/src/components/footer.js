import '../styles/footer.css';
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (    
        <div className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h1 className='red italic'>INFO</h1>
                    <ul>
                        <Link to='/about'>
                            <div className='footer-link'>About</div>
                        </Link>
                        <Link to='/about'>
                            <div className='footer-link'>Attribution</div>
                        </Link>
                    </ul>
                </div>
                <br />
                <div className="footer-column">
                    <h1 className='red italic'>FEATURES</h1>
                    <ul>
                        <Link to='/about'>
                            <div className='footer-link'>Organizations (Coming Soon)</div>
                        </Link>
                    </ul>
            </div>
        </div>
        <div className="footer-line">&copy; 2023 Spooky Dooky. All rights reserved.</div>
        </div>
    )
};