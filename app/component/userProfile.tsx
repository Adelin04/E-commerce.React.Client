'use client'

// ~
import React from "react";
import Image from "next/image";
import Link from 'next/link';

//import Components
import style from '@/styles/userProfile.module.css';
import Button from "./button";
import settingUser from "../../public/settingUser.svg";
import { IUser } from '../../interfaces/interfaces';
import { useUserStore } from '@/zustandStore/usersStore';
import { useBasketStore } from "@/zustandStore/basketStore";


type PropsUserProfile = {
    user: IUser,
    isAuth: boolean,
    toggle: boolean
}

const UserProfile = ({ user, toggle, isAuth }: PropsUserProfile) => {
    const open = toggle;
    const logout = useUserStore(state => state.logout)
    const { resetBasket } = useBasketStore(state => state)

    return (
        <div className=" absolute right-0 top-10 flex  flex-col justify-around items-center w-max h-full z-10">

            <div className={`${open && ' flex bg-[var(--baseColor)] w-max h-max p-1 transition-all delay-3000 rounded-lg'}`} >

                {open &&
                    <div className="flex flex-col justify-between items-center w-full h-full " >

                        <div className="flex justify-between items-center w-full ">
                            <div className="flex justify-center items-center">
                                {isAuth &&
                                    <Link href={"/"}>
                                        <div  className='flex justify-center items-center  '>
                                                <Image width={20} height={20} src={settingUser} alt='logo Icon' />
                                        </div>
                                    </Link>
                                }
                            </div>

                            <div className="flex justify-around items-center m-2 ">
                                <div className="flex justify-center items-center p-1" >
                                    <span className="font-bold text-[17px]">
                                        {isAuth && user.firstName} {user && user.lastName}
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="flex justify-around items-center w-max h-max">
                            <div className="flex justify-around items-center w-max h-max">
                                {isAuth && user.role.includes("ADMIN") &&
                                    <Button style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '13px' }}>
                                        <Link href={'/dashboard'}>Dashboard</Link>
                                    </Button>
                                }
                            </div>

                            <div className="flex justify-around items-center w-max h-max">
                                {isAuth ?
                                    (
                                        <Button style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '13px' }}
                                            textButton={"Logout"}
                                            onClick={() => { logout(); resetBasket() }}
                                        />
                                    )
                                    :
                                    (
                                        <Button style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '13px' }}>
                                            <Link href={'/auth'} >LogIn</Link>
                                        </Button>
                                    )}
                            </div>

                        </div>


                    </div>}

            </div>


        </div >
    );
};

export default UserProfile;
