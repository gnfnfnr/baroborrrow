import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  return (
    <>
      {bkData ? (
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
        <div>상품을 장바구니에 넣어주세요</div>
      )}
    </>
  );
}

export default Basket;
