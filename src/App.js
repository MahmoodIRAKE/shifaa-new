import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store/store';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navigation from './components/Navigation';
import Index from './pages/Index';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ShopDetails from './pages/ShopDetails';
import ArticleItem from './pages/ArticleItem';
import CreditPayment from './pages/CreditPayment';
import PaymentSuccess from './pages/PaymentSuccess';
import './App.css';


function AppContent() {
  const { isRTL } = useLanguage();
  
  return (
    <Router>
      <div className={`App ${isRTL ? 'rtl' : 'ltr'}`}>
        {/* <Navigation /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:productId" element={<ShopDetails />} />
            <Route path="/article/:articleId" element={<ArticleItem />} />
            <Route path="/credit-payment" element={<CreditPayment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            {/* Add more routes here as you create more pages */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
