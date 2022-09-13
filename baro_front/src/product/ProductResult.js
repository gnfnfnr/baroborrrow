import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import style from "styled-components";

const ResultBox = style.section`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  box-sizing: border-box;
  font-weight: 700;
  overflow-x: hidden;
  margin-top: 52px;
  background: #E9F6FD;
`;

const ResultInside = style.div`
  width: 70%;
  height: calc(100vh - 52px);
  max-width: 900px;
`;

const ResultInfoBox = style.div`
  height: 600px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 47px;
  margin: 100px 0;
  @media only screen and (max-width: 376px) {
    height: 540px;
    margin: 47px 0;
  }
`;

const ResultText = style.div`
  color: #56AEDF;
  margin-top: 40px;
`;

const ResultInfo = style.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ResultInfoList = style.li`
  font-size: 14px;
  margin-bottom: 10px;
  &:first-child{
    font-size: 16px;
  }
`;
const HomeBtn = style.div`
  background: #56AEDF;
  border-radius: 5px;
  width: 100%;
  padding: 13px 0;
  text-align: center;
  color: #FFFFFF;
  line-height: 22px;
  margin-bottom: 40px;
`;
function ProductResult() {
  const location = useLocation();
  const borrowItem = location.state.borrow;
  const borrowUser = location.state.borrower;

  return (
    <ResultBox>
      <ResultInside>
        <ResultInfoBox>
          <ResultText>대여신청완료</ResultText>
          <img
            src={require("../img/borrowCheck.png")}
            style={{ margin: "36px 0" }}
          />
          <ResultInfo>
            <ResultInfoList>{borrowItem.product_name}</ResultInfoList>
            <ResultInfoList>{borrowUser.borrowDate}</ResultInfoList>
            <ResultInfoList>-</ResultInfoList>
            <ResultInfoList>{borrowUser.borrowEndDate}</ResultInfoList>
            <ResultInfoList>
              보증금{" "}
              {borrowItem.deposit
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </ResultInfoList>
            <ResultInfoList>
              대여비
              {borrowItem.rentalFee
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              원
            </ResultInfoList>
            <ResultInfoList>
              {borrowItem.address} {borrowItem.detailAddress}
            </ResultInfoList>
          </ResultInfo>
        </ResultInfoBox>
        <Link to={"/main"} style={{ width: "100%" }}>
          <HomeBtn>더 둘러보기</HomeBtn>
        </Link>
      </ResultInside>
    </ResultBox>
  );
}

export default ProductResult;
