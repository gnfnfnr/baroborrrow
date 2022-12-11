import React from "react";
import styled from "styled-components";
import axios from "axios";

const PaymentButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: #397293;
  color: white;
  padding: 10px 12px;
  border-radius: 15px;
`;

export default function PaymentApprove() {
  let getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  const params = getParameter("pg_token");
  const tid = localStorage.getItem("tid");

  return (
    <PaymentButton
      onClick={() => {
        axios
          .post(
            "https://kapi.kakao.com/v1/payment/approve",
            {
              cid: "TC0ONETIME",
              pg_token: params,
              tid: tid,
              partner_order_id: "partner_order_id",
              partner_user_id: "partner_user_id",
            },
            {
              headers: {
                Authorization: "KakaoAK b3365e5967f9f0368704e9181e0fe9d8",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((res) => {
            console.log(res);
            localStorage.removeItem("tid");
            window.close();
          })
          .catch((err) => {
            alert("알 수 없는 오류가 발생했습니다");
            window.close();
          });
      }}
    >
      결제 완료
    </PaymentButton>
  );
}
