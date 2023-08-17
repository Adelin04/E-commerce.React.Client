import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { selectProduct } from "../Features/ProductSlice";


const AccessoryPage = () => {
  let state = useSelector(selectProduct);
  return (
    <div className="accessoryPage flex flex-col justify-between items-center w-full h-full">
      <Header />

      <div className="wrapper-products-list flex flex-wrap justify-center items-center w-[90%]">
        {state && < ProductsList products={state.filteredProducts} />}
      </div>

      <Footer />
    </div>
  );
};

export default AccessoryPage;

