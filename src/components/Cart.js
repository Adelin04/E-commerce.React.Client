import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styledComponents from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { selectShoppingCart } from "../Features/ShoppingCartSlice";
import PriceFormated from "./PriceFormated";

//  Shopping Cart component
const Cart = () => {
  const { shoppingCartList, nrProducts, totalPrice, currency } =
    useSelector(selectShoppingCart);

  return (
    <Wrapper>
      <Header />

      <div className="content-shoppingCart">
        <p
          style={{ fontSize: "35px", marginTop: "0px", marginBottom: "10px" }}
        >
          Shopping Cart
        </p>


        <div className="shoppingCart-details">
          {shoppingCartList &&
            shoppingCartList.map((product, index) => {
              return (
                <div className="container-product-details" key={index}>

                  <div className="separator-product-hr">
                    <div className="product-details">

                      <div className="img-product-details-cart">
                        <img src={product.productImages[0].path} />
                      </div>


                      <ul className="list-size-product">
                        {product &&
                          product.quantityPerSize.map((item, index) => {
                            return (
                              <div key={index} className="wrapper-quantityPerSize">

                                <div style={{ display: 'contents' }}>

                                  <li className="quantityPerSize">
                                    <div className="wrapper-quantityPerSize-qty">
                                      <span className="quantityPerSize-qty-txt">
                                        Qty
                                      </span>
                                      <span className="quantityPerSize-qty-nr">
                                        {item.quantity}
                                      </span>
                                    </div>

                                    <div className="wrapper-quantityPerSize-size">
                                      <span className="quantityPerSize-size-txt">
                                        Size
                                      </span>
                                      <span className="quantityPerSize-size-nr">
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
                    </div>

                    <hr style={{ width: "100%" }} />
                  </div>
                </div>
              );
            })}
        </div>

        <div className="products-shoppingCart"></div>

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
            <Link to="/pay" className="link-sumar-comanda">
              <span>Next step</span>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </Wrapper>
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
        margin: 15px;
      }
      
      .container-product-details {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        margin: 5px 0px;
      }

      .product-details {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        min-height: 130px;
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
        margin: auto;
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
        justify-content: space-between;
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
        justify-content: space-between;
        align-items: center;
        width: 50px;
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
      
      .quantityPerSize-size-nr {
        font-size: 17px;
        font-weight: bold;
        color: var(--baseColor);
      }
      
      .product-details-price{
        display: flex;
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
      
      .link-sumar-comanda {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 35px;
        margin-bottom: 10px;
        font-weight: bolder;
        text-decoration: none;
        color: var(--baseColor);
        background-color: var(--buttonColor);
      }

      .link-sumar-comanda:hover {
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

      @media only screen and (max-width: 500px) {
        
        .shoppingCart-details {
          display: flex;
          flex-direction: column;
          margin: 15px auto;
        }

          .product-details {
            flex-direction: column;
            text-align: center;
            height: 250px;
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
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin: auto;
            
          }
          
          .product-price {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
            margin: 15px auto;
          }

        }

`;
