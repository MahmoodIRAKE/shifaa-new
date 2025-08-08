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

  const getCategoryName = (category) => {
    const categoryMap = {
      'nutrition': t('shop.categories.nutrition'),
      'body-fit': t('shop.categories.bodyFit'),
      'fat-burners': t('shop.categories.fatBurners'),
      'protein': t('shop.categories.protein'),
      'burners': t('shop.categories.burners')
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="home-shop-item inner-shop-item">
      <div className="home-shop-thumb">
        <a href={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
          {product.discount && (
            <span className="discount"> -{product.discount}%</span>
          )}
        </a>
      </div>
      <div className="home-shop-content">
        <div className="shop-item-cat">
          <a href={`/shop?category=${product.category}`}>
            {getCategoryName(product.category)}
          </a>
        </div>
        <h4 className="title">
          <a href={`/product/${product.id}`}>{product.name}</a>
        </h4>
        <span className="home-shop-price">
          ${product.price.toFixed(2)}
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </span>
        <div className="home-shop-rating">
          {renderStars(product.rating)}
          <span className="total-rating">({product.totalRatings})</span>
        </div>
        <div className="shop-content-bottom">
          <a 
            href="#" 
            className="cart" 
            onClick={handleAddToCart}
            title={t('shop.addToCart')}
          >
            <i className="flaticon-shopping-cart-1"></i>
          </a>
          <a href={`/product/${product.id}`} className="btn btn-two">
            {t('shop.buyNow')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
