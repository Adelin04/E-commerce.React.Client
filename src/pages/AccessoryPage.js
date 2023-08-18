import React from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { selectProduct } from "../Features/ProductSlice";


const AccessoryPage = () => {
  let { products, filteredProducts } = useSelector(selectProduct);

  return (
    <div className="accessoryPage flex flex-col justify-between items-center w-full h-full">
      <Header />

      <div className="wrapper-products-list flex justify-around items-center w-full my-10 mx-auto">

        {filteredProducts === null ? < ProductsList products={products.filter(product => product.superCategoryProduct.name.toString().toLowerCase() === "ACCESSORY".toLowerCase())} />
          :
          < ProductsList products={filteredProducts} />}
      </div>

      <Footer />
    </div>
  );
};

export default AccessoryPage;

