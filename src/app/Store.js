import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import productsReducer from "../Features/ProductSlice";
import shoppingCartReducer from "../Features/ShoppingCartSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
  },
});
