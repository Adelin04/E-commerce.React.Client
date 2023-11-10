'use client'

//style
import style from '../../styles/header.module.css'

import React, { useState } from "react";
import Link from "next/link";

//  Import Icons
import userProfileDefault from "../../public/userProfile.svg";
import logoIcon from "../../public/logoIcon.svg";

//  Import Components
import NavBar from "./navBar";
import SearchBar from "./searchBar";
import BubbleBasket from "../component/bubbleBasket";
import Image from "next/image";
import UserProfile from "./userProfile";
import { useUserStore } from '@/zustandStore/usersStore';
import { useBasketStore } from '@/zustandStore/basketStore';
import { useMounted } from './useMounted ';

//  Header component
const Header = () => {
  //Fields
  const open = true;
  const close = false;
  const [toggle, setToggle] = useState(close);
  const [inputSearchBar, setInputSearchBar] = useState('')

  //Global State
  const { hasMounted } = useMounted();
  const { user, isAuth } = useUserStore((state) => state);
  const { counterProduct } = useBasketStore((state) => state);


  const handleMouseLeave = () => {
    if (toggle === open) setToggle(close);
  };

  const handleClickTitle = () => {
    // dispatch(resetFilterCategory({ reset: null }));
  }

  return (
    <div className='flex flex-col justify-center items-center w-full'>

      <div className='flex justify-center items-center w-full md:flex-col'>

        {/* wrapper-search */}
        <div className='wrapperSearchBar flex justify-center items-center w-[33.33%] h-full m-1'>
          <SearchBar setInput={setInputSearchBar} />
        </div>

        {/* title */}
        <div className='title flex justify-center items-center w-[33.33%]  h-full m-1'>
          <Link onClick={handleClickTitle}
            className="title flex flex-row justify-center items-center  "
            href={"/"}
          >

            <Image width={60} src={logoIcon} alt="Image logo" />
            <span style={{ margin: "0px 10px", fontSize: '40px', fontWeight: 'bold' }}>BOUTIQUE</span>


          </Link>
        </div>


        {/* wrapper-basket-userProfile */}
        <div className='flex justify-center items-center w-[33.33%]  h-full m-1'>

          <div className='wrapperIcons relative flex justify-center items-center w-[120px] h-[65px]'>
            {/* bubble nr products from basket */}
            <div className="wrapperBubbleBasket absolute flex justify-center items-center left-0 bottom-0 w-auto h-auto" >
              {hasMounted && counterProduct > 0 && <BubbleBasket counterProduct={counterProduct} />}
            </div>


            {/* basket */}
            <div className={style.wrapperBasket}>
              <Link className="basket" href="/basket">
                <Image width={35} src={logoIcon} alt='User Profile Icon' style={{ background: 'var(--baseColor)', borderRadius: '50%', padding: "4px" }} />
              </Link>
            </div>

            {/* helper distance */}
            <div style={{ width: '20px' }}></div>

            {/* user profile */}
            <div className={style.wrapperProfile} onMouseOver={() => setToggle(open)}>

              <Link className="user-profile " href="/profile">
                <Image width={35} src={userProfileDefault} alt='User Profile Icon' style={{ background: 'var(--baseColor)', borderRadius: '50%', padding: "4px" }} />
              </Link>
            </div>

            <div onMouseLeave={handleMouseLeave}>
              {<UserProfile user={user} isAuth={isAuth} toggle={toggle} />}
            </div>

          </div>

        </div>


      </div>

      <div className={style.wrapperNavBar}>
        <NavBar />
      </div>

    </div>
  );
};

export default Header;