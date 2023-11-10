"use client"

import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/navbar.module.css';
import LinksMenu from './linksMenu';
import SliderMenu from './sliderMenu';
import { useProductsStore } from '@/zustandStore/productsStore';

const NavBar = (): React.JSX.Element => {
    const { resetFilters } = useProductsStore(state => state)
    let open: boolean = true;
    let close: boolean = false;

    const [indexOfLinkTouched, setIndexOfLinkTouched] = useState<number>(0);
    const [dynamicHeight, setDynamicHeight] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(close);

    const resetAllFilters = () => {
        resetFilters()
    }

    return (
        <div className='containerNavBar flex flex-col justify-center items-center w-full h-auto mx-auto my-2 ' onMouseLeave={() => setToggle(close)} onMouseOver={() => setDynamicHeight(70)}>

            <div className='wrapperLink flex justify-around items-center w-full h-[30px] mb-[65px] text-[22px] font-bold bg-[var(--sliderColor)]'>

                {LinksMenu.map((link, index) => {
                    return (
                        <Link
                            className='link flex justify-center items-center w-auto h-auto text-[20px] font-bold text-black cursor-pointer sm:text-[13px]'
                            href={link.name.toString().toLowerCase()} key={index} onMouseLeave={() => setDynamicHeight(0)} onMouseOver={() => { setIndexOfLinkTouched(index), setDynamicHeight(70), setToggle(open) }} onClick={resetAllFilters}> {link.name} </Link>)
                })}

            </div>
            <SliderMenu indexOfLinkTouched={indexOfLinkTouched} dynamicHeight={dynamicHeight} toggle={toggle} />


        </div >
    )
}

export default NavBar; 