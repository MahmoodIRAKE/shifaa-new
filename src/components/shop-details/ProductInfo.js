import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductInfo = ({ product, quantity, onQuantityChange, onAddToCart }) => {
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

  const handleQuantityIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onQuantityChange(newQuantity);
  };

  return (
    <div className="inner-shop-details-content">
      <h4 className="title">{product.name}</h4>
      
      <div className="inner-shop-details-meta">
        <ul className="list-wrap">
          <li>{t('shopDetails.brand')} : <a href="/shop">{product.brand}</a></li>
          <li className="inner-shop-details-review">
            <div className="rating">
              {renderStars(product.rating)}
            </div>
            <span>({product.rating})</span>
          </li>
          <li>{t('shopDetails.productId')} : <span>{product.productId}</span></li>
        </ul>
      </div>
      
      <div className="inner-shop-details-price">
        <h2 className="price">${product.price.toFixed(2)}</h2>
        {product.originalPrice && (
          <span className="original-price">${product.originalPrice.toFixed(2)}</span>
        )}
        <h5 className="stock-status">- {t('shopDetails.inStock')}</h5>
      </div>
      
      <p>{product.description}</p>
      
      <div className="inner-shop-details-list">
        <ul className="list-wrap">
          <li>{t('shopDetails.type')} : <span>{product.details.type}</span></li>
          <li>{t('shopDetails.expiryDate')} : <span>{product.details.expiryDate}</span></li>
          <li>{t('shopDetails.company')} : <span>{product.details.company}</span></li>
        </ul>
      </div>
      
      <div className="inner-shop-perched-info">
        <div className="sd-cart-wrap">
          <form action="#">
            <div className="quickview-cart-plus-minus">
              <button
                type="button"
                className="minus-btn"
                onClick={handleQuantityDecrement}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity}
                onChange={handleQuantityInputChange}
              />
              <button
                type="button"
                className="plus-btn"
                onClick={handleQuantityIncrement}
              >
                +
              </button>
            </div>
          </form>
        </div>
        <button 
          className="cart-btn"
          onClick={onAddToCart}
        >
          {t('shopDetails.addToCart')}
        </button>
        <a 
          href="#" 
          className="wishlist-btn" 
          data-bs-toggle="tooltip" 
          data-bs-placement="top" 
          title={t('shopDetails.wishlist')}
        >
          <i className="far fa-heart"></i>
        </a>
      </div>
      
      <div className="inner-shop-details-bottom">
        <span>
          <span>{t('shopDetails.tag')} : 
            {product.tags.map((tag, index) => (
              <a key={index} href={`/shop?tag=${tag.toLowerCase().replace(' ', '-')}`}>
                {tag}
              </a>
            ))}
          </span>
        </span>
        <span>
          <span>{t('shopDetails.categories')} :
            {product.categories.map((category, index) => (
              <a key={index} href={`/shop?category=${category.toLowerCase()}`}>
                {category}
              </a>
            ))}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ProductInfo;
