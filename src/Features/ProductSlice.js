import { createSlice, current } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: null,
    productById: null,
    productByName: null,
    searchedValue: null,
    categoriesProductAvailable: null,
    sizesProductAvailable: null,
    newProductsAdded: []
  },
  reducers: {

    getAllProducts: (state, action) => {
      // const currentState = current(state);
      state.products = action.payload.products;
    },

    getProductsByCategory: (state, action) => {
      const currentState = current(state);

      const productsByCategory = currentState.products.filter(
        (product) => product.categoryProduct.name.toLowerCase() === action.payload.category.toLowerCase()
      )

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

      const tmp_getProductById = currentState.products && currentState.products.filter((product) => regexIdProduct_forAdmin.exec(product.id))
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
    },

    getAllCategoiesProductAvailable: (state, action) => {
      state.categoriesProductAvailable = action.payload.allCategoriesProduct;
    },

    getAllSizesProductAvailable: (state, action) => {
      state.sizesProductAvailable = action.payload.allSizesProduct;
    },

    addListOfNewProduct: (state, action) => {
      state.newProductsAdded.push(action.payload.listOfNewProduct);
    },

    addNewProduct: (state, action) => {
      return { ...state, products: [...state.products, action.payload.newProduct] }
    },

    deleteProductById: (state, action) => {
      const currentState = current(state);
      const filteredProduct = currentState.products.filter(product => product.id.toString() !== action.payload.idTarget.toString());

      state.products = filteredProduct;
    },

    removeFromListOfNewProduct: (state, action) => {
      const currentState = current(state);
      let TMP_LIST = currentState.newProductsAdded.filter(product => parseInt(product.id) !== parseInt(action.payload.removeId))

      state.newProductsAdded = TMP_LIST
    }

  },
});

export const { getAllProducts, getProductById, getProductByName, getProductsByCategory, getProductByValueSearched, resetFilterCategory, getAllCategoiesProductAvailable, getAllSizesProductAvailable, addListOfNewProduct, addNewProduct, removeFromListOfNewProduct, deleteProductById } = ProductSlice.actions;
export const selectProduct = (state) => state.products;
export default ProductSlice.reducer;
