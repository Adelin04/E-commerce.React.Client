import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import FilteredProduct from "../components/FilteredProduct";
import { selectProduct } from "../Features/ProductSlice";


const ClothesPage = () => {
  let state = useSelector(selectProduct);

  return (
    <div className="clothesPage flex flex-col justify-between items-center w-full h-full">
      <Header />

      <div className="wrapper-products-list flex justify-around items-center w-full my-10 mx-auto">
        {state && < ProductsList products={state.filteredProducts} />}
 
      </div>

      <Footer />

    </div>
  );
};

export default ClothesPage;
