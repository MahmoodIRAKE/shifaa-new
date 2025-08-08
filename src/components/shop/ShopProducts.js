import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ProductCard from './ProductCard';
import Pagination from './Pagination';

const ShopProducts = ({ sortBy, priceRange, selectedCategory, onAddToCart }) => {
  const { t } = useLanguage();

  // Sample products data
  const products = [
    {
      id: 1,
      name: t('shop.products.boxFullOfMuscles'),
      price: 85.99,
      originalPrice: 100.99,
      image: '/src/assets/img/products/home_shop_thumb01.png',
      category: 'nutrition',
      rating: 4.5,
      totalRatings: 20,
      discount: 15
    },
    {
      id: 2,
      name: t('shop.products.proteinPowder2kg'),
      price: 59.99,
      image: '/src/assets/img/products/home_shop_thumb02.png',
      category: 'body-fit',
      rating: 4.5,
      totalRatings: 34
    },
    {
      id: 3,
      name: t('shop.products.aminoEnergyHealth2kg'),
      price: 29.99,
      originalPrice: 34.99,
      image: '/src/assets/img/products/home_shop_thumb03.png',
      category: 'fat-burners',
      rating: 4.5,
      totalRatings: 19,
      discount: 15
    },
    {
      id: 4,
      name: t('shop.products.antiagingAndLongevity'),
      price: 49.99,
      image: '/src/assets/img/products/home_shop_thumb04.png',
      category: 'protein',
      rating: 4.5,
      totalRatings: 12
    },
    {
      id: 5,
      name: t('shop.products.seriousMass2kg'),
      price: 49.99,
      originalPrice: 89.99,
      image: '/src/assets/img/products/home_shop_thumb05.png',
      category: 'fat-burners',
      rating: 4.5,
      totalRatings: 19,
      discount: 45
    },
    {
      id: 6,
      name: t('shop.products.wheyProteinPowder'),
      price: 29.99,
      image: '/src/assets/img/products/home_shop_thumb06.png',
      category: 'burners',
      rating: 4.5,
      totalRatings: 29
    }
  ];

  // Filter products based on category and price range
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // Sort products based on sortBy
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
        return b.totalRatings - a.totalRatings;
      default:
        return 0;
    }
  });

  return (
    <div className="suxnix-shop-product-main">
      <div className="row">
        {sortedProducts.map((product) => (
          <div key={product.id} className="col-xl-4 col-lg-6 col-md-6">
            <ProductCard 
              product={product}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <Pagination 
        currentPage={2}
        totalPages={10}
      />
    </div>
  );
};

export default ShopProducts;
