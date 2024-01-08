'use client'

import '@/app/globals.css'

import { IProduct } from "@/interfaces/interfaces";
import { useBasketStore } from "@/zustandStore/basketStore";
import { useProductsStore } from "@/zustandStore/productsStore";
import { SerializeProduct } from "./component/serializeProduct";
import jwt_decode from "jwt-decode";
import { useUserStore } from "@/zustandStore/usersStore";
import React, { useEffect } from "react";

interface PropsSetGlobalState {
    success: boolean,
    products: Array<IProduct>
    children: React.ReactNode
}


const SetGlobalState = ({ products, success, children }: PropsSetGlobalState) => {
    const setProducts = useProductsStore((state) => state.setProducts);
    const login = useUserStore((state) => state.login);
    const { addProductToBasket } = useBasketStore((state) => state);
    let token: string = '';
    let basket: string = '';

    useEffect(() => {

        
        setState()

    }, [])

    const setState = () => {
        if (success) {
            console.log(products);
            
            setProducts(products)

            if ('BASKET' in localStorage) {
                const basketByUser = JSON.parse(localStorage.getItem("BASKET") || '');

                basketByUser?.map((productBasket: any) => {
                    let filteredProducts = products.filter((product: any) => product.id === productBasket.productId)[0] as IProduct

                    //Update Zustand Store
                    addProductToBasket(
                        SerializeProduct(filteredProducts),
                        productBasket.quantity,
                        productBasket.size,
                    )

                })
            }


            //check and verify if exist token
            if ("TOKEN_ACCESS" in localStorage) {
                const token = localStorage.getItem("TOKEN_ACCESS") || '';
                let TMP_USER = [];

                const decoded_user: any = jwt_decode(token); // decode token

                for (const claim in decoded_user) {
                    if (Object.hasOwnProperty.call(decoded_user, claim)) {
                        TMP_USER.push(decoded_user[claim]);
                    }
                }

                const userLogged = {
                    email: TMP_USER[2],
                    firstName: TMP_USER[0],
                    lastName: TMP_USER[1],
                    role: [TMP_USER[3]],
                    timeExpirationsToken: TMP_USER[4],
                }

                //zustand -- set global user
                login(
                    userLogged,
                    token,
                );
            }

        }
    }


    return (
        <div className='globalState h-[100%]'>
            {children}
        </div>
    )
}

export default SetGlobalState;
