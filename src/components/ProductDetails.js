import React, { useEffect } from "react";
import { useState } from "react";
import LoadingSpin from "react-loading-spin";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById, selectProduct } from "../Features/ProductSlice";
import { addProductToShoppingCart, selectShoppingCart } from "../Features/ShoppingCartSlice";
import { URI } from "../_Utils/Dependency";
import { SerializeProduct } from "../_Utils/SerializeProduct";
import Button from "./Button";
import Footer from "./Footer";
import Header from "./Header";
import PriceFormated from "./PriceFormated";
import CarouselProductImages from "./CarouselProductImages";
import { selectUser } from "../Features/UserSlice";

//  The ProductDetails component used when you clicked on a product
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(selectProduct);
  const { shoppingCartList, nrProducts, totalPrice, currency } =
    useSelector(selectShoppingCart);
  const { user } = useSelector(selectUser);

  const [productById, setProductById] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  let { id } = useParams();


  //  Return the clicked product from redux
  useEffect(() => {
    if (products) {
      let res = products.filter(
        (product) => product.id === parseInt(id))

      setProductById(res)
    } else return null

    //  set the load field to false
    setLoading(false)

  }, [products]);


  //  Add new Basket
  const AddNewBasket = async () => {
    const TMP_BasketList = [];

    shoppingCartList && shoppingCartList.map(product => {
      const TMP_BasketObj = {};

      TMP_BasketObj.productId = product.id
      TMP_BasketObj.quantitySize = product.quantityPerSize

      TMP_BasketList.push(TMP_BasketObj)
    })

    //  Push to list the product clicked
    TMP_BasketList.push({
      productId: productById[0].id,
      quantitySize: [{
        quantity: quantity,
        size: size,
      }]
    })

    //  Set the payload for backend
    let payload = { userEmail: user.email || null, products: TMP_BasketList }
    let TMP_BASKET = [];

    //  Add new basket
    await fetch(`${URI}basket/v1/add/newBasket`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => {
        let { success, newBasketCreated } = data;

        //  Update the localStorage BASKET 
        if (success)
          newBasketCreated && JSON.stringify(newBasketCreated.items.map(product => {
            TMP_BASKET.push({ productId: product.productId, quantity: product.quantity, size: product.size })
          }
          ))

        localStorage.setItem("BASKET", JSON.stringify(TMP_BASKET));

      })
      .catch(error => setError(error.toString()))
  }

  //  Add new product to basket
  const AddNewItemToCart = () => {
    if (size === null) setMsg('Please select a size')
    
      dispatch(
        addProductToShoppingCart({
          newProduct: SerializeProduct(productById[0]),
          quantity,
          size,
        })
        );

      // if (shoppingCartList !== null || shoppingCartList !== [])
      AddNewBasket();


  };

  return (
    <div className="productDetails flex flex-col justify-between items-center w-full h-full">
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
        <div className="container-product-details relative flex-col flex  justify-around items-center w-[90%] h-full my-5 mx-auto sm:flex-row">
          {msg && <div className="msg absolute flex justify-center items-center top-0 left-0 right-0 w-max h-max">{msg}</div>}

          {/* Carousel */}
          <div className="wraper-images-product flex justify-center items-center max-w-[40%] h-max p-1 m-1 ">
            {productById &&

              <div className="wrapper-carousel flex justify-center items-center min-w-[150px] max-w-[350px] h-max ">
                <CarouselProductImages
                  onclickProductEvent={false}
                  products={productById}
                  slidesToShow={1}
                  slidesToScroll={1}
                />
              </div>

            }
          </div>

          <div className="wrapper-details-product flex flex-col justify-between items-center max-w-[80%] h-max p-1 m-1 sm:max-w-[40%] ">

            {/* Title & Price */}
            <div className="wrapper-title-price flex justify-around items-center w-full p-1 my-2 text-center bg-[var(--sliderColor)] max-[350px]:m-7" >
              <h3 className="product-title text-[25px] font-bold p-1 m-1 max-[300px]:text-[17px]">{productById[0].name} </h3>

              <div className="price-product-details flex justify-center items-center ">
                {<PriceFormated price={productById[0].price} />}
                <p className="currency flex justify-center items-center w-max font-bold text-lg">{productById[0].currency}</p>
              </div>
            </div>

            {/* Description */}
            <div className="wrapper-product-description text-lg flex flex-col justify-center items-center w-auto h-max p-1 m-1 sm:text-[15px]">
              <h4 className="description flex justify-center items-center">{`${productById[0].description.split()[0].slice(0, 300)}...`}</h4>
              <h4 className="text-center min-w-[250px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              </h4>

              <hr className="hr w-full mx-auto my-3" />
            </div>



            {/* Quantity, Size & AddToCart Function */}
            <div className="container-counter-size flex justify-between items-center w-full h-max flex-row m-1">

              <div className="wrapper-counter wrapper-counter-size flex justify-between items-center w-max flex-row m-1">
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

                <span className="quantity flex justify-center items-center w-max p-1 font-bold">
                  {quantity}
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
                    setQuantity(quantity + 1);
                  }}
                />
              </div>

              <div className="wrapper-dropdown-size-option flex justify-center items-center p-1 ">
                <select
                  className="select text-center w-max bg-[var(--sliderColor)] rounded-md outline-none hover:text-white cursor-pointer"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value={"Size"}>Size</option>
                  <option value={"S"}>S</option>
                  <option value={"M"}>M</option>
                  <option value={"L"}>L</option>
                  <option value={"XL"}>XL</option>
                  <option value={"XXL"}>XXL</option>
                </select>
              </div>

              <Button
                className={"h-11 font-bold text-[18px]"}
                id={productById[0].id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "30%",
                  height: "auto",
                  margin: "5px",
                }}
                disabled={size === null ? true : false}
                textBtn={"Buy"}
                onClick={AddNewItemToCart}
              />

            </div>

          </div>

        </div>

      )}



      <Footer />

    </div >
  );
};

export default ProductDetails;