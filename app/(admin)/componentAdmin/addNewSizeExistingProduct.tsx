import React, { useEffect, useRef } from "react";
import { useState } from "react";
import logoIcon from '../../../public/logoIcon.svg'
import { URI } from "@/utils/globalUri";
import { useProductsStore } from "@/zustandStore/productsStore";
import { IProduct } from "@/interfaces/interfaces";
import Button from "@/app/component/button";

interface PropsAddNewSize_ExistProduct {
    close: () => void,
}

const AddNewSizeExistingProduct = ({ close }: PropsAddNewSize_ExistProduct) => {
    //Global State Zustand
    const { products, sizesProductAvailable } = useProductsStore(state => state);

    //Local variable
    const [selectedProduct, setSelectedProduct]: any = useState(null);
    const [selectedSize, setSelectedSize]: any = useState(null);
    const [stock, setStock] = useState('')
    const [listOfNewSizeStock, setListOfNewSizeStock]: any = useState([])
    const [msgButton, setMsgButton] = useState('Save')
    const [msg, setMsg] = useState('')
    const [tmp_SizeAdded, setTmp_SizeAdded] = useState([])


    const resetFields = () => {
        setSelectedProduct(null)
        setSelectedSize(null)
        setStock('')
        setListOfNewSizeStock([])
        setTmp_SizeAdded([])
    }

    const handleOnChangeProductSelected = (idSelected: any) => {
        const filteredProducts: any = products.filter(product => product.id.toString() === idSelected.toString())[0];
        setSelectedProduct(filteredProducts);

    }

    const handleOnChangeSizeSelected = (selectedSize: any) => {
        const filteredSizes: any = sizesProductAvailable.filter((size: any) => size.name.toString() === selectedSize.toString())[0];

        setSelectedSize(filteredSizes);
    }

    const decrementCounter = () => {
        listOfNewSizeStock.map((item: any) => {
            if (item.size === selectedSize.name)
                setListOfNewSizeStock((state: any) => [...state, { stock: item.stock - 1 }])
        })
    }

    const incrementCounter = () => {
        console.log('listOfNewSizeStock', listOfNewSizeStock);
        listOfNewSizeStock.map((item: any) => {
            if (item.size === selectedSize[0].name) {
                console.log(item.size === selectedSize[0].name);
                item.stock += 1
                // setListOfNewSizeStock({ id: item.id, size: item.size, stock: item.stock + 1 })
            }
        })
    }

    /*     const saveNewSizeAndStock = () => {
    
            if (!tmp_SizeAdded.includes(selectedSize.name)) {
                selectedProduct && selectedSize && setListOfNewSizeStock(prev => {
                    return [...prev, { size: selectedSize[0].name, stock: parseInt(stock) }]
                })
                setTmp_SizeAdded(prev => [...prev, selectedSize[0].name])
            }
    
            setSelectedSize('')
        } */

    const handleAddNewSizeToExistProduct = async () => {
        let payload = { idProduct: selectedProduct.id, listOfNewSizeStock: listOfNewSizeStock }

        await fetch(`${URI}SizeStock/v1/add/newSize/existProduct`, {
            method: 'POST',
            body: JSON.stringify(payload),

            headers: {
                "Content-Type": "application/json",
                'Authorization': `${localStorage.getItem('TOKEN_ACCES') && localStorage.getItem('TOKEN_ACCES')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const { success } = data
                // console.log('data-size', data);
                if (success) {
                    resetFields()
                }
            })
            .catch(error => {
                console.log(error)
                setMsg(error)
            })
    }

    return (
        <div className="containerAddNewSizeProduct flex justify-center items-center min-w-[600px] w-max mx-5 bg-[var(--baseColor)] rounded-lg" >

            <div className="header-add-new-size flex justify-between items-center w-full p-2">

                <Button
                    onClick={handleAddNewSizeToExistProduct}
                    textButton={msgButton}
                    className={'btn-add-new-size flex justify-center items-center w-max p-2 h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
                <Button
                    onClick={() => close()}
                    textButton={'X'}
                    className={'btn-add-new-size flex justify-center items-center w-max p-2 h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-red-600 hover:bg-[var(--baseColor)]'} />

            </div>

            <div className="msg">{msg}</div>

            <div className="wrapper-form-select-product flex flex-col justify-center items-center w-full">

                {/* Select Id Product */}
                <div className="wrapper-select-product flex justify-between items-center w-full">
                    <label className="select-product-label flex justify-center items-center w-[250px] p-2 font-bold ">Select Id Product</label>
                    <select className="select-product flex justify-center items-center w-[20%] m-2 text-center outline-none bg-[var(--sliderColor)] rounded-md"
                        value={selectedProduct && selectedProduct.id}
                        onChange={(e) => { handleOnChangeProductSelected(e.target.value); setListOfNewSizeStock([]) }} >

                        < option value={'Id'} > Id </option>
                        {products && products.map((product, index) => {
                            return (
                                < option key={index} value={product.id} > {product.id}</option>
                            )
                        })}
                    </select>
                </div>

                {/* Add New Size */}
                <div className="wrapper-select-product flex justify-between items-center w-full">
                    <Button
                        onClick={() => { /* saveNewSizeAndStock(); */ setStock('') }}
                        textButton={'Add'}
                        className={'btn-add-new-size flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />

                    <input onChange={(e) => setStock(e.target.value)} value={stock} placeholder="stock" className="input-stock  flex w-[100px] h-6 text-center outline-none border-b-2 border-[var(--sliderColor)] bg-transparent rounded-md" />
                    <select className="select-size flex justify-center items-center w-[20%] m-2 text-center outline-none bg-[var(--sliderColor)] rounded-md"
                        value={selectedSize && selectedSize.name}
                        onChange={(e) => handleOnChangeSizeSelected(e.target.value)} >

                        < option value={'Size'} > Size </option>
                        {sizesProductAvailable && sizesProductAvailable.map((size: any, index: number) => {
                            return (
                                < option key={index} value={size.name} > {size.name}</option>
                            )
                        })}
                    </select>
                </div>


            </div>

            {selectedProduct &&
                <div className="container-product-selected flex justify-between items-start w-full h-full">


                    {/* EXIST SIZE */}
                    <div className="left-side flex flex-col justify-center items-center w-[40%] h-[350px] mx-auto overflow-scroll">
                        <label className="size-label flex justify-start items-center w-full font-bold mt-2 ">EXISTING </label>

                        <div className="flex justify-around w-full ">
                            <label className="size-label flex justify-center items-center w-full font-bold ">Size </label>
                            <label className="size-label flex justify-center items-center w-full font-bold">Stock </label>
                        </div>

                        {selectedProduct.map((size: any) => {
                            return (
                                size.sizeStocks.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="flex justify-center items-center w-full ">
                                            <div className="size flex flex-col justify-center items-center w-full p-2 ">
                                                <p className="size flex justify-center items-center text-center m-auto w-full">{item.size.name || '-'}</p>
                                            </div>

                                            <div className="stock flex flex-col justify-center items-center w-full ">
                                                <p className="stock flex justify-center items-center text-center  w-full">{item.stock || '-'}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        })
                        }

                        {/* NEW SIZE ADDED */}
                        <label className="size-label flex justify-start items-center w-full font-bold ">NEW </label>
                        {
                            listOfNewSizeStock.map((item: any, index: number) => {
                                return (
                                    <div key={index} className="flex justify-center items-center w-full ">
                                        <div className="size flex flex-col justify-center items-center w-full p-2 ">
                                            <p className="size flex justify-center items-center text-center m-auto w-full">{item.size}</p>
                                        </div>
                                        <div className="wrapper-counter flex justify-center items-center m-1">
                                            <Button className={' flex justify-center items-center w-5 h-5 p-2  font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'}
                                                textButton={"-"}
                                                id={selectedProduct.id}
                                                onClick={decrementCounter}
                                            />

                                            <p className="stock flex justify-center items-center text-center  w-full p-2">{item.stock}</p>

                                            <Button className={' flex justify-center items-center w-5 h-5 p-2  font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'}
                                                textButton={"+"}
                                                onClick={incrementCounter}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>


                    <div className="right-side w-[60%]">
                        <div className="wrapper-imgs w-[70%]">
                            <div className="up-side-imgs">
                                <div className="img-1 "><img width={'100px'} height={'auto'} src={selectedProduct?.productImages[0].path || logoIcon} alt="img 1" /></div>
                                <div className="img-2"><img width={'100px'} height={'auto'} src={selectedProduct?.productImages[1].path || logoIcon} alt="img 2" /></div>
                            </div>

                            <div className="down-side-imgs">
                                <div className="img-3"><img width={'100px'} height={'auto'} src={selectedProduct?.productImages[2].path || logoIcon} alt="img 3" /></div>
                                <div className="img-4"><img width={'100px'} height={'auto'} src={selectedProduct?.productImages[3].path || logoIcon} alt="img 4" /></div>
                            </div>
                        </div>

                    </div>


                </div >
            }

        </div>



    )
};

export default AddNewSizeExistingProduct;
