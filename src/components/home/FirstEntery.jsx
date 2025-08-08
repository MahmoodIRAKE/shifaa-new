import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const FirstEntery = () => {
  const { t } = useLanguage();

  return (
    <section id="ingredient" className="tg-supplement-area pt-130 pb-120">
      <div className="tg-supplement-bg"></div>
      <div className="container">
        <div className="tg-supplement-inner">
          <div className="row justify-content-center first-entry-container">
            <div className="col-lg-6 col-md-8 order-1 order-lg-2 first-entry-img-margin">
              <div className="tg-supplement-img text-end wow fadeInRight" data-wow-delay=".2s">
                <img src={require("../../assets/img/others/supplement_img.png")} alt="Supplement" />
              </div>
              <div className="tg-supplement-shape">
                <img src={require("../../assets/img/others/supplement_shape02.png")} alt="Shape" className="rotateme" />
              </div>
            </div>
            <div className="col-lg-6 order-2 order-lg-1">
              <div className="tg-supplement-content mt-60 wow fadeInLeft" data-wow-delay=".2s">
                <div className="tg-section-title mb-25">
                  <span className="sub-title">ingredients</span>
                  <h2 className="title">growth promoter <br /> supplement</h2>
                </div>
                <p>
                  Vitamin Ipsum is simply dummy text of the printing and tysetting industry. 
                  Lorem Ipsum has been the industry's standard dummy text ever since the when an unknown printer took a galley.
                </p>
                <a href="/shop" className="tg-btn view-btn">VIEW more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstEntery;