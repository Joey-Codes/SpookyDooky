import '../styles/footer.css'

export const Footer = () => {
    return (    
        <div className="footer">
            <div className="footer-container">
                <div className="footer-column">
                <h2>INFO</h2>
                <ul>
                    <li>About Spooky Dooky</li>
                </ul>
            </div>
            <div className="footer-column">
                <h2>FEATURES</h2>
                <ul>
                    <li>Organizations (Coming Soon)</li>
                </ul>
            </div>
        </div>
        <div className="footer-line">Ghost Vector Images used from https://www.vecteezy.com</div>
        <div className="footer-line">&copy; 2023 Spooky Dooky. All rights reserved.</div>
        </div>
    )
};