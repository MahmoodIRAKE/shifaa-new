import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ProductGallery from '../components/shop-details/ProductGallery';
import ProductInfo from '../components/shop-details/ProductInfo';
import ProductTabs from '../components/shop-details/ProductTabs';
import RelatedProducts from '../components/shop-details/RelatedProducts';
import BreadcrumbArea from '../components/common/BreadcrumbArea';
import { selectProducts } from '../store/Products/ProductsSelectors';
import { addProductWithQuantity } from '../store/cart/CartSlice';
// import { addToCart } from '../store/cart/CartSlice';
import '../assets/css/style.css';
import '../assets/css/responsive.css';

const ShopDetails = () => {
  const { t, language } = useLanguage();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const navigate = useNavigate();
  // Translation keys for breadcrumb
  const translations = {
    home: {
      en: "Home",
      he: "בית",
      ar: "الرئيسية"
    },
    shop: {
      en: "Shop",
      he: "متجر",
      ar: "المتجر"
    }
  };

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  // Sample product data matching the new JSON structure
  const products = useSelector(selectProducts);

  const handleAddToCart = () => {
    // dispatch(addToCart({
    //   id: product._id,
    //   name: product.name,
    //   price: product.price,
    //   image: product.image2,
    //   quantity: quantity
    // }));
    dispatch(addProductWithQuantity({productId:product._id,quantity:quantity}));
    navigate('/cart');
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
  const product = products.find(product => product._id === productId);
  return (
    <div className="main-area fix" style={{ textAlign: 'center' }}>
      {/* Breadcrumb Area */}
      <BreadcrumbArea 
        title={product.name} 
        breadcrumbs={[
          { name: getTranslation('home'), link: '/' },
          { name: getTranslation('shop'), link: '/shop' },
          { name: product.name, link: `/product/${productId}` }
        ]}
      />

      {/* Shop Details Area */}
      <section className="inner-shop-details-area" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-lg-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductGallery 
                images={[product.image,product.image2]}
                selectedImage={selectedImage}
                onImageSelect={handleImageSelect}
              />
            </div>
            <div className="col-lg-6" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductInfo 
                product={product}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
          <div className="row" style={{ justifyContent: 'center' }}>
            <div className="col-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <ProductTabs 
                product={product}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default ShopDetails;
