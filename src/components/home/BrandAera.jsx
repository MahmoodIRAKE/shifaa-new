import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './BrandAera.css';

const BrandAera = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const brandLogos = [1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3,1, 2, 3];

  return (
    <div className="brand-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="brand-title text-center mb-50">
              <p className={`title ${isVisible ? 'animate-title' : ''}`}>
                {t('brand.title')}
              </p>
            </div>
          </div>
        </div>
        <div className={`brand-container ${isVisible ? 'animate-brands' : ''}`}>
          <div className="brand-track">
            {[...brandLogos, ...brandLogos].map((num, index) => (
              <div 
                key={index} 
                className="brand-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="brand-logo">
                  <img 
                    src={require(`../../assets/img/brand/${num}.png`)} 
                    alt="brand" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandAera;