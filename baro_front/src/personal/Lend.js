import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const today = new Date();
  const navigate = useNavigate();
  const diff = Math.floor(
    (today - new Date(list.barrowAvailableEnd)) / (1000 * 60 * 60 * 24)
  );
  return (
    <ProductBox>
      <ProductImg>
        <img
          src={list.productPhoto}
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
              navigate(`/user/detail${list.id}`);
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
          <ProductCheckBtn>
            {diff > 0 ? "신고하기" : "알려주기"}
          </ProductCheckBtn>
        </ProductCheck>
      </ProductRentalInfo>
    </ProductBox>
  );
};

function Lend() {
  const [lendData, setLendData] = useState([]);
  const { user } = useUserContext();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/mypage/myproduct/?username=${user.username}`)
      .then((res) => {
        setLendData(res.data.reverse());
      });
  }, []);
  return (
    <>
      {lendData.map((list) => (
        <Detail list={list} key={list.id} />
      ))}
    </>
  );
}

export default Lend;
