import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { selectProduct } from "../Features/ProductSlice";


const AccesoryPage = () => {
  let state = useSelector(selectProduct);
  return (
    <div className="accessoryPage flex flex-col justify-between items-center w-full h-full">
      <Header />

      <div className="wrapper-products-list flex flex-wrap justify-center items-center w-[90%]">
        {state && state.filteredProducts !== null && <ProductsList products={state.filteredProducts || null} />}
      </div>

{/*       <div className="wrapper-products-list flex flex-wrap justify-center items-center w-[90%]">
        {state && state.filteredProducts === null && <ProductsList products={state.products && state.products.filter(product => product.categoryProduct.name === "BROOCHES")} />}
      </div> */}

      <Footer />
    </div>
  );
};

export default AccesoryPage;

