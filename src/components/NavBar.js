import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styledComponents from "styled-components";
import PopUp_MainMenu from "./PopUp_MainMenu";
import { useDispatch } from "react-redux";
import { resetFilterCategory } from "../Features/ProductSlice";

//  NavBar component
const NavBar = ({ links }) => {
  const dispatch = useDispatch();
  const open = true;
  const close = false;

  const [heightPopUp, setHeightPopUp] = useState(0);
  const [indexOfLinkTouched, setIndexOfLinkTouched] = useState();
  const [toggle, setToggle] = useState(close);

  const handleMouseOver = (indexOfLinkTouched) => {
    setIndexOfLinkTouched(indexOfLinkTouched);
    setToggle(open);
    setHeightPopUp(100);
  };

  const handleMouseOut = (e) => {
    if (toggle === close) setHeightPopUp(0);
  };

  const handleMouseLeave = () => {
    setHeightPopUp(0);
  };

  const handleDispatchReset = () => {
    dispatch(resetFilterCategory({ reset: null }))
  }

  return (
    <Wrapper onMouseLeave={handleMouseLeave}>
      {links.map((link, index) => {
        return (
          <NavLink
            className="link"
            to={link.to}
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseOut={handleMouseOut}
            style={{ textDecoration: "none" }}
            onClick={handleDispatchReset}
          >
            {link.name}
          </NavLink>
        );
      })}
      <PopUp_MainMenu
        dinamicValue={heightPopUp}
        linksSlide={links}
        indexOfLinkTouched={indexOfLinkTouched}
        toggle={toggle}
      />
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styledComponents.div`{
    display:flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 20px;
    margin: 10px auto 0px auto;
    
    
  .link {
    display: block;
    color: white;
    text-align: center;
    margin:0px;
    text-decoration: none;
    font-size: 21px;
    font-weight: bold;
    color:  black;
    z-idex: 1;
  }
    
    // a:hover {
  //   border-bottom: 1px solid var(--baseColor);
  // }


  @media only screen and (max-width: 650px) {
    .link {
        display: block;
        color: white;
        text-align: center;
        margin:0px;
        text-decoration: none;
        font-size:13px;
        font-weight: bold;
        color:  black;
        z-idex: 1;
    }
  }

  @media only screen and (max-width: 450px) {
    display:block;
    height: auto;

    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      height: 35px;
      text-align: center;
      text-decoration: none;
      font-size: 20px;
      font-weight: bold;
      color:  black;
      background-color: white;
      z-idex: 1;
    }
    
    .link:hover {
      border-bottom: 1px solid var(--baseColor);
    }

  }
}
`;
