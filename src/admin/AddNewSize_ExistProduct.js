import React from "react";
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
    const [idToRemove, setIdToRemove] = useState();
    const [productToRemove, setProductToRemove] = useState();
    const [msgButton, setMsgButton] = useState('Add new sizes and stock')
    const [msg, setMsg] = useState('Select Product By Id')

    const handleClickCloseButton = (e) => {
        e.preventDefault();
        // resetFields();
        close();
    }

    const handleOnChange = (idSelected) => {
        setIdToRemove(idSelected);
        const TMP_productToRemove = products.filter(product => product.id.toString() === idSelected.toString());

        setProductToRemove(TMP_productToRemove);
    }


    const handleAddNewSizeToExistProduct = async () => {
        //logic delete button
      /*   await fetch(`${URI}Product/v1/delete/productById/${idToRemove}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `${localStorage.getItem('TOKEN_ACCES') && localStorage.getItem('TOKEN_ACCES')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                const { success } = data

                if (success) {
                    dispatch(deleteProductById({ idTarget: idToRemove }))
                    setMsg(`The product with id ${idToRemove} has been removed successfully`)
                }
            })
            .catch(error => {
                console.log(error.toString())
                setMsg(error.toString())
            })
        setIdToRemove('') */

    }



    return (
        <Wrapper>
            <div className="box-remove-product">
                <div className="container-btn-box-remove-product">

                    <div className="container-btn-close-remove-product">
                        <div className="wrapper-btn-add-remove-list-delete">
                            <Button
                                onClick={handleAddNewSizeToExistProduct}
                                textBtn={msgButton}
                                className={'btn-add-new-size flex justify-center items-center w-max p-2 h-8 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />


                        </div>

                        <button className="btn-close-remove-product" onClick={handleClickCloseButton}>X</button>
                    </div>

                </div>
                <div className="msg">{msg}</div>

                <div className="wrapper-form-select-product-to-remove">

                    <label>Select Id Product</label>
                    <select className="select-size" value={idToRemove} onChange={(e) => handleOnChange(e.target.value)} >
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
                    <div className="container-product-to-remove">

                        <div className="container-product-to-remove-left-side">

                            <div className="wrapper-product-to-remove-left-side">
                                {/* <label>Name </label>
                                <p>{productToRemove[0].name}</p>
                                <label>Color </label>
                                <p>{productToRemove[0].color}</p>
                                <label>Description </label>
                                <p>{productToRemove[0].description}</p>
                                <label>Price </label>
                                <p>{productToRemove[0].price} {productToRemove[0].currency}</p>
                                <label>Brand</label>
                                <p>{productToRemove[0].brand}</p>
                                <label>Category </label>
                                <p>{productToRemove[0].categoryProduct.name}</p> */}
                                <label>Size </label>
                                <p>{productToRemove[0].size}</p>
                                <label>Stock</label>
                                <p>{productToRemove[0].stock}</p>
                            </div>

                        </div>

                        <div className="wrapper-imgs w-[50%]">
                            <div className="up-side-imgs">
                                <div className="img-1 "><img width={'100px'} height={'auto'} src={productToRemove[0].productImages.length > 0 && productToRemove[0].productImages[0].path || logoIcon} alt="img 1" /></div>
                                <div className="img-2"><img width={'100px'} height={'auto'} src={productToRemove[0].productImages.length > 1 && productToRemove[0].productImages[1].path || logoIcon} alt="img 2" /></div>
                            </div>

                            <div className="down-side-imgs">
                                <div className="img-3"><img width={'100px'} height={'auto'} src={productToRemove[0].productImages.length > 2 && productToRemove[0].productImages[2].path || logoIcon} alt="img 3" /></div>
                                <div className="img-4"><img width={'100px'} height={'auto'} src={productToRemove[0].productImages.length > 3 && productToRemove[0].productImages[3].path || logoIcon} alt="img 4" /></div>
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


    .box-remove-product {
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

    .container-btn-box-remove-product {
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