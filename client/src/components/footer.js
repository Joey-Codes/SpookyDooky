import '../styles/footer.css'

export const Footer = () => {
    return (    
        <div className="footer">
            <div className="footer-container">
                <div className="footer-column">
                <h2>ABOUT</h2>
                <ul>
                    <li>Our Story</li>
                </ul>
            </div>
            <div className="footer-column">
                <h2>INFO</h2>
                <ul>
                    <li>Organizations</li>
                </ul>
            </div>
        </div>
        <div className="footer-line">&copy; 2023 Spooky Dooky. All rights reserved.</div>
        </div>
    )
};