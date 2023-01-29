import React, { useEffect } from "react";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styledComponents from "styled-components";
import { getProductById, selectProduct } from "../Features/ProductSlice";
import { addProductToShoppingCart } from "../Features/ShoppingCartSlice";
import { URI } from "../_Utils/Dependency";
import { SerializeProduct } from "../_Utils/SerializeProduct";
import Button from "./Button";
import Footer from "./Footer";
import Header from "./Header";
import PriceFormated from "./PriceFormated";
import CarouselMultiple from "../components/CarouselMultiple";
import CarouselProductImages from "./CarouselProductImages";

//  The ProductDetails component used when you clicked on a product
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProduct);

  const [productById, setProductById] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  let { id } = useParams();


  // Here I made a redux request to return the product with the id that the customer clicked on
  useEffect(() => {
    if (products) {
      let res = products.filter(
        (product) => product.id === parseInt(id))
      //set the productById
      setProductById(res)
    } else return null

    //  set loading field false after setting the product  
    setLoading(false)


    // alternative if I hadn't used redux -> request to server
    // fetch(`${URI}api/product/v1/get/productById/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     const { success, productById } = data;

    //     if (success)
    //     setProductById(productById);
    //   })
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));
  }, [products]);


  // Function that handles the product that was clicked to add to shopping cart
  const handleAddToCart = () => {
    dispatch(
      addProductToShoppingCart({
        newPorduct: SerializeProduct(productById[0]),
        quantity,
        size,
      })
    );

  };

  return (
    <Wrapper>
      <Header />


      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            margin: "100px",
          }}
        >
          {<LoadingSpin />}
        </div>
      )}

      {productById && (
        <div className="product-details-container">
          <div className="product-content">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: "90%",
              }}
            >
              <div className="product-img-wraper">
                {productById && <div
                  className="multipleCarousel"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "50%",
                    height: "auto",
                    margin: "50px",
                  }}
                >
                  <CarouselProductImages
                    products={productById}
                    slidesToShow={1}
                    slidesToScroll={1}
                  />
                </div>}

              </div>
            </div>
          </div>

          <div className="container-product-description">
            <div className="wrapper-title-price">
              <h3 className="product-title">{productById[0].name} </h3>

              <div className="product-details-price">
                {<PriceFormated price={productById[0].price} />}
                <p className="currency">{productById[0].currency}</p>
              </div>
            </div>
            <hr style={{ width: "80%" }} />

            <div className="wrapper-color">
              <h3>Color</h3>{" "}
              <p className="product-color">{productById[0].color}</p>
            </div>
            <div className="product-description">
              <h4>{`${productById[0].description.split()[0].slice(0, 50)}...`}</h4>
            </div>
            <hr style={{ width: "80%" }} />
            {console.log(productById)}
            <div>
              <p>
                <select
                  onChange={(e) =>
                    setSize(e.target.value)
                  }
                  className="select"
                >
                  <option value={"S"}>S</option>
                  <option value={"M"}>M</option>
                  <option value={"L"}>L</option>
                  <option value={"XL"}>XL</option>
                  <option value={"XXL"}>XXL</option>
                </select>
              </p>
            </div>

            <div className="quantity">
              <Button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "25px",
                  height: "auto",
                  margin: "5px",
                }}
                textBtn={"-"}
                onClick={() => {
                  quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
                }}
              />
              <span>{quantity}</span>
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
                  setQuantity(quantity + 1);
                }}
              />
            </div>
            <Button
              id={productById[0].id}
              style={{
                widt: "auto",
                height: "auto",
                margin: "5px",
              }}
              textBtn={"Add to cart"}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      )}
      <Footer />

    </Wrapper>
  );
};

export default ProductDetails;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items:center;
    width: 100%;
    height: 100%;

    .wrapper-title-price {
      display: flex;
      justify-content: space-around;
      margin: 0px;
      align-items: flex-end;
    }
    
    .wrapper-color {
      display: flex;
      justify-content: space-around;
      align-items: center;
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

    .product-details-container{
      display: flex;
      justify-content: space-between;
      align-items:center;
      width: 70%;
    }

    .product-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 20px auto;
      padding: 10px;
      min-height: 250px;
      width: 50%;
    }
    
    .product-img-wraper {
      display:flex;
      justify-content:center;
      overflow: hidden;
      border-radius: 15px;
      align-item: center;
      // width:150px;
    }
    
    .product-img{
      border-radius: 15px;
      width: 250px;
      min-height: 300px;
      height: auto;
      max-height: 300px;
    }
    
    .product-img:hover{
      transform: scale(1.2);
      transition: 2s;
    }
    
    .product-title {
      color: #5f4d5d;
      text-align: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    .container-product-description {
      display:flex;
      justify-content: center;
      flex-direction: column;
      padding: 10px;
      margin: 0px auto;
      min-width: 250px;
      width: 50%;
      color: #5f4d5d;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      text-align: center;
      font-size: small;
    }
    
    .product-btn {
      margin-left: 50%;
      transform: translate(-50%);
      width: 60px;
      justify-content: space-around;
      border: 1px solid #b08ead;
      padding: 5px 10px;
      border-radius: 20px;
      cursor: pointer;
      outline: none;
      color: #d6bbd3;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    
    option{
      outline: none;
      color: #d6bbd3;
    }

    .quantity {
      display: flex;
      justify-content:center;
      align-items:center;
      width:auto;
    }

    .quantity span {
      display: flex;
      justify-content:center;
      align-items:center;
      width: 20px;
      border: 1px solid black;
    }


    @media only screen and (max-width:600px) {
      .product-details-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        width: 100%;
      // background:skyblue;
    }

    .container-product-description,
    .product-content,
    .product-description {
      margin: 20px auto;
    }

`;
