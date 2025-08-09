import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { addProduct } from '../../store/cart/CartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addProduct(product._id));
    navigate('/cart');
  };

  
  

  return (
    <div className="home-shop-item inner-shop-item" style={{borderRadius: '10px',overflow: 'hidden'}}>
      <div className="home-shop-thumb">
        <a href={`/product/${product._id}`}>
          <img src={product.image2} alt={product.name}  style={{width: '250px', height: '250px',objectFit: 'cover'}}/>
          {product.discount && (
            <span className="discount"> -{product.discount}%</span>
          )}
        </a>
      </div>
      <div className="home-shop-content">
        <h4 className="title">
          <a href={`/product/${product.id}`}>{product.name}</a>
        </h4>
        <span className="home-shop-price">
          ₪{product.price.toFixed(2)}
          {product.originalPrice && (
            <span className="original-price">₪{product.originalPrice.toFixed(2)}</span>
          )}
        </span>
   
        <div className="shop-content-bottom" style={{display: 'flex',gap: '10px',justifyContent: 'center',alignItems: 'center',}}>
          {/* <a 
            href="#" 
            className="cart btn" 
            onClick={handleAddToCart}
            title={t('shop.addToCart')}
          >
            <i className="flaticon-shopping-cart-1"></i>
          </a> */}
          <a  className="btn" onClick={handleAddToCart}>
            {t('shop.buyNow')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
