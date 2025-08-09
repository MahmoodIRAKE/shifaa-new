import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { removeProduct, updateQuantity } from '../../store/cart/CartSlice';
import CartItem from './CartItem';
import { validateCoupon } from '../../store/cart/CartService';
import { setCouponCode, setCouponDiscount } from '../../store/cart/CartSlice';
import Loader from '../loader/loader';
import './CartTable.css';

const CartTable = ({ cart, couponCode, setCouponCode, onApplyCoupon, onUpdateCart }) => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState({ show: false, type: '', message: '' });

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

  // Use sample data if cart is empty or undefined
  const displayCart = (cart && cart.length > 0) ? cart : [];

  // Filter out any items without proper structure
  const validCartItems = displayCart;

  const showDialog = (type, message) => {
    setDialog({ show: true, type, message });
    // Auto-dismiss after 2 seconds
    setTimeout(() => {
      setDialog({ show: false, type: '', message: '' });
    }, 2000);
  };

  const onAddCoupon = async () => {
    if (!coupon.trim()) {
      showDialog('error', t('cart.enterCouponCode') || 'Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await validateCoupon({ couponCode: coupon });
      
      if (response?.discount > 0) {
        dispatch(setCouponCode(coupon));
        dispatch(setCouponDiscount(response?.discount));
        showDialog('success', `${t('cart.couponApplied') || 'Coupon applied successfully'} - ${response.discount}% ${t('cart.discount') || 'discount'}`);
        setCoupon(""); // Clear the input
      } else {
        showDialog('error', t('cart.invalidCoupon') || 'Invalid coupon code');
      }
    } catch (err) {
      showDialog('error', err?.message || t('cart.couponError') || 'Error applying coupon');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="cart-table-wrapper">
      {/* Loader */}
      <Loader isLoading={isLoading} />
      
      {/* Dialog */}
      {dialog.show && (
        <div className={`coupon-dialog ${dialog.type}`}>
          <div className="coupon-dialog-content">
            <div className="coupon-dialog-icon">
              {dialog.type === 'success' ? '✓' : '✗'}
            </div>
            <div className="coupon-dialog-message">
              {dialog.message}
            </div>
          </div>
        </div>
      )}

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
          placeholder={t('cart.couponCode') || 'Coupon Code'}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="form-control coupon-input"
          disabled={isLoading}
        />
        
        <button 
          type="submit" 
          className="btn btn-sm btn-primary" 
          onClick={onAddCoupon}
          disabled={isLoading}
        >
          {isLoading ? t('cart.applying') || 'Applying...' : t('cart.applyCoupon') || 'Apply Coupon'}
        </button>
        
        {/* <button type="submit" className="btn btn-sm btn-secondary" onClick={onUpdateCart}>
          {t('cart.updateCart') || 'Update Cart'}
        </button> */}
      </div>
    </div>
  );
};

export default CartTable;
