import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import Header from '../components/home/Header.jsx';
import Section1 from '../components/home/Section1.jsx';
import BrandAera from '../components/home/BrandAera.jsx';
import AboutUs from '../components/home/AboutUs.jsx';
import FirstEntery from '../components/home/FirstEntery.jsx';
import Articles from '../components/home/Articles.jsx';
import Faq from '../components/home/Faq.jsx';
import Footer from '../components/Footer/Footer.jsx';

const Home = () => {
  const { t } = useLanguage();
  const [activeAccordion, setActiveAccordion] = useState('collapseOne');

  const handleAccordionToggle = (target) => {
    setActiveAccordion(activeAccordion === target ? '' : target);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <div className="main-area fix">
      {/* Pre-loader */}
      {/* <div id="preloader">
        <div className="tg-cube-grid">
          <div className="tg-cube tg-cube1"></div>
          <div className="tg-cube tg-cube2"></div>
          <div className="tg-cube tg-cube3"></div>
          <div className="tg-cube tg-cube4"></div>
          <div className="tg-cube tg-cube5"></div>
          <div className="tg-cube tg-cube6"></div>
          <div className="tg-cube tg-cube7"></div>
          <div className="tg-cube tg-cube8"></div>
          <div className="tg-cube tg-cube9"></div>
        </div>
      </div> */}

      {/* Scroll-top */}
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>

      <Header />
      {/* Banner Area */}
      <Section1 />

      {/* Brand Area */}
      <BrandAera />
      <FirstEntery />
      <AboutUs />
      <Articles />
      <Faq />
      <Footer />
     

    
    </div>
  );
};

export default Home;
