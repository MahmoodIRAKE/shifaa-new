import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Section1 = () => {
  const { t } = useLanguage();

  return (
    <section className="banner-area">
      <div className="container">
        <div className="row justify-content-center1">
          <div className="col-xxl-8 col-xl-7 col-lg-8 col-md-10">
            <div className="banner-content text-center">
              <p className="banner-caption">{t('index.banner.caption')}</p>
              <h2 className="title">{t('index.banner.title')}</h2>
              <a href="/shop" className="btn btn-two">{t('index.banner.shopNow')}</a>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-12">
            <div className="banner-images text-center">
              <img src={require("../../assets/img/banner/banner_img01.png")} alt="img" className="main-img" />
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