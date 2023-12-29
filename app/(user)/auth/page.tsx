'use client'

//  style
import '@/app/globals.css'
import style from '@/styles/auth.module.css'

import React, { useState } from "react";

//Components
import Login from "../../component/authentication/login";
import Register from "../../component/authentication/register";
import Link from "next/link";
import { redirect } from 'next/navigation'
import Button from '../../component/button';
import { useUserStore } from '@/zustandStore/usersStore';
import { useMounted } from '@/app/component/useMounted ';

const Auth = () => {

  const [toggle, setToggle] = useState(false);
  const isAuth = useUserStore((state) => state.isAuth);
  const { hasMounted } = useMounted();

  if (hasMounted) {

    if (isAuth)
      return redirect('/');
    else
      return (

        <div className={style.containerAuth} >

          <div className={style.wrapperLoginRegister}>

            <Link className={style.title} href={"/"}>
              {"BOUTIQUE"}
            </Link>

            {toggle ? (
              <div className={style.wrapperRegister}  >

                <Register />

                <div className={style.wrapperQuestion} >
                  <p style={{
                    textAlign: "center",
                    margin: "auto",
                    padding: "5px",
                    fontSize: '10px',
                  }} >Do you have an account?</p>

                  <Button
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    style={{
                      color: "skyBlue",
                      backgroundColor: 'transparent',
                      paddingLeft: '0px',
                      marginLeft: '0px',
                      fontSize: '15px',
                    }}
                    textButton={'Login'}
                  />

                </div>

              </div>

            ) : (

              <div className={style.wrapperLogin} >

                <Login />

                <div className={style.wrapperQuestion} >
                  <p style={{
                    textAlign: "center",
                    margin: "auto",
                    padding: "5px",
                    fontSize: '10px',
                  }} >
                    Don't you have an account?{" "}
                  </p>

                  <Button
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                    style={{
                      color: "skyBlue",
                      backgroundColor: 'transparent',
                      padding: '0px',
                      fontSize: '15px',
                    }}
                    textButton={'Register'}
                  />
                </div>

              </div>
            )}

          </div>

        </div >
      )

  }

};

export default Auth;