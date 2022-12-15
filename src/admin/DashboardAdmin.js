import React, { useState } from "react";
import styledComponents from "styled-components";
import AddProducts from "./AddProducts";
import logoIcon from '../icons/logoIcon.svg'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCategoiesProductAvailable, getAllSizesProductAvailable, selectProduct } from "../Features/ProductSlice";
import { selectUser } from "../Features/UserSlice";
import UploadImage from "../components/UploadImage";
import { useEffect } from "react";
import { URI } from "../_Utils/Dependency";

const DashboardAdmin = () => {
  const { products } = useSelector(selectProduct);
  const { categoriesProductAvailable } = useSelector(selectProduct);
  const { sizesProductAvailable } = useSelector(selectProduct);
  const admin = useSelector(selectUser).user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [goToAddProduct, setGoToAddProduct] = useState(false)
  const [listOfProductAdded, setListOfProductAdded] = useState([]);
  const [disableButtonSave, setDisablebuttonSave] = useState(true)

  const [msg, setMsg] = useState('Create New Product')
  const [toggleMsg, setToggleMsg] = useState(false);

  const [nameProduct, setNameProduct] = useState('');
  const [colorProduct, setColorProduct] = useState('');
  const [descriptionProduct, setDescriptionProduct] = useState('');
  const [priceProduct, setPriceProduct] = useState('');
  const [picturePath, setPicturePath] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [brandProduct, setBrandProduct] = useState('');
  const [sizeProduct, setSizeProduct] = useState('');
  const [categoryProduct, setCategoryProduct] = useState('');

  useEffect(() => {
    fetch(`${URI}api/CategoryProduct/v1/get/allCategoriesProduct`)
      .then(response => response.json())
      .then(data => {
        const { success, listOfCategories, count } = data;

        if (success)
          dispatch(getAllCategoiesProductAvailable({ allCategoriesProduct: listOfCategories }))
      })
      .catch(err => setMsg(err.toString()))

    fetch(`${URI}api/Size/v1/get/allSizes`)
      .then(response => response.json())
      .then(data => {
        const { success, sizes, nrsizes } = data;

        if (success)
          dispatch(getAllSizesProductAvailable({ allSizesProduct: sizes }))
      })
      .catch(err => setMsg(err.toString()))
  }, [])


  const resetFields = () => {
    setNameProduct('');
    setColorProduct('');
    setDescriptionProduct('');
    setPriceProduct('');
    setPicturePath('');
    setBrandProduct('');
    setSizeProduct('');
    setCategoryProduct('');
  }

  const existEmptyFields = (...fields) => {
    let emptyField = false;
    fields.map(element => {
      if (element === '') {
        emptyField = true;
      }
    })
    return emptyField;
  }

  const handleClickCloseButton = (e) => {
    e.preventDefault();
    resetFields();
    setGoToAddProduct(false)
    setMsg('Create New Product')
  }

  const handleClickSaveButton = (e) => {
    e.preventDefault();

    if (!existEmptyFields(nameProduct, colorProduct, descriptionProduct, priceProduct, brandProduct, categoryProduct)) {
      const addNewProductToList = {
        id: ++listOfProductAdded.length,
        nameProduct: nameProduct,
        colorProduct: colorProduct,
        descriptionProduct: descriptionProduct,
        priceProduct: priceProduct,
        picturePath: picturePath,
        brandProduct: brandProduct,
        sizeProduct: sizeProduct,
        categoryProduct: categoryProduct
      }

      listOfProductAdded.push(addNewProductToList);
      resetFields();
      { setMsg('Create New Product') }
    }
    else { setMsg('Empty field(s)') }

  }



  const addNewProduct = () => {
    return (
      <div className="box-add-new-product">
        {console.log('sizesProductAvailable ', sizesProductAvailable)}
        <div className="wrapper-btn-box-add-new-product">
          <button className="btn-save-add-new-product" onClick={handleClickSaveButton}>SAVE</button>
          <div className="msg">{msg}</div>
          <button className="btn-close-add-new-product" onClick={handleClickCloseButton}>X</button>
        </div>

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
            <label>Picture Link</label>
            <input type={'text'} value={picturePath} placeholder={'optional'} id={'picturePath'} onChange={(e) => { setPicturePath(e.target.value) }} />
            <label>Picture Product</label>
            <div className="box-add-new-procudct-component">
              <AddProducts />
              {/* <UploadImage selectedFiles={selectedPicture} /> */}
            </div>

            <div className="wrapper-imgs">

              <div className="up-side-imgs">
                <div className="img-1"><img width={'50px'} height={'auto'} src={logoIcon} alt="img 1" /></div>
                <div className="img-2"><img width={'50px'} height={'auto'} src={logoIcon} alt="img 2" /></div>
              </div>

              <div className="down-side-imgs">
                <div className="img-3"><img width={'50px'} height={'auto'} src={logoIcon} alt="img 3" /></div>
                <div className="img-4"><img width={'50px'} height={'auto'} src={logoIcon} alt="img 4" /></div>
              </div>

            </div>

          </div>
        </div>

      </div >
    )
  }

  const showAllNewProductAdded = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        {listOfProductAdded.map((product, index) => {
          return (
            <div className="box-added-new-product" id={product.id} key={index}>
              <div className="wrapper-btns-product-added">
                <button id={product.id} className="btn-edit-product-added">Edit</button>
                <button id={product.id} className="btn-close-product-added" onClick={handleClickCloseBtnProductAdded}> X</button>
              </div>
              <label>Name Product</label>
              <input defaultValue={product.nameProduct} />
              <label>Color Product</label>
              <input defaultValue={product.colorProduct} />
              <label>Description Product</label>
              <input defaultValue={product.descriptionProduct} />
              <label>Price Product</label>
              <input defaultValue={product.priceProduct} />
              <label>Sizes Product</label>
              <input defaultValue={product.stockProduct} />
              <label>Category Product</label>
              <input defaultValue={product.categoryProduct} />
              <label>Picture Link</label>
              <input defaultValue={product.picturePath} />
              <label>Picture Product</label>
            </div>
          )
        })}

      </div>
    )
  }

  const handleClickCloseBtnProductAdded = (e) => {
    e.preventDefault();
    let idTarget = e.target.id;
    let TMP_LIST = listOfProductAdded.filter(product => Number(product.id) !== Number(idTarget));

    setListOfProductAdded(TMP_LIST);
  }

  return (
    <Wrapper>
      <div className="menu">

        <div className="container-btns">
          <button
            className="menu-btn-add-new-project"
            onClick={() => { setGoToAddProduct(true) }}
          >Add new product</button>
          <button
            className="menu-btn-remove-project"
            onClick={() => navigate("/admin/dashboard/remove/")}
          >Remove product</button>
        </div>
        <div className="dashboard-admin-info">
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <p className="admin"> <span>Admin </span>{admin && <span className="full-name">{` ${admin.firstName} ${admin.lastName}`}</span>}</p>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <div className="role"> <span>Role </span>
            <ul className="role-ul">
              {admin.role[0].map((item, index) => {
                return <li className="role-li" key={index}>{item}</li>
              })}
            </ul>
          </div>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <p className="nr-prod-online"> <span>Nr. products online </span>{`  ${products && products.length}`}</p>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          {/* <p>{`Subscribers :  ${subscribers}`}</p> */}
        </div>
      </div>

      <div className="main-page">
        {goToAddProduct && <div style={{ position: 'absolute', background: 'hsl(294deg 26% 44% / 70%)', width: '100%', height: '100%', zIndex: '1' }}></div>}
        <div className="wrapper-box-added-new-product" style={{ position: 'relative' }}>
          {listOfProductAdded.length > 0 && showAllNewProductAdded()}
        </div>
      </div>

      <div style={{ zIndex: '2' }}>
        {goToAddProduct && addNewProduct()}
      </div>
    </Wrapper>
  );
};

export default DashboardAdmin;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction: row;
    justify-content : space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;


    
    .menu {
      display: flex;
      flex-direction:column;
      width: 20%;
      height: 100%;
      background: var(--baseColor);
    }
    
    .container-btns {
      display: flex;
      flex-direction:column;
      justify-content : flex-start;
      align-items: center;
      width: auto;
      height: 100%;
    }
    
    .menu-btn-add-new-project,
    .menu-btn-remove-project {
      display: flex;
      justify-content : center;
      align-items: center;
      margin: 5px;
      width: 80%;
      min-height: 35px;
      height: auto;
      font-size: 15px;
      font-weight: bolder;
      border: none;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      color: var(--baseColor);
      background: var(--buttonColor);
    }
    
    .menu-btn-add-new-project:hover,
    .menu-btn-remove-project:hover {
      color: white;
    }    
  
    .dashboard-admin-info {
      display: flex;
      flex-direction:column;
      justify-content : space-between;
      align-items: flex-start;
      margin: 5px;
    }

    .dashboard-admin-info p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: auto;
      padding: 5px 0px;
      font-size: 15px;
      font-weight: bolder;
    }
    
    .role,
    .dashboard-admin-info p span{
      font-size: 15px;
      font-weight: bold;
    }

    .role {

    }
    
    .hr-dashboard-admin {
      margin: 0px auto;
    }
    

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
      background: var(--baseColor);
    }
    
    .wrapper-btn-box-add-new-product {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    

    .btn-save-add-new-product,
    .btn-close-add-new-product {
      font-size: 15px;
      color: var(--baseColor);
    }

    .btn-close-add-new-product:hover {
      color: red;
    }

    .btn-save-add-new-product:hover {
      color: white;
    }

    .wrapper-form {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin: 10px;
      width: 90%;
      height: 100%;
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
      min-height: 200px;
    }

    .up-side-imgs {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }

    .down-side-imgs {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
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
    
    .box-add-new-procudct-component {
      display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       width: 90%;
      }
      
      .wrapper-btns-product-added {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding: 5px;
      }
      
      .btn-save-add-new-product,
      .btn-close-add-new-product,
      .btn-edit-product-added,
      .btn-close-product-added {
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 5px;
        margin: 5px;
        outline: none;
        cursor: pointer;
        background: var(--buttonColor);
      }
      
      .btn-edit-product-added {
        width: 50px;
      }
      
      .btn-close-product-added {
        width: 20px;
      }

     .wrapper-box-added-new-product {
       display: flex;
       flex-direction: row;
       justify-content: center;
       align-items: flex-start;
       width: 100%;
       height: 100%;
       overflow: auto;
     }

     .box-added-new-product {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       //  width: auto;
       width: 300px;
        height: auto;
        margin: 30px;
        padding: 5px;
        background: var(--baseColor);
    }
    
    .box-added-new-product input{
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
