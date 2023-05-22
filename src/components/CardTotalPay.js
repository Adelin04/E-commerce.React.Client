import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardTotalPay = ({ totalPrice = 0, nrProducts = 0, currency = "" }) => {
    return (
        <div className="container-order flex flex-col justify-center items-center w-max mt-5 p-2 float-right">

            <h3 className="title-order flex justify-center items-center m-1 p-1 text-[25px] font-bold">Order summary </h3>
            <h5 className="count-products-order flex p-1 text-[15px] font-bold"> Total Items </h5> <p>{nrProducts}</p>
            <p className="delivery-products-order flex p-1 text-[15px] font-bold">Delivery cost: {0}{" "}{currency}</p>

            <div className="total-price-order flex justify-center items-center w-max h-max m-1 p-1 text-[30px] font-bold">
                <span>
                    Total: {`${totalPrice.toString().split('.')[0]}.${totalPrice.toString().split('.')[1] !== undefined ? totalPrice.toString().split('.')[1].slice(0, 2) : '00'}`}
                    {currency}
                </span>
            </div>


        </div>
    )
}

export default CardTotalPay;