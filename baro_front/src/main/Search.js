import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import styled from "styled-components";
import SearchDetail from "./SearchDetail";
import axios from "axios";

const PdSearchContainer = styled.div`
  margin-top: 52px;
  font-weight: 700;
  margin-bottom: 80px;
`;

function Search() {
  const [pdData, setPdData] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/search/products`).then((response) => {
      setPdData(response.data);
      console.log(response);
    });
  }, []);
  return (
    <PdSearchContainer>
      <SearchDetail setPdData={setPdData} />
      <ProductList pdData={pdData} />
    </PdSearchContainer>
  );
}

export default Search;
