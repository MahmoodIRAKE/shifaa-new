import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductTabs = ({ product, activeTab, onTabChange }) => {
  const { t, language } = useLanguage();

  // Translation keys for titles and text
  const translations = {
    description: {
      en: "Description",
      he: "תיאור",
      ar: "الوصف"
    },
    ingredients: {
      en: "Ingredients",
      he: "מרכיבים",
      ar: "المكونات"
    },
    additionalInfo: {
      en: "Additional information",
      he: "מידע נוסף",
      ar: "معلومات إضافية"
    },
    reviews: {
      en: "Reviews",
      he: "ביקורות",
      ar: "التقييمات"
    },
    trueStrength: {
      en: "THE TRUE STRENGTH OF",
      he: "הכוח האמיתי של",
      ar: "القوة الحقيقية لـ"
    },
    basics: {
      en: "THE BASICS:",
      he: "הבסיס:",
      ar: "الأساسيات:"
    },
    benefits: {
      en: "BENEFITS:",
      he: "היתרונות:",
      ar: "الفوائد:"
    },
    productInfo: {
      en: "PRODUCT INFORMATION",
      he: "معلومات المنتج",
      ar: "معلومات المنتج"
    },
    productType: {
      en: "Product Type",
      he: "نوع المنتج",
      ar: "نوع المنتج"
    },
    dosage: {
      en: "Dosage",
      he: "الجرعة",
      ar: "الجرعة"
    },
    expiryDate: {
      en: "Expiry Date",
      he: "تاريخ انتهاء الصلاحية",
      ar: "تاريخ انتهاء الصلاحية"
    },
    company: {
      en: "Company",
      he: "الشركة",
      ar: "الشركة"
    },
    price: {
      en: "Price",
      he: "السعر",
      ar: "السعر"
    },
    discount: {
      en: "Discount for 2+",
      he: "خصم لـ 2+",
      ar: "خصم لـ 2+"
    }
  };

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <div className="product-desc-wrap" style={{ 
      padding: '40px', 
      backgroundColor: '#fff', 
      borderRadius: '15px', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      marginTop: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      
      <div className="tab-content" id="myTabContentTwo" style={{ width: '100%', textAlign: 'center' }}>
        {/* Description Tab */}
        <div className={`tab-pane fade ${activeTab === 'description' ? 'show active' : ''}`} 
             id="description" role="tabpanel" aria-labelledby="description-tab">
          <div className="product-desc-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h4 className="title" style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#333', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {getTranslation('trueStrength')} {product.name.toUpperCase()}:
            </h4>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.8', 
              color: '#555', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {product.mainDescription}
            </p>
           
            <h4 className="title" style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#333', 
              marginTop: '30px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {getTranslation('benefits')}
            </h4>
            <div style={{ 
              whiteSpace: 'pre-line',
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#555',
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              {product.extraDescription}
            </div>
          </div>
        </div>

        {/* Ingredients Tab */}
        <div className={`tab-pane fade ${activeTab === 'ingredients' ? 'show active' : ''}`} 
             id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
          <div className="product-desc-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h4 className="title" style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#333', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {getTranslation('ingredients')}
            </h4>
            <div className="ingredients-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              {product.ingredientsIds && product.ingredientsIds.map((ingredient, index) => (
                <div key={ingredient._id || index} className="ingredient-item" style={{ 
                  padding: '25px', 
                  border: '2px solid #e0e0e0', 
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  maxWidth: '600px',
                  margin: '0 auto',
                  width: '100%',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => e.target.style.borderColor = '#20B764'}
                onMouseOut={(e) => e.target.style.borderColor = '#e0e0e0'}
                >
                  <h5 style={{ 
                    color: '#20B764', 
                    marginBottom: '15px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}>
                    {ingredient.ingredientName}
                  </h5>
                  <p style={{ 
                    margin: 0, 
                    lineHeight: '1.8',
                    fontSize: '16px',
                    color: '#555',
                    textAlign: 'center'
                  }}>
                    {ingredient.ingredientDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Information Tab */}
        <div className={`tab-pane fade ${activeTab === 'information' ? 'show active' : ''}`} 
             id="information" role="tabpanel" aria-labelledby="information-tab">
          <div className="product-desc-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h4 className="title" style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              color: '#333', 
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {getTranslation('productInfo')}
            </h4>
            <table className="table table-sm" style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              margin: '0 auto'
            }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center',
                    width: '30%'
                  }}>
                    {getTranslation('productType')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', textAlign: 'center' }}>
                    {product.specifications?.type || 'Natural Supplement'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    {getTranslation('ingredients')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', textAlign: 'center' }}>
                    {product.specifications?.ingredients || 'حبة البركة، سبيرولينا'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    {getTranslation('dosage')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', textAlign: 'center' }}>
                    {product.howToUseInfo || product.specifications?.dosage || 'كبسولتين في اليوم'}
                  </td>
                </tr>
                {/* <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    {getTranslation('expiryDate')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', textAlign: 'center' }}>
                    {product.specifications?.expiryDate || 'Dec 2025'}
                  </td>
                </tr> */}
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    {getTranslation('company')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', textAlign: 'center' }}>
                    {product.specifications?.company || 'Shifaa'}
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <th scope="row" style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#f8f9fa',
                    fontWeight: 'bold',
                    color: '#333',
                    textAlign: 'center'
                  }}>
                    {getTranslation('price')}
                  </th>
                  <td style={{ padding: '15px 20px', color: '#555', fontWeight: 'bold', textAlign: 'center' }}>
                    ₪{product.price}
                  </td>
                </tr>
                {/* {product.discountForTwo && (
                  <tr>
                    <th scope="row" style={{ 
                      padding: '15px 20px',
                      backgroundColor: '#f8f9fa',
                      fontWeight: 'bold',
                      color: '#333',
                      textAlign: 'center'
                    }}>
                      {getTranslation('discount')}
                    </th>
                    <td style={{ padding: '15px 20px', color: '#20B764', fontWeight: 'bold', textAlign: 'center' }}>
                      {product.discountForTwo}% off
                    </td>
                  </tr>
                )} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
