import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const BreadcrumbArea = ({ title, breadcrumbs }) => {
  const { isRTL } = useLanguage();

  return (
    <section className="breadcrumb-area breadcrumb-bg" style={{
      backgroundImage: `url(${require("../../assets/img/bg/video_bg.png")})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginTop: '-170px',
      height: '550px',
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
          </div>
        </div>
      </div>
      <div className="video-shape one">
        <img src= {require("../../assets/img/others/video_shape01.png")} alt="shape" />
      </div>
      <div className="video-shape two">
        <img src={require("../../assets/img/others/video_shape02.png")} alt="shape" />
      </div>
    </section>
  );
};

export default BreadcrumbArea;
