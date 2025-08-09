import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CreditPayment.css';

const CreditPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { creditUrl } = location.state || {};
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!creditUrl) {
      setError('No payment URL provided');
      setIsLoading(false);
    } else {
      // Simulate loading time for the webview
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [creditUrl]);

  const handleBackToCheckout = () => {
    navigate('/checkout');
  };

  const handlePaymentSuccess = () => {
    navigate('/payment-success');
  };

  const handlePaymentFailed = () => {
    navigate('/payment-failed');
  };

  if (isLoading) {
    return (
      <div className="credit-payment-container">
        <div className="credit-payment-loading">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <h2>جاري تحميل صفحة الدفع...</h2>
          <p>يرجى الانتظار بينما نقوم بتوجيهك إلى صفحة الدفع الآمن</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="credit-payment-container">
        <div className="credit-payment-error">
          <div className="error-icon">⚠️</div>
          <h2>خطأ في تحميل صفحة الدفع</h2>
          <p>{error}</p>
          <button onClick={handleBackToCheckout} className="back-btn">
            العودة إلى صفحة الدفع
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="credit-payment-container">
      <div className="credit-payment-header">
        <button onClick={handleBackToCheckout} className="back-btn">
          ← العودة إلى صفحة الدفع
        </button>
        <h1>إتمام الدفع ببطاقة الائتمان</h1>
        <p>يرجى إدخال بيانات بطاقة الائتمان الخاصة بك لإتمام عملية الدفع</p>
      </div>

      <div className="credit-payment-content">
        <div className="payment-webview-container">
          {creditUrl ? (
            <iframe
              src={creditUrl}
              title="Credit Card Payment"
              className="payment-webview"
              frameBorder="0"
              allow="payment"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            />
          ) : (
            <div className="no-payment-url">
              <div className="error-icon">⚠️</div>
              <h3>لا يوجد رابط دفع متاح</h3>
              <p>يرجى العودة إلى صفحة الدفع والمحاولة مرة أخرى</p>
              <button onClick={handleBackToCheckout} className="back-btn">
                العودة إلى صفحة الدفع
              </button>
            </div>
          )}
        </div>

        <div className="payment-info">
          <div className="payment-info-card">
            <h3>معلومات مهمة</h3>
            <ul>
              <li>تأكد من أن بيانات بطاقة الائتمان صحيحة</li>
              <li>سيتم خصم المبلغ من حسابك بعد إتمام العملية</li>
              <li>جميع المعاملات محمية ومشفرة</li>
              <li>ستتلقى تأكيداً بالبريد الإلكتروني بعد إتمام الدفع</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditPayment;
