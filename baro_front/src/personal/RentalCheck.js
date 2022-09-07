import React, { useState } from "react";
import styled from "styled-components";
import InfoBar from "../product/InfoBar";

const RentalCheckModal = styled.section`
  position: absolute;
  background: rgb(0 0 0 / 10%);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RentalCheckBox = styled.div`
  width: 320px;
  background: #f7f7f7;
`;

const RentalCheckClose = styled.img``;
const RentalCheckBtn = styled.div`
  background: #56aedf;
  border-radius: 5px;
  margin: 10px 0;
  padding: 13px 92px;
  cursor: pointer;
`;

function RentalCheck({ setRental }) {
  const [rate, setRate] = useState();
  const ownerDes = [
    "1.약속한 날짜에 대여가 잘 이루어졌나요?",
    "2.설정한 위치에서 대여가 잘 이루어졌나요?",
    "3.물건의 상태는 대여자가 설정한 것과 일치했나요?",
    "4.구성품이 빠짐없이 잘 있었나요?",
    "5.대여비와 보증금은 적절했나요?",
  ];
  const [quest, setQuest] = useState({});
  const QuestList = ({ Index, title, setQuest }) => {
    const [condition, setCondition] = useState(0);
    const an = { title: condition };
    console.log(an);
    return (
      <InfoBar
        key={Index}
        title={title}
        inputMode={true}
        condition={condition}
        setCondition={setCondition}
      />
    );
  };
  console.log(quest);
  return (
    <RentalCheckModal>
      <RentalCheckBox>
        <img
          src={require("../img/close.png")}
          onClick={() => {
            setRental(false);
          }}
        />
        {rate ? (
          <>
            <div>설문을 진행해주세요</div>
            {ownerDes.map((li, Index) => (
              <QuestList title={li} Index={Index} setQuest={setQuest} />
            ))}
            <RentalCheckBtn>설문 제출</RentalCheckBtn>
          </>
        ) : (
          <>
            <img />
            <div>이름</div>
            <div>해당 물품을 반납 장소에 반납하셨습니까?</div>
            <p>(허위 반납시 신고 조치됩니다.)</p>
            <RentalCheckBtn
              onClick={() => {
                setRate(true);
              }}
            >
              네, 반납했습니다.
            </RentalCheckBtn>
          </>
        )}
      </RentalCheckBox>
    </RentalCheckModal>
  );
}

export default RentalCheck;
