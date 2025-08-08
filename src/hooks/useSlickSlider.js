import { useEffect } from 'react';

export const useSlickSlider = (selector, options = {}) => {
  useEffect(() => {
    // Wait for jQuery and Slick to be available
    const initSlider = () => {
      if (window.jQuery && window.jQuery.fn.slick) {
        const $element = window.jQuery(selector);
        if ($element.length && !$element.hasClass('slick-initialized')) {
          $element.slick(options);
        }
      } else {
        // Retry after a short delay if jQuery/Slick isn't ready
        setTimeout(initSlider, 100);
      }
    };

    initSlider();

    // Cleanup function
    return () => {
      if (window.jQuery) {
        const $element = window.jQuery(selector);
        if ($element.hasClass('slick-initialized')) {
          $element.slick('unslick');
        }
      }
    };
  }, [selector, JSON.stringify(options)]);
};
