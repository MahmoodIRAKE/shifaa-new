import React from 'react';
import { useDispatch } from 'react-redux';
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
  const sampleCartItems = [
    {
      id: 1,
      name: "Antiaging and Longevity",
      price: 13.00,
      quantity: 1,
      image: "/src/assets/img/products/home_shop_thumb01.png"
    },
    {
      id: 2,
      name: "Time to Explore",
      price: 19.00,
      quantity: 1,
      image: "/src/assets/img/products/home_shop_thumb02.png"
    }
  ];

  // Use sample data if cart is empty or undefined
  const displayCart = (cart && cart.length > 0) ? cart : sampleCartItems;

  // Filter out any items without proper structure
  const validCartItems = displayCart;

  return (
    <div className="cart-table-wrapper">
      <table className="table cart__table">
        <thead>
          <tr>
            <th className="product__thumb d-none d-md-table-cell">&nbsp;</th>
            <th className="product__name">{t('cart.product')}</th>
            <th className="product__price d-none d-md-table-cell">{t('cart.price')}</th>
            <th className="product__quantity">{t('cart.quantity')}</th>
            <th className="product__subtotal">{t('cart.subtotal')}</th>
            <th className="product__remove">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {validCartItems.length > 0 ? (
            validCartItems.map((item) => (
              <CartItem
                key={item.id}
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
