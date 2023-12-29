"use client"

//import style
import style from '@/styles/auth.module.css'

import { useState } from 'react';
import Button from '../button';
import jwt_decode from "jwt-decode";
import { URI } from '@/utils/globalUri';
import { redirect } from 'next/navigation';
import { IProduct, IUser } from '@/interfaces/interfaces';
import { useUserStore } from '@/zustandStore/usersStore';
import { useBasketStore } from '@/zustandStore/basketStore';
import { useProductsStore } from '@/zustandStore/productsStore';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgButton, setMsgButton] = useState("Login");
    const [error, setError] = useState('');

    const { login } = useUserStore((state) => state);
    const { addProductToBasket } = useBasketStore((state) => state);
    const { products } = useProductsStore((state) => state);

    const goHome = () => {
        redirect("/");
    };


    const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setMsgButton("Loading");

        const payload = {
            email: email,
            password: password,
        };

        await fetch(`${URI}Auth/v1/login`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {

                const { success, token, basketByUser, addressUser, message } = data;

                let TMP_USER: Array<any> = [];
                let TMP_BASKET: Array<any> = [];

                if (success) {
                    token && localStorage.setItem("TOKEN_ACCESS", `Bearer ${token}`);

                    basketByUser && JSON.stringify(basketByUser.items.map((product: any, index: number) => {
                        TMP_BASKET.push({ productId: product.productId, quantity: product.quantity, size: product.size });

                        products.map((productItem: IProduct) => {
                            if (productItem.id === product.productId)
                                addProductToBasket(productItem, product.quantity, product.size)
                        })

                    }))

                    localStorage.setItem("BASKET", JSON.stringify(TMP_BASKET));

                    const decoded_user: any = jwt_decode(token); // decode your token here
                    for (const claim in decoded_user) {
                        if (Object.hasOwnProperty.call(decoded_user, claim)) {
                            TMP_USER.push(decoded_user[claim]);
                        }
                    }

                    const userLogged = {
                        email: TMP_USER[2].toString(),
                        firstName: TMP_USER[0].toString(),
                        lastName: TMP_USER[1].toString(),
                        role: [TMP_USER[3]],
                        timeExpirationsToken: TMP_USER[4].toString(),
                    } as IUser;

                    //zustand -- set global user
                    login(
                        userLogged,
                        token,
                        addressUser
                    );

                    goHome();
                    setMsgButton("Login");
                }
                else setError(message.toString().trim())
            })
            .catch((error) => {
                setError(error);
                setMsgButton("Login");
            })

    }

    return (
        <div className={style.containerLogin} >

            <form className={style.formLogin} onSubmit={onSubmitLogin}>

                {error && <p role="alert" className='error text-[var(--error)] text-center text-[13px] p-1 m-1'>
                    {error}
                </p>}

                <label htmlFor="email" className={style.labelLogin} >Email</label>
                <input
                    className={style.inputLoginRegister}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    autoFocus={true}
                    required
                    type="email"
                    id="email"
                    name="email"
                />

                <label htmlFor="password" className={style.labelLogin}>Password</label>
                <input className={style.inputLoginRegister}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    value={password}
                    required
                    id="password"
                    name="password"
                />
                <Button role='button' textButton={"LogIn"} />
            </form >

        </div >
    );
}

export default Login;