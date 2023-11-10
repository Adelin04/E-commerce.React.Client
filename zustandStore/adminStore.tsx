import { IProduct } from "@/interfaces/interfaces";
import { create } from "zustand";


interface AdminStore {
    productClickedToEdit: IProduct | null
}

const INITIAL_STATE = {
    productClickedToEdit: null
}

export const useAdminStore = create((set: any, get: any) => ({
    productClickedToEdit: INITIAL_STATE.productClickedToEdit || null,

    //ACTIONS
    setProductClickedToEdit: (product: IProduct) => {
        set(() => ({
            productClickedToEdit: product || null
        }))
    },

    cleanProductClickedToEdit: () => {
        set(() => ({
            productClickedToEdit: null
        }))
    }
}))