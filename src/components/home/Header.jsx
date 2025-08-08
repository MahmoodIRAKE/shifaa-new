import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { isRTL, changeLanguage } = useLanguage();
  const location = useLocation();

  // Cart items count
  const cartItemsCount = 3;

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsSticky(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    changeLanguage(isRTL ? 'en' : 'he');
  };

  const navigationItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '#features' },
    { name: 'Product', path: '#paroller' },
    { name: 'Ingredient', path: '#ingredient' },
    { name: 'Pricing', path: '#pricing' },
    { name: 'Shop', path: '/shop' },
    { name: 'News', path: '#news' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className={`desktop-header ${isSticky ? 'sticky' : ''}`}>
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <div className="header-logo">
              <Link to="/">
                <img src="/src/assets/img/logo/logo.png" alt="Shifaa Logo" />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="header-navigation">
              <ul className="nav-list">
                {navigationItems.map((item) => (
                  <li key={item.name} className={location.pathname === item.path ? 'active' : ''}>
                    <Link to={item.path} className="nav-link">
                      <span className="nav-text">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Language Toggle */}
              <button className="language-toggle" onClick={toggleLanguage}>
                <span className="language-icon">🌐</span>
                <span className="language-text">{isRTL ? 'EN' : 'عربي'}</span>
              </button>

              {/* Cart */}
              <Link to="/cart" className="cart-button">
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{cartItemsCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className={`mobile-header ${isSticky ? 'sticky' : ''}`}>
        <div className="mobile-header-container">
          {/* Logo */}
          <div className="mobile-logo">
            <Link to="/">
              <img src="/src/assets/img/logo/logo.png" alt="Shifaa Logo" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            {/* Language Toggle */}
            <button className="mobile-language-toggle" onClick={toggleLanguage}>
              <span className="language-icon">🌐</span>
            </button>

            {/* Cart */}
            <Link to="/cart" className="mobile-cart-button">
              <span className="cart-icon">🛒</span>
              <span className="cart-count">{cartItemsCount}</span>
            </Link>

            {/* Hamburger Menu */}
            <button 
              className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-overlay" onClick={closeMobileMenu}></div>
        <div className="drawer-content">
          <div className="drawer-header">
            <h3 className="drawer-title">Menu</h3>
            <button className="drawer-close" onClick={closeMobileMenu}>
              <span className="close-icon">×</span>
            </button>
          </div>
          
          <nav className="drawer-navigation">
            <ul className="drawer-nav-list">
              {navigationItems.map((item) => (
                <li key={item.name} className={location.pathname === item.path ? 'active' : ''}>
                  <Link to={item.path} className="drawer-nav-link" onClick={closeMobileMenu}>
                    <span className="drawer-nav-text">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="drawer-footer">
            <div className="drawer-social">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
