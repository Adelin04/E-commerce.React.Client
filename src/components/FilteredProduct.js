import React from "react";
import styled from "styled-components";
import ProductsList from "./ProductsList";

const FilteredProduct = ({ filteredProduct }) => {
    return (
        <Wrapper>
            {filteredProduct && <ProductsList products={filteredProduct} />}
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