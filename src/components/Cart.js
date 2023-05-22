import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { decreaseCounter, increaseCounter, selectShoppingCart } from "../Features/ShoppingCartSlice";
import PriceFormated from "./PriceFormated";
import CardTotalPay from "./CardTotalPay";
import { URI } from "../_Utils/Dependency";
import { selectUser } from "../Features/UserSlice";
import { useState } from "react";
import Button from "./Button";
import { IconBase } from "react-icons";
import { FaCocktail, FaGuitar, FaReact, FaTrash } from "react-icons/fa";

//  Shopping Cart component
const Cart = () => {
  const { shoppingCartList, nrProducts, totalPrice, currency } =
    useSelector(selectShoppingCart);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  return (
    <div className="flex flex-col h-full w-full">


      <Header />

      {error && error.toString()}

      <div className="flex flex-col w-full ">

        <div className="wrpper-title min-[450px]:flex w-full m-auto justify-center items-center text-center">
          <h3 className="title-1st-child text-[35px] font-semibold my-1" >Shopping Cart </h3>
          <h3 className="title-2st-child text-[35px] my-1 mx-10" style={{ fontSize: "35px", marginTop: "0px", marginBottom: "10px" }}> {`${user && user.firstName || ''} `}</h3>
        </div>

        <hr className="w-10/12 mx-auto my-2" />


        <div className="container-product-list flex flex-col w-full h-full">
          {shoppingCartList &&
            shoppingCartList.map((product, index) => {
              return (

                <div className="product flex flex-col w-full h-full" key={index}>

                  <ul className="flex flex-col w-11/12 h-full p-1 mx-auto my-2">
                    {product &&
                      product.quantityPerSize.map((item, indexItem) => {
                        return (

                          <div key={indexItem} className="wrapper-product flex flex-row justify-center items-center w-full h-full m-1 p-1">

                            {item.quantity &&
                              <li className="list list-none flex flex-row justify-between items-center w-11/12 h-full my-3">

                                <Link to={`/product-details/${product.id}`} >
                                  <img className="object-cover w-20 cursor-pointer" src={product.productImages && product.productImages[0].path} />
                                </Link>

                                <div className="container-counter-qty-size-cart flex flex-col h-full justify-center items-center">

                                  <span className="size flex justify-center items-center w-10 p-1 m-1 text-[20px] font-bold">
                                    {item.size}
                                  </span>

                                  <div className="wrapper-counter flex flex-row m-1">

                                    <Button
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "25px",
                                        height: "auto",
                                        margin: "5px",
                                      }}
                                      textBtn={"-"}
                                      id={indexItem}
                                      onClick={(e) => {
                                        dispatch(decreaseCounter({ productId: product.id, indexItem: indexItem }))
                                      }}
                                    />

                                    <span className="quantity flex justify-center items-center w-10 p-1 font-bold">
                                      {item.quantity}
                                    </span>

                                    <Button
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "25px",
                                        height: "auto",
                                        margin: "5px",
                                      }}
                                      textBtn={"+"}
                                      onClick={() => {
                                        dispatch(increaseCounter({ productId: product.id, indexItem: indexItem }))
                                      }}
                                    />
                                  </div>

                                </div>

                                <div className="wrapper-price flex justify-center items-center min-w-11 h-max p-1 m-1 text-[20px] font-bold">
                                  <span className="price flex justify-center items-center p-1 w-auto">{<PriceFormated price={product.price * item.quantity} />}</span>
                                  <span className="currency flex justify-center items-center p-1 w-auto">{currency}</span>
                                </div>

                                <button className="delete-btn-cart  justify-center items-center flex w-max h-full m-2 p-1 bg-[var(--sliderColor)] font-bold hover:text-red-700 hover:bg-[var(--baseColor)] rounded-md"><FaTrash /></button>
                              </li>
                            }
                          </div>);
                      })}
                  </ul>



                  {/* <hr className="w-full mx-auto my-4"/> */}
                </div>
              );
            })}
        </div>


        <div className="wrapper-cardToPlay-cart flex flex-col justify-end" >
          <div className="nextStep-link-cart flex h-full w-auto mr-10 my-2 p-1 justify-end items-center " >
            <CardTotalPay totalPrice={totalPrice} nrProducts={nrProducts} currency={currency.toString()} />
          </div>

          <div className="nextStep-link-cart flex w-auto h-auto mx-auto my-2 p-1 justify-center items-center " >
            <Link to="/address" className="flex justify-center items-center w-[150px] h-10 font-bold bg-[var(--sliderColor)] hover:text-white hover:bg-[var(--baseColor)]" > Next step </Link>
          </div>
        </div>


        <hr className="w-full mx-auto my-4" />
      </div>

      <Footer />

    </div>
  );
};

export default Cart;
