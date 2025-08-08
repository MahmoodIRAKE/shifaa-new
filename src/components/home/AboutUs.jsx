import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AboutUs = () => {
  const { t } = useLanguage();






  return (
    <>
      <section className="tg-video-area tg-video-bg jarallax parallax-img">
        <div className="container">
          <div className="row align-items-center justify-content-center">
      

            <div className="col-xl-5 col-lg-8 tg-about-us">
              <div className="tg-video-content wow fadeInRight" data-wow-delay=".2s">
                <div className="tg-section-title white mb-30">
                  <span className="sub-title">promotional</span>
                  <h2 className="title white-text">How to Work Suxnix vitamin capsule</h2>
                </div>
                <p className="info-one">
                  Vitamin Ipsum is simply dummy text of the printing and tysetting industry. 
                  Lorem ipsum has been the industry's standard dummy text ever since the when an unknown.
                </p>
                <p className="info-two">
                  printing and tysetting industry. Lorem ipsum has been thindustry's standard 
                  dummy text ever since the when an unknown.
                </p>
                <a href="/shop" className="tg-btn">VIEW more</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {/* {isVideoOpen && (
        <div className="video-modal-overlay" onClick={closeVideo}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideo}>
              <i className="fas fa-times"></i>
            </button>
            <iframe
              src="https://www.youtube.com/embed/2ZjdBY8aOrA?autoplay=1"
              title="How to Work Suxnix vitamin capsule"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )} */}
    </>
  );
};

export default AboutUs;