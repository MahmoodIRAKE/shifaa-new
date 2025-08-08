import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import CartTable from '../components/cart/CartTable';
import CartTotals from '../components/cart/CartTotals';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Cart = () => {
  const [couponCode, setCouponCode] = useState('');
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    // Handle coupon application logic here
    console.log('Applying coupon:', couponCode);
  };

  const handleUpdateCart = () => {
    // Handle cart update logic here
    console.log('Updating cart');
  };

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={t('cart.title')} 
        breadcrumbs={[
          { name: t('nav.home'), link: '/' },
          { name: t('nav.cart'), link: '/cart' }
        ]}
      />

      {/* Cart Area */}
      <div className="cart__area section-py-130">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <CartTable 
                cart={cart}
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                onApplyCoupon={handleApplyCoupon}
                onUpdateCart={handleUpdateCart}
              />
            </div>
            <div className="col-lg-4">
              <CartTotals cart={cart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
