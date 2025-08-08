import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Faq = () => {
  const { t } = useLanguage();
  const [activeItem, setActiveItem] = useState(-1); // Start with all closed

  const faqItems = [
    {
      id: 1,
      count: "01",
      question: t('faq.item1.question'),
      answer: t('faq.item1.answer'),
      readMoreLink: "/faq/ingredients"
    },
    {
      id: 2,
      count: "02",
      question: t('faq.item2.question'),
      answer: t('faq.item2.answer'),
      readMoreLink: "/faq/themes"
    },
    {
      id: 3,
      count: "03",
      question: t('faq.item3.question'),
      answer: t('faq.item3.answer'),
      readMoreLink: "/faq/app"
    },
    {
      id: 4,
      count: "04",
      question: t('faq.item4.question'),
      answer: t('faq.item4.answer'),
      readMoreLink: "/faq/version"
    },
    {
      id: 5,
      count: "05",
      question: t('faq.item5.question'),
      answer: t('faq.item5.answer'),
      readMoreLink: "/faq/tracking"
    }
  ];

  const toggleAccordion = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  return (
    <div className="col-lg-8 col-md-10 col-sm-12 mx-auto">
      <div className="faq-wrapper">
        <div className="section-title mb-50 text-center">
          <p className="sub-title">{t('faq.subtitle')}</p>
          <h2 className="title">{t('faq.title')}</h2>
        </div>
        <div className="faq-accordion">
          {faqItems.map((item, index) => (
            <div key={item.id} className={`faq-item ${activeItem === index ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleAccordion(index)}>
                <span className="count">{item.count}.</span>
                <span className="question-text">{item.question}</span>
                <span className={`faq-arrow ${activeItem === index ? 'rotated' : ''}`}>
                  <i className="fas fa-chevron-down"></i>
                </span>
              </div>
              <div className={`faq-answer ${activeItem === index ? 'show' : ''}`}>
                <p>{item.answer}</p>
                <div className="faq-read-more">
                  <a href={item.readMoreLink} className="read-more-btn">
                    <i className="fas fa-arrow-circle-right"></i> {t('faq.readMore')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;