import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/navbar.css';

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const [jwtToken, setJwtToken] = useState(() => Cookies.get('jwtToken') || '');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      Cookies.set('jwtToken', token);
      setJwtToken(token);

      axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/verifytoken/${token}`)
        .then(response => {
          const { userId } = response.data;
          localStorage.setItem('userID', userId);
        })
        .catch (error => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/places') {
      setActiveTab('places');
    } else if (location.pathname === '/about') {
      setActiveTab('about');
    }
  }, [location.pathname]);

  const logout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, { withCredentials: true });
      Cookies.remove('jwtToken');
      localStorage.removeItem('userID');
      setJwtToken('');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="navbar carterone">
      <div className={`chango left-links ${mobileMenuOpen ? 'open' : ''}`}>OO</div>
      <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
      </div>
      <div className="main-links">
        <Link to="/" className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>HOME</Link>
        <Link to="/places" className={activeTab === 'places' ? 'active' : ''} onClick={() => handleTabClick('places')}>PLACES</Link>
        <Link to="/about" className={activeTab === 'about' ? 'active' : ''} onClick={() => handleTabClick('about')}>ABOUT</Link>
        {jwtToken ? (
          <Link to="/profile" className={activeTab === 'profile' ? 'active' : ''} onClick={() => handleTabClick('profile')}>PROFILE</Link>
        ) : null}
      </div>
      <div className="right-links">
        {!jwtToken ? (
          <Link to="/auth" className={`login ${activeTab === 'login' ? 'active' : ''}`} onClick={() => handleTabClick('login')}>LOG IN</Link>
        ) : (
          <Link onClick={logout} className={`login ${activeTab === 'logout' ? 'active' : ''}`}>LOG OUT</Link>
        )}
      </div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => { handleTabClick('home'); handleLinkClick(); }}>HOME</Link>
        <Link to="/places" onClick={() => { handleTabClick('places'); handleLinkClick(); }}>PLACES</Link>
        <Link to="/about" onClick={() => { handleTabClick('about'); handleLinkClick(); }}>ABOUT</Link>
        {jwtToken ? (
          <Link to="/profile" onClick={() => { handleTabClick('profile'); handleLinkClick(); }}>PROFILE</Link>
        ) : null}
        {!jwtToken ? (
          <Link to="/auth" onClick={() => { handleTabClick('login'); handleLinkClick(); }}>LOG IN</Link>
        ) : (
          <Link onClick={logout}>LOG OUT</Link>
        )}
      </div>
    </div>
  );
};
