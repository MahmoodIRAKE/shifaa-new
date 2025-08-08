import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CouponCode = ({ couponCode, setCouponCode, showForm, setShowForm, onApplyCoupon }) => {
  const { t } = useLanguage();

  return (
    <div className="coupon__code-wrap">
      <div className="coupon__code-info">
        <span><i className="far fa-bookmark"></i> {t('checkout.haveCoupon')}</span>
        <button 
          type="button" 
          onClick={() => setShowForm(!showForm)}
          className="coupon-link"
        >
          {t('checkout.clickForCoupon')}
        </button>
      </div>
      {showForm && (
        <form action="#" className="coupon__code-form" onSubmit={onApplyCoupon}>
          <p>{t('checkout.couponDescription')}</p>
          <div className="coupon-input-group">
            <input 
              type="text" 
              placeholder={t('checkout.couponPlaceholder')}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button type="submit" className="btn btn-sm">
              {t('checkout.applyCoupon')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CouponCode;
