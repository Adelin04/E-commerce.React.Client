import React from 'react';
import AddressForm from '../components/AdressForm';
import { useSelector } from 'react-redux';
import { selectShoppingCart } from '../Features/ShoppingCartSlice';
import CardTotalPay from '../components/CardTotalPay';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import logoIcon from '../icons/logoIcon.svg'

const Address = () => {
    const { shoppingCartList, nrProducts, totalPrice, currency } =
        useSelector(selectShoppingCart);

    return (
        <Wrapper >
            <div className="wrapper-title">
                <Link className="title"
                    to={"/"}
                    style={{ textDecoration: "none", color: "black", width: "170px" }}
                >
                    <img style={{ width: "40px", height: "auto" }} src={logoIcon} />
                    <span style={{ margin: "0px 5px" }}>BOUTIQUE</span>
                </Link>
            </div>

            <div className='wrapper-address'>
                <AddressForm />
            </div>

{/*             <div className='wrapper-address-cardTotalPay'>
                <CardTotalPay totalPrice={totalPrice} nrProducts={nrProducts} currency={currency.toString()} />
            </div> */}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    height:auto;

    .wrapper-title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px auto;
        width :auto;
      }
  
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        padding:5px;
        width: 100%;
      }

// .wrapper-address-cardTotalPay{
//     background : green;
// }
`

export default Address;