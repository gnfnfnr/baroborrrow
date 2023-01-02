import axios from "axios";
import qs from "qs";
import React from "react";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

export default function Deposit() {
  const onClick = () => {
    const twp = window.open("about:blank");
    twp.location =
      "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=24bf8ff3-c091-4a26-bb7b-1be39c842b51&redirect_uri=http://localhost:3000/mypage/deposit&scope=login inquiry transfer&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0";
  };

  const onClickToken = () => {
    const data = {
      code: "S4a333rgAio7vSNtHosJox767n2z0K",
      client_id: "24bf8ff3-c091-4a26-bb7b-1be39c842b51",
      client_secret: "d008bdb7-1004-461b-812b-25d48df5778e",
      redirect_uri: "http://localhost:3000/mypage/deposit",
      grant_type: "authorization_code",
    };
    axios({
      method: "POST",
      url: "/oauth/2.0/token",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(data),
    })
      .then((response) => response)
      .catch((error) => console.log(error));
  };
  return (
    <>
      <button onClick={onClick}>정산하기</button>
      <button onClick={onClickToken}>인증하기</button>
    </>
  );
}
