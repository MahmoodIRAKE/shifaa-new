import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import '../assets/css/style.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img 
            src="/logo192.png" 
            alt="Shifaa Logo" 
            width="30" 
            height="30" 
            className="d-inline-block align-top me-2"
          />
          שיפאא
        </Link>

        {/* Mobile menu button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className={`navbar-nav ${isRTL ? 'me-auto' : 'ms-auto'}`}>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
                {t('nav.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={() => setIsMenuOpen(false)}>
                {t('nav.products')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>
                {t('nav.about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" onClick={() => setIsMenuOpen(false)}>
                {t('nav.cart')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
