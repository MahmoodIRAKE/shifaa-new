import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { selectCartCouponDiscount, selectCartCouponCode } from '../../store/cart/CartSelectores';
import { selectProducts } from '../../store/Products/ProductsSelectors';
import './CartTotals.css';

const CartTotals = ({ cart }) => {
  const { t } = useLanguage();
  const couponDiscount = useSelector(selectCartCouponDiscount);
  const couponCode = useSelector(selectCartCouponCode);
  const products = useSelector(selectProducts);
  
  // Ensure cart is an array and filter valid items
  const validCart = Array.isArray(cart) ? cart.filter(item => 
    item && item.productId
  ) : [];

  // Calculate totals with error handling
  const subtotal = validCart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    const product = products?.find(p => p._id === item.productId);
    const price = product?.price || 0;
    return total + (price * quantity);
  }, 0);
  
  const totalPrice = (isCoupon=false)=>{
    let sum=0;
    validCart.forEach((a)=>{
      const extraDis=calcaulatePriceDiscount(a.productId);
      sum+=(handleProductPrice(a.productId)*a.quantity-extraDis)
    })
    
    return isCoupon? sum*(1-couponDiscount/100):sum;
  };

  const calcaulatePriceDiscount=(id)=>{
    const product=products?.find(a=>a._id===id);
    const temp=validCart.find(a=>a.productId===id);
    if(couponDiscount>0 && couponCode)
    {
      return 0;
    }
  
    if(temp && temp.quantity>=2 ){
      console.log("temp",product.discountForTwo);
      return temp.quantity%2===0? (temp.quantity*((product.discountForTwo/100)*product.price))
      :(temp.quantity-1)*((product.discountForTwo/100)*product.price);
    }
    return 0;
  }
  const handleProductPrice=(id)=>{
    const product=products?.find(a=>a._id===id);
    return product?.price || 0;
  }

  // Calculate coupon discount amount
  const discountAmount = couponDiscount > 0 ? (subtotal * couponDiscount / 100) : 0;
  
  // Delivery fee constant
  const deliveryFee = 30;
  
  // Calculate final total including delivery fee
  const total = totalPrice() + deliveryFee;

  return (
    <div className="cart__collaterals-wrap">
      <h2 className="title">{t('cart.cartTotals')}</h2>
      <ul className="list-wrap">
        <li>
          <span>₪{subtotal.toFixed(2)}</span>
          {t('cart.subtotal')}
        </li>
        {couponDiscount > 0 && couponCode && (
          <li className="coupon-discount">
            <span className="discount-amount">-₪{discountAmount.toFixed(2)}</span>
            {t('cart.discount')} ({couponDiscount}%)
          </li>
        )}
        <li>
          <span>₪{deliveryFee.toFixed(2)}</span>
          {t('cart.deTotal')}
        </li>
        <li>
          <span className="amount">₪{total.toFixed(2)}</span>
          {t('cart.total')}
        </li>
      </ul>
      <div className='d-flex justify-content-center' style={{backgroundColor:"#66b021",width:"100%",textAlign:"center",borderRadius:"10px"}}>
      {validCart.length > 0 ? (
        <Link to="/checkout" className='btn' style={{backgroundColor:"#66b021",width:"50%",textAlign:"center"}}>
          {t('cart.proceedToCheckout')}
        </Link>
      ) : (
        <Link to="/shop"  className='btn' style={{backgroundColor:"#66b021",width:"50%",textAlign:"center"}}>
          {t('cart.continueShopping')}
        </Link>
      )}
      </div>
    </div>
  );
};

export default CartTotals;
