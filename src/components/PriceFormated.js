import React from "react";

const PriceFormated = ({ price }) => {
    return (
        <div className="price flex justify-center items-center p-1 ">
            {price && <span className="price-before-dot flex justify-center items-start font-bold decoration-textDescriptionAndPrice text-lg">{`${Array.from(price.toString()).includes('.') ? price.toString().split('.')[0] : price.toString().split('.')[0] + '.'} `}</span>}
            {price && <span className="price-after-dot flex justify-center items-start font-bold text-lg">{price.toString().split('.')[1] !== undefined ? `${price.toString().split('.')[1].slice(0, 2)}` : '00'}</span>}
        </div>
    )
}

export default PriceFormated;
