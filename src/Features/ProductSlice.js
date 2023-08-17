import { createSlice, current } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: null,
    productById: null,
    productByName: null,
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


      const filteredProductsByCategory = currentState.products && currentState.products.filter((product) => action.payload.category.toString().toLowerCase() === product.categoryProduct.name.toString().toLowerCase())

      state.filteredProducts = filteredProductsByCategory;

    },

    getProductsBySuperCategory: (state, action) => {
      const currentState = current(state);

      const filteredProductsBySuperCategory = currentState.products && currentState.products.filter((product) => action.payload.superCategory.toString().toLowerCase() === product.superCategoryProduct.name.toString().toLowerCase())

      state.filteredProducts = filteredProductsBySuperCategory;
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
      const productByName = currentState.products.filter(
        (product) => product.name === action.payload
      );
      state.productByName = productByName
    },

    getProductByValueSearched: (state, action) => {
      const currentState = current(state);

      let regexResultByName = new RegExp(`${action.payload.toString().toLowerCase()}`);

      const filteredRegexResultByName = currentState.products && currentState.products.filter((product) => regexResultByName.exec(product.name.toString().toLowerCase()))

      if (filteredRegexResultByName !== null && filteredRegexResultByName !== undefined)
        state.filteredProducts = filteredRegexResultByName;
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
      const filteredProduct = currentState.products.filter(product => Number(product.id) !== Number(action.payload.idTarget));

      state.products = filteredProduct;
    },

    deleteProductByName: (state, action) => {
      const currentState = current(state);
      const filteredProduct = currentState.products.filter(product => product.name !== action.payload.nameToRemove);

      state.products = filteredProduct;
    },

    deleteCategoryProductByName: (state, action) => {
      const currentState = current(state);
      // console.log('-> ', action.payload.categoryRemoved);
      const filteredCategoryProduct = currentState.categoriesProductAvailable.filter(category => category.name !== action.payload.categoryRemoved)

      state.categoriesProductAvailable = filteredCategoryProduct;
    },

    removeFromListOfNewProduct: (state, action) => {
      const currentState = current(state);
      let TMP_LIST = currentState.newProductsAdded.filter(product => parseInt(product.id) !== parseInt(action.payload.removeId))

      state.newProductsAdded = TMP_LIST
    }

  },
});

export const { getAllProducts, getProductById, getProductByName, getProductsByCategory, getProductByValueSearched, resetFilterCategory, getAllCategoiesProductAvailable, getAllSizesProductAvailable,getProductsBySuperCategory, addListOfNewProduct, addNewProduct, removeFromListOfNewProduct, deleteProductById, deleteProductByName, deleteCategoryProductByName } = ProductSlice.actions;
export const selectProduct = (state) => state.products;
export default ProductSlice.reducer;
