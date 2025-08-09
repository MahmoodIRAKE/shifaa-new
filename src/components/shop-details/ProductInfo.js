import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProductInfo = ({ product, quantity, onQuantityChange, onAddToCart }) => {
  const { t, language } = useLanguage();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  const handleQuantityIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityInputChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    onQuantityChange(newQuantity);
  };

  // Translation keys for text
  const translations = {
    inStock: {
      en: "IN STOCK",
      he: "במלאי",
      ar: "متوفر"
    },
    addToCart: {
      en: "ADD TO CART",
      he: "הוסף לעגלה",
      ar: "أضف إلى السلة"
    }
  };

  const getTranslation = (key) => {
    return translations[key]?.[language] || translations[key]?.en || key;
  };

  return (
    <div className="inner-shop-details-content" style={{ 
      padding: '30px', 
      backgroundColor: '#fff', 
      borderRadius: '10px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h4 className="title" style={{ 
        fontSize: '28px', 
        fontWeight: 'bold', 
        color: '#333', 
        marginBottom: '20px', 
        textAlign: 'center'
      }}>
        {product.name}
      </h4>
      
      <div className="inner-shop-details-price" style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 className="price" style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          color: '#20B764', 
          marginBottom: '5px'
        }}>
          ₪{product.price.toFixed(2)}
        </h2>
        {/* {product.originalPrice && (
          <span className="original-price">₪{product.originalPrice.toFixed(2)}</span>
        )} */}
        <h5 className="stock-status" style={{ 
          color: '#20B764', 
          fontSize: '16px', 
          fontWeight: '600'
        }}>
          - {getTranslation('inStock')}
        </h5>
      </div>
      
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px', 
        borderLeft: '4px solid #20B764',
        width: '70%',
        textAlign: 'center'
      }}>
        <p style={{ 
          fontSize: '16px', 
          lineHeight: '1.6', 
          color: '#555', 
          margin: 0, 
          textAlign: 'center'
        }}>
          {product.mainDescription}
        </p>
      </div>
      
      <div className="inner-shop-perched-info" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px', 
        marginBottom: '20px',
        justifyContent: 'center',
        width: '100%'
      }}>
        <div className="sd-cart-wrap">
          <form action="#">
            <div className="" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '2px solid #e0e0e0', 
              borderRadius: '25px', 
              overflow: 'hidden',  
              padding: 10,
              width: '100%'
            }}>
              <button
                type="button"
                className="minus-btn"
                onClick={handleQuantityDecrement}
                style={{ 
                  border: 'none', 
                  background: '#f8f9fa', 
                  padding: '12px 15px', 
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                -
              </button>
              <input 
                type="text" 
                value={quantity}
                onChange={handleQuantityInputChange}
                style={{ 
                  border: 'none', 
                  textAlign: 'center', 
                  width: '60px', 
                  padding: '12px 0',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              />
              <button
                type="button"
                className="plus-btn"
                onClick={handleQuantityIncrement}
                style={{ 
                  border: 'none', 
                  background: '#f8f9fa', 
                  padding: '12px 15px', 
                  cursor: 'pointer',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#333'
                }}
              >
                +
              </button>
            </div>
          </form>
        </div>
        <button 
          className="cart-btn"
          onClick={onAddToCart}
          style={{ 
            flex: 1,
            border: 'none',
            background: '#20B764',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => e.target.style.background = '#1a8f4f'}
          onMouseOut={(e) => e.target.style.background = '#20B764'}
        >
          {getTranslation('addToCart')}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
