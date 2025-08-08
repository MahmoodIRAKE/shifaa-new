import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('contact.errors.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.errors.emailInvalid');
    }
    
    if (!formData.subject) {
      newErrors.subject = t('contact.errors.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert(t('contact.successMessage'));
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <div className="contact-form-wrap">
      <div className="section-title mb-50">
        <p className="sub-title">{t('contact.subTitle')}</p>
        <h2 className="title">{t('contact.mainTitle')}</h2>
      </div>
      
      <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-grp">
              <label htmlFor="fullName">{t('contact.fullName')}</label>
              <input 
                type="text" 
                id="fullName"
                name="fullName"
                placeholder={t('contact.enterHere')}
                value={formData.fullName}
                onChange={handleInputChange}
                className={errors.fullName ? 'error' : ''}
              />
              {errors.fullName && <div className="help-block with-errors">{errors.fullName}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-grp">
              <label htmlFor="email">{t('contact.emailAddress')}</label>
              <input 
                type="email" 
                id="email"
                name="email"
                placeholder={t('contact.enterHere')}
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="help-block with-errors">{errors.email}</div>}
            </div>
          </div>
        </div>
        
        <div className="form-grp">
          <select 
            className="form-select"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={errors.subject ? 'error' : ''}
          >
            <option value="">{t('contact.selectSubject')}</option>
            <option value="delivery">{t('contact.subjects.delivery')}</option>
            <option value="diet">{t('contact.subjects.diet')}</option>
            <option value="marketing">{t('contact.subjects.marketing')}</option>
            <option value="success">{t('contact.subjects.success')}</option>
            <option value="wholesale">{t('contact.subjects.wholesale')}</option>
          </select>
          {errors.subject && <div className="help-block with-errors">{errors.subject}</div>}
        </div>
        
        <div className="form-grp">
          <label htmlFor="message">{t('contact.message')}</label>
          <textarea 
            name="message" 
            id="message"
            placeholder={t('contact.enterHere')}
            value={formData.message}
            onChange={handleInputChange}
            rows="5"
            className={errors.message ? 'error' : ''}
          ></textarea>
          {errors.message && <div className="help-block with-errors">{errors.message}</div>}
        </div>
        
        <div className="form-btn">
          <button type="submit" className="btn">
            {t('contact.makeRequest')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
