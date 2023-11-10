
import { IProduct } from '@/interfaces/interfaces'
import { create } from 'zustand'

interface BasketState {
    basket: Array<IProduct>,
    counterProduct: number,
    totalPrice: number,
    currency: string
}

const INITIAL_STATE = {
    basket: [],
    counterProduct: 0,
    totalPrice: 0,
    currency: ''
} as BasketState;

export const useBasketStore = create((set: any, get: any) => ({
    basket: INITIAL_STATE.basket,
    counterProduct: INITIAL_STATE.counterProduct,
    totalPrice: INITIAL_STATE.totalPrice,
    currency: INITIAL_STATE.currency,

    addProductToBasket: (product: IProduct, quantity: number, size: string) => {

        //  SAVE THE NEW PRODUCT ADDED
        let newProduct: any = product;

        //  INCREASE THE COUNTER WITH NEW QUANTITY ADDED
        set((state: any) => ({ counterProduct: get().counterProduct + quantity }))

        //  SETT THE NEW QUANTITY AND SIZE OF THE CURRENT ADDED PRODUCT
        let productQtySize = {
            quantity: quantity,
            size: size,
        };

        let existProduct: any = get().basket.filter(
            (existProduct: any) => {
                return existProduct.id === newProduct.id
            }
        );

        //  CHECK IF THE 'EXISTPRODUCT' IS AN ARRAY AND IF IT IS GREATER THEN 0...
        //  IF CONDITION IS TRUE THIS MEANS IT IS THE FIRST PRODUCT ADDED
        if (Array.isArray(existProduct) && existProduct.length === 0) {
            newProduct.quantityPerSize = [productQtySize];
            set((state: BasketState) => ({ basket: [...state.basket, newProduct as IProduct] }))
        } else {
            //  REST OF PRODUCT LIST
            let restOfProductsFromList = get().basket.filter((product: any) => product.id !== newProduct.id);

            //  COPY THE PRODUCT QUANTITY AND SIZE TO UPDATE THE PRODUCT QUANTITY REQUESTED BY THE CUSTOMER
            let productQtySizeUpdated: any = {
            }

            //  UPDATE THE QUANTITY SIZE
            existProduct[0].quantityPerSize.map((qtySize: any) => {
                if (qtySize.size === size) {
                    productQtySizeUpdated['quantity'] = qtySize.quantity + quantity;
                    productQtySizeUpdated['size'] = qtySize.size
                    return
                }
            })

            let restOfQtySize = existProduct[0].quantityPerSize.filter((existProductQtySize: any) => {
                return size !== existProductQtySize.size
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
            set((state: any) => ({ basket: [...restOfProductsFromList, TMP_PRODUCT] }))
        }

        //  UPDATE THE TOTAL PRICE
        if (Array.isArray(get().basket) && get().basket.length > 0) {
            set((state: any) => ({ totalPrice: calculateTotalPrice(get().basket) }))
        }

        //  UPDATE THE CURRENCY
        set((state: any) => ({ currency: get().basket[0].currency }))
    },

    resetBasket: () => {
        set(() => ({
            basket: INITIAL_STATE.basket,
            counterProduct: INITIAL_STATE.counterProduct,
            totalPrice: INITIAL_STATE.totalPrice,
            currency: INITIAL_STATE.currency,
        }))
    },

    incrementCounter: (productId: number, indexItem: number, size: string) => {
        const updatedProduct = get().basket.filter((productfiltered: IProduct) => productfiltered.id === productId)[0]
        let TMP_localStorage = JSON.parse(localStorage.getItem('BASKET') || '');

        //  update the state
        updatedProduct.quantityPerSize[indexItem]['quantity'] += 1
        set((state: any) => ({ counterProduct: state.counterProduct + 1 }));
        set((state: any) => ({ totalPrice: get().totalPrice + updatedProduct.price }))

        //  update localStorage BASKET
        TMP_localStorage.map((item: any) => {
            if (item.productId === productId) {
                item['quantity'] += 1
            }
        })
        localStorage.setItem('BASKET', JSON.stringify(TMP_localStorage))
    },

    decrementCounter: (productId: number, indexItem: number, size: string) => {
        let updatedProduct = get().basket.filter((product: IProduct) => productId === product.id)
        let TMP_localStorage = JSON.parse(localStorage.getItem('BASKET') || '');

        //  UPDATE THE STATE
        get().basket.map((product: any) => {
            product.quantityPerSize.map((quantity_size: any) => {

                //  I check if the product ID and size you clicked exists in the shopping cart and after that I will update the status
                if (product.id === productId && quantity_size.size === size) {
                    let indexOfCurrentItem = get().basket.indexOf(product);  //  extract the index of current item
                    let indexOfCurrentQuantity_size = product.quantityPerSize.indexOf(quantity_size);  //  extract the index of current array of quantity and size

                    //  if quantity - 1 = 0 I will remove current obj with size and quantity else I will subtract a piece
                    (quantity_size.quantity - 1) === 0 ? product.quantityPerSize.splice(indexOfCurrentQuantity_size, 1) : quantity_size.quantity -= 1

                    //  remove product from shopping cart if list of size and quantity is empty for current product
                    if (product.quantityPerSize.length === 0) {
                        get().basket.splice(indexOfCurrentItem, 1);
                    }
                }
            })

        }
        );

        set((state: any) => ({ counterProduct: state.counterProduct - 1 }));
        set((state: any) => ({ totalPrice: get().totalPrice - updatedProduct[0].price }))

        //  UPDATE LOCALSTORAGE BASKET
        TMP_localStorage.map((item: any) => {
            if (item.productId === productId && item.size === size) {
                (item.quantity - 1) === 0 ? TMP_localStorage.splice(TMP_localStorage.indexOf(item), 1) : item.quantity -= 1
            }
        });

        localStorage.setItem('BASKET', JSON.stringify(TMP_localStorage))
    },


    removeProduct: (productId: number, quantity: number, size: string) => {
        //  FILTERED CURRENT STATE FOR TARGET PRODUCT
        let removedProduct = get().basket.filter((product: IProduct) => product.id === productId)[0]
        //  FILTERED CURRENT STATE FOR PRODUCTS WITHOUT TARGET PRODUCT
        let restOfProductsFromList = get().basket.filter((product: IProduct) => product.id !== productId)

        // USE A TEMPORARY LIST WHERE I PUSH ALL DIMENSIONS OTHER THAN THE ONE SELECTED TO REMOVE
        let tmpListQtySizes: any = []

        removedProduct.quantityPerSize.map((qtySize: any) => {
            if (qtySize.size !== size) {
                tmpListQtySizes.push(qtySize)
            }
        })

        //   USE A TEMPORARY OBJECT FOR UPDATE THE TARGET PRODUCT
        const TMP_PRODUCT = {
            id: removedProduct.id,
            color: removedProduct.color,
            createdAt: removedProduct.createdAt,
            updatedAt: removedProduct.updateAt,
            currency: removedProduct.currency,
            description: removedProduct.description,
            name: removedProduct.name,
            productImages: removedProduct.productImages,
            price: removedProduct.price,
            quantityPerSize: tmpListQtySizes,
            stock: removedProduct.stock,
        };
        //  UPDATE THE STATE
        set((state: any) => ({ basket: [...restOfProductsFromList, TMP_PRODUCT] }))

        // UPDATE THE COUNTER PRODUCTS
        set((state: any) => ({ counterProduct: state.counterProduct - removedProduct.quantityPerSize[0].quantity }));

        // UPDATE THE TOTAL PRICE
        set((state: any) => ({ totalPrice: calculateTotalPrice(get().basket) }))
    }


}))

//  METHOD FOR CALCULATE THE TOTAL PRICE
const calculateTotalPrice = (basket: Array<any>) => {
    let totalPrice = 0;

    basket && basket.map((product: any) => {

        product &&
            product.quantityPerSize.map((detailProduct: any) => {
                totalPrice += product.price * detailProduct.quantity;
            });
    });
    return totalPrice;
};