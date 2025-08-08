import React, { createContext, useContext, useState } from 'react';
import translations from '../translations/translations.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar'); // Default to Arabic
  const [isRTL, setIsRTL] = useState(true); // Arabic is RTL

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to Arabic if translation not found
        value = translations.ar;
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey]) {
            value = value[fallbackKey];
          } else {
            return key; // Return the key if translation not found
          }
        }
        return value;
      }
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsRTL(lang === 'ar' || lang === 'he');
  };

  const toggleLanguage = () => {
    const newLang = language === 'ar' ? 'he' : 'ar';
    changeLanguage(newLang);
  };

  const value = {
    language,
    isRTL,
    t,
    changeLanguage,
    toggleLanguage
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={isRTL ? 'rtl' : 'ltr'} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
