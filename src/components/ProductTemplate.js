import React from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import LoadingSpin from "react-loading-spin";
import PriceFormated from "./PriceFormated";

const ProductTemplate = ({ product }) => {
  let navigate = useNavigate();

  const handleClickProduct = (e) => {
    const idClicked = e.target.id;
    navigate(`/product-details/${idClicked}`);
  };

  return (

    <div className="productTemplate flex flex-col justify-between items-center p-2 m-2 rounded-xl">

      <h3 className="productTemplate-title flex justify-center items-center text-[20px] font-bold p-1 m-1">{product.name}</h3>

      {product ? (
        <div className="product flex flex-col justify-between items-center">


          <div className="wrapper-productTemplate-img flex justify-center overflow-hidden rounded-xl min-w-[100px] max-h-[300px]">
            <img
              className="productTemplate-img object-cover  w-[180px] rounded-md cursor-pointer  m-1 p-1 hover:scale-150 transition duration-[2s]"
              onClick={handleClickProduct}
              id={product.id}
              src={product.productImages[0].path}
              alt="product image"
            />
          </div>

          <div className="productTemplate-description flex justify-center items-center text-[15px] font-bold p-1 m-1">
            <p className="description text-center decoration-textDescriptionAndPrice"> {`${product.description.split()[0].slice(0, 15)}...`}</p>
          </div>

          <div className="productTemplate-price flex justify-center items-center text-[15px] font-bold p-1 m-1 decoration-textDescriptionAndPrice">
            {<PriceFormated price={product.price} />}
            <p className="productTemplate-currency flex justify-center items-center my-0 mx-[5px] h-10  decoration-textDescriptionAndPrice"> {product.currency} </p>
          </div>

        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {<LoadingSpin />}
        </div>
      )}
    </div>

  );
};

export default ProductTemplate;

