import { createSlice, current } from "@reduxjs/toolkit";
import { URI } from "../_Utils/Dependency";

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

      //  SAVE THE NEW PRODUCT ADDED
      let newProduct = action.payload.newProduct;

      //  INCREASE THE COUNTER WITH NEW QUANTITY ADDED
      state.nrProducts += action.payload.quantity;

      //  SAVE THE NEW QUANTITY AND SIZE OF THE CURRENT ADDED PRODUCT
      let productQtySize = {
        quantity: action.payload.quantity,
        size: action.payload.size,
      };

      let existProduct = currentState.shoppingCartList.filter(
        (product) => product.id === newProduct.id
      );

      //  CHECK IF THE 'EXISTPRODUCT' IS AN ARRAY AND IF IT IS GREATER THEN 0...
      //  IF CONDITION IS TRUE THIS MEANS IT IS THE FIRST PRODUCT ADDED
      if (Array.isArray(existProduct) && existProduct.length === 0) {
        newProduct.quantityPerSize = [productQtySize];
        state.shoppingCartList = [...state.shoppingCartList, newProduct];
      } else {



        //  REST OF PRODUCT LIST
        let restOfProductsFromList = currentState.shoppingCartList.filter((product) => product.id !== newProduct.id);

        //  COPY THE PRODUCT QUANTITY AND SIZE TO UPDATE THE PRODUCT QUANTITY REQUESTED BY THE CUSTOMER
        let productQtySizeUpdated = {}

        //  UPDATE THE QUANTITY SIZE
        existProduct[0].quantityPerSize.map(qtySize => {
          if (qtySize.size === action.payload.size) {
            productQtySizeUpdated.quantity = qtySize.quantity + action.payload.quantity;
            productQtySizeUpdated.size = qtySize.size
            return
          }
        })

        let restOfQtySize = existProduct[0].quantityPerSize.filter((existProductQtySize) => {
          return action.payload.size !== existProductQtySize.size
        })

        //  USE A TEMPORARY OBJECT FOR UPDATE THE TARGET PRODUCT
        const TMP_PRODUCT = {
          id: existProduct[0].id,
          color: existProduct[0].color,
          createdAt: existProduct[0].createdAt,
          updatedAt: existProduct[0].updateAt,
          currency: existProduct[0].currency,
          description: existProduct[0].description,
          name: existProduct[0].name,
          productImages: existProduct[0].productImages,
          price: existProduct[0].price,
          quantityPerSize: [...restOfQtySize, Object.keys(productQtySizeUpdated).length > 0 ? productQtySizeUpdated : productQtySize],
          stock: existProduct[0].stock,
        };
        state.shoppingCartList = [...restOfProductsFromList, TMP_PRODUCT];
      }

      //  CALCULATE THE TOTAL PRICE
      const totalPrice = (state.shoppingCartList !== null || state.shoppingCartList !== null) && calculateTotalPrice(current(state).shoppingCartList);

      //  UPDATE THE TOTAL PRICE
      state.totalPrice = totalPrice;

      //  UPDATE THE CURRENCY
      state.currency = state.shoppingCartList[0].currency;
    },

    resetBasket: (state) => {
      state.nrProducts = 0;
      state.shoppingCartList = [];
      state.totalPrice = 0;
      state.currency = ''
    },

    incrementCounter: (state, action) => {
      const filteredShoppingCart = state.shoppingCartList.filter(product => action.payload.productId === product.id)
      let TMP_localStorage = JSON.parse(localStorage.getItem('BASKET'));

      filteredShoppingCart[0].quantityPerSize[action.payload.indexItem]['quantity'] += 1;

      //  update localStorage BASKET
      TMP_localStorage[action.payload.indexItem]['quantity'] += 1
      localStorage.setItem('BASKET', JSON.stringify(TMP_localStorage))

      //  update the state
      state.nrProducts += 1;
      state.totalPrice += filteredShoppingCart[0].price;
    },

    decrementCounter: (state, action) => {
      let filteredShoppingCart = Array.from(current(state).shoppingCartList).filter(product => action.payload.productId === product.id)
      let TMP_localStorage = JSON.parse(localStorage.getItem('BASKET'));

      //  update the state
      state.shoppingCartList.map(item => {
        item.quantityPerSize.map(quantity_size => {

          //  I check if the product ID and size you clicked exists in the shopping cart and after that I will update the status
          if (item.id === action.payload.productId && quantity_size.size === action.payload.size) {
            let indexOfCurrentItem = current(state.shoppingCartList).indexOf(current(item));  //  extract the index of current item
            let indexOfCurrentQuantity_size = current(item.quantityPerSize).indexOf(current(quantity_size));  //  extract the index of current array of quantity and size

            //  if quantity - 1 = 0 I will remove current obj with size and quantity else I will subtract a piece
            (quantity_size.quantity - 1) === 0 ? item.quantityPerSize.splice(indexOfCurrentQuantity_size, 1) : quantity_size.quantity -= 1

            //  remove product from shopping cart if list of size and quntity is empty for current product
            if (current(item.quantityPerSize).length === 0) {
              state.shoppingCartList.splice(indexOfCurrentItem, 1);
            }
          }
        })

      }
      );

      state.nrProducts -= 1;
      state.totalPrice -= filteredShoppingCart[0].price;

      //  update localStorage BASKET
      TMP_localStorage.map(item => {
        if (item.productId === action.payload.productId && item.size === action.payload.size) {
          (item.quantity - 1) === 0 ? TMP_localStorage.splice(TMP_localStorage.indexOf(item), 1) : item.quantity -= 1
        }
      }
      );
      localStorage.setItem('BASKET', JSON.stringify(TMP_localStorage))
    },

    removeProductFromCart: (state, action) => {
      //  DESTRUCTURING ACTION PAYLOAD
      const { productId, quantity, size } = action.payload

      //  FILTERED CURRENT STATE FOR TARGET PRODUCT
      let filteredCurrentState = current(state).shoppingCartList.filter(product => product.id === action.payload.productId)[0]
      //  FILTERED CURRENT STATE FOR PRODUCTS WITHOUT TARGET PRODUCT
      let restOfProductsFromList = current(state).shoppingCartList.filter(product => product.id !== action.payload.productId)

      // USE A TEMPORARY LIST WHERE YOU PUSH ALL DIMENSIONS OTHER THAN THE ONE SELECTED TO REMOVE
      let tmpListQtySizes = []
      filteredCurrentState.quantityPerSize.map(qtySize => {
        if (qtySize.size !== size) {
          tmpListQtySizes.push(qtySize)
        }
      })

      //   USE A TEMPORARY OBJECT FOR UPDATE THE TARGET PRODUCT
      const TMP_PRODUCT = {
        id: filteredCurrentState.id,
        color: filteredCurrentState.color,
        createdAt: filteredCurrentState.createdAt,
        updatedAt: filteredCurrentState.updateAt,
        currency: filteredCurrentState.currency,
        description: filteredCurrentState.description,
        name: filteredCurrentState.name,
        productImages: filteredCurrentState.productImages,
        price: filteredCurrentState.price,
        quantityPerSize: tmpListQtySizes,
        stock: filteredCurrentState.stock,
      };
      state.shoppingCartList = [...restOfProductsFromList, TMP_PRODUCT];

      // UPDATE THE COUNTER PRODUCTS
      state.nrProducts -= action.payload.quantity;

      // UPDATE THE TOTAL PRICE
      state.totalPrice = calculateTotalPrice(current(state).shoppingCartList);
    }


  },
});

//  METHOD FOR CALCULATE THE TOTAL PRICE
const calculateTotalPrice = (shoppingCartList) => {
  let totalPrice = 0;

  shoppingCartList && shoppingCartList.map((product) => {
    product &&
      product.quantityPerSize.map((detailProduct) => {
        totalPrice += product.price * detailProduct.quantity;
      });
  });
  return totalPrice;
};

export const { addProductToShoppingCart, resetBasket, incrementCounter, decrementCounter, removeProductFromCart } = ShoppingCartSlice.actions;
export const selectShoppingCart = (state) => state.shoppingCart;
export default ShoppingCartSlice.reducer;

