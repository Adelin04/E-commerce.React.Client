import React from "react";
import styledComponents from "styled-components";


// BubbleCart -> shows the number of products in the shopping cart
const BubbleCart = ({ nrProducts }) => {
  return (
    <Wrapper>
      <p>{nrProducts}</p>
    </Wrapper>
  );
};

export default BubbleCart;

const Wrapper = styledComponents.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 23px;
    height: 23px;
    
    p { 
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: auto;
        height: auto;
        font-size: 13px;
        font-weight: bolder;
        text-align: center;
    }
`;
