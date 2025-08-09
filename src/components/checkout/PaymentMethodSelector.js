import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentType } from "../../store/cart/CartSlice";
import "./PaymentMethodSelector.css";

const PaymentMethodSelector = () => {
  const dispatch = useDispatch();
  const paymentType = useSelector((state) => state.cart.paymnetType);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelectMethod = (value) => {
    if (paymentType !== value) {
      setIsAnimating(true);
      dispatch(setPaymentType(value));
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <div className="payment-method-selector">
      <div className="payment-method-header">
        <h3 className="payment-method-title">اختر طريقة الدفع</h3>
        <p className="payment-method-subtitle">اختر الطريقة المناسبة لك</p>
      </div>

      <div className="payment-method-container">
        {/* Slider Background */}
        <div className="payment-slider-background">
          <div 
            className={`payment-slider ${paymentType === 'credit' ? 'slide-left' : 'slide-right'} ${isAnimating ? 'animating' : ''}`}
          ></div>
        </div>

        {/* Payment Options */}
        <div className="payment-options">
          {/* Cash Option */}
          <div
            className={`payment-option ${paymentType === "cash" ? "selected" : ""}`}
            onClick={() => handleSelectMethod("cash")}
          >
            <div className="payment-option-content">
              <span className="payment-icon">💰</span>
              <span className="payment-text">الدفع نقداً</span>
            </div>
          </div>

          {/* Credit Card Option */}
          <div
            className={`payment-option ${paymentType === "credit" ? "selected" : ""}`}
            onClick={() => handleSelectMethod("credit")}
          >
            <div className="payment-option-content">
              <span className="payment-icon">💳</span>
              <span className="payment-text">الدفع ببطاقة الائتمان</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Info */}
      <div className="payment-method-info">
        {paymentType === "cash" ? (
          <div className="payment-info-cash">
            <p>سيتم الدفع نقداً عند استلام الطلب</p>
          </div>
        ) : (
          <div className="payment-info-credit">
            <p>سيتم توجيهك إلى صفحة الدفع الآمن</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
