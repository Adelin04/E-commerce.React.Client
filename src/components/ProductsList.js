import React from "react";
import styledComponents from "styled-components";
import Button from "./Button";
import ProductTemplate from "./ProductTemplate";

const ProductsList = ({ products }) => {
  return (
    <Wrapper>

      {products &&
        products.map((product, index) => {
          return (
            <div style={{ display: "flex", margin: "20px 50px" }} key={index}>
              <ProductTemplate product={product} />
            </div>
          );
        })}

    </Wrapper>
  );
};

export default ProductsList;

const Wrapper = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 80%;
    height: 100%;
    flex-wrap: wrap;   
`;
