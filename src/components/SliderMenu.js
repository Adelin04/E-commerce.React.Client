import React from "react";
import styledComponents from "styled-components";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductByName, getProductsByCategory } from "../Features/ProductSlice";
import { LinksMenu } from '../components/LinksMenu'

const SliderMenu = ({
  indexOfLinkTouched, dynamicHeight, toggle

}) => {
  const dispatch = useDispatch();

  const handleDispatch_ProductByCategory = (category) => {
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
  min-width: 60%;
  width: auto;
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

  @media only screen and (max-width: 500px) {
    .backgroundLinks {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 80%;
      width: auto;
      height: 25px;
      margin: auto;
      background-color: var(--sliderColor);
      border-radius: 10px;
    }
  }

}
`;
