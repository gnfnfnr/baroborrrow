import axios from "axios";
import React from "react";
import styled from "styled-components";

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

function RentalCheck({ setRental, productDt, list }) {
  console.log(productDt);
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
            setRental(false);
            axios
              .get(
                `http://127.0.0.1:8000/return/${list.id}/?username=${list.user.username}`
              )
              .then(() => window.location.reload())
              .catch(() =>
                alert("예상치 못한 오류 발생했습니다. 다시 시도해주세요")
              );
          }}
        >
          네, 반납했습니다.
        </RentalCheckBtn>
      </RentalCheckBox>
    </RentalCheckModal>
  );
}

export default RentalCheck;
