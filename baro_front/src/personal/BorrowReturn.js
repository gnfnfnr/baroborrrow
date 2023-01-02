import React, { useState } from "react";
import {
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
  ProductComBtn,
} from "../main/list-style";
import RentalCheck from "./RentalCheck";
import ReviewCheck from "./ReviewCheck";

export default function BorrowReturn({ productDetail, productState }) {
  const [rental, setRental] = useState();
  const [review, setReview] = useState();
  const today = new Date();
  const diff = Math.floor(
    (today - new Date(productState.barrowEnd)) / (1000 * 60 * 60 * 24)
  );
  return (
    <>
      <ProductCheck>
        {productState.isReturn ? (
          productState.isReviewed ? (
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
          <>
            <ProductCheckDate
              style={{
                background: diff >= -3 && diff <= 0 ? "#94484B" : "#397293",
              }}
            >
              {diff >= 0 ? ` D + ${diff}` : `D - ${Math.abs(diff)}`}
            </ProductCheckDate>
            <ProductCheckBtn
              onClick={() => {
                setRental(true);
              }}
            >
              반납하기
            </ProductCheckBtn>
          </>
        )}
      </ProductCheck>
      {rental ? (
        <RentalCheck
          setRental={setRental}
          productDt={productDetail}
          list={productState}
          rental={rental}
        />
      ) : (
        ""
      )}
      {review ? <ReviewCheck list={productState} setReview={setReview} /> : ""}
    </>
  );
}
