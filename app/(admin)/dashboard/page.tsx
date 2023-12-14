'use client'

import React, { useState } from "react";
import logoIcon from "../../../public/logoIcon.svg";
import { useEffect } from "react";
import { URI } from '../../../utils/globalUri';
import AddNewProduct from "../componentAdmin/addNewProduct";
import CategoryProduct from "../componentAdmin/categoryProduct";
import Size from "../componentAdmin/size";
import { useUserStore } from "@/zustandStore/usersStore";
import { useProductsStore } from "@/zustandStore/productsStore";
import Link from "next/link";
import Button from "@/app/component/button";
import { useMounted } from "@/app/component/useMounted ";
import Loading from "@/app/loading";
import Image from "next/image";
import ProductListDashboard from "../componentAdmin/productListDashboard";
import { useAdminStore } from "@/zustandStore/adminStore";
import EditProduct from "../componentAdmin/editProduct";



const DashboardAdmin = () => {
  const { hasMounted } = useMounted()
  const { products, getAllCategoriesProductAvailable, getAllSuperCategoriesProductAvailable, getAllSizesProductAvailable } = useProductsStore(state => state);
  const { isAdmin, user } = useUserStore(state => state);
  const { productClickedToEdit, cleanProductClickedToEdit } = useAdminStore(state => state);

  const [msg, setMsg] = useState("Create New Product");
  const [btnClicked, setBtnClicked] = useState<any>(null);
  const [productClicked, setProductClicked] = useState<any>(null);

  const Menu: any = {
    AddNewProducts: () => <AddNewProduct close={handleClosePopUp} />,
    AddNewCategory: () => <CategoryProduct close={handleClosePopUp} />,
    CreateNewSize: () => <Size close={handleClosePopUp} />,
  };

  const handleClosePopUp = () => setBtnClicked(null);

  const createElementCustom = () => {

    return React.createElement(
      Menu[`${btnClicked}`] as any)
  }

  const onOpenMenu = (buttonClicked: string) => {
    cleanProductClickedToEdit()
    setBtnClicked(buttonClicked)
  }

  useEffect(() => {
    fetch(`${URI}CategoryProduct/v1/get/allCategoriesProduct`)
      .then((response) => response.json())
      .then((data) => {
        const { success, listOfCategories, count } = data;

        if (success)
          getAllCategoriesProductAvailable(listOfCategories)
      })
      .catch((err) => setMsg(err.toString()));

    fetch(`${URI}SuperCategoryProduct/v1/get/allSuperCategoriesProduct`)
      .then((response) => response.json())
      .then((data) => {
        const { success, listOfSuperCategories, count } = data;

        if (success)
          getAllSuperCategoriesProductAvailable(listOfSuperCategories)
      })
      .catch((err) => setMsg(err.toString()));

    fetch(`${URI}Size/v1/get/allSizes`)
      .then((response) => response.json())
      .then((data) => {
        const { success, sizes, nrsizes } = data;

        if (success)
          getAllSizesProductAvailable(sizes);
      })
      .catch((err) => setMsg(err.toString()));

  }, []);



  if (!hasMounted)
    return <Loading />
  return (
    <div className="containerDashboard flex justify-center items-center flex-row h-full w-full overflow-hidden" >
      {/* SLIDER LEFT */}
      <div className="wrapperSliderDashboard flex flex-col justify-between items-center min-w-[300px] h-full z-10  bg-[var(--baseColor)] m-0 p-0 ">

        {/* LOGO */}
        <div className="logoSlider flex justify-center items-center w-max p-4 z-10">
          <Link className="titleContainerNavBarAdmin flex flex-row justify-center items-center w-max h-10 p-1" href={"/"}>
            <Image width={40} height={40} src={logoIcon} alt={'logo'} />
            <span className="text-[25px] p-2 ">BOUTIQUE</span>
          </Link>
        </div>

        {/* <SliderDashboard product={products} user={user} isAdmin={isAdmin}/> */}
        <div className="menu flex flex-col justify-between items-center w-full h-[100%] p-0 m-0 border-r border-grey">

          <div className="containerButtons flex flex-col w-full h-max ">
            <Button
              className="addNewProductButton"
              id="AddNewProducts"
              onClick={(e: any) => { onOpenMenu(e.target.id) }}
              textButton="Add new product"
            />

            <Button
              className="addNewSizeButton"
              id="AddNewCategory"
              onClick={(e: any) => { onOpenMenu(e.target.id) }}
              textButton="Category Product"
            />

            <Button
              className="createNewSizeButton"
              id="CreateNewSize"
              onClick={(e: any) => { onOpenMenu(e.target.id) }}
              textButton="Create New Size"
            />

          </div>

          <div className="dashboardAdminInfo mt-10">
            <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
            <p className="admin">
              {" "}
              <span>Admin </span>
              {isAdmin && (
                <span className="full-name">{` ${user.firstName} ${user.lastName}`}</span>
              )}
            </p>
            <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
            <div className="role">
              {" "}
              <span>Role </span>
              <ul className="role-ul">
                {user?.role.map((item: any, index: number) => {
                  return (
                    <li className="role-li" key={index}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
            <p className="nr-prod-online">
              {" "}
              <span>Nr. products online </span>
              {`  ${products && products.length}`}
            </p>
            <hr className="hr-dashboard-admin" style={{ width: "100%" }} />
          </div>
        </div>
      </div>

      {/* MAIN PAGE */}
      <div className="mainPage relative flex justify-between items-center w-full h-full ">

        <div className="wrapperProductListDashboard flex justify-center items-start w-full w-min-[400px] h-full overflow-y-scroll overflow-x-hidden">
          <ProductListDashboard products={products} setToggleEdit={setProductClicked} />
        </div>

        {btnClicked &&
          <div className="wrapperCreateElement absolute top-0 left-0 w-full h-full z-0 bg-[#503d4e96] sm:block">

            <div className="flex justify-center items-start top-16 absolute transition-all w-full z-10">
              {createElementCustom()}
            </div>

          </div>
        }

        {productClickedToEdit && <div className="wrapperEditProduct w-max h-full"> <EditProduct product={productClickedToEdit} close={handleClosePopUp}/> </div>}

      </div>
      {/* FINAL MAIN PAGE */}

    </div >
  );
};

export default DashboardAdmin;
