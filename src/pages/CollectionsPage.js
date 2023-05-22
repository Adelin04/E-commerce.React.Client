import React from "react";
import { useSelector } from "react-redux";
import styledComponents from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { selectProduct } from "../Features/ProductSlice";

const CollectionPage = () => {
  let state = useSelector(selectProduct);
  return (
    <div className="clothesPage flex flex-col justify-between items-center w-full h-full">
      <Header />

      <div className="wrapper-products-list flex flex-wrap justify-center items-center w-[90%]">
        {state && state.filteredProducts === null && <ProductsList products={state.products && state.products.filter(product => product.categoryProduct.name === "COLLECTIONS")} />}
      </div>

      <Footer />
    </div >
  );
};

export default CollectionPage;

const Wrapper = styledComponents.div`
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height:100%;

    .wrapper-products-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin: 50px auto;
    }
    

    @media only screen and (max-width: 720px) {
      .products-list {
        margin: 50px auto;
        height: auto;
      }
    }
`;
