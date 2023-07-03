import React from "react";
import ProductTemplate from "./ProductTemplate";

const ProductsList = ({ products }) => {
  return (
    <div className="product-list flex flex-wrap justify-center items-center w-[80%]  h-full m-auto">
      {products &&
        products.map((product, index) => {
          return (
            <div className="product-card w-max h-max mx-auto my-2 " key={index}>
              <ProductTemplate product={product} />
            </div>
          );
        })}
    </div>

    // </div>
  );
};

export default ProductsList;
