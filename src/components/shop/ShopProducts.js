import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ShopProducts = ({ onAddToCart,products }) => {
  const { t } = useLanguage();
  // Sample products data




  return (
    <div className="suxnix-shop-product-main">
      <div className="row justify-content-center" style={{display: 'flex',flexWrap: 'wrap',gap: '20px',justifyContent: 'center',alignItems: 'center',}}>
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard 
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {/* <Pagination 
        currentPage={2}
        totalPages={10}
      /> */}
    </div>
  );
};

export default ShopProducts;
