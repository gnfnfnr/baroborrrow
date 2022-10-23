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
import { useUserContext } from "../Context";

const PdHead = style.div`
  background-color: #56aedf;
  display: flex;
  justify-content: space-between;
  padding: 13px;
  color: white;
`;

const PdTitle = style.div`
  color: #888888;
  font-size: 20px;
  padding: 0 12px 29px;
  border-bottom: 1px solid #D9D9D9;
`;

const PdImgDiv = style.div`
  margin-bottom: 15px;
  width: 100%;
  height: 320px;
  padding-top: 32px;
`;

const PdImg = style.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  @media only screen and (max-width: 376px) {
    object-fit: cover;
  }
`;

const InfoOwner = style.div`
  padding: 0 12px;
  cursor: pointer;
`;

const InfoNim = style.span`
  margin: 0 12px;
`;

const InfoOpen = style.div`
  padding: 17px 12px 0;
  cursor: pointer;
`;

const InfoPer = style.div`
  background: #99D0EF;
  border-radius: 5px;
  color: #FFFFFF;
  font-size: 14px;
  padding: 2px 8px;
  float: right;
`;

const PdHeader = ({ params, user }) => {
  const [basket, setBasket] = useState();

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/mypage/likeproducts/?username=${user.username}`
      )
      .then((res) => {
        setBasket(
          ...res.data.filter((item) => item.id === parseInt(params.id))
        );
      });
  }, []);
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        axios
          .get(
            `http://127.0.0.1:8000/product/${params.id}/like/?username=${user.username}`
          )
          .then((res) => setBasket(...res.data.likeUsers));
      }}
    >
      <path
        d={
          basket
            ? "M3.9656 0.739745C3.84956 0.307883 3.4564 0 3 0H0V2H2.141L3.98101 14.1493L4.00413 14.2598C4.12017 14.6916 4.51333 14.9995 4.96973 14.9995H18.0044L18.1202 14.9928C18.5388 14.9443 18.8877 14.6356 18.9807 14.2159L20.9763 5.21324L20.9952 5.09669C21.0547 4.51717 20.5996 3.99683 20 3.99683L4.466 3.997L3.98871 0.850187L3.9656 0.739745ZM7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19C9 20.1046 8.10457 21 7 21ZM16 21C14.8954 21 14 20.1046 14 19C14 17.8954 14.8954 17 16 17C17.1046 17 18 17.8954 18 19C18 20.1046 17.1046 21 16 21Z"
            : "M3 0C3.4564 0 3.84956 0.307883 3.9656 0.739745L3.98871 0.850187L4.466 3.997L20 3.99683C20.5996 3.99683 21.0547 4.51717 20.9952 5.09669L20.9763 5.21324L18.9807 14.2159C18.8877 14.6356 18.5388 14.9443 18.1202 14.9928L18.0044 14.9995H4.96973C4.51333 14.9995 4.12017 14.6916 4.00413 14.2598L3.98101 14.1493L2.141 2H0V0H3ZM5 19C5 20.1046 5.89543 21 7 21C8.10457 21 9 20.1046 9 19C9 17.8954 8.10457 17 7 17C5.89543 17 5 17.8954 5 19ZM14 19C14 20.1046 14.8954 21 16 21C17.1046 21 18 20.1046 18 19C18 17.8954 17.1046 17 16 17C14.8954 17 14 17.8954 14 19ZM4.769 5.997L5.83 13H17.203L18.755 5.997H4.769Z"
        }
        fill="white"
      />
    </svg>
  );
};

function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [dt, setDt] = useState({});
  const { user } = useUserContext();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/product/${params.id}`).then((response) => {
      setDt(response.data);
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
      } else {
        setShowDesBtn(false);
      }
    });
  }, []);
  return (
    <>
      <PdHead>
        <span>물품 상세보기</span>
        {user ? <PdHeader params={params} user={user} /> : ""}
      </PdHead>
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
  );
}

export default ProductDetail;
