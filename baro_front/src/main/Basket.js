import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context";
import {
  ProductBox,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductLocal,
  ProductFee,
  ProductCart,
  ProductBorrow,
} from "./list-style";

const BasketItem = function ({ user }) {
  const navigate = useNavigate();
  const [bkData, setBkData] = useState([]);
  const [borrow, setBorrow] = useState([]);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/mypage/likeproducts/?username=${user.username}`
      )
      .then((res) => {
        axios
          .get(`http://127.0.0.1:8000/mypage/borrow/?username=${user.username}`)
          .then((response) => {
            setBorrow(response.data.map((x) => x.product));
          });
        setBkData(res.data);
      });
  }, []);
  return bkData.map((list) => (
    <ProductBox key={list.id}>
      <ProductImg>
        <img
          src={`http://127.0.0.1:8000${list.productPhoto}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {borrow.includes(list.id) && <ProductBorrow>대여중</ProductBorrow>}
      </ProductImg>
      <ProductInfo>
        <ProductName
          onClick={() => {
            navigate(`/detail${list.id}`);
          }}
        >
          {list.productName}
        </ProductName>
        <ProductLocal>{list.address}</ProductLocal>
        <ProductFee>{list.deposit}</ProductFee>
        <ProductFee>{list.rentalFee}</ProductFee>
      </ProductInfo>
    </ProductBox>
  ));
};

function Basket() {
  const { user } = useUserContext();
  return user ? (
    <BasketItem user={user} />
  ) : (
    <div>로그인이 필요한 서비스 입니다.</div>
  );
}

export default Basket;
