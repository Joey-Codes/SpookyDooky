import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/navbar.css';
 
export const Navbar = () => {
    const [activeTab, setActiveTab] = useState('');

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };
    return (
        <div className='navbar carterone'>
        <div className="left-links chango">OO</div>
        <div className="main-links">
          <Link to="/" className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>HOME</Link>
          <Link to="/places" className={activeTab === 'places' ? 'active' : ''} onClick={() => handleTabClick('places')}>PLACES</Link>
          <Link to="/about" className={activeTab === 'about' ? 'active' : ''} onClick={() => handleTabClick('about')}>ABOUT</Link>
        </div>
        <div className="right-links">
          {!cookies.access_token ? (
            <Link to="/auth" className={`login ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}>LOG IN</Link>
      ) : (
            <>
              <Link to="/saved-recipes">Saved Recipes</Link>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </div>
    );
};