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

      let existProduct = currentState.shoppingCartList.filter(
        (product) => product.id === newProduct.id
      );

      if (existProduct.length === 0) {
        newProduct.quantityPerSize = [productQtySize];
        state.shoppingCartList = [...state.shoppingCartList, newProduct];
      } else {
        let TMP_PRODUCT = {};

        let restOfList = currentState.shoppingCartList.filter(
          (product) => product.id !== newProduct.id
        );

        existProduct[0].quantityPerSize.map((existProductQtySize) => {
          let restOfQtySize = existProduct[0].quantityPerSize.filter(
            (item) => item.size !== existProductQtySize.size
          );

          TMP_PRODUCT = {
            id: existProduct[0].id,
            color: existProduct[0].color,
            createdAt: existProduct[0].createdAt,
            updatedAt: existProduct[0].updateAt,
            currency: existProduct[0].currency,
            description: existProduct[0].description,
            name: existProduct[0].name,
            productImages: existProduct[0].productImages,
            price: existProduct[0].price,
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
                  ...existProduct[0].quantityPerSize,
                  {
                    quantity: productQtySize.quantity,
                    size: productQtySize.size,
                  },
                ],
            stock: existProduct[0].stock,
          };
        });
        state.shoppingCartList = [...restOfList, TMP_PRODUCT];
      }

      const totalPrice = state.shoppingCartList && calculateTotalPrice(state.shoppingCartList);
      state.totalPrice = totalPrice;
      state.currency = state.shoppingCartList[0].currency;
    },

    resetBasket: (state) => {
      state.nrProducts = 0;
      state.shoppingCartList = [];
      state.totalPrice = 0;
      state.currency = ''
    },

    increaseCounter: (state, action) => {
      const filteredShoppingCart = state.shoppingCartList.filter(product => action.payload.productId === product.id)

      filteredShoppingCart[0].quantityPerSize[action.payload.indexItem]['quantity'] += 1;

      state.nrProducts += 1;
      state.totalPrice += filteredShoppingCart[0].price;
    },

    decreaseCounter: (state, action) => {
      let filteredShoppingCart = state.shoppingCartList.filter(product => action.payload.productId === product.id)

      let tmpArray = Array.from(current(state).shoppingCartList.filter(product => action.payload.productId === product.id)[0].quantityPerSize);
      let indexOf = tmpArray[action.payload.indexItem]

      filteredShoppingCart[0].quantityPerSize[action.payload.indexItem]['quantity'] < 2 ?
        filteredShoppingCart[0].quantityPerSize[action.payload.indexItem] = tmpArray.splice(indexOf, 1)
        // state.shoppingCartList = current(state).shoppingCartList.filter(product => product.id !== action.payload.productId)
        :
        filteredShoppingCart[0].quantityPerSize[action.payload.indexItem]['quantity'] -= 1;

      state.nrProducts -= 1;
      state.totalPrice -= filteredShoppingCart[0].price;
    }


  },
});

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

export const { addProductToShoppingCart, resetBasket, increaseCounter, decreaseCounter } = ShoppingCartSlice.actions;
export const selectShoppingCart = (state) => state.shoppingCart;
export default ShoppingCartSlice.reducer;

