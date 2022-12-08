import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../Features/UserSlice";
import { pathLinks } from "../components/LinksMenu";

import BubbleCart from '../components/BubbleCart';
import NavBar from "./NavBar";
import PopUp_ProfileUser from "./PopUp_ProfileUser";
import userProfileDefault from "../icons/user_profile.svg";
import logoIcon from "../icons/logoIcon.svg";
import styledComponents from "styled-components";
import { selectShoppingCart } from "../Features/ShoppingCartSlice";
import SearchBar from "./SearchBar";
import { resetFilterCategory } from "../Features/ProductSlice";

//  Header component
const Header = () => {
  const open = true;
  const close = false;

  const userLogged = useSelector(selectUser).user;
  const { nrProducts } = useSelector(selectShoppingCart);
  const [toggle, setToggle] = useState(close);
  const dispatch = useDispatch();

  const handleMouseLeave = () => {
    if (toggle === open) setToggle(close);
  };

  const handleClickTitle = () => {
    dispatch(resetFilterCategory({ reset: null }));
  }


  return (
    <Wrapper>
      <div className="container-title-searchBar-cart">

        <SearchBar />

        <div className="wrapper-title">
          <Link onClick={handleClickTitle}
            className="title"
            to={"/"}
            style={{ textDecoration: "none", color: "black", width: "170px" }}
          >
            <img style={{ width: "40px", height: "auto" }} src={logoIcon} />
            <span style={{ margin: "0px 5px" }}>BOUTIQUE</span>
          </Link>
        </div>

        <div className="wrapper-cart">
          <div style={{ width: "170px" }} className="wrapper-cart-userProfile">

            <div className={"bubble-cart"} >
              {nrProducts > 0 ? <BubbleCart nrProducts={nrProducts} /> : null}
            </div>

            <Link className="cart" to="/cart">
              <img style={{ width: "30px", height: "auto", background: ' var(--baseColor)', borderRadius: '50%' }} src={logoIcon} />
            </Link>
            <div
              onMouseOver={() => {
                setToggle(open);
              }}
            >
              <Link className="user-profile" to="/profile">
                <img
                  style={{ width: "25px", height: "auto", }}
                  src={userProfileDefault}
                />
              </Link>

              <div
                className="pop-up-user"
                onMouseLeave={handleMouseLeave}
              >
                <PopUp_ProfileUser
                  user={userLogged && userLogged}
                  toggle={toggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="NavBar">
        <NavBar links={pathLinks} />
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styledComponents.div`
  position: sticky;
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background: white;
  z-index: 1;
  
  .container-title-searchBar-cart{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap
    z-index: 0;
  }
  
  .wrapper-cart,
  .wrapper-title {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    width :auto;
  }
  
  .wrapper-cart-userProfile{
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 1;
  }
  
  .bubble-cart {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 135px;
    top: 25px;
    border-radius: 50%;
    color: salmon;
    background: var(--baseColor);
  }
  
  .pop-up-user {
    position: absolute;
    top: 3px;
    right: 23px;
  }

  .title,
  .cart,
  .user-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    padding:5px;
  }
    
  .user-profile{
    display: flex;
    justify-content: center;
    align-items: center;
    background : var(--baseColor);
    border-radius:50%;
  }
  
  
  .title{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    font-size: 30px;
    font-weight: bolder;
    padding: 5px;
  }
  
  .NavBar {
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top: 0px;
  width: 100%;
  }
}



@media only screen and (max-width: 650px) {

  .container-title-searchBar-cart{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    // flex-wrap: wrap
  }

  .wrapper-cart{
    order:3
  }
  .wrapper-title{
    1
  }
  .wrapper-search-bar{
    order:2
  }

}
`;
