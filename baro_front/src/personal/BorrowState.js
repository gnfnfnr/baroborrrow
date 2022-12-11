import React, { Component } from "react";

import BorrowReturn from "./BorrowReturn";

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
    return <BorrowReturn productDetail={this.productDetail} productState={this.productState} />;
  }

  render() {
    return this.waitAccept();
  }
}
