import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import styled from "styled-components";
import axios from "axios";
import Option from "./Option";
import { useUserContext } from "../Context.js";

const PdSearchContainer = styled.div`
  margin-top: 52px;
  font-weight: 700;
  margin-bottom: 80px;
`;

const PdSearchHeader = styled.div`
  background: #f7f7f7;
  padding: 20px 24px 15px;
  color: #888888;
`;

const PdSearchInfo = styled.div`
  display: flex;
  font-size: 18px;
  padding-bottom: 12px;
  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const PdSearchUser = styled.span`
  color: #56aedf;
  text-align: center;
  padding-right: 6px;
  box-sizing: border-box;
  @media only screen and (max-width: 500px) {
    width: 50px;
  }
`;
const PdSearchKeyWord = styled.span`
  color: #56aedf;
  padding: 0 6px;
  width: 70px;
  text-align: center;
`;

const PdSearchForm = styled.form`
  display: flex;
  align-items: center;
  padding: 14px 12px;
  background-color: white;
  @media only screen and (max-width: 500px) {
    padding: 7px 6px;
  }
`;

const SearchInput = styled.input`
  padding: 7px 0;
  outline: none;
  width: 100%;
  border: none;
  font-size: 14px;
  margin-left: 15px;
`;

const SearchImg = styled.img`
  cursor: pointer;
  width: 20px;
  @media only screen and (max-width: 500px) {
    width: inherit;
  }
`;

const PdSearchBtn = styled.button`
  all: unset;
`;

function Search() {
  const [pdData, setPdData] = useState([]);
  const [showOp, setShowOp] = useState(false);
  const [localName, setLocalName] = useState("");
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/search/?keyword=${inputSearch}&&status=${condition}&&method=${way}`
      )
      .then((response) => {
        setPdData(response.data.reverse());
      });
  }, []);
  const [condition, setCondition] = useState("");
  const [way, setWay] = useState("");
  const [inputSearch, setInputSearch] = useState(
    localStorage.getItem("search")
  );
  const { user } = useUserContext();

  return (
    <PdSearchContainer>
      <PdSearchHeader>
        <PdSearchInfo>
          {user ? (
            <>
              <PdSearchUser>{user.nickname}</PdSearchUser>
              <span>님이 검색하신 결과</span>
              <PdSearchKeyWord>{inputSearch}</PdSearchKeyWord>
              <span>관련 검색 결과</span>
            </>
          ) : (
            "로그인이 필요합니다"
          )}
        </PdSearchInfo>
        <PdSearchForm
          onSubmit={(event) => {
            event.preventDefault();
            localStorage.setItem("search", inputSearch);
            axios
              .get(
                `http://127.0.0.1:8000/search/?keyword=${inputSearch}&&status=${condition}&&method=${way}&&localGu=${localName.gu.slice(
                  0,
                  -1
                )}&&localCity=${localName.city}`
              )
              .then((response) => {
                setPdData(response.data.reverse());
              });
          }}
        >
          <SearchImg
            src={require("../img/filter.png")}
            onClick={() => {
              setShowOp(!showOp);
              setCondition("");
            }}
          />
          <SearchInput
            placeholder="검색 조건을 추가해보세요"
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
          />
          <PdSearchBtn>
            <SearchImg src={require("../img/searchIcon.png")} />
          </PdSearchBtn>
        </PdSearchForm>
      </PdSearchHeader>

      {showOp ? (
        <Option
          setCondition={setCondition}
          setWay={setWay}
          localName={localName}
          setLocalName={setLocalName}
        />
      ) : (
        ""
      )}

      <ProductList pdData={pdData} />
    </PdSearchContainer>
  );
}

export default Search;
