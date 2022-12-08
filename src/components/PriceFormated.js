import React from "react";
import styled from "styled-components";

const PriceFormated = ({ price }) => {
    return (
        <Wrapper >
            {price && <p className="price-before-dot">{`${price.toString().split('.')[0]}`}</p>}
            {price && <p className="price-after-dot">{price.toString().split('.')[1] !== undefined ? `${price.toString().split('.')[1].slice(0, 2)}` : '00'}</p>}
        </Wrapper>
    )
}

export default PriceFormated;

const Wrapper = styled.div`
    display: flex;
`