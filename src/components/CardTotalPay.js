import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardTotalPay = ({ totalPrice = 0, nrProducts = 0, currency = "" }) => {
    return (
        <React.Fragment>
            <div className="wrapper-order">
                <div className="order">
                    <p style={{ fontSize: "25px", margin: "0px" }}>Order summary </p>
                    <p>Number products: {nrProducts}</p>
                    <p>Delivery cost: {0}{" "}{currency}</p>

                    <div className="total-suma">
                        <span style={{ fontSize: "22px", fontWeight: "bolder" }}>
                            Total: {`${totalPrice.toString().split('.')[0]}.${totalPrice.toString().split('.')[1] !== undefined ? totalPrice.toString().split('.')[1].slice(0, 2) : '00'}`}
                            {currency}
                        </span>
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}

const Wrapper = styled.div`
.wrapper-order {
    display: flex;
    justify-content: flex-end;
  }
  
  .order {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-between;
    width: 250px;
    height: auto;
    margin-top: 25px;
    /* background-color: rgb(247, 248, 248); */
  }
  

  
  .total-suma {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: auto;
    height: 70px;
    margin-bottom: 5px;
    border: 1px solid rgb(228, 228, 228);
    background-color: rgb(247, 248, 248);
  }
`

export default CardTotalPay;