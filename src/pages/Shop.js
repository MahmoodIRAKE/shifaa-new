import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLanguage } from '../context/LanguageContext';
import ShopSidebar from '../components/shop/ShopSidebar';
import ShopProducts from '../components/shop/ShopProducts';
import ShopHeader from '../components/shop/ShopHeader';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
// import { addToCart } from '../store/cart/CartSlice';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const Shop = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('menu_order');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddToCart = (product) => {
    // dispatch(addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.image,
    //   quantity: 1
    // }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange([min, max]);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={t('shop.title')} 
        breadcrumbs={[
          { name: t('nav.home'), link: '/' },
          { name: t('shop.title'), link: '/shop' }
        ]}
      />

      {/* Shop Area */}
      <div className="inner-shop-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-8 col-sm-8">
              <ShopSidebar 
                priceRange={priceRange}
                onPriceFilter={handlePriceFilter}
                selectedCategory={selectedCategory}
                onCategoryFilter={handleCategoryFilter}
              />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-12 col-sm-8 shop-sidebar-pad order-first">
              <ShopHeader 
                sortBy={sortBy}
                onSortChange={handleSortChange}
              />
              <ShopProducts 
                sortBy={sortBy}
                priceRange={priceRange}
                selectedCategory={selectedCategory}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
