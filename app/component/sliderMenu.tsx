import React from "react";
import style from '@/styles/slider.module.css';
// import styledComponents from "styled-components";
// import { getProductByName, getProductsByCategory } from "../Features/ProductSlice";
import LinksMenu from './linksMenu'
import Link from "next/link";
import { useProductsStore } from "@/zustandStore/productsStore";

type SliderInterface = {
  indexOfLinkTouched: number,
  dynamicHeight: number,
  toggle: boolean
}

const SliderMenu = ({ indexOfLinkTouched, dynamicHeight, toggle }: SliderInterface): React.JSX.Element => {
  const { setProductsByCategory } = useProductsStore(state => state)

  const setFilteredProductsByCategory = (category: string) => {
    setProductsByCategory(category)
  }

  return (
    <div className="containerSliderMenu relative flex flex-col justify-center items-center w-full h-auto">

      < div className="wrapperLinks absolute flex justify-start items-center top-[-65px] pl-[50px] w-full h-[25px] bg-[var(--sliderColor)] transition-all delay-2000 duration-1000" style={{ height: `${toggle && dynamicHeight || 0}px` }}>

        <div className={`${toggle ?
          'backgroundLinks flex  justify-center items-center w-auto h-[25px] bg-[var(--sliderColor)] rounded-md transition-all delay-2000 duration-1000'
          :
          'none'
          }`}>

          {LinksMenu[indexOfLinkTouched].subLinks.map((subLink: any, index: number) => {
            return (
              <div key={index} className={style.subLink} >
                {/* <Link className={style.linkSlider} href={subLink.to.toString().toLowerCase()} >
                </Link> */}
                <div className={style.linkSlider}>
                  <p className={`${toggle ? 'visible transition-opacity delay-3000' : 'hidden'}`} onClick={() => setFilteredProductsByCategory(subLink.name)}>{subLink.name}</p>
                </div>
              </div>
            );
          })}

        </div>
      </div>

    </div >
  )
}

export default SliderMenu;
