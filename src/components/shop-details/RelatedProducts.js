import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const RelatedProducts = () => {
  const { t } = useLanguage();

  const relatedProducts = [
    {
      id: 1,
      name: t('shopDetails.relatedProducts.boxFullOfMuscles'),
      price: 85.99,
      originalPrice: 100.99,
      image: '/src/assets/img/products/home_shop_thumb01.png',
      rating: 4.5,
      totalRatings: 30,
      discount: 15
    },
    {
      id: 2,
      name: t('shopDetails.relatedProducts.proteinPowder2kg'),
      price: 55.99,
      image: '/src/assets/img/products/home_shop_thumb02.png',
      rating: 4.5,
      totalRatings: 30
    },
    {
      id: 3,
      name: t('shopDetails.relatedProducts.aminoEnergyHealth2kg'),
      price: 79.99,
      originalPrice: 94.99,
      image: '/src/assets/img/products/home_shop_thumb03.png',
      rating: 4.5,
      totalRatings: 24,
      discount: 15
    },
    {
      id: 4,
      name: t('shopDetails.relatedProducts.antiagingAndLongevity'),
      price: 79.99,
      image: '/src/assets/img/products/home_shop_thumb04.png',
      rating: 4.5,
      totalRatings: 24
    },
    {
      id: 5,
      name: t('shopDetails.relatedProducts.seriousMass2kg'),
      price: 39.99,
      image: '/src/assets/img/products/home_shop_thumb05.png',
      rating: 4.5,
      totalRatings: 12
    }
  ];

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

  return (
    <div className="related-products-area pb-120">
      <div className="container">
        <div className="related-products-wrap">
          <h2 className="title">{t('shopDetails.relatedProducts.title')}</h2>
          <div className="row related-product-active">
            {relatedProducts.map((product) => (
              <div key={product.id} className="col-xl-3">
                <div className="home-shop-item">
                  <div className="home-shop-thumb">
                    <a href={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                      {product.discount && (
                        <span className="discount"> -{product.discount}%</span>
                      )}
                    </a>
                    <div className="shop-thumb-shape"></div>
                  </div>
                  <div className="home-shop-content">
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
                      <a href={`/product/${product.id}`} className="cart">
                        <i className="flaticon-shopping-cart-1"></i>
                      </a>
                      <a href={`/product/${product.id}`} className="btn btn-two">
                        {t('shopDetails.relatedProducts.buyNow')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
