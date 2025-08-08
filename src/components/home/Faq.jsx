import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import FAQS from '../../constants/faq';
import FAQSHE from '../../constants/faqHe';
import './Faq.css';

const Faq = () => {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const questionsPerPage = 5;

  // Get the correct FAQ array based on language
  const faqData = language === 'he' ? FAQSHE : FAQS;

  // Calculate pagination
  const totalPages = Math.ceil(faqData.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = faqData.slice(startIndex, endIndex);

  const handleQuestionClick = (questionId) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setExpandedQuestion(null); // Close any expanded question when changing pages
  };

  useEffect(() => {
    // Reset to first page when language changes
    setCurrentPage(1);
    setExpandedQuestion(null);
  }, [language]);

  return (
    <section id="faq" className="tg-faq-area" dir={language === 'he' ? 'rtl' : 'ltr'} style={{
      marginTop: '-150px',
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-60">
              <span className="sub-title faq-subtitle">{t('faq.subtitle')}</span>
              <h2 className="title faq-title">{t('faq.title')}</h2>
            </div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faq-wrapper">
              {currentQuestions.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div 
                    className={`faq-question ${expandedQuestion === faq.id ? 'active' : ''}`}
                    onClick={() => handleQuestionClick(faq.id)}
                  >
                    <h3 className="question-text">{faq.question}</h3>
                    <span className="toggle-icon">
                      {expandedQuestion === faq.id ? '−' : '+'}
                    </span>
                  </div>
                  <div className={`faq-answer ${expandedQuestion === faq.id ? 'expanded' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-wrapper text-center mt-50">
                <nav aria-label="FAQ pagination">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        {language === 'he' ? 'הקודם' : 'السابق'}
                      </button>
                    </li>
                    
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button 
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        {language === 'he' ? 'הבא' : 'التالي'}
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;