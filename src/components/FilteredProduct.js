import React from "react";
import styled from "styled-components";

const FilteredProduct = ({ filtereProduct }) => {
    return (
        <Wrapper>
            {filtereProduct && <ProductsList products={filtereProduct} />}
        </Wrapper>
    )
}

export default FilteredProduct;

const Wrapper = styled.div`
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
`