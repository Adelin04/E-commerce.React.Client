import React from "react";
import ProductTemplate from "./ProductTemplate";

const ProductsList = ({ products }) => {
  return (
    <div className="product-list flex flex-wrap justify-center items-center w-[80%] m-auto h-full">
      {products &&
        products.map((product, index) => {
          return (
            <div className="product-card m-auto" key={index}>
              <ProductTemplate product={product} />
            </div>
          );
        })}
    </div>

    // </div>
  );
};

export default ProductsList;
