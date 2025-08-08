import React from 'react';

const ProductGallery = ({ images, selectedImage, onImageSelect }) => {
  return (
    <div className="inner-shop-details-flex-wrap">
      <div className="inner-shop-details-img-wrap">
        <div className="tab-content" id="myTabContent">
          {images.map((image, index) => (
            <div 
              key={index}
              className={`tab-pane ${selectedImage === index ? 'show active' : ''}`}
              id={`item-${index + 1}`}
              role="tabpanel"
              aria-labelledby={`item-${index + 1}-tab`}
            >
              <div className="inner-shop-details-img">
                <img src={image} alt={`Product image ${index + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="inner-shop-details-nav-wrap">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          {images.map((image, index) => (
            <li key={index} className="nav-item" role="presentation">
              <button
                className={`nav-link ${selectedImage === index ? 'active' : ''}`}
                id={`item-${index + 1}-tab`}
                data-bs-toggle="tab"
                data-bs-target={`#item-${index + 1}`}
                role="tab"
                aria-controls={`item-${index + 1}`}
                aria-selected={selectedImage === index}
                onClick={() => onImageSelect(index)}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductGallery;
