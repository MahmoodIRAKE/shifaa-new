import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import ARTICLES from '../../constants/articles';
import ARTICLESHE from '../../constants/articlesHe';
import './Articles.css';

const Articles = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  // Get the correct articles array based on language
  const articlesData = language === 'he' ? ARTICLESHE : ARTICLES;

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
      for (let i = 0; i < articlesData.length; i++) {
        const timer = setTimeout(() => {
          setAnimatedCards(prev => [...prev, i]);
        }, 150 * (i + 1));
        cardTimers.push(timer);
      }

      return () => {
        cardTimers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [isAnimated, articlesData.length]);

  const handleReadMore = (articleId) => {
    navigate(`/article/${articleId}`);
  };

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
            {articlesData.map((article, index) => (
              <div key={article.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className={`tg-service-item article-card ${animatedCards.includes(index) ? 'animate-card' : ''}`}>
                  <div className="tg-services-count">{String(article.id).padStart(2, '0')}</div>
                  <div className="icon">
                    <i className="flaticon-article"></i>
                  </div>
                  <h2 className="title">
                    <a href="#" onClick={(e) => { e.preventDefault(); handleReadMore(article.id); }}>
                      {article.title}
                    </a>
                  </h2>
                  <div className="tg-service-content">
                    <p>{article.content[0].substring(0, 150)}...</p>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleReadMore(article.id); }}>
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