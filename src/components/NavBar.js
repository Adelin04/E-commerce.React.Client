import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styledComponents from "styled-components";
import SliderMenu from "./SliderMenu";
import { useDispatch } from "react-redux";
import { resetFilterCategory } from "../Features/ProductSlice";
import { LinksMenu } from './LinksMenu';

//  NavBar component
const NavBar = ({ links }) => {
  const dispatch = useDispatch();
  const open = true;
  const close = false;

  const [indexOfLinkTouched, setIndexOfLinkTouched] = useState(0);
  const [dynamicHeight, setDynamicHeight] = useState(0);
  const [toggle, setToggle] = useState(close);

  const handleDispatchReset = () => {
    dispatch(resetFilterCategory({ reset: null }))
  }

  return (

    <Wrapper onMouseLeave={() => setToggle(close)} onMouseOver={() => setDynamicHeight(70)}>
      <div className='wrapperLink'>

        {links.map((link, index) => {
          return (
            <Link className='link' to={link.to} key={index} onClick={handleDispatchReset} onMouseLeave={() => setDynamicHeight(0)} onMouseOver={() => { setIndexOfLinkTouched(index), setDynamicHeight(70), setToggle(open) }}> {link.name} </Link>
          )
        })}

      </div>
      <SliderMenu indexOfLinkTouched={indexOfLinkTouched} dynamicHeight={dynamicHeight} toggle={toggle} />
    </Wrapper>

  );
};

export default NavBar;

const Wrapper = styledComponents.div`{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: auto;
    margin: 5px auto;
    /* background: skyblue; */
  
  
  .wrapperLink {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-bottom: 65px;
    text-decoration: none;
    font-size: 22px;
    font-weight: bold;
    background-color: var(--sliderColor);
  }
  
  .link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
  

  //*************************************************
//     display:flex;
//     justify-content: space-around;
//     align-items: center;
//     width: 100%;
//     height: 20px;
//     margin: 10px auto 0px auto;
    
    
//   .link {
//     display: block;
//     color: white;
//     text-align: center;
//     margin:0px;
//     text-decoration: none;
//     font-size: 21px;
//     font-weight: bold;
//     color:  black;
//     z-idex: 1;
//   }
    
//     // a:hover {
//   //   border-bottom: 1px solid var(--baseColor);
//   // }


//   @media only screen and (max-width: 650px) {
//     .link {
//         display: block;
//         color: white;
//         text-align: center;
//         margin:0px;
//         text-decoration: none;
//         font-size:13px;
//         font-weight: bold;
//         color:  black;
//         z-idex: 1;
//     }
//   }

//   @media only screen and (max-width: 450px) {
//     display:block;
//     height: auto;

//     .link {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       color: white;
//       height: 35px;
//       text-align: center;
//       text-decoration: none;
//       font-size: 20px;
//       font-weight: bold;
//       color:  black;
//       background-color: white;
//       z-idex: 1;
//     }
    
//     .link:hover {
//       border-bottom: 1px solid var(--baseColor);
//     }

//   }
// }
`;
