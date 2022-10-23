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

function Basket() {
  const navigate = useNavigate();
  const [bkData, setBkData] = useState([]);
  const { user } = useUserContext();
  console.log(user);
  useEffect(() => {}, []);
  return (
    <>
      {user ? (
        bkData.map((list) => (
          <ProductBox key={list.id}>
            <ProductImg>
              <img
                src={list.productPhoto}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <ProductBorrow>대여중</ProductBorrow>
            </ProductImg>
            <ProductInfo>
              <ProductName
                onClick={() => {
                  navigate(`/user/detail${list.id}`);
                }}
              >
                {list.productName}
              </ProductName>
              <ProductLocal>{list.address}</ProductLocal>
              <ProductFee>{list.deposit}</ProductFee>
              <ProductFee>{list.rentalFee}</ProductFee>
              <ProductCart src={require("../img/cart.png")} />
            </ProductInfo>
          </ProductBox>
        ))
      ) : (
        <div>로그인이 필요한 서비스 입니다.</div>
      )}
    </>
  );
}

export default Basket;
