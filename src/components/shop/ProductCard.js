import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { t } = useLanguage();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  };



  return (
    <div className="home-shop-item inner-shop-item" style={{borderRadius: '10px',overflow: 'hidden'}}>
      <div className="home-shop-thumb">
        <a href={`/product/${product.id}`}>
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
          <a href={`/product/${product.id}`} className="btn">
            {t('shop.buyNow')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
