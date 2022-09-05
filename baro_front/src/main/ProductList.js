import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductBox,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductLocal,
  ProductFee,
} from "./product-style";

function ProductList({ pdData }) {
  const navigate = useNavigate();

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
          </ProductInfo>
        </ProductBox>
      ))}
    </>
  );
}

export default ProductList;
