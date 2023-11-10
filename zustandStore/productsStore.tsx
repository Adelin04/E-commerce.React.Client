import { IProduct } from "@/interfaces/interfaces";
import { create } from "zustand";

interface ProductState {
    products: Array<any>,
    filteredProducts: Array<any> | null,
    productById: any | null,
    productByName: any | null,
    categoriesProductAvailable: any | null,
    superCategoriesProductAvailable: any | null,
    sizesProductAvailable: any | null,
    newProductsAdded: [],
    selectedProduct: IProduct | null,
}

// Initialize a default state
const INITIAL_STATE: ProductState = {
    products: [],
    filteredProducts: null,
    productById: null,
    productByName: null,
    categoriesProductAvailable: null,
    superCategoriesProductAvailable: null,
    sizesProductAvailable: null,
    newProductsAdded: [],
    selectedProduct: null,
}

export const useProductsStore = create((set: any, get: any) => ({
    products: INITIAL_STATE.products,
    filteredProducts: INITIAL_STATE.filteredProducts,
    productById: INITIAL_STATE.productById,
    productByName: INITIAL_STATE.productByName,
    categoriesProductAvailable: INITIAL_STATE.categoriesProductAvailable,
    superCategoriesProductAvailable: INITIAL_STATE.superCategoriesProductAvailable,
    sizesProductAvailable: INITIAL_STATE.sizesProductAvailable,
    newProductsAdded: INITIAL_STATE.newProductsAdded,
    selectedProduct: INITIAL_STATE.selectedProduct,

    setProducts: (productsList: IProduct[]) => {
        set(() => ({
            products: productsList
        }))
        const products = get().products
    },

    setSelectedProduct: (product: IProduct) => {
        set(() => ({
            selectedProduct: product

        }))
    },

    addNewProduct: (newProduct: any) => {
        set((state: ProductState) => ({
            products: [...state.products, newProduct as IProduct]
        }))
    },

    setProductsByCategory: (category: string) => {
        const currentStateProducts = get().products

        const filteredProductsByCategory = currentStateProducts.filter((product: any) => category.toString().toLowerCase() === product.categoryProduct.name.toString().toLowerCase())

        set(() => ({
            filteredProducts: filteredProductsByCategory
        }))
    },

    setProductByValueSearched: (input: string) => {

        let regexResultByName = new RegExp(`${input.toString().toLowerCase()}`);

        const filteredRegexResultByName = get().products.filter((product: IProduct) => regexResultByName.exec(product.name.toString().toLowerCase()))

        if (filteredRegexResultByName !== null && filteredRegexResultByName !== undefined && input !== '')
            set(() => ({ filteredProducts: filteredRegexResultByName }))
        else
            set(() => ({ filteredProducts: null }))
    },

    resetFilters: () => {
        set(() => ({ filteredProducts: null }))
    },

    getAllCategoriesProductAvailable: (listOfCategories: []) => {
        set(() => ({
            categoriesProductAvailable: listOfCategories
        }))
    },

    getAllSuperCategoriesProductAvailable: (listOfSuperCategories: []) => {
        set(() => ({
            superCategoriesProductAvailable: listOfSuperCategories
        }))
    },

    getAllSizesProductAvailable: (sizes: []) => {
        set(() => ({
            sizesProductAvailable: sizes
        }))
    },

    addListOfNewProduct: (addNewProductToList: IProduct) => {
        set((state: ProductState) => ({
            newProductsAdded: [...state.newProductsAdded, addNewProductToList]
        }))
    },



    deleteProductById: (idTarget: string) => {
        const filteredProducts = get().products.filter((product: IProduct) => Number(product.id) !== Number(idTarget));
        set(() => ({
            products: filteredProducts
        }))
    },

    deleteProductByName: (nameTarget: string) => {
        const filteredProducts = get().products.filter((product: IProduct) => product.name !== nameTarget);
        set(() => ({
            products: filteredProducts
        }))
    },

    deleteCategoryProductByName: (categoryTarget: string) => {
        const filteredCategoryProduct = get().categoriesProductAvailable.filter((category: any) => category.name !== categoryTarget)
        set(() => ({
            categoriesProductAvailable: filteredCategoryProduct
        }))

    },

    removeFromListOfNewProduct: (removeId: number) => {
        let TMP_LIST = get().newProductsAdded.filter((product: any) => parseInt(product.id) !== removeId)
        set(() => ({
            newProductsAdded: TMP_LIST
        }))
    }



}));