import React from "react";
import { useState } from "react";
import logoIcon from '../icons/logoIcon.svg'
import { URI } from "@/utils/globalUri";

import { useProductsStore } from "@/zustandStore/productsStore";
import Button from "@/app/component/button";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaTrash } from "react-icons/fa";

interface PropsCategoryProduct {
    close: () => void,
}

const CategoryProduct = ({ close }: PropsCategoryProduct) => {

    //Redux State
    const { products, categoriesProductAvailable } = useProductsStore(state => state);

    //Local variable
    const [nameToRemove, setNameToRemove] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [categoryToRemove, setCategoryToRemove] = useState();
    const [toggleCategoriesCollapse, setToggleCategoriesCollapse] = useState(false)
    const [msg, setMsg] = useState('CATEGORIES')


    const resetFields = () => {

    }


    /* const handleOnChange = (nameSelected: any) => {
        setNameToRemove(nameSelected);
        const TMP_productToRemove = categoriesProductAvailable.filter((category: any) => category.name.toString() === nameSelected.toString());
        setCategoryToRemove(TMP_productToRemove);
    } */

    const handleClickSaveNewCategory = async () => {
        //logic to save the new category
    }


    const handleClickDeleteButton = async () => {
        //logic delete button
        await fetch(`${URI}categoryProduct/v1/delete/categoryProductByName/${nameToRemove}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('TOKEN_ACCESS') && localStorage.getItem('TOKEN_ACCESS')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const { success } = data
                console.log('data delete btn -> ', data);
                if (success) {
                    // dispatch(deleteCategoryProductByName({ categoryRemoved: nameToRemove }))
                    setMsg(`The product with id ${nameToRemove} has been removed successfully`)
                }
            })
            .catch(error => {
                console.log(error.toString())
                setMsg(error.toString())
            })
        setNameToRemove('')

    }

    return (
        <div className="containerAddNewProduct flex flex-col justify-center items-center min-w-[600px] w-max h-max bg-[var(--baseColor)] rounded-lg" >


            <div className="wrapper-header flex justify-between w-full">
                <div>

                </div>

                <div className="msg flex justify-center items-center font-bold text-[20px]">{msg}</div>

                <Button
                    onClick={() => close()}
                    textButton={"X"}
                    className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />

            </div>


            <div className="wrapper-form-select-product flex-col w-full h-full mt-3" >

                <div className="new-size flex justify-between m-3 items-center w-[95%]">
                    <Button
                        onClick={handleClickSaveNewCategory}
                        textButton={"Save New Category"}
                        className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
                    <input
                        className='w-full max-w-[300px] h-[35px] font-bold text-[15px] text-center '
                        placeholder="New Category"
                        value={newCategory}
                        id={newCategory}
                        type={"email"}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                </div>


                <div className="new-size flex flex-col justify-center items-center m-3 w-[95%]">

                    <label className="w-full p-2 text-[17px] font-bold">Categories</label>
                    <div className="relative flex flex-col justify-center items-center w-full rounded-[10px] cursor-pointer  bg-white shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }} onClick={() => setToggleCategoriesCollapse(!toggleCategoriesCollapse)}> {toggleCategoriesCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
                        <div className="absolute top-0 flex flex-col justify-center items-center w-full rounded-[10px] border border-gray-200  bg-white z-1" style={{ height: `${toggleCategoriesCollapse ? 'auto' : '25px'}`, }} >
                            <p className="flex flex-col justify-center items-center h-[25px]"> Available</p>

                            <i className="arrowUpDown flex justify-center items-start text-center h-full  absolute text-[20px] top-0.5 right-0 cursor-pointer hover:text-red-600" onClick={() => setToggleCategoriesCollapse(!toggleCategoriesCollapse)}> {toggleCategoriesCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                            {categoriesProductAvailable?.map((size: any, index: number) => {
                                return (
                                    <div key={index} className="flex justify-around items-center w-full h-auto m-1 " style={{ display: `${toggleCategoriesCollapse ? 'flex' : 'none'}` }}>
                                        <p className="flex justify-around items-center w-full ">
                                            <span className="w-24 text-left "> {size.name}  </span> <i className="flex justify-center items-center w-max h-[25px] cursor-pointer hover:text-red-600" onClick={() => console.log('clicked')}><FaTrash /></i> </p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>



            </div>
           


        </div>
    )
};

export default CategoryProduct;
