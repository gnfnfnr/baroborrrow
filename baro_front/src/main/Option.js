import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Local from "./Local";
import LocalBoxIcon from "../img/LocalBoxIcon.png";

const OptionBox = styled.div`
  background: #f4f7f8;
  padding: 0 24px 20px;
`;

const OptionList = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid #e6e6e6;
  padding: 20px 24px;
`;

const LocalBox = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 40px;
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

function Option({ setCondition, setWay }) {
  const [local, setLocal] = useState(false);
  const [localName, setLocalName] = useState("");
  function onClick(event, text, func) {
    func(text);
    if (event.target.style.backgroundColor === "rgb(233, 246, 253)") {
      event.target.style.backgroundColor = "rgb(230, 230, 230)";
      func("");
    } else {
      for (
        let index = 0;
        index < event.target.parentElement.children.length;
        index++
      ) {
        event.target.parentElement.children[index].style.background = "#E6E6E6";
      }
      event.target.style.backgroundColor = "#E9F6FD";
    }
  }
  return (
    <>
      <OptionBox>
        <OptionList>
          <ListTitle>BORROW 지역</ListTitle>
          <LocalBox
            onClick={() => {
              setLocal(true);
            }}
          >
            <LocalText>
              {localName
                ? localName.gu + " " + localName.city
                : "대여를 원하는 지역을 선택해주세요"}
            </LocalText>
            <img src={LocalBoxIcon} />
          </LocalBox>
        </OptionList>
        <OptionList>
          <ListTitle>BORROW 상태</ListTitle>
          <ListBtn>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "nbproduct/", setCondition);
              }}
            >
              대여 중 제외
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, "today_available/", setCondition);
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
                onClick(event, 0, setWay);
              }}
            >
              대면
            </ListBtnDetail>
            <ListBtnDetail
              onClick={(event) => {
                onClick(event, 1, setWay);
              }}
            >
              비대면
            </ListBtnDetail>
          </ListBtn>
        </OptionList>
        {local ? <Local setLocal={setLocal} setLocalName={setLocalName} /> : ""}
      </OptionBox>
    </>
  );
}

export default Option;
