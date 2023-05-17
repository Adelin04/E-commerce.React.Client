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

//  Shopping Cart component
const Cart = () => {
  const { shoppingCartList, nrProducts, totalPrice, currency } =
    useSelector(selectShoppingCart);
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState();

  return (
    <Wrapper>
      <Header />

      {error && error.toString()}

      <div className="content-shoppingCart">

        <div className="content-shoppingCart-title">
          <h3 style={{ fontSize: "35px", marginTop: "0px", marginBottom: "10px" }}>Shopping Cart</h3>
          <h3 style={{ fontSize: "35px", marginTop: "0px", marginBottom: "10px" }}> {`${user && user.firstName || ''} `}</h3>
        </div>
        <hr />


        <div className="shoppingCart-details">
          {shoppingCartList &&
            shoppingCartList.map((product, index) => {
              return (
                <div className="container-product-details" key={index}>

                  <div className="separator-product-hr">
                    <div className="product-details">
                      <div className="img-product-details-cart">
                        <img src={product.productImages && product.productImages[0].path} />
                      </div>


                      <ul className="list-size-product">
                        {product &&
                          product.quantityPerSize.map((item, indexItem) => {
                            return (
                              <div key={indexItem} className="wrapper-quantityPerSize">

                                <div style={{ display: 'contents' }}>

                                  <li className="quantityPerSize">
                                    <div className="wrapper-quantityPerSize-qty">
                                      {/* <span className="quantityPerSize-qty-txt">
                                        Qty
                                      </span> */}

                                      {/* {console.log(product)} */}
                                      <Button
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          width: "25px",
                                          height: "auto",
                                          margin: "5px",
                                        }}
                                        textBtn={"-"}
                                        id={product.id}
                                        onClick={() => {
                                          dispatch(decreaseCounter({ productId: product.id, indexItem: indexItem }))
                                        }}
                                      />
                                      <span className="quantityPerSize-qty-nr">
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

                                    <div className="wrapper-quantityPerSize-size">
                                      {/* <span className="quantityPerSize-size-txt">
                                        Size
                                      </span> */}
                                      <span className="quantityPerSize-size">
                                        {item.size}
                                      </span>
                                    </div>
                                  </li>

                                </div>


                                <div className="product-details-price">
                                  {<PriceFormated price={product.price * item.quantity} />}
                                  <p className="currency">{currency}</p>
                                </div>



                              </div>

                            );
                          })}
                      </ul>

                      <button className="product-details-delete-btn">DELETE</button>

                    </div>

                    <hr style={{ width: "100%" }} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="products-shoppingCart"></div>

        <div className="wrapper-cart-cardToPlay" >
          <CardTotalPay totalPrice={totalPrice} nrProducts={nrProducts} currency={currency.toString()} />
        </div>

        <div className="wrapper-cart-link-nextStep" >
          <Link to="/address" className="link-to-order" >
            <span>Next step</span>
          </Link>
        </div>

      </div>

      <Footer />
    </Wrapper >
  );
};

export default Cart;

const Wrapper = styledComponents.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: space-between;
      width:100%;
      height:100%;

      .shoppingCart {
        display: flex;
        flex-direction: column;
      }
      
      
      .shoppingCart-details {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      
      .container-product-details {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 5px 0px;
      }

      .product-details {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        // min-height: 130px;
      }

      .product-details img {
        width: 125px;
        height: auto;
        margin: auto;
        border-radius: 10px;
      }

      .img-product-details-cart{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 20px;
      }

      .list-size-product {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60%;
        height: auto;
        margin: 5px ;
        padding: 0px;
      }
      
      .separator-product-hr { 
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
      }

      .wrapper-quantityPerSize {
        display: flex;
        justify-content: center;
        align-items: center;
        width:100%;
      }
      
      .quantityPerSize {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 80%;
        height: 30px;
        padding: 5px;
      }

      .product-price,
      .wrapper-quantityPerSize-size,
      .wrapper-quantityPerSize-qty {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: auto;
      }
      
      .quantityPerSize-qty-txt {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        font-size: 17px;
        font-weight: bold;
        color: var(--buttonColor);
      }
      
      .quantityPerSize-qty-nr {
        font-size: 17px;
        font-weight: bold;
        color: var(--baseColor);
      }
      
      .quantityPerSize-size-txt {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        font-size: 17px;
        font-weight: bold;
        color: var(--buttonColor);
      }
      
      .quantityPerSize-size {
        font-size: 23px;
        font-weight: bold;
        color: var(--baseColor);
      }
      
      .product-details-price{
        display: flex;
        margin-right: 30px;
      }
  
      .product-details-price p:first-child {
        font-size: 30px;
        font-weight: bold;
        margin: 0px;
        color: var(--sliderColor);
      }
      
      .price-after-dot {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        margin: 0px;
        height: 30px;
        font-weight: bold;
        color: var(--sliderColor);
      }
      
        .product-details-price .currency {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          margin: 0px 5px;
          height: 30px;
          font-weight: bold;
          color: var(--sliderColor);
        }
        
        .product-details-delete-btn {
          display: flex;
          height: 165px;
          justify-content: center;
          align-items: center;
          border: none;
          outline: none;
          font-size: 15px;
          border-radius: 5px;
          color: var(--baseColor);
          background-color: var(--buttonColor);
      }
      
      .product-details-delete-btn:hover {
        color: var(--mySalmon);
      }

      .container-shoppingCart {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin: 25px auto;
      }
      
      .title-container-shoppingCart {
        display: flex;
      }
      
      .content-shoppingCart {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 80%;
        height: auto;
        margin: 0px auto;
      }

      .content-shoppingCart-title {
        display: flex;
        justify-content: space-around;
        width: 80%;
        height: auto;
        margin: 0px auto;
      }
      
      .products-shoppingCart {
        display: flex;
        flex-direction: column;
        width: auto;
        height: auto;
        border-top: 1px solid rgb(228, 228, 228);
      }
      
      .product-info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin: 5px;
      }
      
      .img-shoppingCart {
        display: flex;
        align-items: center;
      }
      
      .descriptionProduct-ShoppingCart {
        display: flex;
        align-items: center;
        text-align: center;
      }
      
      .container-increment-decrement {
        display: block;
      }
      
      .wrapper-qty {
        display: flex;
        margin: 5px;
      }
      
      .wrapper-qty p {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin: 0px;
        border-bottom: 1px solid coral;
      }
      
      .btn-qty {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
      }
      
      .product-pret {
        display: flex;
        align-items: center;
      }
      
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
      
      .link-to-order {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 120px;
        width: auto;
        height: 35px;
        font-weight: bolder;
        text-decoration: none;
        border-radius: 5px;
        color: var(--baseColor);
        background-color: var(--buttonColor);
      }

      .link-to-order:hover {
        color: white;
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
      
      .wrapper-cart-link-nextStep {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        width: auto;
        height: auto;

      }
      
      @media only screen and (max-width: 650px) {

      }

      @media only screen and (max-width: 500px) {

        .content-shoppingCart-title {
          display : block;
        }
        
        .shoppingCart-details {
          display: flex;
          flex-direction: column;
          margin: 15px auto;
        }

          .product-details {
            flex-direction: column;
            text-align: center;
            height: auto;
          }

          .product-details img {
            widht: 100px;
            height: auto;
          }

          .list-size-product {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0px;
            width: 100%;
            margin: 15px auto;
          }
          

          .wrapper-quantityPerSize {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;  
          }
          
          .quantityPerSize {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 50%;
            height: auto;
            margin: auto;
            
          }
          
          .product-price {
            flex-direction: row;
            justify-content: center;
            width: 100%;
            margin: 15px auto;
          }

          .product-details-price{
            display: flex;
            margin: 0px;
          }

          .product-details-delete-btn {
            weight: 100%;
            height: 35px;
          }
        }

`;
