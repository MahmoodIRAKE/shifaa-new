import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductTabs = ({ product, activeTab, onTabChange }) => {
  const { t } = useLanguage();
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    hideEmail: false
  });

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewForm);
    // Here you would typically send the review to your backend
    alert(t('shopDetails.reviewSubmitted'));
    setReviewForm({
      name: '',
      email: '',
      rating: 5,
      comment: '',
      hideEmail: false
    });
  };

  const handleReviewInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingClick = (rating) => {
    setReviewForm(prev => ({
      ...prev,
      rating
    }));
  };

  return (
    <div className="product-desc-wrap">
      <ul className="nav nav-tabs" id="myTabTwo" role="tablist">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
            id="description-tab"
            onClick={() => onTabChange('description')}
          >
            {t('shopDetails.tabs.description')}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
            id="information-tab"
            onClick={() => onTabChange('information')}
          >
            {t('shopDetails.tabs.additionalInfo')}
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'review' ? 'active' : ''}`}
            id="review-tab"
            onClick={() => onTabChange('review')}
          >
            {t('shopDetails.tabs.reviews')} ({product.reviews.length})
          </button>
        </li>
      </ul>
      
      <div className="tab-content" id="myTabContentTwo">
        {/* Description Tab */}
        <div className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`} 
             id="description" role="tabpanel" aria-labelledby="description-tab">
          <div className="product-desc-content">
            <h4 className="title">{t('shopDetails.description.title1')}</h4>
            <p>{t('shopDetails.description.paragraph1')}</p>
            <h4 className="title">{t('shopDetails.description.title2')}</h4>
            <ul className="product-desc-list list-wrap">
              {t('shopDetails.description.features', { returnObjects: true }).map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Information Tab */}
        <div className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`} 
             id="information" role="tabpanel" aria-labelledby="information-tab">
          <div className="product-desc-content">
            <table className="table table-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <th scope="row">{t(`shopDetails.specifications.${key}`)}</th>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Tab */}
        <div className={`tab-pane fade ${activeTab === 'review' ? 'show active' : ''}`} 
             id="review" role="tabpanel" aria-labelledby="review-tab">
          <div className="product-desc-content">
            <div className="reviews-comment">
              {product.reviews.map((review) => (
                <div key={review.id} className="review-info">
                  <div className="review-img">
                    <img src={review.image} alt={review.name} />
                  </div>
                  <div className="review-content">
                    <ul className="review-rating list-wrap">
                      <li>
                        {renderStars(review.rating)}
                      </li>
                    </ul>
                    <div className="review-meta">
                      <h6>{review.name} <span>-{review.date}</span></h6>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="add-review">
              <h4 className="title">{t('shopDetails.addReview.title')}</h4>
              <form onSubmit={handleReviewSubmit}>
                <p>{t('shopDetails.addReview.description')}</p>
                <div className="from-grp">
                  <label htmlFor="name">{t('shopDetails.addReview.name')} <span>*</span></label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={reviewForm.name}
                    onChange={handleReviewInputChange}
                    required
                  />
                </div>
                <div className="from-grp">
                  <label htmlFor="email">{t('shopDetails.addReview.email')} <span>*</span></label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleReviewInputChange}
                    required
                  />
                </div>
                <div className="from-grp checkbox-grp">
                  <input 
                    type="checkbox" 
                    id="hideEmail"
                    name="hideEmail"
                    checked={reviewForm.hideEmail}
                    onChange={handleReviewInputChange}
                  />
                  <label htmlFor="hideEmail">{t('shopDetails.addReview.hideEmail')}</label>
                </div>
                <div className="form-rating">
                  <label>{t('shopDetails.addReview.rating')}</label>
                  <ul className="list-wrap">
                    <li>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i 
                          key={star}
                          className={`${star <= reviewForm.rating ? 'fas' : 'far'} fa-star`}
                          onClick={() => handleRatingClick(star)}
                          style={{ cursor: 'pointer' }}
                        ></i>
                      ))}
                    </li>
                  </ul>
                </div>
                <div className="from-grp">
                  <label htmlFor="comment">{t('shopDetails.addReview.comment')} <span>*</span></label>
                  <textarea 
                    id="comment" 
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleReviewInputChange}
                    cols="30" 
                    rows="10"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn">{t('shopDetails.addReview.submit')}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
