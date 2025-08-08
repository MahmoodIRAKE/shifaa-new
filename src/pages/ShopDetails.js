import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ProductGallery from '../components/shop-details/ProductGallery';
import ProductInfo from '../components/shop-details/ProductInfo';
import ProductTabs from '../components/shop-details/ProductTabs';
import RelatedProducts from '../components/shop-details/RelatedProducts';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
// import { addToCart } from '../store/cart/CartSlice';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const ShopDetails = () => {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data (in a real app, this would come from an API)
  const product = {
    id: productId || 1,
    name: t('shopDetails.product.name'),
    brand: 'Suxnix',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    totalReviews: 3,
    stockStatus: 'in-stock',
    productId: 'QZX8VGH',
    description: t('shopDetails.product.description'),
    images: [
      '/src/assets/img/products/shop-details-thumb01.png',
      '/src/assets/img/products/shop-details-thumb02.png',
      '/src/assets/img/products/shop-details-thumb03.png',
      '/src/assets/img/products/shop-details-thumb04.png'
    ],
    details: {
      type: t('shopDetails.product.details.type'),
      expiryDate: '19 Dec 2024',
      company: 'Suxnix'
    },
    categories: ['Vitamin', 'Protein', 'Capsule', 'Powder'],
    tags: ['Natural Vitamin'],
    specifications: {
      calories: '110',
      totalFat: '1kg',
      saturatedFat: '0.5g',
      cholesterol: '40mg',
      totalCarbohydrate: '2g',
      protein: '24g',
      totalSugars: '2g',
      sodium: '100mg',
      calcium: '140 mg',
      potassium: '160 mg'
    },
    reviews: [
      {
        id: 1,
        name: 'Chenai Simon',
        date: 'May 12, 2024',
        rating: 5,
        comment: t('shopDetails.reviews.review1'),
        image: '/src/assets/img/others/p_review_img01.jpg'
      },
      {
        id: 2,
        name: 'Finn Castaneda',
        date: 'June 17, 2024',
        rating: 4,
        comment: t('shopDetails.reviews.review2'),
        image: '/src/assets/img/others/p_review_img02.jpg'
      },
      {
        id: 3,
        name: 'Bayley Robertson',
        date: 'May 28, 2024',
        rating: 4,
        comment: t('shopDetails.reviews.review3'),
        image: '/src/assets/img/others/p_review_img03.jpg'
      }
    ]
  };

  const handleAddToCart = () => {
    // dispatch(addToCart({
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.images[0],
    //   quantity: quantity
    // }));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="main-area fix">
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={t('shopDetails.title')} 
        breadcrumbs={[
          { name: t('nav.home'), link: '/' },
          { name: t('shop.title'), link: '/shop' },
          { name: t('shopDetails.title'), link: `/product/${productId}` }
        ]}
      />

      {/* Shop Details Area */}
      <section className="inner-shop-details-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ProductGallery 
                images={product.images}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
              />
            </div>
            <div className="col-lg-6">
              <ProductInfo 
                product={product}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ProductTabs 
                product={product}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts />
    </div>
  );
};

export default ShopDetails;
