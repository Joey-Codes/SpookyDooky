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
                    </ul>
                </div>
                <br />
                <div className="footer-column">
                    <h1 className='red italic'>CONTACT</h1>
                    <br />
                    <ul>
                        <div className='footer-link'>Questions? Email us at spookydooky35@gmail.com</div>
                    </ul>
            </div>
        </div>
        <br />
        <div className="footer-line">&copy; 2023 Spooky Dooky. All rights reserved.</div>
        <div className='policies'>
            <Link to='/attribution'>
                <div className="privacy blue">Attribution</div>
            </Link>
            <Link to='/contentpolicy'>
                <div className="privacy blue">Content Policy</div>
            </Link>
            <Link to='/privacypolicy'>
                <div className="privacy blue">Privacy Policy</div>
            </Link>
        </div>
        </div>
    )
};