import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const OrderSummary = ({ cart, onPlaceOrder }) => {
  const { t } = useLanguage();

  // Sample order data for demonstration
  const sampleOrderItems = [
    {
      id: 1,
      name: "Antiaging and Longevity",
      quantity: 1,
      price: 19.99
    }
  ];

  const displayItems = (cart && cart.length > 0) ? cart : sampleOrderItems;

  // Calculate totals
  const subtotal = displayItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    const price = typeof item.price === 'number' ? item.price : 0;
    return total + (price * quantity);
  }, 0);

  const total = subtotal; // Add tax, shipping, etc. here if needed

  return (
    <div className="order__info-wrap">
      <h2 className="title">{t('checkout.yourOrder')}</h2>
      
      <ul className="list-wrap">
        <li className="title">
          {t('checkout.product')} <span>{t('checkout.subtotal')}</span>
        </li>
        
        {displayItems.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity || 1} <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
          </li>
        ))}
        
        <li>
          {t('checkout.subtotal')} <span>${subtotal.toFixed(2)}</span>
        </li>
        <li>
          {t('checkout.total')} <span>${total.toFixed(2)}</span>
        </li>
      </ul>
      
      <div className="order-info">
        <p>{t('checkout.paymentMessage')}</p>
        <p>
          {t('checkout.privacyMessage')} <a href="#">{t('checkout.privacyPolicy')}</a>.
        </p>
      </div>
      
      <button 
        className="btn btn-sm" 
        onClick={onPlaceOrder}
        disabled={displayItems.length === 0}
      >
        {t('checkout.placeOrder')}
      </button>
    </div>
  );
};

export default OrderSummary;
