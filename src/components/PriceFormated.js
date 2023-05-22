import React from "react";

const PriceFormated = ({ price }) => {
    return (
        <div className="price flex justify-center items-center p-1">
            {price && <p className="price-before-dot flex justify-center items-start ">{`${price.toString().split('.')[0]}`}</p>}
            {price && <p className="price-after-dot flex justify-center items-start font-bold">{price.toString().split('.')[1] !== undefined ? `${price.toString().split('.')[1].slice(0, 2)}` : '00'}</p>}
        </div>
    )
}

export default PriceFormated;
