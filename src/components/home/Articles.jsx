import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Articles.css';

const Articles = () => {
  const { t } = useLanguage();
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAnimated) {
      // Animate cards one by one
      const cardTimers = [];
      for (let i = 0; i < 6; i++) {
        const timer = setTimeout(() => {
          setAnimatedCards(prev => [...prev, i]);
        }, 150 * (i + 1));
        cardTimers.push(timer);
      }

      return () => {
        cardTimers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isAnimated]);

  const serviceItems = [
    {
      id: 1,
      count: "01",
      icon: "flaticon-vitamins-1",
      title: t('service.item1.title'),
      description: t('service.item1.description'),
      link: "/contact"
    },
    {
      id: 2,
      count: "02",
      icon: "flaticon-supplement",
      title: t('service.item2.title'),
      description: t('service.item2.description'),
      link: "/contact"
    },
    {
      id: 3,
      count: "03",
      icon: "flaticon-vitamins",
      title: t('service.item3.title'),
      description: t('service.item3.description'),
      link: "/contact"
    },
    {
      id: 4,
      count: "04",
      icon: "flaticon-protein-2",
      title: t('service.item4.title'),
      description: t('service.item4.description'),
      link: "/contact"
    },
    {
      id: 5,
      count: "05",
      icon: "flaticon-tape-measure",
      title: t('service.item5.title'),
      description: t('service.item5.description'),
      link: "/contact"
    },
    {
      id: 6,
      count: "06",
      icon: "flaticon-abs-1",
      title: t('service.item6.title'),
      description: t('service.item6.description'),
      link: "/contact"
    }
  ];

  return (
    <section id="feature" className="tg-service-area">
      <div className="container">
        <div className="tg-service-inner">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className=" text-center mb-60">
                <span className={`sub-title articles-subtitle ${isAnimated ? 'animate-on-load' : ''}`}>
                  {t('articles.secondTitle')}
                </span>
                <h2 className="title articles-title">{t('articles.title')}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center articles-container">
            {serviceItems.map((item, index) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className={`tg-service-item article-card ${animatedCards.includes(index) ? 'animate-card' : ''}`}>
                  <div className="tg-services-count">{item.count}</div>
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <h2 className="title">
                    <a href={item.link}>{item.title}</a>
                  </h2>
                  <div className="tg-service-content">
                    <p>{item.description}</p>
                    <a href={item.link}>
                      <i className="fas fa-arrow-circle-right"></i>{t('service.readMore')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;