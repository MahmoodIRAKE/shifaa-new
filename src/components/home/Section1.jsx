import React, { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, selectProductsLoading } from '../../store/Products/ProductsSelectors';
import { getProductsThunk } from '../../store/Products/ProductsThunk';
import './Section1.css';

const Section1 = () => {
  const { t } = useLanguage();
  const products = useSelector(selectProducts) || [];
  const loading = useSelector(selectProductsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only dispatch if products array is empty or undefined
    if (!products || products.length === 0) {
      dispatch(getProductsThunk());
    }
  }, [dispatch]); // Remove products from dependency array to avoid infinite loops

  // Check if we have a valid product with an image
  const hasValidProduct = Array.isArray(products) && products.length > 0 && products[0] && products[0].image;

  return (
    <section className="banner-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-xl-7 col-lg-8 col-md-10">
            <div className="banner-content text-center">
              <p className="banner-caption">{t('banner.caption')}</p>
              <h2 className="title">{t('banner.title')}</h2>
              <a href="/shop" className="btn btn-two">{t('banner.shopNow')}</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="banner-images text-center">
              {hasValidProduct ? (
                <img src={products[0].image} alt="img" className="main-img" />
              ) : (
                <div className="main-img-placeholder" style={{ 
                  width: '300px', 
                  height: '300px', 
                  margin: '0 auto',
                  backgroundColor: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  color: '#666'
                }}>
                  {loading ? 'Loading...' : 'No product image available'}
                </div>
              )}
              <img src={require("../../assets/img/banner/banner_round_bg.png")} alt="img" className="bg-shape1" />
            </div>
          </div>
        </div>
      </div>
      <div className="banner-shape one">
        <img src={require("../../assets/img/banner/banner_shape01.png")} alt="shape" className="wow bannerFadeInLeft" data-wow-delay=".2s" data-wow-duration="2s" />
      </div>
      <div className="banner-shape two">
        <img src={require("../../assets/img/banner/banner_shape02.png")} alt="shape" className="wow bannerFadeInRight" data-wow-delay=".2s" data-wow-duration="2s" />
      </div>
    </section>
  );
};

export default Section1;