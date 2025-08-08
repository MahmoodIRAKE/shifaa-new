import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { t } = useLanguage();
  
  // Add default values and validation
  const safeItem = {
    id: item?.id || 0,
    name: item?.name || t('cart.unknownProduct'),
    price: typeof item?.price === 'number' ? item.price : 0,
    quantity: item?.quantity || 1,
    image: item?.image || '/src/assets/img/products/home_shop_thumb01.png'
  };

  const [quantity, setQuantity] = useState(safeItem.quantity);

  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    onQuantityChange(safeItem.id, validQuantity);
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  const subtotal = (safeItem.price * quantity).toFixed(2);

  return (
    <tr>
      <td className="product__thumb">
        <a href={`/product/${safeItem.id}`}>
          <img src={safeItem.image} alt={safeItem.name} />
        </a>
      </td>
      <td className="product__name">
        <a href={`/product/${safeItem.id}`}>{safeItem.name}</a>
      </td>
      <td className="product__price">${safeItem.price.toFixed(2)}</td>
      <td className="product__quantity">
        <div className="quickview-cart-plus-minus">
          <div className="quantity-input">
            <button 
              type="button" 
              className="minus-btn"
              onClick={handleDecrement}
            >
              -
            </button>
            <input 
              type="text" 
              value={quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                handleQuantityChange(newQuantity);
              }}
            />
            <button 
              type="button" 
              className="plus-btn"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td className="product__subtotal">${subtotal}</td>
      <td className="product__remove">
        <button 
          type="button" 
          onClick={() => onRemove(safeItem.id)}
          className="remove-btn"
        >
          ×
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
