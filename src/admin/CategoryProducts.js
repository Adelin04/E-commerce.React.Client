import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoIcon from '../icons/logoIcon.svg'
import styledComponents from "styled-components";
import { selectProduct, deleteProductById, deleteProductByName, deleteCategoryProductByName } from "../Features/ProductSlice";
import { URI } from "../_Utils/Dependency";


const CategoryProducts = ({ close }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Redux State
    const { products } = useSelector(selectProduct);
    const { categoriesProductAvailable } = useSelector(selectProduct);

    //Local variable
    const [nameToRemove, setNameToRemove] = useState();
    const [categoryToRemove, setCategoryToRemove] = useState();
    const [msg, setMsg] = useState('Remove Category By Name')


    const handleClickCloseButton = (e) => {
        e.preventDefault();
        // resetFields();
        close();
    }

    const handleOnChange = (nameSelected) => {
        setNameToRemove(nameSelected);
        const TMP_productToRemove = categoriesProductAvailable.filter(category => category.name.toString() === nameSelected.toString());
        setCategoryToRemove(TMP_productToRemove);
    }



    const handleClickDeleteButton = async () => {
        //logic delete button
        await fetch(`${URI}categoryProduct/v1/delete/categoryProductByName/${nameToRemove}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                const { success } = data
                console.log('data delete btn -> ', data);
                if (success) {
                    console.log(nameToRemove);
                    dispatch(deleteCategoryProductByName({ categoryRemoved: nameToRemove }))
                    setMsg(`The product with id ${nameToRemove} has been removed successfully`)
                }
            })
            .catch(error => {
                console.log(error.toString())
                setMsg(error.toString())
            })
        setNameToRemove('')

    }

    setTimeout(() => {
        setMsg('Remove Category By Name')
    }, 5000);

    return (
        <Wrapper>
            <div className="box-remove-category">
                <div className="container-btn-box-remove-category">

                    <div className="container-btn-close-remove-product">
                        <div className="wrapper-btn-add-remove-list-delete">
                            <button className="btn-delete" onClick={handleClickDeleteButton}>Delete</button>
                        </div>

                        <button className="btn-close-remove-product" onClick={handleClickCloseButton}>X</button>
                    </div>

                </div>

                <div className="msg">{msg}</div>

                <div className="wrapper-form-select-product-to-remove">

                    <label>Select Name Category </label>
                    <select className="select-size" value={nameToRemove} onChange={(e) => handleOnChange(e.target.value)} >
                        < option value={'None'} > None</option>
                        {
                            categoriesProductAvailable && categoriesProductAvailable.map((category, index) => {
                                return (
                                    < option key={index} value={category.name} > {category.name}</option>
                                )
                            })
                        }
                    </select>


                </div>


            </div>


        </Wrapper>
    )
};

export default CategoryProducts;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content : space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;

    label {
        display: flex;
        flex-direction: row;
        justify-content : flex-start;
        align-items: center;
        width: 100%;
        height: 100%;    
        font-size: 15px;
        font-weight: bold;
    }
     
    p {
        display: flex;
        flex-direction: row;
        justify-content : flex-start;
        align-items: center;
        width: 100%;
        height: 100%;    
        font-size: 12px;
        font-weight: bold;
    }

    .box-add-new-product input , .select-category, .select-size{
        width: 100%;
        height: 25px;
        margin: 2px;
        text-align: center;
        border-radius: 5px;
        border: none;
        outline: none;
        background: var(--buttonColor);
    }


    .box-remove-category {
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

    .container-btn-box-remove-category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
    }
    
    .btn-delete,
    .btn-add-remove-list,
    .btn-close-remove-product {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        min-height: 30px;
        border: none;
        border-radius: 5px;
        margin: 5px;
        font-size: 15px;
        outline: none;
        cursor: pointer;
        color: var(--baseColor);
        background: var(--buttonColor);
    }

    .container-btn-close-remove-product {
        display: flex;
        justify-content: space-between;
        margin: 5px;
        padding: 5px;
        float: left;
        width: 100%;  
  }

  
    .btn-delete:hover,
    .btn-add-remove-list:hover {
        color: white;
    }
    
    .btn-delete:hover,
    .btn-close-remove-product:hover{
        background: red;
    }

    .wrapper-btn-add-remove-list-delete {
        display: flex;
        // padding: 5px;
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



    .wrapper-form-select-product-to-remove {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 10px;
        width: 90%;
        height: auto
    }
    
    .container-product-to-remove {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 20px 5px;
        padding: 5px;
        width: 90%;
        max-height: 450px;
    }


    .container-product-to-remove-left-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        padding: 5px;
        width: 100%;
        height: 300px;
        overflow: auto;
    }
    
    .wrapper-product-to-remove-left-side {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: inherit;
    }

      .container-product-to-remove-right-side {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: 100%;
        height: auto;
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