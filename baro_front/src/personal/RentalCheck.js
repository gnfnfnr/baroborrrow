import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { useUserContext } from "../Context";
import InfoBar from "../product/InfoBar";

const RentalCheckModal = styled.section`
  position: absolute;
  background: rgb(0 0 0 / 10%);
  width: 100%;
  min-height: 100%;
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
  padding: 16px 12px;
`;

const RentalQuest = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid #d9d9d9;
`;

const RentalCheckBtn = styled.div`
  background: #56aedf;
  border-radius: 5px;
  padding: 13px 92px;
  cursor: pointer;
  text-align: center;
  color: white;
`;

const RentalImg = styled.div`
  width: 200px;
  height: 200px;
  margin: 24px auto;
  @media only screen and (max-width: 700px) {
    width: 100px;
    height: 100px;
    margin: 12px auto;
  }
`;

const RentalName = styled.div`
  text-align: center;
  margin-top: 12px;
  color: #888888;
  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`;

const RentalEnsure = styled.div`
  text-align: center;
  padding: 24px 60px;
  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`;

const RentalReport = styled.p`
  text-align: center;
  font-weight: normal;
  padding-bottom: 12px;
  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`;

const RentalSurvey = styled.div`
  margin: 40px auto 32px;
  text-align: center;
  color: #888888;

  @media only screen and (min-width: 700px) {
    font-size: 20px;
  }
`;

function RentalCheck({ setRental, productDt, list, setStateRental }) {
  const { user } = useUserContext();
  const [rate, setRate] = useState();
  const ownerDes = [
    "1.약속한 날짜에 대여가 잘 이루어졌나요?",
    "2.설정한 위치에서 대여가 잘 이루어졌나요?",
    "3.물건의 상태는 대여자가 설정한 것과 일치했나요?",
    "4.구성품이 빠짐없이 잘 있었나요?",
    "5.대여비와 보증금은 적절했나요?",
  ];

  const an = {};
  const QuestList = ({ Index, title }) => {
    const [condition, setCondition] = useState(0);
    an[Index] = condition;
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

  return (
    <RentalCheckModal>
      <RentalCheckBox>
        <img
          style={{ float: "right" }}
          src={require("../img/close.png")}
          onClick={() => {
            setRental(false);
          }}
        />
        {rate ? (
          <>
            <RentalSurvey>설문을 진행해주세요</RentalSurvey>
            {ownerDes.map((li, Index) => (
              <RentalQuest key={Index}>
                <QuestList title={li} Index={Index} />
              </RentalQuest>
            ))}
            <RentalCheckBtn
              onClick={() => {
                setRental(false);
                axios.post(`http://127.0.0.1:8000/review/${list.id}/`, {
                  data: {
                    writer: user,
                    q1: an[0],
                    q2: an[1],
                    q3: an[2],
                    q4: an[3],
                    q5: an[4],
                  },
                });
              }}
            >
              설문 제출
            </RentalCheckBtn>
          </>
        ) : (
          <>
            <RentalImg>
              <img
                src={`http://127.0.0.1:8000${productDt.productPhoto}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </RentalImg>
            <RentalName>{productDt.productName}</RentalName>
            <RentalEnsure>해당 물품을 반납 장소에 반납하셨습니까?</RentalEnsure>
            <RentalReport>(허위 반납시 신고 조치됩니다.)</RentalReport>
            <RentalCheckBtn
              onClick={() => {
                setStateRental(true);
                setRate(true);
                // axios.get(
                //   `http://127.0.0.1:8000/return/${list.id}/?username=${user.username}`
                // );
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
