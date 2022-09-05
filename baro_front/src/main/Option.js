import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Local from "./Local";
import LocalBoxIcon from "../img/LocalBoxIcon.png";
import SearchDetail from "./SearchDetail";
import { Link } from "react-router-dom";

const OptionList = styled.div`
  box-sizing: border-box;
  background: #ffffff;
  border-bottom: 2px solid #e6e6e6;
  padding: 20px 24px;
`;

const LocalBox = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 40px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`;

const LocalText = styled.div`
  width: 209px;
  height: 18px;
  font-size: 14px;
  color: #c5c5c5;
  cursor: pointer;
`;

const ListTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  color: #888888;
  padding-bottom: 15px;
`;

const NextButton = styled.div`
  background: #56aedf;
  border-radius: 5px;
  padding: 13px 0;
  margin: 0 24px;
  text-align: center;
  color: white;
  font-weight: bold;
  margin-top: 40px;
  @media only screen and (max-width: 500px) {
    margin-top: 120px;
  }
`;

const ListBtn = styled.div`
  display: flex;
  gap: 12px;
`;
const ListBtnDetail = styled.div`
  border-radius: 5px;
  border-radius: 5px;
  background: #e6e6e6;
  padding: 8px 20px;
  font-weight: 700;
  color: #888888;
  cursor: pointer;
`;

//글자 간격은 폰트 적용 후 확인할것

function Option() {
  const [local, setLocal] = useState(false);
  const [pdData, setPdData] = useState([]);
  const [localName, setLocalName] = useState("");
  const [condition, setCondition] = useState("");
  const [way, setWay] = useState("");
  function onClick(event, text, func) {
    func(text);
    for (
      let index = 0;
      index < event.target.parentElement.children.length;
      index++
    ) {
      event.target.parentElement.children[index].style.background = "#E6E6E6";
    }
    event.target.style.backgroundColor = "#E9F6FD";
  }
  console.log(condition, way);
  return (
    <>
      <>
        <SearchDetail setPdData={setPdData} />
        <OptionList>
          <ListTitle>BORROW 지역</ListTitle>
          <LocalBox
            onClick={() => {
              setLocal(true);
            }}
          >
            <LocalText>
              {localName ? localName : "대여를 원하는 지역을 선택해주세요"}
            </LocalText>
            <img src={LocalBoxIcon} />
          </LocalBox>
        </OptionList>
        <OptionList>
          <ListTitle>BORROW 상태</ListTitle>
          <ListBtn>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "전체", setCondition);
              }}
            >
              전체
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "대여중", setCondition);
              }}
            >
              대여 중 제외
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "오늘바로", setCondition);
              }}
            >
              오늘 바로
            </ListBtnDetail>
          </ListBtn>
        </OptionList>
        <OptionList>
          <ListTitle>BORROW 방식</ListTitle>
          <ListBtn>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "전체", setWay);
              }}
            >
              전체
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "대면", setWay);
              }}
            >
              대면
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "비대면", setWay);
              }}
            >
              비대면
            </ListBtnDetail>
          </ListBtn>
        </OptionList>
        <Link to="/main">
          <NextButton>검색 결과 보기</NextButton>
        </Link>
        {local ? <Local setLocal={setLocal} setLocalName={setLocalName} /> : ""}
      </>
    </>
  );
}

export default Option;
