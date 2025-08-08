import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './AboutUs.css';

const AboutUs = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedParagraphs, setAnimatedParagraphs] = useState([]);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate paragraphs one by one
      const paragraphTimers = [];
      for (let i = 0; i < 9; i++) {
        const timer = setTimeout(() => {
          setAnimatedParagraphs(prev => [...prev, i]);
        }, 200 * (i + 1));
        paragraphTimers.push(timer);
      }

      return () => {
        paragraphTimers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isVisible]);

  return (
    <>
      <section className={`tg-video-area tg-video-bg jarallax parallax-img ${isVisible ? 'animate-section' : ''}`}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-xl-5 col-lg-8 tg-about-us">
              <div className={`tg-video-content ${isVisible ? 'animate-content' : ''}`} data-wow-delay=".2s">
                <div className={`tg-section-title white mb-30 ${isVisible ? 'animate-title' : ''}`}>
                  <h2 className="title white-text">{t('about.sectionTitle')}</h2>
                </div>
                <div className="about-content">
                  <p className={`about-paragraph ${animatedParagraphs.includes(0) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.0')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(1) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.1')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(2) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.2')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(3) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.3')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(4) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.4')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(5) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.5')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(6) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.6')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(7) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.7')}
                  </p>
                  <p className={`about-paragraph ${animatedParagraphs.includes(8) ? 'animate-paragraph' : ''}`}>
                    {t('about.paragraphs.8')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;