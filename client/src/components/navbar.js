import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/navbar.css';
import axios from 'axios';

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [jwtToken, setJwtToken] = useState(Cookies.get('jwtToken') || '');
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    try {
      await axios.get('http://localhost:3001/auth/logout', { withCredentials: true });
      Cookies.remove('jwtToken');
      setJwtToken('');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      Cookies.set('jwtToken', token);
      setJwtToken(token);

      axios.get('http://localhost:3001/auth/verifytoken', { withCredentials: true })
        .then(response => {
          const { userId } = response.data;
          localStorage.setItem('userID', userId);
          setLoading(false);
        })
        .catch (error => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setJwtToken('');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/places') {
      setActiveTab('places');
    } else if (location.pathname === '/about') {
      setActiveTab('about');
    }
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="navbar carterone">
      <div className="left-links chango">OO</div>
      <div className="main-links">
        <Link
          to="/"
          className={activeTab === 'home' ? 'active' : ''}
          onClick={() => handleTabClick('home')}
        >
          HOME
        </Link>
        <Link
          to="/places"
          className={activeTab === 'places' ? 'active' : ''}
          onClick={() => handleTabClick('places')}
        >
          PLACES
        </Link>
        <Link
          to="/about"
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => handleTabClick('about')}
        >
          ABOUT
        </Link>
        {jwtToken ? (
          <Link
            to="/profile"
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => handleTabClick('profile')}
          >
            PROFILE
          </Link>
        ) : null}
      </div>
      <div className="right-links">
        {!jwtToken ? (
          <Link
            to="/auth"
            className={`login ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabClick('login')}
          >
            LOG IN
          </Link>
        ) : (
          <Link
            onClick={logout}
            className={`login ${activeTab === 'logout' ? 'active' : ''}`}
          >
            LOG OUT
          </Link>
        )}
      </div>
    </div>
  );
};
