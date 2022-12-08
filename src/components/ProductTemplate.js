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
    <Wrapper>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>

        {product ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div className="product-img-wraper">
              <img
                onClick={handleClickProduct}
                id={product._id}
                className="product-img"
                src={product.productImagePath}
                alt="product"
              />
            </div>

            <div className="product-description">
              <p> {`${product.description.split()[0].slice(0, 15)}...`}</p>
            </div>

            <div className="product-template-price">
              {<PriceFormated price={product.price} />}
              <p className="currency">{product.currency}</p>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {<LoadingSpin />}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default ProductTemplate;

const Wrapper = styledComponents.div`

.product - content {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: auto;
  padding: 25px;
  min-height: 250px;
  min-width: 200px;
}

.product-img-wraper {
  display:flex;
  justify-content:center;
  overflow: hidden;
  border-radius: 15px;
}

.product-img{
  border - radius: 15px;
  width: 250px;
  min-height: 300px;
  height: auto;
  max-height: 300px;
  cursor: pointer;
}

.product-img:hover{
  transform: scale(1.2);
  transition: 2s;
}

.product-title {
  color: #5f4d5d;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.product-description {
  display:flex;
  justify-content: center;
  margin:auto;
  max-width: 200px;
  color: #5f4d5d;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
  font-size: small;
}

.product-template-price{
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-template-price p:first-child {
  font-size: 30px;
  font-weight: bold;
  margin: 0px;
  color: var(--sliderColor);
}

.price-after-dot {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0px;
  height: 30px;
  font-weight: bold;
  color: var(--sliderColor);
}

  .product-template-price .currency {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 0px 5px;
    height: 30px;
    font-weight: bold;
    color: var(--sliderColor);
}

 .product-btn {
    margin - left: 50%;
    transform: translate(-50%);
    width: 60px;
    justify-content: space-around;
    border: 1px solid #b08ead;
    padding: 5px 10px;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
    color: #d6bbd3;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

  @media only screen and (min-width:1000px) {
    .lg-size-33 {
      width: 40%;
    }
  }
`;
