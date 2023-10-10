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
                    <ul>
                        <div className='footer-link'>Questions? Email us at spookydooky35@gmail.com</div>
                    </ul>
            </div>
        </div>
        <div className="footer-line">&copy; 2023 Spooky Dooky. All rights reserved.</div>
        </div>
    )
};