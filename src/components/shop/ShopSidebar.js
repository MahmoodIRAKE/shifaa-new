import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ShopSidebar = ({ priceRange, onPriceFilter, selectedCategory, onCategoryFilter }) => {
  const { t } = useLanguage();

  const categories = [
    { id: 'accessories', name: t('shop.categories.accessories') },
    { id: 'gym-supplement', name: t('shop.categories.gymSupplement') },
    { id: 'man-gym', name: t('shop.categories.manGym') },
    { id: 'fitness-gym', name: t('shop.categories.fitnessGym') },
    { id: 'weight-loss', name: t('shop.categories.weightLoss') }
  ];

  const latestProducts = [
    {
      id: 1,
      name: t('shop.latestProducts.multiVitaminC'),
      price: 29.00,
      image: '/src/assets/img/products/home_shop_thumb01.png',
      rating: 5
    },
    {
      id: 2,
      name: t('shop.latestProducts.bComplexZinc'),
      price: 36.00,
      image: '/src/assets/img/products/home_shop_thumb02.png',
      rating: 5
    },
    {
      id: 3,
      name: t('shop.latestProducts.proteinPowder'),
      price: 19.99,
      image: '/src/assets/img/products/home_shop_thumb03.png',
      rating: 5
    }
  ];

  const productTags = [
    'Bone Support', 'Energy Support', 'Hair', 'Multivitamins',
    'Pre-Workout', 'Protein', 'Skin & Nails'
  ];

  const handlePriceFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const minPrice = parseFloat(formData.get('minPrice')) || 0;
    const maxPrice = parseFloat(formData.get('maxPrice')) || 1000;
    onPriceFilter(minPrice, maxPrice);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  return (
    <aside className="shop-sidebar">
      {/* Price Filter */}
      <div className="widget">
        <h4 className="sidebar-title">{t('shop.filterByPrice')}</h4>
        <div className="price_filter">
          <div id="slider-range"></div>
          <form onSubmit={handlePriceFilter} className="price_slider_amount">
            <span>{t('shop.price')} :</span>
            <input 
              type="number" 
              name="minPrice" 
              placeholder={t('shop.minPrice')} 
              defaultValue={priceRange[0]}
            />
            <input 
              type="number" 
              name="maxPrice" 
              placeholder={t('shop.maxPrice')} 
              defaultValue={priceRange[1]}
            />
            <button type="submit" className="btn">{t('shop.filter')}</button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="widget">
        <h4 className="sidebar-title">{t('shop.categories.title')}</h4>
        <ul className="categories-list list-wrap">
          {categories.map((category) => (
            <li key={category.id}>
              <button 
                type="button"
                className={`category-link ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryFilter(category.id)}
              >
                {category.name} <i className="fas fa-angle-double-right"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Latest Products */}
      <div className="widget">
        <h4 className="sidebar-title">{t('shop.latestProducts.title')}</h4>
        <div className="lp-post-list">
          <ul className="lp-post-item list-wrap">
            {latestProducts.map((product) => (
              <li key={product.id}>
                <div className="lp-post-thumb">
                  <a href={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                  </a>
                </div>
                <div className="lp-post-content">
                  <ul className="lp-post-rating list-wrap">
                    <li>
                      {renderStars(product.rating)}
                    </li>
                  </ul>
                  <h4 className="title">
                    <a href={`/product/${product.id}`}>{product.name}</a>
                  </h4>
                  <span className="price">${product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Product Tags */}
      <div className="widget">
        <h4 className="sidebar-title">{t('shop.productTags')}</h4>
        <ul className="Product-tag-list list-wrap">
          {productTags.map((tag, index) => (
            <li key={index}>
              <a href={`/shop?tag=${tag.toLowerCase().replace(' ', '-')}`}>
                {tag}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar;
