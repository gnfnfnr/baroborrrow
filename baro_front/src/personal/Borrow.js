import React, { useEffect, useState } from "react";
import {
  ProductBox,
  ProductImg,
  ProductRentalInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductDes,
} from "../main/list-style";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context";
import BorrowState from "./BorrowState";

const Detail = ({ list }) => {
  const navigate = useNavigate();
  const [productDt, setProductDt] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/${list.product}`)
      .then((response) => {
        setProductDt(response.data);
      });
  }, []);

  return (
    <>
      <ProductBox>
        <ProductImg>
          <img
            src={`http://127.0.0.1:8000${productDt.productPhoto}`}
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
                navigate(`/detail${productDt.id}`);
              }}
            >
              {productDt.productName}
            </ProductName>
            <ProductLocal>{productDt.address}</ProductLocal>
            <ProductText>약속된 장소에 반납하셨나요?</ProductText>
          </div>
          <ProductDes>
            <BorrowState productDetail={productDt} productState={list} />
          </ProductDes>
        </ProductRentalInfo>
      </ProductBox>
    </>
  );
};

function Borrow() {
  const [borData, setBorData] = useState([]);
  const { user } = useUserContext();
  const [stateRental, setStateRental] = useState(false);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/mypage/borrow/?username=${user.username}`)
      .then((res) => {
        setBorData(res.data.reverse());
        console.log(res.data);
      });
  }, [stateRental]);

  return (
    <>
      {borData
        ? borData.map((list, index) => (
            <Detail list={list} key={index} setStateRental={setStateRental} />
          ))
        : ""}
    </>
  );
}

export default Borrow;
