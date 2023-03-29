import React from "react";
import styledComponents from "styled-components";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductsByCategory } from "../Features/ProductSlice";
import { LinksMenu } from '../components/LinksMenu'

const SliderMenu = ({
  indexOfLinkTouched, dynamicHeight, toggle

}) => {
  const dispatch = useDispatch();

  const handleDispatch_ProductByCategory = (category) => {
    // console.log('category --> ',category);
    dispatch(
      getProductsByCategory({ category })
    )
  }

  return (
    <Wrapper>
      < div className='wrapperLinks' style={{ height: `${toggle && dynamicHeight || 0}px` }}>

        <div className='backgroundLinks' style={{ visibility: `${toggle ? 'visible' : 'hidden'}`, transition: 'visibility 0.3s' }}>


          {LinksMenu[indexOfLinkTouched].subLinks.map((subLink, index) => {
            return (
              <div key={index} className='subLink' >
                <NavLink className='linkSlider' to={LinksMenu[indexOfLinkTouched].to} onClick={() => handleDispatch_ProductByCategory(subLink.name)} > <p style={{ visibility: `${toggle ? 'visible' : 'collapse'}`, transition: 'visibility 0.1s' }}>{subLink.name}</p> </NavLink>
              </div>
            );
          })}

        </div>
      </div>

    </Wrapper>
  );
};

export default SliderMenu;

const Wrapper = styledComponents.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;


.wrapperLinks {
  position: absolute;
  top: -65px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: -webkit-fill-available;
  height: 25px;
  transition: height 1s;
  background-color: var(--sliderColor);
  margin: auto;
}

.backgroundLinks {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 25px;
  margin: auto;
  background-color: var(--sliderColor);
  border-radius: 10px;
}

.subLink {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height:auto;
}

.subLink p {
  margin: 0px 15px;
}

.linkSlider {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: auto;
  height: 25px;
  text-decoration: none;
  font-size: 15px;
  font-weight: bold;
  color: black;
  cursor: pointer;
}

.subLink a {
  cursor: pointer;
}

@media only screen and (max-width: 600px) {}


//*********************************************
  // position:absolute;
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  // top: 90px;
  // width: 100%;
  // border-radius: 5px;
  // background-color: white; 
  // z-index: -1;
  
  // .slide{
  //   position: absolute;
  //   display: flex;
  //   justify-content: center;
  //   top: 0px;
  //   margin:auto;
  //   width: 100%;
  //   border-radius: 5px; 
  //   background-color: var(--baseColor); 
  //   z-index: 1;
  // }

  // .img-section{
  //   display: flex;
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  //   height: 100%;
  //   margin: 0px 5px 0px 0px;
  // }
  
  // .container-links {
  //   position:relative;
  //   top: 40px;
  //   display: flex;
  //   align-items: center;
  //   width: 80%;
  //   background: var(--sliderColor);
  // }
  
  // .container-links ,.transition {
  //   transition: "all 0.5s",
  //   background: transparent;
  // }
  
  // .wrapper-link{
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   width: auto;
  //   margin:0px;
  // }
  
  
  // .link-section {
  //   display: flex;
  //   flex-direction: row;
  //   justify-content: flex-start;
  //   align-items: start;
  //   width: 100%;
  //   height: 30px;
  //   padding: 5px;
  //   margin: 0px 30px;
  // }
  
  
  // .link-popUp {
  //   diplay: flex;
  //   justify-content: center;
  //   align-items: center;
  //   margin: 5px;
  //   height: auto;
  //   font-size: 13px;
  //   font-weight: bold;
  //   text-decoration: none;
  //   color: black;
  //   z-index: 2;
  // }
  
  // .link-popUp:hover{
  //   height: auto;
  //   border-bottom: 1px solid var(--baseColor);
  // }

  //   @media only screen and (max-width: 650px) {
  //     position:absolute;
  //     display: flex;
  //     justify-content: space-around;
  //     align-items: center;
  //     top: 200px;
  //     height: 150px;
  //     border-radius: 5px;
  //     background-color:transparent; 
  //     z-index: -1;
  //   }

  //   @media only screen and (max-width: 450px) {
  //     height: 0px;
  //     .slide {
  //       visibility: hidden;
  //     }
  //   }

  // }
`;
