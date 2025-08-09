import { RootState } from "../RootReducers";

export const selectCart = (state) => state.cart.cart;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartErrorMessage = (state) => state.cart.errorMessage;
export const selectCartCouponCode = (state) => state.cart.couponCode;
export const selectCartCouponDiscount = (state) => state.cart.couponDiscount;
export const selectCartCouponApplied = (state) => state.cart.couponApplied;
export const selectCartCouponValid = (state) => state.cart.couponValid;
export const selectCartCouponExpired = (state) => state.cart.couponExpired;
export const selectCartCouponInvalid = (state) => state.cart.couponInvalid;
