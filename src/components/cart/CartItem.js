import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts } from '../../store/Products/ProductsSelectors';
import { selectCart, selectCartCouponCode, selectCartCouponDiscount } from '../../store/cart/CartSelectores';
import { addProduct, updateQuantity } from '../../store/cart/CartSlice';

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { t } = useLanguage();
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const couponDiscount = useSelector(selectCartCouponDiscount);
  const couponCode = useSelector(selectCartCouponCode);
  const dispatch = useDispatch();
  // Add default values and validation



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

  const handleProductName=(id)=>{
    const product=products?.find(a=>a._id===id);
    return product.name
  }



  const handleProductPrice=(id)=>{
    const product=products?.find(a=>a._id===id);
    return product.price.toFixed(2)
  }

  const handleProductImage=(id)=>{
    const product=products?.find(a=>a._id===id);
    return product.image2;
  }

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



  const calcaulatePriceDiscount=(id)=>{
    const product=products?.find(a=>a._id===id);
    const temp=cart.find(a=>a.productId===id);
    if(couponDiscount>0 && couponCode)
    {
      return 0;
    }
  
    if(temp.quantity>=2 ){
      console.log("temp",product.discountForTwo);
      return temp.quantity%2===0? (temp.quantity*((product.discountForTwo/100)*product.price)).toFixed(1)
      :(temp.quantity-1)*((product.discountForTwo/100)*product.price).toFixed(1);
    }
    return 0;
  }

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
              className="minus-btn"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td className="product__subtotal">
        ₪{subtotal}{calcaulatePriceDiscount(safeItem.id)>0 && <div className='product__price' style={{color:"red",width:"100px",backgroundColor:"#f5f5f5"}} >{calcaulatePriceDiscount(safeItem.id)}-</div>}
      </td>
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
