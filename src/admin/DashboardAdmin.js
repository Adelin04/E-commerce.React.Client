import React, { useState } from "react";
import styledComponents from "styled-components";
import AddProducts from "./AddProducts";
import logoIcon from '../icons/logoIcon.svg'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  getAllCategoiesProductAvailable, getAllSizesProductAvailable, removeFromListOfNewProduct, selectProduct } from "../Features/ProductSlice";
import { selectUser } from "../Features/UserSlice";
import { useEffect } from "react";
import { URI } from "../_Utils/Dependency";
import RemoveProducts from "./RemoveProducts";
import CategoryProducts from "./CategoryProducts";

const DashboardAdmin = () =>
{
  const { products } = useSelector(selectProduct);
  const admin = useSelector(selectUser).user;
  const { newProductsAdded } = useSelector(selectProduct);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [goToAddProduct, setGoToAddProduct] = useState(false)
  const [goToSectionCategory, setGoToSectionCategory] = useState(false)
  const [goToRemoveProduct, setGoToRemoveProduct] = useState(false)
  const [msg, setMsg] = useState('Create New Product')

  useEffect(() =>
  {
    fetch(`${URI}CategoryProduct/v1/get/allCategoriesProduct`)
      .then(response => response.json())
      .then(data =>
      {
        const { success, listOfCategories, count } = data;

        if (success)
          dispatch(getAllCategoiesProductAvailable({ allCategoriesProduct: listOfCategories }))
      })
      .catch(err => setMsg(err.toString()))

    fetch(`${URI}Size/v1/get/allSizes`)
      .then(response => response.json())
      .then(data =>
      {
        const { success, sizes, nrsizes } = data;

        if (success)
          dispatch(getAllSizesProductAvailable({ allSizesProduct: sizes }))
      })
      .catch(err => setMsg(err.toString()))
  }, [])

  const handleClickCreateButton = async (e) =>
  {
    console.log('create');
    let formData = new FormData();

    //   formData.append("name", nameProduct)
    //   formData.append("brand", brandProduct)
    //   formData.append("color", colorProduct)
    //   formData.append("description", descriptionProduct)
    //   formData.append("price", priceProduct)
    //   formData.append("sizes", [
    //     {
    //       "stock": stockProduct,
    //       "size": sizeProduct
    //     }
    //   ])
    //   formData.append("categoryName", categoryProduct)

    //   // append all images to formData
    //   for (let index = 0; index < selectedPictures.files.length; index++) {
    //     let image = selectedPictures.files[index];
    //     formData.append(`files`, image);
    //   }

    //   await fetch(`${URI}api/Product/v1/create/newProduct`, {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then(response => response.json())
    //     .then(data => console.log('data', data))
    //     .catch(error => console.log(error))

  }


  const handleClickCloseBtnProductAdded = (e) =>
  {
    e.preventDefault();
    let idTarget = e.target.id;
    console.log(idTarget);

    dispatch(removeFromListOfNewProduct({ removeId: idTarget }))
  };

  const showAllNewProductAdded = (products = Array) =>
  {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column', width: '100%', margin: '0px' }}>

        <nav className="header-menu-admin-dashboard">
          <div className="wrapper-btn-create">
            <button className="btn-create" onClick={handleClickCreateButton}> Create </button>
          </div>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', margin: '40px auto' }}>

          {products.length > 0 && products.map((product, index) =>
          {
            return (
              <div className="box-added-new-product" id={product.id} key={index}>
                <div className="wrapper-btns-product-added">
                  <button id={product.id} className="btn-edit-product-added">Edit</button>
                  <button id={product.id} className="btn-close-product-added" onClick={handleClickCloseBtnProductAdded}> X </button>
                </div>
                <label>Name Product</label>
                <input defaultValue={product.nameProduct} />
                <label>Color Product</label>
                <input defaultValue={product.colorProduct} />
                <label>Description Product</label>
                <input defaultValue={product.descriptionProduct} />
                <label>Price Product</label>
                <input defaultValue={product.priceProduct} />
                <label>Brand Product</label>
                <input defaultValue={product.brandProduct} />
                <label>Sizes Product</label>
                <input defaultValue={product.sizeProduct} />
                <label>Category Product</label>
                <input defaultValue={product.categoryProduct} />

                <div className="wrapper-imgs">
                  <div className="up-side-imgs">
                    <div className="img-1"><img width={'100px'} height={'auto'} src={product && product.selectedPictures[0] || logoIcon} alt="img 1" /></div>
                    <div className="img-2"><img width={'100px'} height={'auto'} src={product && product.selectedPictures[1] || logoIcon} alt="img 2" /></div>
                  </div>

                  <div className="down-side-imgs">
                    <div className="img-3"><img width={'100px'} height={'auto'} src={product && product.selectedPictures[2] || logoIcon} alt="img 3" /></div>
                    <div className="img-4"><img width={'100px'} height={'auto'} src={product && product.selectedPictures[3] || logoIcon} alt="img 4" /></div>
                  </div>

                </div>
              </div>
            )
          })}

        </div>
      </div>
    )
  }




  return (
    <Wrapper>

      <div className="menu">

        <div className="wrapper-title">
          <Link
            className="title"
            to={"/"}
            style={{ textDecoration: "none", color: "black", width: "170px" }}
          >
            <img style={{ width: "40px", height: "auto" }} src={logoIcon} />
            <span style={{ margin: "0px 5px" }}>BOUTIQUE</span>
          </Link>
        </div>

        <div className="container-btns">
          <button
            className="menu-btn-add-new-project"
            onClick={() => { setGoToAddProduct(true); setGoToRemoveProduct(false) }}
          >Add new product</button>
          <button
            className="menu-btn-remove-project"
            onClick={() => { setGoToRemoveProduct(true); setGoToAddProduct(false) }}
          >Remove product</button>
          <button
            className="menu-btn-remove-project"
            onClick={() => { setGoToSectionCategory(true); setGoToAddProduct(false); setGoToRemoveProduct(false) }}
          >Category Product</button>
        </div>
        <div className="dashboard-admin-info">
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <p className="admin"> <span>Admin </span>{admin && <span className="full-name">{` ${admin.firstName} ${admin.lastName}`}</span>}</p>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <div className="role"> <span>Role </span>

            <ul className="role-ul">
              {admin.role.map((item, index) =>
              {
                return <li className="role-li" key={index}>{item}</li>
              })}
            </ul>

          </div>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          <p className="nr-prod-online"> <span>Nr. products online </span>{`  ${products && products.length}`}</p>
          <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
        </div>
      </div>

      <div className="main-page" onClick={() => setGoToAddProduct(false)}>
        {goToAddProduct && <div style={{ position: 'absolute', background: 'hsl(294deg 26% 44% / 70%)', width: '100%', height: '100%', zIndex: '1' }}></div>}
        {goToRemoveProduct && <div style={{ position: 'absolute', background: 'hsl(294deg 26% 44% / 70%)', width: '100%', height: '100%', zIndex: '1' }}></div>}

        <div className="wrapper-box-added-new-product" style={{ position: 'relative' }}>
          {newProductsAdded.length > 0 && showAllNewProductAdded(newProductsAdded)}
        </div>
      </div>

      <div style={{ zIndex: '2' }}>
        {goToAddProduct && < AddProducts close={() => { setGoToAddProduct(false) }} />}
        {goToRemoveProduct && <RemoveProducts close={() => { setGoToRemoveProduct(false) }} />}
        {goToSectionCategory && < CategoryProducts close={() => { setGoToSectionCategory(false) }} />}
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
      min-width: 250px;
      height: 100%;
      background: var(--baseColor);
    }
    
    .header-menu-admin-dashboard {
      display: flex;
      height: 50px;
      width: 100%;
      background: var(--baseColor);
    }

    .wrapper-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px auto;
      width :auto;
    }

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding:5px;
    }
    
    .container-btns {
      display: flex;
      flex-direction:column;
      justify-content : flex-start;
      align-items: center;
      width: auto;
      height: 100%;
      margin: 15px;
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

    .wrapper-btn-create {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px;
    }

    .btn-create{
      color: var(--baseColor);
      outline: none;
      border: none;
      cursor: pointer;
      width: 100px;
      height: 25px;
      background: var(--buttonColor); 
    }



    .btn-close-product-added:hover {
      background: red;
    }
      
      .wrapper-btns-product-added {
        display: flex;
        justify-content: flex-end;
        margin: 5px;
        padding: 5px;
        float: left;
        width: 90%;
      }
      
      // .btn-save-add-new-product,
      .btn-create,
      .btn-close-add-new-product,
      .btn-edit-product-added,
      .btn-close-product-added {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 25px;
        border: none;
        border-radius: 5px;
        margin: 5px;
        outline: none;
        cursor: pointer;
        background: var(--buttonColor);
        color: var(--baseColor);
        font-size: 17px;
      }
      
/*       .btn-edit-product-added {
        width: 50px;
        height: 25px;
      } */
      
      .btn-close-product-added {
        width: 20px;
      }

      .btn-create:hover,
      .btn-done-product-added:hover,
      .btn-edit-product-added:hover,
      .btn-close-product-added:hover {
        color: white;
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
        
     /*  .admin {
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
  } */

}`;
