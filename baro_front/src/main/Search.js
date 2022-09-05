import React, { useState } from "react";
import ProductList from "./ProductList";
import styled from "styled-components";
import SearchDetail from "./SearchDetail";

const PdSearchContainer = styled.div`
  margin-top: 52px;
  font-weight: 700;
  margin-bottom: 80px;
`;

function Search() {
  const [pdData, setPdData] = useState([
    { id: 1, productName: "df", address: "dkdf", deposit: 34, rentalFee: 34 },
    { id: 2, productName: "df", address: "dkdf", deposit: 34, rentalFee: 34 },
  ]);
  return (
    <PdSearchContainer>
      <SearchDetail setPdData={setPdData} />
      <ProductList pdData={pdData} />
    </PdSearchContainer>
  );
}

export default Search;
