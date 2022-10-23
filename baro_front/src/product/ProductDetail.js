import React, { useEffect, useRef, useState } from "react";
import style from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Map from "./Map";
import Calendar from "./Calendar";
import InfoBar from "./InfoBar";
import axios from "axios";
import {
  PdContainer,
  PdInfo,
  InfoDes,
  InfoBox,
  InfoTitle,
  InfoMoney,
  InfoWon,
  InfoLoc,
  PdBtn,
} from "./product-style";

export const PdTitle = style.div`
  color: #888888;
  font-size: 20px;
  padding: 0 12px 29px;
  border-bottom: 1px solid #D9D9D9;
`;

export const PdImgDiv = style.div`
  margin-bottom: 15px;
  width: 100%;
  height: 320px;
  padding-top: 32px;
`;

export const PdImg = style.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  @media only screen and (max-width: 376px) {
    object-fit: cover;
  }
`;

export const InfoOwner = style.div`
  padding: 0 12px;
  cursor: pointer;
`;

export const InfoNim = style.span`
  margin: 0 12px;
`;

export const InfoOpen = style.div`
  padding: 17px 12px 0;
  cursor: pointer;
`;

export const InfoPer = style.div`
  background: #99D0EF;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 14px;
  padding: 2px 8px;
  float: right;
`;

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [dt, setDt] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/product/${params.id}`).then((response) => {
      const dtt = response.data;
      console.log(response.data);
      setDt(dtt);
    });
  }, []);
  const [showSelect, setShowSelect] = useState(false);
  // 여기 수정 필요: 대여자들의 물품 대여 날짜 필요
  const ban = [];

  const desRef = useRef();
  const [showDes, setShowDes] = useState(false);
  const [showDesBtn, setShowDesBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth < 800 && desRef.current.clientHeight > 171) {
        setShowDesBtn(true);
        console.log(desRef.current.clientHeight);
      } else {
        setShowDesBtn(false);
      }
    });
  }, []);
  return (
    <>
      <>
        <PdContainer style={{ display: showSelect ? "none" : "" }}>
          <PdImgDiv>
            <PdImg src={`http://127.0.0.1:8000${dt.productPhoto}`} />
          </PdImgDiv>
          <PdTitle>{dt.productName}</PdTitle>

          <PdInfo>
            <InfoBox>
              <InfoTitle>대여자 정보</InfoTitle>
              <InfoOwner
                onClick={() => {
                  navigate("/mypage/profile");
                }}
              >
                {dt.owner ? dt.owner.nickname : "로딩중"}
                <InfoNim>님</InfoNim>
                <img src={require("../img/side.png")} />
              </InfoOwner>
            </InfoBox>
            <InfoBox>
              <InfoBar
                title={"상품 상태"}
                percentage={dt.condition / 2}
                inputMode={false}
              />
            </InfoBox>
            <InfoBox>
              <InfoTitle>물품 설명</InfoTitle>
              <InfoDes style={{ maxHeight: showDes ? "initial" : "171px" }}>
                <p ref={desRef}>{dt.explanation}</p>
              </InfoDes>
              {showDesBtn ? (
                <InfoOpen
                  onClick={() => {
                    setShowDes(!showDes);
                  }}
                >
                  {showDes ? "접기" : "더보기"}
                </InfoOpen>
              ) : (
                ""
              )}
            </InfoBox>
            {dt.listPrice && dt.rentalFee && dt.deposit ? (
              <>
                <InfoBox>
                  <InfoTitle>상품 정가</InfoTitle>
                  <InfoMoney>
                    {dt.listPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                    <InfoWon>원</InfoWon>
                  </InfoMoney>
                </InfoBox>
                <InfoBox>
                  <InfoTitle>
                    대여비
                    <InfoPer>
                      {Math.round((dt.rentalFee / dt.listPrice) * 100)}%
                    </InfoPer>
                  </InfoTitle>
                  <InfoMoney>
                    {dt.rentalFee
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ", ")}
                    <InfoWon>원</InfoWon>
                  </InfoMoney>
                </InfoBox>
                <InfoBox>
                  <InfoTitle>
                    보증금
                    <InfoPer>
                      {Math.round((dt.deposit / dt.listPrice) * 100)}%
                    </InfoPer>
                  </InfoTitle>
                  <InfoMoney>
                    {dt.deposit
                      ? dt.deposit
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : ""}
                    <InfoWon>원</InfoWon>
                  </InfoMoney>
                </InfoBox>
              </>
            ) : (
              "로딩중"
            )}
          </PdInfo>
          <PdBtn
            onClick={() => {
              setShowSelect(true);
            }}
          >
            대여날짜 선택하기
          </PdBtn>
        </PdContainer>
        {showSelect ? <Calendar item={dt} ban={ban} /> : ""}
      </>
    </>
  );
}

export default ProductDetail;
