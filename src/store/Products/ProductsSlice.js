import { createSlice } from "@reduxjs/toolkit";
import { getProductsThunk } from "./ProductsThunk";

const initialState = {
  products: [],
  mainProduct: null,
  resetProducts: 0,
  error: false,
  isPageExpand: false,
  loading: false,
  errorMessage: null,
};

export const ProductsSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: { 
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setResetProducts: (state) => {
      state.resetProducts = state.resetProducts + 1;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
    setMainProduct: (state, action) => {
      state.mainProduct = action.payload;
    },
    setIsPageExpand: (state, action) => {
      state.isPageExpand = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = false;
        state.errorMessage = null;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { setProducts, setResetProducts, setProductsError, setMainProduct, setIsPageExpand } = ProductsSlice.actions;
export default ProductsSlice.reducer;