import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../store/Products/ProductsSelectors';
import { selectCart, selectCartCouponCode, selectCartCouponDiscount } from '../../store/cart/CartSelectores';
import { addProduct, updateQuantity } from '../../store/cart/CartSlice';
import './CartItem.css';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { t } = useLanguage();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const couponDiscount = useSelector(selectCartCouponDiscount);
  const couponCode = useSelector(selectCartCouponCode);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
    dispatch(addProduct(safeItem.id));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
      dispatch(updateQuantity(safeItem.id));
    }
  };

  const handleProductName = (id) => {
    const product = products?.find(a => a._id === id);
    return product?.name || 'Product';
  };

  const handleProductPrice = (id) => {
    const product = products?.find(a => a._id === id);
    return product?.price || 0;
  };

  const handleProductImage = (id) => {
    const product = products?.find(a => a._id === id);
    return product?.image2 || '';
  };

  const safeItem = {
    id: item?.productId || 0,
    name: handleProductName(item.productId),
    price: handleProductPrice(item.productId),
    quantity: item?.quantity || 1,
    image: handleProductImage(item.productId)
  };
  const [quantity, setQuantity] = useState(safeItem.quantity);

  const handleQuantityChange = (newQuantity) => {
    const validQuantity = Math.max(1, newQuantity);
    setQuantity(validQuantity);
    onQuantityChange(safeItem.id, validQuantity);
  };

  const calcaulatePriceDiscount = (id) => {
    const product = products?.find(a => a._id === id);
    const temp = cart.find(a => a.productId === id);
    if (couponDiscount > 0 && couponCode) {
      return 0;
    }

    if (temp && temp.quantity >= 2) {
      return temp.quantity % 2 === 0 
        ? (temp.quantity * ((product?.discountForTwo || 0) / 100) * (product?.price || 0))
        : (temp.quantity - 1) * ((product?.discountForTwo || 0) / 100) * (product?.price || 0);
    }
    return 0;
  };

  const subtotal = (safeItem.price * quantity).toFixed(2);
  const discount = calcaulatePriceDiscount(safeItem.id);

  return (
    <tr className="cart-item-row">
          <button 
            type="button" 
            onClick={() => onRemove(safeItem.id)}
            className="remove-btn1"
            aria-label="Remove item"  
          >
            ×
          </button>
      <td className="product__thumb">
        <div className="product-thumb-container">
 
          <a href={`/product/${safeItem.id}`}  style={{width:"200px",height:"150px",objectFit:"cover"}}>
            <img src={safeItem.image} alt={safeItem.name}  style={{width:"200px",height:"150px",objectFit:"cover"}}/>
          </a>
        </div>
      </td>
      <td className="product__name">
        <div className="product-info">
          <a href={`/product/${safeItem.id}`} className="product-title">
            {safeItem.name}
          </a>
          <div className="product-price-mobile">
            ₪{(safeItem.price*quantity).toFixed(2)}
            {discount > 0 && (
            <div style={{color:"red",fontSize:"12px"}}>
              -₪{calcaulatePriceDiscount(safeItem.id).toFixed(2)}
            </div>
          )}
          </div>
        </div>
      </td>
      <td className="product__quantity">
        <div className="quickview-cart-plus-minus">
          <div className="quantity-input">
            <button 
              type="button" 
              className="minus-btn"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
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
              aria-label="Quantity"
            />
            <button 
              type="button" 
              className="plus-btn"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td className="product__subtotal">
        <div className="subtotal-info">
          <div className="subtotal-amount">₪{subtotal}</div>
          {true && (
            <div style={{color:"red",fontSize:"12px"}}>
              -₪{calcaulatePriceDiscount(safeItem.id).toFixed(2)}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
