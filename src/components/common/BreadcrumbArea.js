import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const BreadcrumbArea = ({ title, breadcrumbs }) => {
  const { isRTL } = useLanguage();

  return (
    <section className="breadcrumb-area breadcrumb-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="breadcrumb-content text-center">
              <h2 className="title">{title}</h2>
              <nav aria-label="Breadcrumbs" className="breadcrumb-trail">
                <ul className="breadcrumb">
                  {breadcrumbs.map((breadcrumb, index) => (
                    <li 
                      key={index} 
                      className={`breadcrumb-item trail-item ${
                        index === 0 ? 'trail-begin' : ''
                      } ${
                        index === breadcrumbs.length - 1 ? 'trail-end' : ''
                      }`}
                    >
                      {index === breadcrumbs.length - 1 ? (
                        <span>{breadcrumb.name}</span>
                      ) : (
                        <Link to={breadcrumb.link}>
                          <span>{breadcrumb.name}</span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
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
