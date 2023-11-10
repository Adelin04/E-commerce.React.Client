import style from '@/styles/bubbleBasket.module.css'
import React from "react";

interface PropsBubbleBasket {
    counterProduct: number
}

// BubbleBasket -> it shows the products number from the shopping cart
const BubbleBasket = ({ counterProduct }: PropsBubbleBasket) => {
    return (
        <div className={style.containerBubbleBasket}>
            <span className={style.numberProductsBubbleBasket} >
                {counterProduct}
            </span>
        </div>
    );
};

export default BubbleBasket;