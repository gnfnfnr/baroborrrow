import axios from "axios";
import React, { Component, useState } from "react";

import BorrowReturn from "./BorrowReturn";
import RentalCheck from "./RentalCheck";
import ReviewCheck from "./ReviewCheck";

function Rental({ productDetail, productState }) {
  const [rental, setRental] = useState(false);
  return (
    <>
      {rental ? (
        <RentalCheck
          setRental={setRental}
          productDt={productDetail}
          list={productState}
        />
      ) : (
        <div
          onClick={() => {
            setRental(true);
          }}
        >
          반납하기
        </div>
      )}
    </>
  );
}

function Review({ productState }) {
  const [review, setReview] = useState(false);
  return (
    <>
      {review ? (
        <ReviewCheck setReview={setReview} list={productState} />
      ) : (
        <div onClick={() => setReview(true)}>설문하기</div>
      )}
    </>
  );
}

export default class BorrowState extends Component {
  constructor(props) {
    super(props);
    this.productDetail = props.productDetail;
    this.productState = props.productState;
  }

  waitAccept() {
    return <div>수락 대기중</div>;
  }

  makePayment() {
    return (
      <button
        onClick={() => {
          window.open("http://localhost:3000/payment/type", "_blank");
        }}
      >
        결제 진행
      </button>
    );
  }

  returnItem() {
    return (
      <BorrowReturn
        productDetail={this.productDetail}
        productState={this.productState}
      />
    );
  }

  #makeMap() {
    const map = new Map();
  }

  render() {
    console.log(this.productState);
    return this.productState.isAccepted === null ? (
      this.waitAccept()
    ) : this.productState.isPayed === true ? (
      this.productState.isReturnUser ? (
        this.productState.isReturnUser && this.productState.isReturnOwner ? (
          this.productState.isReviewed ? (
            "거래 완료"
          ) : (
            <Review productState={this.productState} />
          )
        ) : (
          "반납 확인중"
        )
      ) : (
        <Rental
          productDetail={this.productDetail}
          productState={this.productState}
        />
      )
    ) : (
      this.makePayment()
    );
  }
}
