import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LoginBox,
  LoginLogo,
  LoginForm,
  LoginInput,
  LoginInputLabel,
  LoginInputText,
  LoginButton,
  LoginToReg,
} from "./login-style";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  return (
    <LoginBox>
      <LoginLogo src={require("../img/loginLogo.png")} />
      <LoginForm>
        <LoginInput>
          <LoginInputLabel htmlFor="loginId">
            <img src={require("../img/id.png")} />
          </LoginInputLabel>
          <LoginInputText
            placeholder="아이디"
            id="loginId"
            value={inputId}
            onChange={(event) => {
              setInputId(event.target.value);
            }}
            required
          />
        </LoginInput>
        <LoginInput>
          <LoginInputLabel htmlFor="loginPassword">
            <img src={require("../img/password.png")} />
          </LoginInputLabel>
          <LoginInputText
            type="password"
            placeholder="비밀번호"
            id="loginPassword"
            value={inputPassword}
            onChange={(event) => {
              setInputPassword(event.target.value);
            }}
            required
          />
        </LoginInput>
        <LoginButton
          onClick={() => {
            const data = {
              username: inputId,
              password: inputPassword,
            };
            axios
              .post("http://127.0.0.1:8000/user/login/", { data })
              .then((res) => {
                console.log(res.data);
                const userObj = JSON.stringify(res.data);
                localStorage.setItem("user", userObj);
                navigate("/main");
                window.location.reload();
              })
              .catch((error) =>
                alert("아이디 또는 비밀번호를 다시 확인해주세요")
              );
          }}
        >
          로그인
        </LoginButton>
      </LoginForm>
      <LoginToReg
        onClick={() => {
          navigate("/join");
        }}
      >
        회원가입
      </LoginToReg>
    </LoginBox>
  );
}

export default Login;
