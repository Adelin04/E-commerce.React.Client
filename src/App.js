import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ClothesPage from "./pages/ClothesPage";
import AccesoryPage from "./pages/AccesoryPage";
import CollectionsPage from "./pages/CollectionsPage";
import AuthPage from "./pages/AuthPage";
import { URI } from "./_Utils/Dependency";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./Features/UserSlice";
import DashboardAdmin from "./admin/DashboardAdmin";

import Cart from "./components/Cart";
import jwt_decode from "jwt-decode";
import { getAllProducts, selectProduct } from "./Features/ProductSlice";
import ProductDetails from "./components/ProductDetails";
import LoadingSpin from "react-loading-spin";
import UserSetting from "./components/UserSetting";
import AddressPage from "./pages/AddressPage";
import { addProductToShoppingCart } from "./Features/ShoppingCartSlice";
import { SerializeProduct } from "./_Utils/SerializeProduct";


function App() {
  //user state
  const dispatch = useDispatch();
  let userLogged = useSelector(selectUser).user;


  const [loading, setLoading] = useState(true);




  useEffect(async () => {


    await fetch(`${URI}Product/v1/get/allProducts`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { success, products } = data;
        // console.log('data', data);
        if (success) {
          dispatch(
            getAllProducts({
              products: products,
            })
          );


          if ('BASKET' in localStorage) {
            const basketByUser = JSON.parse(localStorage.getItem("BASKET"));

            basketByUser && basketByUser.map(productBasket => {
              dispatch(
                addProductToShoppingCart({
                  newProduct: SerializeProduct(products.filter(product => product.id === productBasket.productId)[0]),
                  quantity: productBasket.quantity,
                  size: productBasket.size,
                })
              );
            })
          }

        }

        if ("TOKEN_ACCES" in localStorage) {
          const token = localStorage.getItem("TOKEN_ACCES");
          let TMP_USER = [];

          const decoded_user = jwt_decode(token); // decode token

          for (const claim in decoded_user) {
            if (Object.hasOwnProperty.call(decoded_user, claim)) {
              TMP_USER.push(decoded_user[claim]);
            }
          }

          dispatch(
            login({
              user: {
                email: TMP_USER[2],
                firstName: TMP_USER[0],
                lastName: TMP_USER[1],
                role: [TMP_USER[3]],
                timeExpirationsToken: TMP_USER[4],
              },
            })
          );

        }


      })
      .catch((error) => console.log(error))

    setLoading(false);

  }, [localStorage.getItem('TOKEN_ACCES') || localStorage.getItem('BASKET')]);


  return (
    <div className="App">
      {!loading ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={!userLogged ? <AuthPage /> : <HomePage />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/Clothes" element={<ClothesPage />} />
          <Route path="/Accessory" element={<AccesoryPage />} />
          <Route path="/Collections" element={<CollectionsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/user/setting" element={<UserSetting />} />
          <Route
            path="/admin/dashboard"
            element={userLogged && <DashboardAdmin />}
          />
        </Routes>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            margin: "100px",
          }}
        >
          {<LoadingSpin />}
        </div>
      )}
    </div>
  );
}

export default App;
