import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLanguage } from '../../context/LanguageContext';
import { setCustomer, setResetCart, setCreditUrl } from '../../store/cart/CartSlice';
import { addEmailUserRequest, createOrderService, getCreditUrl } from '../../store/cart/CartService';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';
import { selectAreas, selectCart, selectCartCouponCode, selectCartCouponDiscount, selectCartPaymentType } from '../../store/cart/CartSelectores';
import { selectProducts } from '../../store/Products/ProductsSelectors';
import OrderSummary from './OrderSummary';

const CheckoutForm = ({ onOrderPlaced }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const dropdownRef = useRef(null);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const areas = useSelector(selectAreas);
  const products = useSelector(selectProducts);
  const cart = useSelector(selectCart);
  const couponDiscount = useSelector(selectCartCouponDiscount);
  const couponCode = useSelector(selectCartCouponCode);
  const paymentType = useSelector(selectCartPaymentType);
  const deliveryFee = 30;
  useEffect(() => {
    if (areas && Array.isArray(areas)) {
      setFilteredSuggestions(areas);
    }
  }, [areas]);

  const getSuggestions = useCallback((value) => {
    const inputValue = value.trim().toLowerCase();
    if (inputValue === "") {
      return areas || [];
    }

    return (areas || []).filter((item) =>
      item.name && item.name.toLowerCase().includes(inputValue)
    );
  }, [areas]);

  const [formData, setFormData] = useState({
    address: {
      customer_address: '',
      customer_mobile: '',
      customer_name: '',
      customer_area: '',
      product_note: '',
      email: ''
    },
    marketing: false,
    policy: false,
  });

  // Handler for address fields
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      }
    }));
  };

  const handleAddressChangeArea = useCallback((value) => {
    setFormData(prevData => ({
      ...prevData,
      address: {
        ...prevData.address,
        customer_area: value || '',
      }
    }));
    setInput(value || '');
    setIsOpen(false);
  }, []);

  const handleAreaInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    handleAddressChangeArea(value);
    
    if (value.trim()) {
      const filtered = getSuggestions(value);
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions(areas || []);
      setIsOpen(false);
    }
  };

  const handleAreaSelect = (area) => {
    handleAddressChangeArea(area.name);
  };

  // Handler for checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleProductPrice = (id) => {
    const product = products?.find(a => a._id === id);
    return product ? product.price.toFixed(2) : '0.00';
  };

  const totalPrice = (isCoupon = false) => {
    let sum = 0;
    if (cart && Array.isArray(cart)) {
      cart.forEach((a) => {
        const extraDis = calcaulatePriceDiscount(a.productId);
        sum += (parseFloat(handleProductPrice(a.productId)) * a.quantity - extraDis);
      });
    }
    return isCoupon ? sum * (1 - (couponDiscount || 0) / 100)+deliveryFee : sum+deliveryFee;
  };

  const calcaulatePriceDiscount = (id) => {
    const product = products?.find(a => a._id === id);
    const temp = cart?.find(a => a.productId === id);
    if (!product || !temp) return 0;
    
    if (couponDiscount > 0 && couponCode) {
      return 0;
    }
    if (temp.quantity >= 2) {
      return temp.quantity % 2 === 0 
        ? (temp.quantity * ((product.discountForTwo / 100) * product.price))
        : (temp.quantity - 1) * ((product.discountForTwo / 100) * product.price);
    }
    return 0;
  };

  const handleCreditUrl = async () => {
    const customerTemp = {
      name: formData.address.customer_name,
      mobile: formData.address.customer_mobile,
      email: formData.address.email,
      area: formData.address.customer_area,
      notes: formData.address.product_note,
      isSave: formData.marketing
    };
    const temp = {
      items: cart || [],
      totalPrice: totalPrice(),
      coupon: couponCode,
      paymentType: paymentType,
      customer: customerTemp
    };
    const response = await createOrderService(temp);

    const req = {
      price: totalPrice(couponDiscount > 0 && couponCode),
      clientName: formData.address.customer_name,
      clientLName: formData.address.customer_name,
      phone: formData.address.customer_mobile,
      email: formData.address.email,
      orderId: response?.order?._id,
      demo: false
    };
    return await getCreditUrl(JSON.stringify(req));
  };
    
console.log(paymentType);
  const handleCashOrder = async () => {

    const customerTemp = {
      name: formData.address.customer_name,
      mobile: formData.address.customer_mobile,
      email: formData.address.email,
      area: formData.address.customer_area,
      notes: formData.address.product_note,
      isSave: formData.marketing
    };
    
    const temp = {
      items: cart || [],
      totalPrice: totalPrice(),
      coupon: couponCode,
      paymentType: paymentType,
      customer: customerTemp
    };
    const response = await createOrderService(temp);
  
    if (response) {
      navigate("/payment-success", {
        state: {
          data: response
        },
      });
      dispatch(setResetCart());
    } else {
      navigate("/payment-failed");
    }
  };

  const handleSubmit = async () => {

    setIsLoading(true);
    
    try {
      // Save form data to Redux store
      dispatch(setCustomer(formData));
      
      if (formData.address.customer_area === "") {
        alert(t('cart.areaRequired'));
        setIsLoading(false);
        return;
      }

      // Cash order
      if (paymentType === "cash") {
        await handleCashOrder();
      }
      // Credit order
      else {
        const response = await handleCreditUrl();
        dispatch(setCreditUrl(response));
        navigate("/credit-payment", { state: { creditUrl: response } });
      }

      // Email save
      if (formData.marketing) {
        await addEmailUserRequest({ email: formData.address.email });
      }

      if (onOrderPlaced) {
        onOrderPlaced();
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert(t('cart.orderError'));
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  return (
    <div className="checkout-form-container">
      <h2 className="checkout-form-title">
        {t('cart.customerInfo')}
      </h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Address & Order Info Section */}
        <div className="form-section">
          <div className="form-field">
            <label htmlFor="customer_name">
              {t('cart.customerName')}
            </label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              value={formData.address.customer_name}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="customer_mobile">
              {t('cart.mobile')}
            </label>
            <input
              type="text"
              id="customer_mobile"
              name="customer_mobile"
              value={formData.address.customer_mobile}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="email">
              {t('cart.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.address.email}
              onChange={handleAddressChange}
              required
            />
          </div>

          <div className="form-field" ref={dropdownRef}>
            <label htmlFor="customer_area">
              {t('cart.area')}
            </label>
            <input
              type="text"
              id="customer_area"
              name="customer_area"
              value={input}
              onChange={handleAreaInputChange}
              onFocus={() => setIsOpen(true)}
              placeholder={t('cart.searchArea')}
              required
            />
            {isOpen && filteredSuggestions.length > 0 && (
              <div className="area-dropdown">
                {filteredSuggestions.map((area, index) => (
                  <div
                    key={index}
                    className="area-option"
                    onClick={() => handleAreaSelect(area)}
                  >
                    {area.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="product_note">
              {t('cart.addressNote')}
            </label>
            <textarea
              id="product_note"
              name="product_note"
              value={formData.address.product_note}
              onChange={handleAddressChange}
              rows="3"
            ></textarea>
          </div>
        </div>

        {/* Marketing Checkbox */}
        <div className="form-field checkbox-field">
          <label htmlFor="marketing">
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={formData.marketing}
              onChange={handleCheckboxChange}
            />
            {t('cart.marketing')}
          </label>
        </div>

        {/* Policy Checkbox */}
        <div className="form-field checkbox-field">
          <label htmlFor="policy">
            <input
              type="checkbox"
              id="policy"
              name="policy"
              checked={formData.policy}
              onChange={handleCheckboxChange}
            />
            {t('cart.policy')}
            <span onClick={() => navigate("/policy-privacy")} className='underline'>
              {t('cart.policy3')}
            </span>
            <span onClick={() => navigate("/policy")} className='underline'>
              {t('cart.policy4')}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="col-lg-5">
              <OrderSummary 
                isLoading={isLoading}
                cart={cart}
                onPlaceOrder={handleSubmit}
                order={undefined}
              />
            </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
