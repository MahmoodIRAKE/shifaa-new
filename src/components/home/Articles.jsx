import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Articles = () => {
  const { t } = useLanguage();

  const serviceItems = [
    {
      id: 1,
      count: "01",
      icon: "flaticon-vitamins-1",
      title: "Dietary Supplement",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    },
    {
      id: 2,
      count: "02",
      icon: "flaticon-supplement",
      title: "Formula Innovative",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    },
    {
      id: 3,
      count: "03",
      icon: "flaticon-vitamins",
      title: "Protein Capsule",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    },
    {
      id: 4,
      count: "04",
      icon: "flaticon-protein-2",
      title: "Nutrients Provide",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    },
    {
      id: 5,
      count: "05",
      icon: "flaticon-tape-measure",
      title: "Food Synthetic",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    },
    {
      id: 6,
      count: "06",
      icon: "flaticon-abs-1",
      title: "Supplement Manual",
      description: "Dmnis iste natus error sit voluptatem accusantium dolore laudantium rem voluptatem sit aperiam.",
      link: "/contact"
    }
  ];

  return (
    <section id="feature" className="tg-service-area">
      <div className="container">
        <div className="tg-service-inner">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="tg-section-title text-center mb-60">
                <span className="sub-title">Suxnix Features</span>
                <h2 className="title">Supplement Features</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center articles-container">
            {serviceItems.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="tg-service-item">
                  <div className="tg-services-count">{item.count}</div>
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                  <h2 className="title">
                    <a href={item.link}>{item.title}</a>
                  </h2>
                  <div className="tg-service-content">
                    <p>{item.description}</p>
                    <a href={item.link}>
                      <i className="fas fa-arrow-circle-right"></i>Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;