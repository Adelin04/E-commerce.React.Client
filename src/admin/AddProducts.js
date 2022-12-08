import React from "react";
import UploadImage from "../components/UploadImage";
import styledComponents from "styled-components";

const AddProducts = () => {
  return (
    <Wrapper>
        <UploadImage />
    </Wrapper>
  );
};

export default AddProducts;

const Wrapper = styledComponents.div`
    display: flex;
    justify-content : space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    // background:green;
`;
