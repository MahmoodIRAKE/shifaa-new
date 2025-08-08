import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const CartTotals = ({ cart }) => {
  const { t } = useLanguage();
  
  // Ensure cart is an array and filter valid items
  const validCart = Array.isArray(cart) ? cart.filter(item => 
    item && typeof item.price === 'number' && item.price > 0
  ) : [];

  // Calculate totals with error handling
  const subtotal = validCart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + (price * quantity);
  }, 0);

  const total = subtotal; // Add tax, shipping, etc. here if needed

  return (
    <div className="cart__collaterals-wrap">
      <h2 className="title">{t('cart.cartTotals')}</h2>
      <ul className="list-wrap">
        <li>
          <span>${subtotal.toFixed(2)}</span>
          {t('cart.subtotal')}
        </li>
        <li>
          <span className="amount">${total.toFixed(2)}</span>
          {t('cart.total')}
        </li>
      </ul>
      {validCart.length > 0 ? (
        <Link to="/checkout" className="btn-primary-checkout">
          {t('cart.proceedToCheckout')}
        </Link>
      ) : (
        <Link to="/products" className="btn-primary-checkout">
          {t('cart.continueShopping')}
        </Link>
      )}
    </div>
  );
};

export default CartTotals;
