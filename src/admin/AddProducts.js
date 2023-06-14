import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import UploadImage from "../components/UploadImage";
import logoIcon from '../icons/logoIcon.svg'
import styledComponents from "styled-components";
import {  selectProduct, addListOfNewProduct, addNewProduct } from "../Features/ProductSlice";
import { URI } from "../_Utils/Dependency";
import UploadImage from "../components/UploadImage";
import LoadingSpin from "react-loading-spin";
// import axios from "axios";

const AddProducts = ({ close }) => {
  const dispatch = useDispatch();

  const { categoriesProductAvailable } = useSelector(selectProduct);
  const { sizesProductAvailable } = useSelector(selectProduct);
  const [listOfProductAdded, setListOfProductAdded] = useState([]);



  const [msg, setMsg] = useState('Create New Product')
  const [loading, setLoadind] = useState(false)

  const [nameProduct, setNameProduct] = useState('');
  const [colorProduct, setColorProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [selectedPictures, setSelectedPictures] = useState(null);
  const [brandProduct, setBrandProduct] = useState('');
  const [sizeProduct, setSizeProduct] = useState('');
  const [stockProduct, setStockProduct] = useState(1);
  const [categoryProduct, setCategoryProduct] = useState('');

  const resetFields = () => {
    setNameProduct('');
    setColorProduct('');
    setDescriptionProduct('');
    setPriceProduct('');
    setBrandProduct('');
    setStockProduct(1);
    setSizeProduct('');
    setCategoryProduct('');
    setSelectedPictures(null)
  }

  const existEmptyFields = (...fields) => {
    let emptyField = false;
    fields.map(element => {
      if (element === '' || element === null) {
        emptyField = true;
      }
    })
    return emptyField;
  }

  const handleClickCloseButton = (e) => {
    e.preventDefault();
    resetFields();
    close();
    setMsg('Create New Product')
  }

  const handleClickSaveButton = (e) => {
    e.preventDefault();
    if (!existEmptyFields(nameProduct, colorProduct, descriptionProduct, priceProduct, brandProduct, categoryProduct, stockProduct, selectedPictures)) {

      let linksToSelectedImages = selectedPictures.blobs;
      const addNewProductToList = {
        id: ++listOfProductAdded.length,
        nameProduct: nameProduct,
        colorProduct: colorProduct,
        descriptionProduct: descriptionProduct,
        priceProduct: priceProduct,
        brandProduct: brandProduct,
        sizeProduct: sizeProduct,
        stockProduct: stockProduct,
        categoryProduct: categoryProduct,
        selectedPictures: linksToSelectedImages
      }


      dispatch(addListOfNewProduct({ listOfNewProduct: addNewProductToList }))

      resetFields();
      { setMsg('Create New Product') }
    }
    else { setMsg('Empty field(s)') }

  }


  const handleClickCreateButton = async () => {
    setLoadind(true)
    let formData = new FormData();

    if (!existEmptyFields(nameProduct, colorProduct, descriptionProduct, priceProduct, brandProduct, categoryProduct, stockProduct, selectedPictures)) {

      formData.append("name", nameProduct)
      formData.append("brand", brandProduct)
      formData.append("color", colorProduct)
      formData.append("description", descriptionProduct)
      formData.append("price", priceProduct)
      formData.append("sizes", [
        {
          "stock": stockProduct,
          "size": sizeProduct
        }
      ])
      formData.append("categoryName", categoryProduct)

      // append all images to formData
      for (let index = 0; index < selectedPictures.files.length; index++) {
        let image = selectedPictures.files[index];
        formData.append(`files`, image);
      }

      
      await fetch(`${URI}Product/v1/create/newProduct`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `${localStorage.getItem('TOKEN_ACCES') && localStorage.getItem('TOKEN_ACCES').split(' ')[1]}`
        },
      })
        .then(response => response.json())
        .then(data => {
          const { success, newProductCreated } = data

          if (success) {
            dispatch(addNewProduct({
              newProduct: {
                id: newProductCreated.id,
                name: newProductCreated.name,
                color: newProductCreated.color,
                description: newProductCreated.description,
                price: newProductCreated.price,
                brand: newProductCreated.brand,
                sizeStock: newProductCreated.sizeStock,
                stock: newProductCreated.stock,
                categoryProduct: newProductCreated.categoryProduct,
                productImages: newProductCreated.productImages
              }
            }))
          }
        })
        .catch(error => setMsg(error.toString()))

      setLoadind(false)
      setMsg('The product was successfully created')
      resetFields()
      
    } else { setMsg('Empty field(s)') }
  }

  setTimeout(() => {
    setMsg('Create New Product')
  }, 5000);



  return (
    <Wrapper>

      <div className="box-add-new-product">

        <div className="loading-spiner" style={{ position: 'absolute' }}>
          {loading && <LoadingSpin />}
        </div>

        <div className="container-btn-box-add-new-product">

          <div className="wrapper-btn-save-create">
            <button className="btn-save-add-new-product" onClick={handleClickSaveButton}> Save Multiple Products </button>
            <button className="btn-create-add-new-product" onClick={handleClickCreateButton}> Create </button>
          </div>

          <div className="wrapper-btn-close-add-new-product">
            <button className="btn-close-add-new-product" onClick={handleClickCloseButton}>X</button>
          </div>

        </div>
        <div className="msg">{msg}</div>

        <div className="wrapper-form">
          <div className="left-side">

            <label>Name Product</label>
            <input type={'text'} autoFocus={true} value={nameProduct} id={'nameProduct'} onChange={(e) => { setNameProduct(e.target.value) }} />
            <label>Color Product</label>
            <input type={'text'} value={colorProduct} id={'colorProduct'} onChange={(e) => { setColorProduct(e.target.value) }} />
            <label>Description Product</label>
            <input type={'text'} value={descriptionProduct} id={'descriptionProduct'} onChange={(e) => { setDescriptionProduct(e.target.value) }} />
            <label>Price Product</label>
            <input type={'number'} value={priceProduct} id={'priceProduct'} onChange={(e) => { setPriceProduct(e.target.value) }} />
            <label>Brand Product</label>
            <input type={'text'} value={brandProduct} id={'brandProduct'} onChange={(e) => { setBrandProduct(e.target.value) }} />
            <label>Stock Product</label>
            <input type={'number'} value={stockProduct} id={'stockProduct'} onChange={(e) => { setStockProduct(e.target.value) }} />
            <label>Size Product</label>
            <select className="select-size" value={sizeProduct} onChange={(e) => setSizeProduct(e.target.value)}>
              < option value={'None'} > None</option>
              {
                sizesProductAvailable && sizesProductAvailable.map((size, index) => {
                  return (
                    < option key={index} value={size.name} > {size.name}</option>
                  )
                })
              }
            </select>

            <label>Category Product</label>
            <select className="select-category" value={categoryProduct} onChange={(e) => setCategoryProduct(e.target.value)}>
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


          <div className="right-side">
            {/*             <label>Picture Link</label>
            <input type={'text'} value={picturePath} placeholder={'optional'} id={'picturePath'} onChange={(e) => { setPicturePath(e.target.value) }} /> */}
            <label>Picture Product</label>
            <div className="box-add-new-procudct-component">
              <UploadImage imgsSelected={(imgs) => setSelectedPictures(imgs)} />
            </div>

            <div className="wrapper-imgs">
              <div className="up-side-imgs">
                <div className="img-1"><img width={'100px'} height={'auto'} src={selectedPictures !== null && selectedPictures.blobs[0] || logoIcon} alt="img 1" /></div>
                <div className="img-2"><img width={'100px'} height={'auto'} src={selectedPictures !== null && selectedPictures.blobs[1] || logoIcon} alt="img 2" /></div>
              </div>

              <div className="down-side-imgs">
                <div className="img-3"><img width={'100px'} height={'auto'} src={selectedPictures !== null && selectedPictures.blobs[2] || logoIcon} alt="img 3" /></div>
                <div className="img-4"><img width={'100px'} height={'auto'} src={selectedPictures !== null && selectedPictures.blobs[3] || logoIcon} alt="img 4" /></div>
              </div>

            </div>

          </div>
        </div>

      </div >
    </Wrapper>
  )
};

export default AddProducts;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content : space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .main-page {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      width: 80%;
      overflow: auto;
      height: 100%;
    }

    .box-add-new-product {
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

s

    
    .btn-done:hover,
    .btn-save-add-new-product:hover,
    .btn-close-add-new-product:hover,
    .btn-create-add-new-product:hover {
      color: white;
    }

    .btn-close-add-new-product:hover{
      background: red;
    }

    .container-btn-box-add-new-product {
      display: flex;
      justify-content: space-between;
      width: 100%;
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

    .wrapper-btn-close-add-new-product {
      display: flex;
      justify-content: flex-end;
      margin: 5px;
      padding: 5px;
      float: left;
      width: 50%;  
    }

    .wrapper-btn-save-create {
      display: flex;
      justify-content: flex-start;
      margin: 5px;
      padding: 5px;
      float: left;
      width: 50%;
    }

    .btn-create-add-new-product,
    .btn-save-add-new-product,
    .btn-close-add-new-product {
      display: flex;
      justify-content: center;
      align-items: center;
      width: auto;
      height: auto;
      border: none;
      border-radius: 5px;
      margin: 5px;
      font-size: 15px;
      outline: none;
      cursor: pointer;
      color: var(--baseColor);
      background: var(--buttonColor);
    }

    .wrapper-form {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 10px;
      width: 90%;
      max-height: 450px;
      overflow: auto;
    }
    
    .left-side {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px;
      width: 100%;
      height: 100%;
    }
    
    .right-side {
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
    
      

     
//************************ 2000px ******************************
    @media only screen and (min-width:2000px) {
      .box-add-new-product {
        transform: translate(-40%);
        min-width: 1024px;
      }
  }


//************************ 1450px ******************************
    @media only screen and (min-width:1450px) {
      .box-add-new-product {
        transform: translate(-30%);
        min-width: 1024px;
      }
  }

  //************************ 1000px ******************************
    @media only screen and (max-width:1000px) {
        
      .admin {
        flex-direction: column;
      }
      
      .dashboard-admin-info p span{
        font-size: 15px;
        font-weight: bold;
      }
     
      
      .role ul {
        font-size: 10px;
        font-weight: bolder;
      }
  }



      //************************ 600px ******************************
    @media only screen and (max-width:600px) {
      
      .menu-btn-add-new-project,
      .menu-btn-remove-project {
        font-size: 13px;
        font-weight: bolder;
      }

      .dashboard-admin-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }

      .dashboard-admin-info p {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;
      }
      
      .dashboard-admin-info p span{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 13px;
     }


    }
    
`;