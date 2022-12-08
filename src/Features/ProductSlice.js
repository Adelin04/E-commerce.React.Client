import { createSlice, current } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    filteredProducts: null,
    productById: null,
    productByName: null,
    searchedValue: null
  },
  reducers: {

    getAllProducts: (state, action) => {
      const currentState = current(state);
      state.products = action.payload.products;
    },

    getProductsByCategory: (state, action) => {
      const currentState = current(state);
      const productsByCategory = currentState.products.filter(
        (product) => product.category === action.payload.category)

      state.filteredProducts = productsByCategory;
    },

    getProductById: (state, action) => {
      const currentState = current(state);
      const productById = currentState.products.filter(
        (product) => product.id.toString() === action.payload.toString()
      );
      state.productById = productById
    },

    getProductByName: (state, action) => {
      const currentState = current(state);
      const productByName = currentState.products.products.filter(
        (product) => product.name === action.payload
      );

      state.productByName = productByName
    },




    getProductByValueSearched: (state, action) => {
      const currentState = current(state);
      let regexIdProduct_forAdmin = new RegExp(`${action.payload}`);
      let regexNameProduct = new RegExp(`${action.payload.toString().toLowerCase()}`);

      const tmp_getProductById = currentState.products && currentState.products.filter((product) => regexIdProduct_forAdmin.exec(product._id))
      const tmp_getProductByName = currentState.products && currentState.products.filter((product) => regexNameProduct.exec(product.name.toString().toLowerCase()))

      if (tmp_getProductById !== null && tmp_getProductById !== undefined)
        state.filteredProducts = tmp_getProductById;

      if (tmp_getProductByName !== null && tmp_getProductByName !== undefined)
      state.filteredProducts = tmp_getProductByName;
      else
      state.filteredProducts = null;

    },

    resetFilterCategory: (state, action) => {
      state.filteredProducts = action.payload.reset;
    }


  },
});

export const { getAllProducts, getProductById, getProductByName, getProductsByCategory, getProductByValueSearched, resetFilterCategory } = ProductSlice.actions;
export const selectProduct = (state) => state.products;
export default ProductSlice.reducer;
