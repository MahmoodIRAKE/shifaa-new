import React, { createContext, useContext, useState } from 'react';
import he from '../translations/he';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('he');
  const [isRTL, setIsRTL] = useState(true);

  const translations = {
    he: he
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsRTL(lang === 'he' || lang === 'ar');
  };

  const value = {
    language,
    isRTL,
    t,
    changeLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
