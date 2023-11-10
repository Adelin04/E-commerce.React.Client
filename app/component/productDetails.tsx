'use client'
//import style
// import style from '../../styles/productDetails.module.css'

//import React && NextJs components
import React, { useEffect } from "react";
import { useState } from "react";

//import components
import { SerializeProduct } from "./serializeProduct";
import Button from "./button";
import PriceFormatted from "./priceFormatted";
import CarouselProductImages from "./carouselProductImage";
import { useProductsStore } from "@/zustandStore/productsStore";
import { useBasketStore } from "@/zustandStore/basketStore";
import { useUserStore } from "@/zustandStore/usersStore";
import { useParams } from "next/navigation";
import { URI } from '../../utils/globalUri';

// import icon
import exclamationIcon from "../../public/exclamation.png";
import Image from 'next/image';
import { FaBullseye, FaBuyNLarge, FaBuysellads, FaMinus, FaPlus } from 'react-icons/fa';

interface LOCALSTORAGE {
    localStorage_BASKET?: Array<string> | null
}

let customWindow: any = window as any;

const ProductDetails = ({ product }: any) => {

    const selectedProduct = useProductsStore(state => state.selectedProduct);

    const { basket, counterProduct, totalPrice, currency, addProductToBasket } = useBasketStore();
    const user = useUserStore(state => state.user);
    const isAuth = useUserStore(state => state.isAuth);

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('size');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [toggleSize, setToggleSize] = useState(false);

    let { id } = useParams();

    //  Add new Basket
    const AddNewBasket = async () => {
        const TMP_BasketList = [];

        basket &&
            basket.map((product: any) => {
                const TMP_BasketObj: any = {};

                TMP_BasketObj.productId = product.id;
                TMP_BasketObj.quantitySize = product.quantityPerSize;

                TMP_BasketList.push(TMP_BasketObj);
            });

        //  Push to list the product clicked
        TMP_BasketList.push({
            productId: product.id,
            quantitySize: [
                {
                    quantity: quantity,
                    size: size,
                },
            ],
        });

        //  Set the payload for backend
        let payload = {
            userEmail: user ? user.email : null,
            products: TMP_BasketList,
        };
        let TMP_BASKET = [];

        //  Add new basket if exist user login else just save the product on localstorage
        isAuth && await fetch(`${URI}basket/v1/add/newBasket`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let { success, newBasketCreated } = data;

                //  Update the localStorage BASKET
                if (success)
                    newBasketCreated &&
                        JSON.stringify(
                            newBasketCreated.items.map((product: any) => {
                                TMP_BASKET.push({
                                    productId: product.productId,
                                    quantity: product.quantity,
                                    size: product.size,
                                });
                            })
                        );

            })
            .catch((error) => setError(error.toString()));

    };

    //  Add new product to basket
    const AddNewItemToCart = () => {

        // GET THE LOCALSTORAGE BASKET
        let localStorage_BASKET: any = localStorage.getItem("BASKET") && JSON.parse(localStorage.getItem("BASKET") || "");

        //  FILTERED LOCALSTORAGE
        let filterLocalStorage: any = localStorage_BASKET && localStorage_BASKET.filter(
            (item: any) => item.productId === product.id && item.size === size
        );

        //  CHECK IF THE 'EXISTPRODUCT' IS AN ARRAY AND IF IT IS GREATER THEN 0...
        //  IF CONDITION IS TRUE THIS MEANS IT IS THE FIRST PRODUCT ADDED
        if (filterLocalStorage && filterLocalStorage.length > 0) {
            filterLocalStorage[0].quantity += quantity;
        } else {
            // localStorage_BASKET = []
            localStorage_BASKET.push({
                productId: SerializeProduct(product).id,
                quantity: quantity,
                size: size,
            });
        }

        //  ZUSTAND basketStore - ADD THE NEW PRODUCT IN SHOPPING CART LIST 
        addProductToBasket(
            SerializeProduct(product),
            quantity,
            size
        )



        //  SET THE LOCALSTORAGE AFTER UPDATE THE BASKET
        localStorage.setItem("BASKET", JSON.stringify(localStorage_BASKET));

        AddNewBasket();
    };

    if (!selectedProduct?.name) return customWindow.location.href = "/clothing"

    return (
        <div className='flex justify-center items-center w-auto sm:flex-col sm:justify-center'>

            <div>{msg}</div>


            {/* Carousel */}
            <div className='flex justify-center items-center m-5 rounded-lg border-2 border-[var(--sliderColor)]'>
                {product && (
                    <CarouselProductImages
                        // onclickProductEvent={false}
                        images={product.productImages}
                        slidesToShow={1}
                        slidesToScroll={1}
                        height={300}
                        width={300}
                    />
                )}
            </div>


            <div className='wrapperProductDetails flex flex-col justify-center items-center max-w-[40%]'>
                {/* Title & Price */}
                <div className='wrapperNamePriceProduct flex justify-around items-center min-w-max h-max p-2 my-3 mx-auto text-center bg-[var(--sliderColor)] rounded-lg'>
                    <h3 className='text-[30px] text-[white] pr-5'>
                        {product.name}{" "}
                    </h3>

                    <div className='wrapperPrice flex justify-center items-start m-1 h-[40px]'>
                        {<PriceFormatted className={' h-full text-[30px] text-[white]'} price={product.price} />}
                        <p style={{ fontWeight: 'bold', color: 'white' }} >{product.currency}</p>
                    </div>
                </div>

                {/* Description */}
                <div className='flex flex-col justify-center items-center w-full' >
                    {/* <h4 className="description flex justify-center items-center">{`${product.description.split()[0].slice(0, 300)}...`}</h4> */}
                    <h4 className="text-center w-[90%]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                    </h4>

                    <hr className='flex' style={{ width: '90%', margin: '15px auto' }} />
                </div>

                {/* Quantity, Size & AddToCart Function */}
                <div /* className={style.containerQuantityCounterSize} */ className='flex justify-around items-center w-full '>

                    <div className='wrapperQuantitySize flex justify-center items-center'>

                        <div /*  className={style.wrapperButtonsQuantityCounterSize} */ className="flex justify-center items-center w[50%] m-1 h-auto">
                            <Button
                                className='buttonPlusQuantity flex justify-center items-center w-max h-max p-1 rounded-lg bg-[var(--sliderColor)]'
                                onClick={() => { quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1); }}>
                                <i className="flex justify-center items-center w-max h-max cursor-pointer hover:text-white" onClick={() => console.log('clicked')}><FaMinus /></i>
                            </Button>

                            <span /* className={style.quantity} */ className='text-[20px] m-0 p-2  h-max w-max' >
                                {quantity}
                            </span>

                            <Button
                                className='buttonPlusQuantity flex justify-center items-center w-max h-max p-1 rounded-lg bg-[var(--sliderColor)]'
                                onClick={() => { setQuantity(quantity + 1); }}>
                                <i className="flex justify-center items-center w-max h-max cursor-pointer hover:text-white" onClick={() => console.log('clicked')}><FaPlus /></i>
                            </Button>
                        </div>

                        <div /* className={style.wrapperDropdownSizeOption} */ className='flex justify-center items-center w-max'>
                            <select
                                className='selectorQuantity flex justify-center items-center w-full mr-0 bg-[var(--sliderColor)] rounded-lg'
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value={"Size"}>Size</option>
                                {product.sizeStocks?.map((sizeStock: any) => {
                                    return (
                                        <option key={sizeStock.id} value={sizeStock.size.name}>
                                            {sizeStock.size.name}
                                        </option>
                                    );
                                })}
                            </select>
                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50px', height: '50px' }}>
                                {toggleSize && <Image width={50} height={50} src={exclamationIcon} alt='exclamation icon' />}
                            </p>
                        </div>

                    </div>


                    <div className='buttonBuy flex justify-center items-center '>
                        <Button
                            className='buttonBuy flex justify-center items-center bg-[var(--sliderColor)] rounded-lg min-w-[100px] cursor-pointer'
                            disabled={size.toLocaleLowerCase() === 'size' ? true : false}
                            textButton={"Buy"}
                            onClick={AddNewItemToCart}
                            onMouseOver={() => { size.toLocaleLowerCase() === 'size' && setToggleSize(true) }}
                            onMouseOut={() => { setToggleSize(false) }}
                        />
                    </div>

                </div>


            </div>


        </div>


    );
};

export default ProductDetails;