import React from "react";
import { useState } from "react";
import logoIcon from '../../../public/logoIcon.svg'
import { URI } from "@/utils/globalUri";
import { useProductsStore } from "@/zustandStore/productsStore";
import { IProduct } from "@/interfaces/interfaces";
import LoadingSpin from "react-loading-spin";
import Button from "@/app/component/button";
import { useExistEmptyFields } from "@/utils/hooks";
import Image from "next/image";
import UploadImage from "@/app/component/uploadImage";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaPlus, FaScroll, FaTrash } from "react-icons/fa";
import AddNewSizeExistingProduct from "./addNewSizeExistingProduct";

interface PropsRemoveProduct {
    close: () => void,
}

const updateOrRemoveProduct = ({ close }: PropsRemoveProduct) => {
    //Global Zustand State
    const { products, sizesProductAvailable, deleteProductById, categoriesProductAvailable, superCategoriesProductAvailable } = useProductsStore(state => state);

    //Local variable
    const [toggleCollapse, setToggleCollapse] = useState(false)
    const [idToRemove, setIdToRemove] = useState('');
    const [productToRemove, setProductToRemove]: any = useState(null);
    const [msg, setMsg] = useState('Select Product By Id')
    const [loading, setLoading] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)

    const [nameProduct, setNameProduct] = useState(() => productToRemove?.name);
    const [colorProduct, setColorProduct] = useState(() => productToRemove?.color);
    const [descriptionProduct, setDescriptionProduct] = useState(() => productToRemove?.description);
    const [priceProduct, setPriceProduct] = useState(() => productToRemove?.price);
    const [selectedPictures, setSelectedPictures]: any = useState(null);
    const [brandProduct, setBrandProduct] = useState(() => productToRemove?.brand);
    const [productCode, setProductCode] = useState(() => productToRemove?.productCode);
    const [sizeProduct, setSizeProduct] = useState(() => productToRemove?.sizeStockProduct);
    // const [stockProduct, setStockProduct]: any = useState(productToRemove?.stock);
    const [categoryProduct, setCategoryProduct] = useState(() => productToRemove?.categoryProduct);
    const [superCategoryProduct, setSuperCategoryProduct] = useState(() => productToRemove?.categoryProduct);
    console.log(productToRemove && productToRemove);

    const resetFields = () => {
        setIdToRemove('');
        setProductToRemove(null);
        setMsg('Select Product By Id');
    }

    const handleClickCloseButton = (e: any) => {
        e.preventDefault();
        // resetFields();
        close();
        setMsg('Update | Remove')
    }

    const handleOnChange = (idSelected: any) => {
        setIdToRemove(idSelected);
        const filteredProducts: IProduct = products.filter(product => product.id.toString() === idSelected.toString())[0];

        setProductToRemove(filteredProducts);
        setMsg('Update | Remove')
    }

    const handleClickEdit = () => {
        // logic

    }

    const handleClickDeleteButton = async () => {
        //logic delete button
        setLoading(true)

        // check if idToRemove is not empty 
        !useExistEmptyFields(idToRemove) ? (
            await fetch(`${URI}Product/v1/delete/productById/${idToRemove}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('TOKEN_ACCESS') && localStorage.getItem('TOKEN_ACCESS')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const { success } = data

                    if (success) {
                        deleteProductById(idToRemove)
                        setMsg(`The product with id ${idToRemove} has been removed successfully`)
                        setMsg('Update | Remove')
                    }
                })
                .catch(error => {
                    console.log(error.toString())
                    setMsg(error.toString())
                })
        ) : (setMsg('Empty field(s)'))

        setIdToRemove('')
        setLoading(false)
    }

    /*     setTimeout(() => {
            setMsg('Update | Remove')
        }, 5000); */

    return (
        <div className="containerAddNewProduct flex justify-center items-center min-w-[600px] w-max mx-5 bg-[var(--baseColor)] rounded-lg" >

            <div className="wrapperAddNewProduct flex flex-col w-full h-max">

                <div className="loading-spinner">
                    {loading && <LoadingSpin />}
                </div>

                <div className="headerRemoveProduct flex justify-between w-full h-max">

                    <div className="leftSideHeaderAddNewProduct flex ">
                        <Button
                            onClick={() => setToggleEdit(true)}
                            textButton={'Edit'}
                        />
                        <Button
                            onClick={handleClickDeleteButton}
                            textButton={'Delete'}
                        />
                    </div>

                    <div className="rightSideAddNewProduct flex ">
                        <Button
                            onClick={() => { close(); resetFields() }}
                            textButton={'X'}
                        />

                    </div>

                </div>

                <div className="msg flex justify-center items-center text-[20px] font-bold m-5">{msg}</div>


                <div className="wrapper-form-select-product-to-remove flex justify-center items-center">

                    <label className="labelIdProduct font-bold">Select Id Product</label>
                    <select className="selectorIdProduct" value={idToRemove} onChange={(e) => { handleOnChange(e.target.value); setToggleEdit(false) }} >
                        < option value={'None'} > None</option>
                        {
                            products && products.map((product, index) => {
                                return (
                                    < option key={index} value={product.id} > {product.id}</option>
                                )
                            })
                        }
                    </select>


                </div>

                {productToRemove &&
                    <div className="containerProductToRemove flex justify-between items-center w-full transition-[height] delay-1000">

                        <div className="leftSide flex flex-col justify-between items-center w-[50%] p-1">
                            <label >Name </label>
                            <input type={'text'} autoFocus={true} value={toggleEdit ? nameProduct : productToRemove.name} id={'nameProduct'} onChange={(e) => { setNameProduct(e.target.value) }} />
                            <label>Color </label>
                            <input type={'text'} value={toggleEdit ? colorProduct : productToRemove.color} id={'colorProduct'} onChange={(e) => { setColorProduct(e.target.value) }} />
                            <label>Description </label>
                            <input type={'text'} value={toggleEdit ? descriptionProduct : productToRemove.description} id={'descriptionProduct'} onChange={(e) => { setDescriptionProduct(e.target.value) }} />
                            <label>Price </label>
                            <input type={'text'} value={toggleEdit ? priceProduct : productToRemove.price} id={'priceProduct'} onChange={(e) => { setPriceProduct(e.target.value) }} />
                            <label >Brand </label>
                            <input type={'text'} value={toggleEdit ? brandProduct : productToRemove.brand} id={'brandProduct'} onChange={(e) => { setBrandProduct(e.target.value) }} />
                            {/* <label>Stock</label>
                            <input type={'text'} value={toggleEdit ?stockProduct : productToRemove.stock} id={'stockProduct'} onChange={(e) => { setStockProduct(e.target.value) }} /> */}
                            <label >Code </label>
                            <input type={'text'} value={toggleEdit ? productCode : productToRemove.productCode} id={'productCode'} onChange={(e) => { setProductCode(e.target.value) }} />

                            <label >Size and Stock </label>
                            <div className="relative flex flex-col justify-center items-center w-[85%] rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                                <div className="absolute top-0 flex flex-col justify-center items-center w-full rounded-[10px] border border-gray-200  bg-white z-10" style={{ height: `${toggleCollapse ? 'auto' : '25px'}`, }}>
                                    <p className="flex flex-col justify-center items-center h-[25px]"> Available</p>

                                    <i className="arrowUpDown cursor-pointer absolute top-1 right-2 hover:text-red-600" onClick={() => setToggleCollapse(!toggleCollapse)}> {toggleCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                                    <i className="plus cursor-pointer absolute top-1 right-7 hover:text-red-600" onClick={() => <AddNewSizeExistingProduct close={close} />}> <FaPlus /></i>
                                    {productToRemove.sizeStocks?.map((sizeStock: any, index: number) => {
                                        return (
                                            <div className="flex justify-around items-center w-full h-auto m-1 " style={{ display: `${toggleCollapse ? 'flex' : 'none'}` }}>
                                                <p className="flex justify-around items-center w-full " key={index}>
                                                    <span className="w-24 text-left "> {sizeStock.size.name} - {sizeStock.stock} </span> <i className="flex justify-center items-center w-[25px] h-[25px] cursor-pointer hover:text-red-600" onClick={() => console.log('clicked')}><FaTrash /></i> </p>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                            <label>Category Product</label>
                            {toggleEdit ? <select value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value)}>
                                <i className="cursor-pointer absolute top-1 right-2 hover:text-red-600" onClick={() => setToggleCollapse(!toggleCollapse)}> {toggleCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                                {
                                    categoriesProductAvailable.map((category: any, index: number) => {
                                        return (
                                            <option style={{
                                                backgroundColor: `${productToRemove.categoryProduct.name === category.name ? 'var(--baseColor)' : 'white'}`
                                            }} key={index} value={category.name}> {category.name}</option>
                                        )
                                    })
                                }
                            </select>
                                :
                                <div className="relative flex flex-col justify-center items-center w-[85%] rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                                    <p className="flex flex-col justify-center items-center h-[25px]">{productToRemove.categoryProduct.name}</p>
                                </div>}

                            <label>Super Category Product</label>
                            {toggleEdit ? <select value={superCategoryProduct} onChange={(e) => setSuperCategoryProduct(e.target.value)}>
                                <i className="cursor-pointer absolute top-1 right-2 hover:text-red-600" onClick={() => setToggleCollapse(!toggleCollapse)}> {toggleCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                                {
                                    superCategoriesProductAvailable.map((superCategory: any, index: number) => {
                                        return (
                                            <option style={{
                                                backgroundColor: `${productToRemove.superCategoryProduct.name === superCategory.name ? 'var(--baseColor)' : 'white'}`
                                            }} key={index} value={superCategory.name}> {superCategory.name}</option>
                                        )
                                    })
                                }
                            </select>
                                :
                                <div className="relative flex flex-col justify-center items-center w-[85%] rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                                    <p className="flex flex-col justify-center items-center h-[25px]">{productToRemove.superCategoryProduct.name}</p>
                                </div>}
                        </div>

                        <div className="rightSide flex flex-col justify-around items-center w-[50%] h-[400px] p-1">

                            <div className="uploadPhotoComponent flex justify-between items-center m-0 w-auto h-max">
                                <UploadImage imagesSelected={(images: any) => setSelectedPictures(images)} />
                            </div>

                            <div className="wrapperImages flex justify-center items-center">
                                <div className="up-side-images">
                                    <div className="img_1 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={productToRemove.productImages[0]?.path || logoIcon} alt="img 1" /></div>
                                    <div className="img_2 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={productToRemove.productImages[1]?.path || logoIcon} alt="img 2" /></div>
                                </div>

                                <div className="down-side-images">
                                    <div className="img_3 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={productToRemove.productImages[2]?.path || logoIcon} alt="img 3" /></div>
                                    <div className="img_4 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={productToRemove.productImages[3]?.path || logoIcon} alt="img 4" /></div>
                                </div>
                            </div>
                        </div>


                    </div >
                }


            </div>
        </div >
    )
};

export default updateOrRemoveProduct;
