import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ProductBox,
  ProductImg,
  ProductRentalInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
} from "../main/list-style";
import axios from "axios";
import { useUserContext } from "../Context";

const Detail = ({ list }) => {
  const [showDetail, setShowDetail] = useState();
  const nav = useNavigate();
  const today = new Date();
  const navigate = useNavigate();
  const diff = Math.floor((today - new Date(list.barrowAvailableEnd)) / (1000 * 60 * 60 * 24));
  return (
    <>
      <ProductBox>
        <ProductImg>
          <img
            src={`http://127.0.0.1:8000${list.productPhoto}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </ProductImg>
        <ProductRentalInfo>
          <div>
            <ProductName
              onClick={() => {
                navigate(`/detail${list.id}`);
              }}
            >
              {list.productName}
            </ProductName>
            <ProductLocal>{list.address}</ProductLocal>
            <ProductText>약속된 장소에 반납되었나요?</ProductText>
          </div>
          <ProductCheck>
            <ProductCheckDate>
              {diff >= 0 ? ` D + ${diff}` : `D - ${Math.abs(diff)}`}
            </ProductCheckDate>
            <ProductCheckBtn
              onClick={() => {
                if (!showDetail) {
                  nav(`/mypage/content/lend/${list.id}`);
                }
                setShowDetail(!showDetail);
              }}
            >
              바로 내역
            </ProductCheckBtn>
          </ProductCheck>
        </ProductRentalInfo>
      </ProductBox>
      {showDetail ? <Outlet /> : ""}
    </>
  );
};

function Lend() {
  const [lendData, setLendData] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/mypage/myproduct/?username=${user.username}`).then((res) => {
      setLendData(res.data.reverse());
    });
  }, []);
  console.log(lendData);
  return (
    <>
      {lendData.map((list) => (
        <Detail list={list} key={list.id} />
      ))}
    </>
  );
}

export default Lend;
