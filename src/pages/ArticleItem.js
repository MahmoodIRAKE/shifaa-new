import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ARTICLES from '../constants/articles';
import ARTICLESHE from '../constants/articlesHe';
import '../assets/css/style.css';
import '../assets/css/responsive.css';
import './ArticleItem.css';
import BreadcrumbArea from '../components/common/BreadcrumbArea';

const ArticleItem = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [article, setArticle] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Get the correct articles array based on language
  const articlesData = language === 'he' ? ARTICLESHE : ARTICLES;

  useEffect(() => {
    // Find the article by ID
    const foundArticle = articlesData.find(art => art.id === parseInt(articleId));
    if (foundArticle) {
      setArticle(foundArticle);
      // Trigger animation after component mounts
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Redirect to articles page if article not found
      navigate('/articles');
    }
  }, [articleId, articlesData, navigate]);

  const handleBackToArticles = () => {
    navigate('/');
  };

  if (!article) {
    return (
      <div className="main-area fix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>{t('common.loading')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea />
    

      {/* Article Content Area */}
      <section className={`article-content-area ${isVisible ? 'animate-content' : ''}`}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-12">
              <div className="article-wrapper">
                {/* Article Header */}
                <div className="article-header">
                  <div className="article-meta">
                    <span className="article-id">#{String(article.id).padStart(2, '0')}</span>
                    <span className="article-date">{new Date().toLocaleDateString()}</span>
                  </div>
                  <h1 className="article-title">{article.title}</h1>
                </div>

                {/* Article Content */}
                <div className="article-content">
                  {article.content.map((paragraph, index) => (
                    <div key={index} className={`article-paragraph ${isVisible ? 'animate-paragraph' : ''}`}>
                      <p>{paragraph}</p>
                    </div>
                  ))}
                </div>

                {/* Article Footer */}
                <div className="article-footer">
                  <button 
                    className="btn btn-primary back-to-articles"
                    onClick={handleBackToArticles}
                  >
                    <i className="fas fa-arrow-left"></i>
                    {t('common.backToArticles')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleItem;
