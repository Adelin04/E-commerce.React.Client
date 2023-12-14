import logoIcon from '../../../public/logoIcon.svg'
import UploadImage from "@/app/component/uploadImage";
import { useProductsStore } from "@/zustandStore/productsStore";
import Image from "next/image"
import { useState } from "react";
import AddNewSizeExistingProduct from "./addNewSizeExistingProduct";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaPlus, FaTrash } from "react-icons/fa";
import { IProduct } from '@/interfaces/interfaces';
import Button from '@/app/component/button';
import { useAdminStore } from '@/zustandStore/adminStore';


interface PropsEditProduct {
    product: IProduct | any,
    close: () => void | null,
}

const EditProduct = ({ product, close }: PropsEditProduct) => {
    //Global Zustand State
    const { products, sizesProductAvailable, deleteProductById, categoriesProductAvailable, superCategoriesProductAvailable } = useProductsStore(state => state);
    const { setProductClickedToEdit, cleanProductClickedToEdit } = useAdminStore(state => state);

    //Local variable
    const [toggleSizeStockCollapse, setToggleSizeStockCollapse] = useState(false)
    const [toggleCategoryCollapse, setToggleCategoryCollapse] = useState(false)
    const [toggleSuperCategoryCollapse, setToggleSuperCategoryCollapse] = useState(false)
    const [toggleEdit, setToggleEdit] = useState(false)

    const [idToRemove, setIdToRemove] = useState('');
    // const [product, setProductToRemove]: any = useState(null);
    const [msg, setMsg] = useState('Select Product By Id')
    const [loading, setLoading] = useState(false)

    const [nameProduct, setNameProduct] = useState(() => product?.name);
    const [colorProduct, setColorProduct] = useState(() => product?.color);
    const [descriptionProduct, setDescriptionProduct] = useState(() => product?.description);
    const [priceProduct, setPriceProduct] = useState(() => product?.price);
    const [selectedPictures, setSelectedPictures]: any = useState(null);
    const [brandProduct, setBrandProduct] = useState(() => product?.brand);
    const [productCode, setProductCode] = useState(() => product?.productCode);
    const [sizeProduct, setSizeProduct] = useState(() => product?.sizeStockProduct);
    // const [stockProduct, setStockProduct]: any = useState(productToRemove?.stock);
    const [categoryProduct, setCategoryProduct] = useState(() => product?.categoryProduct);
    const [superCategoryProduct, setSuperCategoryProduct] = useState(() => product?.categoryProduct);

    const resetFields = () => {
        setIdToRemove('');
        cleanProductClickedToEdit();
        setMsg('Select Product By Id');
    }

    return (
        <div className="containerProductToEdit flex-col justify-start items-center w-full h-full p-5 bg-[var(--baseColor)] overflow-y-scroll overflow-x-hidden">


            <div className="headerRemoveProduct flex justify-between w-full h-max pr-5">

                <div className='leftSide p-1 w-max h-max'>
                    <Button
                        className={'p-1 m-1 bg-black'}
                        onClick={() => setToggleEdit(true)}
                        textButton={'Edit'}
                    />
                </div>

                <div className='RightSide p-1 w-max h-max'>
                    <Button
                        className={'m-1 bg-black'}
                        onClick={() => { close(); resetFields() }}
                        textButton={'X'}
                    />
                </div>

            </div>

            <div className="wrapperProductToEdit flex flex-col justify-start items-center  w-full h-max mt-[15px]">

                <div className="leftSide flex flex-col justify-between items-center w-max p-1">
                    <label >Name </label>
                    <input type={'text'} autoFocus={true} value={toggleEdit ? nameProduct : product.name} id={'nameProduct'} onChange={(e) => { setNameProduct(e.target.value) }} />
                    <label>Color </label>
                    <input type={'text'} value={toggleEdit ? colorProduct : product.color} id={'colorProduct'} onChange={(e) => { setColorProduct(e.target.value) }} />
                    <label>Description </label>
                    <input type={'text'} value={toggleEdit ? descriptionProduct : product.description} id={'descriptionProduct'} onChange={(e) => { setDescriptionProduct(e.target.value) }} />
                    <label>Price </label>
                    <input type={'text'} value={toggleEdit ? priceProduct : product.price} id={'priceProduct'} onChange={(e) => { setPriceProduct(e.target.value) }} />
                    <label >Brand </label>
                    <input type={'text'} value={toggleEdit ? brandProduct : product.brand} id={'brandProduct'} onChange={(e) => { setBrandProduct(e.target.value) }} />
                    <label >Code </label>
                    <input type={'text'} value={toggleEdit ? productCode : product.productCode} id={'productCode'} onChange={(e) => { setProductCode(e.target.value) }} />

                    <label >Size and Stock </label>
                    <div className="relative flex flex-col justify-center items-center w-full rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                        <div className="absolute top-0 flex flex-col justify-center items-center w-full rounded-[10px] border border-gray-200  bg-white z-1" style={{ height: `${toggleSizeStockCollapse ? 'auto' : '25px'}`, }}>
                            <p className="flex flex-col justify-center items-center h-[25px]"> Available</p>

                            <i className="arrowUpDown flex justify-center items-start text-center h-full  absolute text-[20px] top-0.5 right-0 cursor-pointer hover:text-red-600" onClick={() => setToggleSizeStockCollapse(!toggleSizeStockCollapse)}> {toggleSizeStockCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                            <i className="plus flex justify-center items-start text-center h-full  absolute text-[20px] top-0.5 right-7 cursor-pointer hover:text-red-600" onClick={() => { setToggleSizeStockCollapse(!toggleSizeStockCollapse); return <AddNewSizeExistingProduct close={close} /> }}>  <FaPlus /> </i>
                            {product.sizeStocks?.map((sizeStock: any, index: number) => {
                                return (
                                    <div key={index} className="flex justify-around items-center w-full h-auto m-1 " style={{ display: `${toggleSizeStockCollapse ? 'flex' : 'none'}` }}>
                                        <p className="flex justify-around items-center w-full ">
                                            <span className="w-24 text-left "> {sizeStock.size.name} - {sizeStock.stock} </span> <i className="flex justify-center items-center w-max h-[25px] cursor-pointer hover:text-red-600" onClick={() => console.log('trash clicked')}><FaTrash /></i> </p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>

                    <label>Category Product</label>
                    <div className=" flex flex-col justify-center items-center w-full rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>

                        {toggleEdit ? <select value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value)}>
                            {
                                categoriesProductAvailable.map((category: any, index: number) => {
                                    return (
                                        <option style={{
                                            backgroundColor: `${product.categoryProduct.name === category.name ? 'var(--baseColor)' : 'white'}`
                                        }} key={index} value={category.name}> {category.name}</option>
                                    )
                                })
                            }
                        </select>
                            :
                            <div className=" flex flex-col justify-center items-center w-full rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                                <p className="flex flex-col justify-center items-center h-[25px]">{product.categoryProduct.name}</p>
                            </div>}
                    </div>


                    <label>Super Category Product</label>
                    <div className=" flex flex-col justify-center items-center w-full rounded-[10px]  bg-white m-1 p-0 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>

                        {toggleEdit ? <select value={superCategoryProduct} onChange={(e) => setSuperCategoryProduct(e.target.value)}>
                            {
                                superCategoriesProductAvailable.map((superCategory: any, index: number) => {
                                    return (
                                        <option style={{
                                            backgroundColor: `${product?.superCategoryProduct.name === superCategory.name ? 'var(--baseColor)' : 'white'}`
                                        }} key={index} value={superCategory.name}> {superCategory.name}</option>
                                    )
                                })
                            }
                        </select>
                            :
                            <div className=" flex flex-col justify-center items-center w-full rounded-[10px]  bg-white m-1 shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }}>
                                <p className="flex flex-col justify-center items-center h-[25px]">{product.superCategoryProduct.name}</p>
                            </div>}
                    </div>

                </div>

                <div className="rightSide flex flex-col justify-around items-center w-max h-[400px] p-1">

                    <div className="uploadPhotoComponent flex justify-between items-center m-0 w-auto h-max">
                        <UploadImage imagesSelected={(images: any) => setSelectedPictures(images)} />
                    </div>

                    <div className="wrapperImages flex justify-center items-center">
                        <div className="up-side-images">
                            <div className="img_1 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={product.productImages[0]?.path.toString().trim() || logoIcon} alt="img 1" /></div>
                            <div className="img_2 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={product.productImages[1]?.path.toString().trim() || logoIcon} alt="img 2" /></div>
                        </div>

                        <div className="down-side-images">
                            <div className="img_3 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={product.productImages[2]?.path.toString().trim() || logoIcon} alt="img 3" /></div>
                            <div className="img_4 flex justify-center items-center m-2 p-1 w-max h-max"><Image width={100} height={100} src={product.productImages[3]?.path.toString().trim() || logoIcon} alt="img 4" /></div>
                        </div>
                    </div>
                </div>


            </div >

        </div>
    )
}

export default EditProduct