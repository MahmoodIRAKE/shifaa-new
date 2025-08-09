import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { removeProduct, updateQuantity } from '../../store/cart/CartSlice';
import CartItem from './CartItem';

const CartTable = ({ cart, couponCode, setCouponCode, onApplyCoupon, onUpdateCart }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();

  

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeProduct(productId));
    } else {
      // Update quantity logic would go here
      console.log('Updating quantity for product:', productId, 'to:', newQuantity);
    }
  };

  // Sample cart data for demonstration with proper structure


  // Use sample data if cart is empty or undefined
  const displayCart = (cart && cart.length > 0) ? cart : [];

  // Filter out any items without proper structure
  const validCartItems = displayCart;

  return (
    <div className="cart-table-wrapper">
      <table className="table cart__table">
        <thead>
          <tr>
              
          </tr>
        </thead>
        <tbody>
          {validCartItems.length > 0 ? (
            validCartItems.map((item) => (
              <CartItem
                key={item.productId}
                item={item}
                onRemove={handleRemoveProduct}
                onQuantityChange={handleQuantityChange}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                <p>{t('cart.emptyCart')}</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Mobile-friendly cart actions */}
      <div className="cart__actions">
    
          <input 
            type="text" 
            placeholder={t('cart.couponCode')}
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="form-control coupon-input"
          />
    
     
  
        <button type="submit" className="btn btn-sm btn-primary">
            {t('cart.applyCoupon')}
        </button>
        
       
        <button type="submit" className="btn btn-sm btn-secondary" onClick={onUpdateCart}>
            {t('cart.updateCart')}
        </button>
       
      </div>
    </div>
  );
};

export default CartTable;
