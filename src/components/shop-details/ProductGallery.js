import React from 'react';

const ProductGallery = ({ images, selectedImage, onImageSelect }) => {
  return (
    <div className="inner-shop-details-flex-wrap">
      <div className="inner-shop-details-img-wrap">
        <div className="tab-content" id="myTabContent">

              <div className="inner-shop-details-img">
                <img src={images[1]} alt={`Product image`} />
              </div>
            </div>
  
        </div>
    

    </div>
  );
};

export default ProductGallery;
