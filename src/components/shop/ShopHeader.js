import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ShopHeader = ({ sortBy, onSortChange }) => {
  const { t } = useLanguage();

  return (
    <div className="shop-top-wrap">
      <div className="row">
        <div className="col-md-6">
          <div className="shop-top-left">
            <p className="woocommerce-result-count shop-show-result">
              {t('shop.showingResults', { from: 1, to: 6, total: 18 })}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="shop-top-right selection">
            <form className="woocommerce-ordering mb-0" method="get">
              <select 
                id="shortBy" 
                name="orderby" 
                className="orderby form-select" 
                aria-label="Shop order"
                value={sortBy}
                onChange={onSortChange}
              >
                <option value="menu_order">{t('shop.sorting.default')}</option>
                <option value="popularity">{t('shop.sorting.popularity')}</option>
                <option value="rating">{t('shop.sorting.rating')}</option>
                <option value="date">{t('shop.sorting.latest')}</option>
                <option value="price">{t('shop.sorting.priceLowToHigh')}</option>
                <option value="price-desc">{t('shop.sorting.priceHighToLow')}</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
