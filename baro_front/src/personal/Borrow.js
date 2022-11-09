import React, { useEffect, useState } from "react";
import {
  ProductBox,
  ProductImg,
  ProductRentalInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductDes,
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
  ProductComBtn,
} from "../main/list-style";
import RentalCheck from "./RentalCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context";
import ReviewCheck from "./ReviewCheck";

const Detail = ({ list, setStateRental }) => {
  const navigate = useNavigate();
  const [rental, setRental] = useState();
  const [review, setReview] = useState();
  const today = new Date();
  const diff = Math.floor(
    (today - new Date(list.barrowEnd)) / (1000 * 60 * 60 * 24)
  );
  const [productDt, setProductDt] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/${list.product}`)
      .then((response) => {
        setProductDt(response.data);
      });
  }, []);
  console.log(list);
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
            <ProductCheck>
              <ProductCheckDate>
                {diff >= 0 ? ` D + ${diff}` : `D - ${Math.abs(diff)}`}
              </ProductCheckDate>
              {list.isReturn ? (
                list.isReviewed ? (
                  <ProductComBtn>설문완료</ProductComBtn>
                ) : (
                  <ProductCheckBtn
                    onClick={() => {
                      setReview(true);
                    }}
                  >
                    설문하기
                  </ProductCheckBtn>
                )
              ) : (
                <ProductCheckBtn
                  onClick={() => {
                    setRental(true);
                  }}
                >
                  반납하기
                </ProductCheckBtn>
              )}
            </ProductCheck>
          </ProductDes>
        </ProductRentalInfo>
      </ProductBox>
      {rental ? (
        <RentalCheck setRental={setRental} productDt={productDt} list={list} />
      ) : (
        ""
      )}
      {review ? <ReviewCheck list={list} setReview={setReview} /> : ""}
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
