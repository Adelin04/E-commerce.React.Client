import React from "react";
import { useSelector } from "react-redux";
import styledComponents from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductsList from "../components/ProductsList";
import { selectProduct } from "../Features/ProductSlice";


const AccesoryPage = () => {
  let state = useSelector(selectProduct);
  return (
    <Wrapper>
      <Header />

      <div className="wrapper-products-list">
        {state && state.filteredProducts === null && <ProductsList products={state.products && state.products.products} />}
        {state && <ProductsList products={state.filteredProducts} />}
      </div>

      <Footer />
    </Wrapper>
  );
};

export default AccesoryPage;

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
