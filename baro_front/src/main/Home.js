import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProductList from "./ProductList";

const HomeBox = styled.div`
  padding: 20px 20px 0;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  width: 100%;
  border-radius: 5px;
`;

const Input = styled.input`
  background: #f7f7f7;
  border-radius: 5px;
  padding: 0 12px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  height: 50px;
  outline: none;
  @media only screen and (max-width: 400px) {
    height: 40px;
    font-size: 12px;
  }
`;
const InputImg = styled.img`
  width: 20px;
  padding-right: 12px;
  @media only screen and (max-width: 400px) {
    width: 15px;
  }
`;
const ProductText = styled.p`
  padding: 14px 0;
`;

function Home() {
  const [pdData, setPdData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const clickRef = useRef();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/search/products`).then((response) => {
      setPdData(response.data.reverse());
      console.log(response);
    });
  }, []);
  return (
    <HomeBox>
      <SearchBox>
        <Input
          placeholder="물품 카테고리 , 물품 명을 검색해주세요."
          value={inputSearch}
          onChange={(event) => {
            setInputSearch(event.target.value);
          }}
        />
        <InputImg
          src={require("../img/searchIcon.png")}
          ref={clickRef}
          onClick={() => {
            axios
              .get(
                `http://127.0.0.1:8000/search/products?search=${inputSearch}`
              )
              .then((response) => {
                console.log(response);
                setPdData(response.data);
              });
          }}
        />
      </SearchBox>
      <ProductText>전체물품</ProductText>
      <ProductList pdData={pdData} />
    </HomeBox>
  );
}

export default Home;
