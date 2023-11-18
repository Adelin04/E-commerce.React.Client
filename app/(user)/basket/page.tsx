'use client'

import React, { useState } from "react";

import PriceFormatted from "../../component/priceFormatted";
import CardTotalPay from "../../component/cardTotalPay ";
import { URI } from "../../../utils/globalUri";
import Button from "../../component/button";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useBasketStore } from "@/zustandStore/basketStore";
import { useUserStore } from "@/zustandStore/usersStore";
import { useMounted } from "../../component/useMounted ";
import { useProductsStore } from "@/zustandStore/productsStore";
import Loading from "@/app/loading";
import { IProduct } from '@/interfaces/interfaces';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductsList from "@/app/component/productsList";

interface PropsDeleteProduct {
  productId: number,
  quantity: number,
  size: string
}

//  Shopping Cart component
const Basket = () => {
  //  Global State
  const { hasMounted } = useMounted();
  const { basket, counterProduct, totalPrice, currency, removeProduct, incrementCounter, decrementCounter } = useBasketStore((state) => state);
  const { user, isAuth } = useUserStore((state) => state)
  const { products, filteredProducts, setSelectedProduct } = useProductsStore((state) => state)
  const router = useRouter()

  //  local fields
  const [productClicked, setProductClicked] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  const handleDeleteProduct = async (productId: number, quantity: number, size: string) => {
    let localStorage_BASKET: any = localStorage.getItem("BASKET") && JSON.parse(localStorage.getItem("BASKET") || '');

    //  THE PRODUCT THAT WAS CLICKED 
    let filteredLocalStorage = localStorage_BASKET.filter((item: any) => item.productId === productId)

    //  THE REST OF PRODUCTS WITHOUT PRODUCT CLICKED
    let restOfProductsFromLocalStorage = localStorage_BASKET.filter((item: any) => item.productId !== productId)

    //  REMOVE JUST SIZE OF PRODUCT CLICKED AND KEEP THE REST OF SIZES IN A TEMPORARY LIST
    let tmpListQtySizes: Array<any> = []
    if (Object.keys(filteredLocalStorage).length > 0) {
      filteredLocalStorage.map((item: any) => {
        if (item.size !== size) {
          tmpListQtySizes.push(item)
        }
      })
    }

    //  PUSH EVERY ITEM FROM THE TEMPORARY LIST IN LIST WITH REST OF THE SIZES
    tmpListQtySizes.map(item => {
      restOfProductsFromLocalStorage.push(item)
    })

    //  UPDATE THE LOCAL STORAGE
    localStorage.setItem("BASKET", JSON.stringify(restOfProductsFromLocalStorage))

    isAuth && (await fetch(`${URI}BasketItem/v1/delete/basketItemById/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { success } = data;
      })
      .catch((error) => setError(error.message)));

    //Update Zustand State
    removeProduct(
      productId,
      quantity,
      size,
    )


  };

  const handleDecrementItemQuantity = async (productId: number, size: string) => {
    user &&
      (await fetch(
        `${URI}BasketItem/v1/decrement/quantity/basketItemById/${productId}/${size}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .catch((error) => console.log(error.message)));
  };

  const handleClickOnImage = (productIdClicked: number) => {
    setSelectedProduct(products.filter((e: IProduct) => e.id === productIdClicked)[0] as any)
    router.push(`/product?id=${productIdClicked}`)
  };

  if (!hasMounted)
    return <><Loading /> </>
  else
    return (
      <div className="containerBasket flex flex-col w-full h-full justify-between items-center">
        {filteredProducts !== null ? <ProductsList products={filteredProducts} /> :
          <div className="wrapperBasket flex flex-col w-full justify-center items-center text-center">

            {error && <div>{error}</div>}

            {/* <div className="flex flex-col w-full h-max justify-start items-center bg-red-300"> */}

            <div className="wrapper-title flex w-full mx-auto my-0  justify-center items-center text-center text-md bg-[var(--sliderColor)]  md:flex-col">
              <h3 className="title-1st-child flex justify-center items-center text-[35px] font-semibold my-1">
                Shopping Cart
              </h3>
              <span className="text-[35px] sm:hidden md:hidden">|</span>
              <h3
                className="title-2st-child flex justify-center items-center text-[35px] my-1 mx-5 font-semibold md:text-[25px]"
              >
                {(hasMounted && user) && `${(user.firstName) || ""} `}
              </h3>
            </div>



            {basket?.map((product: any, index) => {
              return (
                <div className="productBasket flex flex-col justify-between items-center w-full h-full " key={index}>
                  <ul className="flex flex-col items-center w-full h-full p-1 mx-auto my-2 ">
                    {product?.quantityPerSize?.map((item: any, indexItem: any) => {
                      return (

                        <div className="lg:flex justify-between items-center w-full h-max rounded-lg border-y-2 border-gray-100 " key={indexItem} >
                          {item.quantity > 0 && (
                            <li className="list flex justify-around items-center w-full h-max sm:flex-col ">

                              <div className='wrapperImage flex justify-center items-center cursor-pointer ' onClick={() => handleClickOnImage(product.id)}>
                                <Image src={product?.productImages[0].path.trim()} width={100} height={100} alt='no photo' />
                              </div>

                              <div className='flex justify-center items-center font-bold w-max h-max '  >

                                <div className="flex flex-col justify-center items-start w-max pl-5">
                                  <h4 className="name flex justify-center items-center font-bold">{`${product.name.toString().split(",").slice(0, 5)}...`}</h4>
                                  <h4 className="description flex justify-center items-center sm:text-[12px]">{`${product.description.toString().split(",").slice(0, 15)}...`}</h4>
                                  <div className="stock flex justify-center items-center sm:text-[12px]">{product.productCode}</div>
                                  <h3 className="description flex justify-center items-center font-bold sm:text-[12px]">{item.size}</h3>
                                </div>

                              </div>


                              <div className="wrapperPrice flex flex-col h-full justify-center items-center ">
                                <div className='flex justify-center items-center w-[100px] h-[55px] text-[var(--baseColor)]'>
                                  {<PriceFormatted price={product.price} className={'text-[30px] font-bold'} />}
                                  <p className="flex justify-center items-start h-full font-bold text-[17px] text-[var(--baseColor)]" >{product.currency}</p>
                                </div>
                              </div>


                              <div className='QuantityDelete flex justify-center items-center'>
                                <div className='wrapperQuantityDelete flex justify-center items-center w-full h-full'>

                                  <div className="wrapperCounter flex justify-center items-center m-1 h-full">
                                    <Button
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "25px",
                                        height: "auto",
                                        margin: "5px",
                                      }}
                                      onClick={(e: React.FormEvent<HTMLFormElement>) => {
                                        decrementCounter(
                                          product.id,
                                          indexItem,
                                          item.size,
                                        )
                                        handleDecrementItemQuantity(
                                          product.id,
                                          item.size
                                        );
                                      }}
                                    >      <i className="flex justify-center items-center w-max h-max cursor-pointer hover:text-white" onClick={() => console.log('clicked')}><FaMinus /></i>
                                    </Button>

                                    <span className="quantity flex justify-center items-center min-w-[20px] h-max font-bold border-t-2 border-b-2 border-[var(--baseColor)] rounded-lg">
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
                                      onClick={() => {
                                        incrementCounter(
                                          product.id,
                                          indexItem,
                                          item.size,
                                        )

                                      }}>
                                      <i className="flex justify-center items-center w-max h-max cursor-pointer hover:text-white" onClick={() => console.log('clicked')}><FaPlus /></i>
                                    </Button>

                                    <Button
                                      onClick={() =>
                                        handleDeleteProduct(
                                          product.id,
                                          item.quantity,
                                          item.size
                                        )
                                      }
                                    >
                                      <i className="flex justify-center items-center w-max h-max cursor-pointer hover:text-red-400">
                                        <FaTrash />
                                      </i>
                                    </Button>
                                  </div>

                                </div>

                              </div>

                            </li>
                          )}
                        </div>
                      );
                    })}
                  </ul>

                </div>


              );
            })}

            <div className="wrapper-cardToPlay-cart flex flex-col justify-end w-full">
              <div className=" flex h-full w-auto mx-10 my-2 p-1 justify-end items-center ">
                <CardTotalPay
                  totalPrice={totalPrice}
                  nrProducts={counterProduct}
                  currency={currency}
                />
              </div>

              <div className="nextStep-link-cart flex w-auto h-auto mx-auto my-2 p-1 justify-center items-center ">
                <Link
                  href={basket && basket.length > 0 ? `/address` : `/basket`}
                  className="flex justify-center items-center w-[150px] h-10 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]"
                >
                  {" "}
                  Next step{" "}
                </Link>
              </div>
            </div>

            <hr className="w-full mx-auto my-4" />
            {/* </div > */}

          </div>}

      </div >
    );
};

export default Basket;