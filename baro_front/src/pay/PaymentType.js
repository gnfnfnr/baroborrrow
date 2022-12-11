import React from "react";
import styled from "styled-components";
import axios from "axios";

const PayTitle = styled.h1`
  padding-bottom: 15px;
  font-size: 18px;
  text-align: center;
`;

const PayType = styled.li`
  display: flex;
  flex-direction: column;
  width: 100px;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    border: 1px solid #cdcdcd;
  }
`;

export default function PaymentType() {
  const onClickKakao = () => {
    axios
      .post(
        "https://kapi.kakao.com/v1/payment/ready",
        {
          cid: "TC0ONETIME",
          partner_order_id: "partner_order_id",
          partner_user_id: "partner_user_id",
          item_name: "초코파이",
          quantity: 1,
          total_amount: 2200,
          vat_amount: 200,
          tax_free_amount: 500,
          approval_url: "http://localhost:3000/payment/approve",
          fail_url: "http://localhost:3000/mypage/content/borrow",
          cancel_url: "http://localhost:3000/mypage/content/borrow",
        },
        {
          headers: {
            Authorization: "KakaoAK b3365e5967f9f0368704e9181e0fe9d8",
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        window.open(res.data.next_redirect_pc_url, "_self");
        localStorage.setItem("tid", res.data.tid);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <PayTitle>결제하기</PayTitle>
      <ul>
        <PayType onClick={onClickKakao}>
          <span>카카오페이</span>
          <img src={require("../img/paymentIcon.png")} />
        </PayType>
      </ul>
    </>
  );
}
