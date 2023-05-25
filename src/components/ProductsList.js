import React from "react";
import ProductTemplate from "./ProductTemplate";

const ProductsList = ({ products }) => {
  return (
    <div className="product-list flex flex-wrap justify-center items-center w-[80%] m-auto h-full lg:w-[50%]">
      {products &&
        products.map((product, index) => {
          return (
            <div className="product-card mx-auto my-2 " key={index}>
              <ProductTemplate product={product} />
            </div>
          );
        })}
    </div>

    // </div>
  );
};

export default ProductsList;
