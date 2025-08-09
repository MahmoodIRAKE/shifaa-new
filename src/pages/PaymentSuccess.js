import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { useDispatch } from "react-redux";
import { setResetCart } from "../store/cart/CartSlice";
import OrderSummary from "../components/checkout/OrderSummary";
import queryString from "query-string";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successRef = useRef(null);
  const location = useLocation();
  const { data } = location.state || {};
  const params = queryString.parse(location.search);
  const order = params.data2 ? JSON.parse(decodeURIComponent(params.data2)) : {};

  // Function to take screenshot
  const captureScreenshot = () => {
    if (successRef.current) {
      html2canvas(successRef.current, { scale: 2 }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "payment_success.png";
        link.click();
      });
    }
  };

  useEffect(() => {
    dispatch(setResetCart());
  }, [dispatch]);

  // Get order data from either data or order
  const orderData = data?.order || order || {};
  console.log(orderData);
  return (
    <div ref={successRef} className="payment-success-container">
      {/* Payment Success Image */}
      <img
        src={require("../assets/images/3e50f342-61b9-4e47-a263-c46859cf6d9e.png")}
        alt="تمت العملية بنجاح"
        className="payment-success-image"
      />

      {/* Success Message */}
      <h1 className="payment-success-title">تمت عملية الدفع بنجاح!</h1>

      {/* Confirmation Message */}
      <p className="payment-success-message">
        شكراً لك! تم استلام دفعتك بنجاح.
      </p>

      {/* Order Summary */}
      <div className="order-summary-section">
        <OrderSummary order={orderData} cart={orderData.items} />
      </div>

      {/* Buttons */}
      <div className="payment-success-buttons">
        <button 
          onClick={() => { navigate("/"); }} 
          className="payment-success-btn primary"
        >
          العودة إلى الصفحة الرئيسية
        </button>
        <button 
          onClick={captureScreenshot} 
          className="payment-success-btn secondary"
        >
          تحميل الفاتورة
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
