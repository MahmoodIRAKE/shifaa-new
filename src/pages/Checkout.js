import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';
import CouponCode from '../components/checkout/CouponCode';
import PaymentMethodSelector from '../components/checkout/PaymentMethodSelector';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Checkout = () => {
  const { t } = useLanguage();
  const cart = useSelector(state => state.cart.cart);
  const [couponCode, setCouponCode] = useState('');
  const [showCouponForm, setShowCouponForm] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    console.log('Applying coupon:', couponCode);
    setShowCouponForm(false);
  };

  const handlePlaceOrder = () => {
    console.log('Placing order...');
  };

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={t('checkout.title')} 
        breadcrumbs={[
          { name: t('nav.home'), link: '/' },
          { name: t('checkout.title'), link: '/checkout' }
        ]}
      />

      {/* Checkout Area */}
      <div className="checkout__area section-py-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              {/* Payment Method Selector */}
              <PaymentMethodSelector />
              
              {/* Checkout Form */}
              <CheckoutForm />
            </div>
    
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
