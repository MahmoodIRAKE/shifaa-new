import React from 'react';  
import {  useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import './OrderSummary.css';
import { selectCartPaymentType, selectCartCouponDiscount, selectCartCouponCode } from '../../store/cart/CartSelectores';
import { selectProducts } from '../../store/Products/ProductsSelectors';

const OrderSummary = ({ cart, onPlaceOrder, order, isLoading }) => {  
  const { t, i18n } = useLanguage();
  const products=useSelector(selectProducts);

  const couponDiscount=useSelector(selectCartCouponDiscount);
  const couponCode=useSelector(selectCartCouponCode);
  const paymentType=useSelector(selectCartPaymentType);

  // Sample order data for demonstration


  // Use order prop if provided, otherwise use cart or sample data
  const displayItems = order ? (order.items || order.products || []) : (cart && cart.length > 0) ? cart : [];

  // Calculate totals
  const subtotal = displayItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + (price * quantity);
  }, 0);

  // Delivery fee constant
  const deliveryFee = 30;
  
  // Calculate total including delivery fee
  const total = subtotal + deliveryFee;

  const handleProductPrice = (id) => {
    const product = products?.find(a => a._id === id);
    return product ? product.price.toFixed(2) : '0.00';
  };

  const totalPrice = (isCoupon = false) => {
    let sum = 0;
    cart.forEach((a) => {
      const extraDis = calcaulatePriceDiscount(a.productId);
      sum += (parseFloat(handleProductPrice(a.productId)) * a.quantity - extraDis);
    });
    return isCoupon ? sum * (1 - (couponDiscount || 0) / 100)+deliveryFee : sum+deliveryFee;
  };

  const calcaulatePriceDiscount = (id) => {
    const product = products?.find(a => a._id === id);
    const temp = cart.find(a => a.productId === id);
    if (!product || !temp) return 0;
    
    if (couponDiscount > 0 && couponCode) {
      return 0;
    }
    if (temp.quantity >= 2) {
      return temp.quantity % 2 === 0 
        ? (temp.quantity * ((product.discountForTwo / 100) * product.price))
        : (temp.quantity - 1) * ((product.discountForTwo / 100) * product.price);
    }
    return 0;
  };

 

  const handlePlaceOrder = async () => {
    onPlaceOrder();
  };

  // If order is provided (from success page), don't show the place order button
  if (order) {
    return (
      <div className="order-summary-container">
        <h2 className="order-summary-title">{t('checkout.yourOrder')}</h2>
        
        <ul className="order-summary-list">
   
          
 
          
    
          <li className="order-summary-delivery">
            {t('cart.deTotal')} <span>₪{deliveryFee.toFixed(2)}</span>
          </li>
          <li className="order-summary-subtotal">
            {t('checkout.total')} <span>₪{totalPrice().toFixed(2)}</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="order-summary-container">
      <h2 className="order-summary-title">{t('checkout.yourOrder')}</h2>
      
      <ul className="order-summary-list">
        <li className="order-summary-header">
          {t('checkout.product')} <span>{t('checkout.subtotal')}</span>
        </li>
        

        <li className="order-summary-delivery">
          {t('cart.deTotal')} <span>₪{deliveryFee.toFixed(2)}</span>
        </li>
        <li className="order-summary-subtotal">
          {t('checkout.total')} <span>₪{totalPrice().toFixed(2)}</span>
        </li>
      </ul>
      
      <div className="order-summary-info">
        <p>{t('checkout.paymentMessage')}</p>
        <p>
          {t('checkout.privacyMessage')} <a href="#">{t('checkout.privacyPolicy')}</a>.
        </p>
      </div>
      
      <button 
        className={`order-summary-btn ${isLoading ? 'loading' : ''}`}
        onClick={handlePlaceOrder}
        disabled={displayItems.length === 0 || isLoading}
      >
        {isLoading ? (
          <span className="loading-spinner">
            <div className="spinner"></div>
            جاري إتمام الطلب...
          </span>
        ) : (
          t('checkout.placeOrder')
        )}
      </button>
    </div>
  );
};

export default OrderSummary;
