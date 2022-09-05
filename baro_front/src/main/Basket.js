import React from "react";
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
} from "./product-style";

function Basket() {
  const navigate = useNavigate();
  const pdData = [
    { id: 1, productName: "df", address: "dkdf", deposit: 34, rentalFee: 34 },
    { id: 2, productName: "df", address: "dkdf", deposit: 34, rentalFee: 34 },
  ];
  return (
    <>
      {pdData.map((list) => (
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
      ))}
    </>
  );
}

export default Basket;
