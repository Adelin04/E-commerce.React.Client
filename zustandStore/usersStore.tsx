import { IUser } from '../interfaces/interfaces';
import { create } from 'zustand'

interface UserState {
    isAuth: boolean,
    isAdmin: boolean,
    user: IUser | null,
    token: string | null,
    addresses: [] | null,
    selectedAddress: any
}

// Initialize a default state
const INITIAL_STATE: UserState = {
    isAuth: false,
    isAdmin: false,
    user: null,
    token: '',
    addresses: [],
    selectedAddress: []
} as UserState;


export const useUserStore = create((set: any, get: any) => ({
    isAuth: INITIAL_STATE.isAuth,
    isAdmin: INITIAL_STATE.isAdmin,
    user: INITIAL_STATE.user,
    token: INITIAL_STATE.token,
    addresses: INITIAL_STATE.addresses,
    selectedAddress: INITIAL_STATE.selectedAddress,

    login: (user: IUser, token: string, addresses?: [], selectedAddress?: any) => {
        set(() => ({
            isAuth: true,
            isAdmin: true,
            user: user,
            token: token,
            addresses: addresses,
            selectedAddress: selectedAddress,
        }))
    },
    logout: () => {
        set(() => ({
            isAuth: INITIAL_STATE.isAuth,
            isAdmin: INITIAL_STATE.isAdmin,
            user: INITIAL_STATE.user,
            token: INITIAL_STATE.token,
            addresses: INITIAL_STATE.addresses,
            selectedAddress: INITIAL_STATE.selectedAddress
        }))
        localStorage.clear()
    }
}))
