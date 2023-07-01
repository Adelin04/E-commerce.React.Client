import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoIcon from '../icons/logoIcon.svg'
import styledComponents from "styled-components";
import { selectProduct, deleteProductById, deleteProductByName, deleteCategoryProductByName } from "../Features/ProductSlice";
import { URI } from "../_Utils/Dependency";
import Button from "../components/Button";


const Size = ({ close }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Redux State
    const { products } = useSelector(selectProduct);
    const { sizesProductAvailable } = useSelector(selectProduct);

    const [newSize, setNewSize] = useState('');
    const [msg, setMsg] = useState('')



    const handleClickSaveNewSize = async () => {

        if (newSize !== null || newSize !== '')
            await fetch(`${URI}Size/v1/create/newSize`, {
                method: 'POST',
                body: JSON.stringify({ sizeName: newSize }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${localStorage.getItem('TOKEN_ACCES') && localStorage.getItem('TOKEN_ACCES')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const { success } = data
                    console.log('response -> ', data);
                    // if (success) {
                    // }
                })
                .catch(error => {
                    console.log(error.toString())
                    setMsg(error.toString())
                })
                .finally(() => setNewSize(''))

    }


    return (
        <Wrapper>
            <div className="box-remove-category">

                {/* <div className="msg">{msg}</div> */}
                <div className="wrapper-header flex justify-between w-full">
                    <div>

                        <Button
                            value={newSize}
                            onClick={handleClickSaveNewSize}
                            textBtn={"Save New Size"}
                            className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
                    </div>

                    <Button
                        value={newSize}
                        onClick={() => close()}
                        textBtn={"X"}
                        className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />

                </div>


                <div className="wrapper-form-select-product flex-col w-full h-full mt-3">
                    <div className="existing-size flex justify-between m-3 items-center">

                        <label>Existing Size </label>
                        <select className="select-size" >
                            < option value={'None'} > None</option>
                            {
                                sizesProductAvailable && sizesProductAvailable.map((size, index) => {
                                    return (
                                        < option key={index} value={size.name} > {size.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="new-size flex justify-between m-3 items-center">

                        <label>New Size </label>
                        <input onChange={(e) => setNewSize(e.target.value)} value={newSize} placeholder="New Size" className="input-size  flex w-full h-6 text-center outline-none border-b-2 border-[var(--sliderColor)] bg-transparent rounded-md" />
                    </div>

                </div>


            </div>


        </Wrapper>
    )
};

export default Size;

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



/*     .wrapper-form-select-product-to-remove {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin: 10px;
        width: 90%;
        height: auto
    } */
    
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