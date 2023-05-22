import React from "react";
import styledComponents from "styled-components";


// BubbleCart -> it shows the products number from the shopping cart
const BubbleCart = ({ nrProducts }) => {
  return (
    <div className="bubbleCart relative flex justify-center items-center w-[23px] h-[23px] rounded-full hover:text-white bg-[var(--baseColor)]">
      <p className="absolute flex justify-center items-center w-max h-max font-bold text-[13px] text-center">
        {nrProducts}
      </p>
    </div>
  );
};

export default BubbleCart;
