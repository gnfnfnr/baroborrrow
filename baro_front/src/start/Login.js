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
  const onSubmit = (e) => {
    axios
      .post("http://127.0.0.1:8000/user/login/", {
        username: inputId,
        password: inputPassword,
      })
      .then(
        (response) => {
          console.log(response.data);
        }
        // localStorage.setItem(("user", response.data))
      );
    navigate("/main");
    //   오류 처리하기
    // e.preventDefault();
  };
  return (
    <LoginBox>
      <LoginLogo src={require("../img/loginLogo.png")} />
      <LoginForm onSubmit={onSubmit}>
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
              });
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
