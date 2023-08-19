import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getProductByValueSearched,
  resetFilterCategory,
  selectProduct,
} from "../Features/ProductSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    if (searchBar !== "") dispatch(getProductByValueSearched(searchBar));
  }, [searchBar]);

  return (
    <Wrapper className="wrapper-search-bar" style={{ width: "170px" }}>
      <input
        className="search-bar"
        type="text"
        value={searchBar}
        placeholder="look for products"
        onChange={(e) => {
          setSearchBar(e.target.value);
        }}
      />
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  width: auto;

  .search-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }

  .search-bar {
    border: none;
    border-bottom: 1px solid var(--baseColor);
    background-color: transparent;
    text-align: center;
    outline: none;
  }
`;
