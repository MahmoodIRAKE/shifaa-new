import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CheckoutForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    streetAddressTwo: '',
    townCity: '',
    district: '',
    zipCode: '',
    phone: '',
    email: '',
    note: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form action="#" className="customer__form-wrap" onSubmit={handleSubmit}>
      <span className="title">{t('checkout.billingDetails')}</span>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-grp">
            <label htmlFor="firstName">{t('forms.firstName')} *</label>
            <input 
              type="text" 
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <label htmlFor="lastName">{t('forms.lastName')} *</label>
            <input 
              type="text" 
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-grp">
        <label htmlFor="companyName">{t('checkout.companyName')}</label>
        <input 
          type="text" 
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-grp select-grp">
        <label htmlFor="country">{t('checkout.country')} *</label>
        <select 
          id="country" 
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          required
        >
          <option value="">{t('checkout.selectCountry')}</option>
          <option value="United Kingdom (UK)">United Kingdom (UK)</option>
          <option value="United States (US)">United States (US)</option>
          <option value="Turkey">Turkey</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Portugal">Portugal</option>
        </select>
      </div>

      <div className="form-grp">
        <label htmlFor="streetAddress">{t('checkout.streetAddress')} *</label>
        <input 
          type="text" 
          id="streetAddress"
          name="streetAddress"
          placeholder={t('checkout.streetAddressPlaceholder')}
          value={formData.streetAddress}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-grp">
        <input 
          type="text" 
          id="streetAddressTwo"
          name="streetAddressTwo"
          placeholder={t('checkout.streetAddressTwoPlaceholder')}
          value={formData.streetAddressTwo}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-grp">
        <label htmlFor="townCity">{t('checkout.townCity')} *</label>
        <input 
          type="text" 
          id="townCity"
          name="townCity"
          value={formData.townCity}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-grp select-grp">
        <label htmlFor="district">{t('checkout.district')} *</label>
        <select 
          id="district" 
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          required
        >
          <option value="">{t('checkout.selectDistrict')}</option>
          <option value="Alabama">Alabama</option>
          <option value="Alaska">Alaska</option>
          <option value="Arizona">Arizona</option>
          <option value="California">California</option>
          <option value="New York">New York</option>
        </select>
      </div>

      <div className="form-grp">
        <label htmlFor="zipCode">{t('checkout.zipCode')} *</label>
        <input 
          type="text" 
          id="zipCode"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-grp">
            <label htmlFor="phone">{t('forms.phone')} *</label>
            <input 
              type="tel" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-grp">
            <label htmlFor="email">{t('forms.email')} *</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </div>

      <span className="title title-two">{t('checkout.additionalInfo')}</span>
      
      <div className="form-grp">
        <label htmlFor="note">{t('checkout.orderNotes')}</label>
        <textarea 
          id="note"
          name="note"
          placeholder={t('checkout.orderNotesPlaceholder')}
          value={formData.note}
          onChange={handleInputChange}
          rows="4"
        ></textarea>
      </div>
    </form>
  );
};

export default CheckoutForm;
