import { createSlice, current } from "@reduxjs/toolkit";

const ShoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    shoppingCartList: [],
    nrProducts: 0,
    totalPrice: 0,
    currency: ''
  },
  reducers: {
    addProductToShoppingCart: (state, action) => {
      const currentState = current(state);
      let newProduct = action.payload.newPorduct;
      state.nrProducts += action.payload.quantity;

      let productQtySize = {
        quantity: action.payload.quantity,
        size: action.payload.size,
      };

      let searchedProduct = currentState.shoppingCartList.filter(
        (product) =>  product.id === newProduct.id
      );

      if (searchedProduct.length === 0) {
        newProduct.quantityPerSize = [productQtySize];
        state.shoppingCartList = [...state.shoppingCartList, newProduct];
      } else {
        let TMP_PRODUCT = {};

        let restOfList = currentState.shoppingCartList.filter(
          (product) => product.id !== newProduct.id
        );

        searchedProduct[0].quantityPerSize.forEach((existProductQtySize) => {
          let restOfQtySize = searchedProduct[0].quantityPerSize.filter(
            (item) => item.size !== existProductQtySize.size
          );

          TMP_PRODUCT = {
            id: searchedProduct[0].id,
            color: searchedProduct[0].color,
            createdAt: searchedProduct[0].createdAt,
            updatedAt: searchedProduct[0].updateAt,
            currency: searchedProduct[0].currency,
            description: searchedProduct[0].description,
            name: searchedProduct[0].name,
            productImagePath: searchedProduct[0].productImagePath,
            price: searchedProduct[0].price,
            quantityPerSize:
              existProductQtySize.size === productQtySize.size
                ? [
                  ...restOfQtySize,
                  {
                    quantity:
                      existProductQtySize.quantity + productQtySize.quantity,
                    size: productQtySize.size,
                  },
                ]
                : [
                  ...searchedProduct[0].quantityPerSize,
                  {
                    quantity: productQtySize.quantity,
                    size: productQtySize.size,
                  },
                ],
            stock: searchedProduct[0].stock,
          };
        });
        state.shoppingCartList = [...restOfList, TMP_PRODUCT];
      }

      const totalPrice = state.shoppingCartList && calculateTotalPrice(state.shoppingCartList);
      state.totalPrice = totalPrice;
      state.currency = state.shoppingCartList[0].currency;
    },
  },
});

export const { addProductToShoppingCart } = ShoppingCartSlice.actions;
export const selectShoppingCart = (state) => state.shoppingCart;
export default ShoppingCartSlice.reducer;

const calculateTotalPrice = (shoppingCartList) => {
  let totalPrice = 0;

  shoppingCartList.map((product) => {
    product &&
      product.quantityPerSize.map((detailProduct) => {
        totalPrice += product.price * detailProduct.quantity;
      });
  });
  return totalPrice;
};
