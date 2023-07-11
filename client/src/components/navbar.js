import { Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/navbar.css';
 
export const Navbar = () => {
    const [activeTab, setActiveTab] = useState("home");

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    useEffect(() => {
      if (location.pathname === '/places') {
        setActiveTab('places');
      } else if (location.pathname === '/about') {
        setActiveTab('about');
      }
    }, [location.pathname]);

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