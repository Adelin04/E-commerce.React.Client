import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoIcon from '../icons/logoIcon.svg'
import Button from "../components/Button";
import styledComponents from "styled-components";
import { selectProduct, deleteProductById } from "../Features/ProductSlice";
import { URI } from "../_Utils/Dependency";


const AddNewSize_ExistProduct = ({ close }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Redux State
    const { products } = useSelector(selectProduct);
    const { sizesProductAvailable } = useSelector(selectProduct);

    //Local variable
    const [selectedProduct, setSelectedProduct] = useState();
    const [selectedSize, setSelecedtSize] = useState('');
    const [stock, setStock] = useState('')
    const [listOfNewSizeStock, setListOfNewSizeStock] = useState([])
    const [msgButton, setMsgButton] = useState('Add new sizes and stock')
    const [msg, setMsg] = useState('')
    const [tmp_SizeAdded, setTmp_SizeAdded] = useState([])
    const handleClickCloseButton = (e) => {
        e.preventDefault();
        // resetFields();
        close();
    }

    const handleOnChangeProductSelected = (selectedId) => {
        setSelectedProduct(products.filter(product => product.id.toString() === selectedId.toString()));
    }

    const handleOnChangeSizeSelected = (selectedSize) => {
        setSelecedtSize(sizesProductAvailable.filter(size => size.name.toString() === selectedSize.toString()));
    }

    const decrementtCounter = () => {
        listOfNewSizeStock.map(item => {
            if (item.size === selectedSize[0].name)
                setListOfNewSizeStock(prev => [...prev, { stock: item.stock - 1 }])

        })
    }

    const incrementCounter = () => {
        console.log('listOfNewSizeStock', listOfNewSizeStock);
        listOfNewSizeStock.map(item => {
            if (item.size === selectedSize[0].name) {
                console.log(item.size === selectedSize[0].name);
                item.stock += 1
                // setListOfNewSizeStock({ id: item.id, size: item.size, stock: item.stock + 1 })
            }
        })
    }

    const saveNewSizeAndStock = () => {

        if (!tmp_SizeAdded.includes(selectedSize[0].name.toString())) {
            selectedProduct && selectedSize && setListOfNewSizeStock(prev => {
                return [...prev, { id: selectedProduct[0].id, size: selectedSize[0].name, stock: parseInt(stock) }]
            })
            setTmp_SizeAdded(prev => [...prev, selectedSize[0].name])
        }

    }

    const handleAddNewSizeToExistProduct = async () => {

        // await fetch(`${URI}Product/v1/add/new/size/existProduct/${selectedProduct[0].id}/${parseInt(selectedStock)}/${selectedSize[0].name}`, {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `${localStorage.getItem('TOKEN_ACCES') && localStorage.getItem('TOKEN_ACCES')}`
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         const { success } = data

        //         if (success) {
        //          ...
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error.toString())
        //         setMsg(error.toString())
        //     })



    }

    return (
        <Wrapper>
            <div className="container-add-new-size">

                <div className="header-add-new-size flex justify-between items-center w-full p-2">

                    <Button
                        onClick={handleAddNewSizeToExistProduct}
                        textBtn={msgButton}
                        className={'btn-add-new-size flex justify-center items-center w-max p-2 h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
                    <Button
                        onClick={() => close()}
                        textBtn={'X'}
                        className={'btn-add-new-size flex justify-center items-center w-max p-2 h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-red-600 hover:bg-[var(--baseColor)]'} />

                </div>

                <div className="msg">{msg}</div>

                <div className="wrapper-form-select-product flex flex-col justify-center items-center w-full">

                    {/* Select Id Product */}
                    <div className="wrapper-select-product flex justify-between items-center w-full">
                        <label className="select-product-label flex justify-center items-center w-[250px] p-2 font-bold ">Select Id Product</label>
                        <select className="select-product flex justify-center items-center w-[20%] m-2 text-center outline-none bg-[var(--sliderColor)] rounded-md"
                            value={selectedProduct && selectedProduct.id}
                            onChange={(e) => handleOnChangeProductSelected(e.target.value)} >

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
                            onClick={saveNewSizeAndStock}
                            textBtn={'Add'}
                            className={'btn-add-new-size flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />

                        <input onChange={(e) => setStock(e.target.value)} value={stock} placeholder="stock" className="input-stock  flex w-[100px] h-6 text-center outline-none border-b-2 border-[var(--sliderColor)] bg-transparent rounded-md" />
                        <select className="select-size flex justify-center items-center w-[20%] m-2 text-center outline-none bg-[var(--sliderColor)] rounded-md"
                            value={selectedSize && selectedSize.name}
                            onChange={(e) => handleOnChangeSizeSelected(e.target.value)} >

                            < option value={'Size'} > Size </option>
                            {sizesProductAvailable && sizesProductAvailable.map((size, index) => {
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
                        <div className="left-side flex flex-col justify-center items-center w-[30%] h-full mx-auto ">
                            <label className="size-label flex justify-start items-center w-full font-bold mt-2 ">EXISTING </label>
                            {selectedProduct.map(size => {
                                return (
                                    size.sizeStocks.map((item, index) => {
                                        return (
                                            <div key={index} className="flex justify-center items-center w-full ">
                                                <div className="size flex flex-col justify-center items-center w-full p-2 ">
                                                    <label className="size-label flex justify-center items-center w-full font-bold ">Size </label>
                                                    <p className="size flex justify-center items-center text-center m-auto w-full">{item.size.name || '-'}</p>
                                                </div>

                                                <div className="stock flex flex-col justify-center items-center w-full ">
                                                    <label className="size-label flex justify-center items-center w-full font-bold">Stock </label>
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
                                listOfNewSizeStock.map((item, index) => {
                                    return (
                                        <div key={index} className="flex justify-center items-center w-full ">
                                            <div className="size flex flex-col justify-center items-center w-full p-2 ">
                                                <p className="size flex justify-center items-center text-center m-auto w-full">{item.size}</p>
                                            </div>
                                            <div className="wrapper-counter flex justify-center items-center m-1">
                                                <Button className={' flex justify-center items-center w-5 h-5 p-2  font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'}
                                                    textBtn={"-"}
                                                    id={selectedProduct[0].id}
                                                    onClick={decrementtCounter}
                                                />

                                                <p className="stock flex justify-center items-center text-center  w-full p-2">{item.stock}</p>

                                                <Button className={' flex justify-center items-center w-5 h-5 p-2  font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'}
                                                    textBtn={"+"}
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
                                    <div className="img-1 "><img width={'100px'} height={'auto'} src={selectedProduct[0].productImages.length > 0 && selectedProduct[0].productImages[0].path || logoIcon} alt="img 1" /></div>
                                    <div className="img-2"><img width={'100px'} height={'auto'} src={selectedProduct[0].productImages.length > 1 && selectedProduct[0].productImages[1].path || logoIcon} alt="img 2" /></div>
                                </div>

                                <div className="down-side-imgs">
                                    <div className="img-3"><img width={'100px'} height={'auto'} src={selectedProduct[0].productImages.length > 2 && selectedProduct[0].productImages[2].path || logoIcon} alt="img 3" /></div>
                                    <div className="img-4"><img width={'100px'} height={'auto'} src={selectedProduct[0].productImages.length > 3 && selectedProduct[0].productImages[3].path || logoIcon} alt="img 4" /></div>
                                </div>
                            </div>

                        </div>


                    </div >
                }

            </div>


        </Wrapper>
    )
};

export default AddNewSize_ExistProduct;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content : space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;


    .container-add-new-size {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        left: 50%;
        right: 50%;
        transform: translate(-20%);
        position: absolute;
        min-width: 500px;
        width: auto;
        height: auto;
        margin: 50px auto;
        padding: 5px;
        border-radius: 10px;
        background: var(--baseColor);
    }




    .msg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 25px;
        font-size: 15px;
        font-weight: bold;
        color: red;
    }

     .wrapper-imgs {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        min-height: 200px;
    }

     .up-side-imgs {
         display: flex;
     justify-content: space-around;
     align-items: center;
     width: 100%;
     margin: 5px;
    }

     .down-side-imgs {
          display: flex;
      justify-content: space-around;
     align-items: center;
     width: 100%;
     margin: 5px;
    }

`;