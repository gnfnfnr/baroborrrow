import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginLogo = styled.img`
  position: absolute;
  width: 165px;
  height: 132px;
  left: 100px;
  top: 126px;
`;

const SignInDiv = styled.div`
  position: relative;
  width: 327px;
  height: 48px;
  top: 278px;
  left: 24px;
  background: #f7f7f7;
  border-radius: 5px;

  margin-bottom: 10px;
`;

const LoginIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 20px;
  left: 12px;
  top: 14px;
  object-fit: contain;
`;

const LoginButton = styled.button`
  position: relative;
  width: 327px;
  height: 48px;
  top: 300px;
  left: 24px;
  background: #56aedf;
  border-radius: 5px;
  border: none;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  cursor: pointer;
  text-align: center;

  color: #ffffff;
`;

export const InputText = styled.input`
  all: unset;
  position: relative;
  width: 259px;
  height: 22px;
  left: 44px;
  top: 13px;
  margin-left: 3px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  overflow: hidden;
  color: rgba(136, 136, 136, 1);
`;

const Login = () => {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const data = {
    username: inputId,
    password: inputPw,
  };
  console.log(data);
  const navigate = useNavigate();

  return (
    <>
      <LoginLogo src="img/로그인로고 1.png" />
      <SignInDiv>
        <LoginIcon src="img/LoginIcon.png" />
        <label htmlFor="input_id"></label>
        <InputText
          type="text"
          name="input_id"
          placeholder="아이디"
          value={inputId}
          onChange={handleInputId}
        />
      </SignInDiv>

      <SignInDiv>
        <LoginIcon src="img/PassWordIcon.png" />
        <label htmlFor="input_pw"></label>
        <InputText
          type="password"
          name="input_pw"
          placeholder="비밀번호"
          value={inputPw}
          onChange={handleInputPw}
        />
      </SignInDiv>

      <div>
        <LoginButton
          onClick={() => {
            axios
              .post("http://127.0.0.1:8000/user/login/", { data })
              .then((res) => {
                // setUser(res.data);
              });
            navigate("/user/main");
          }}
        >
          로그인
        </LoginButton>
        <LoginButton
          onClick={() => {
            navigate("/signup");
          }}
        >
          회원가입하기
        </LoginButton>
      </div>
    </>
  );
};

export default Login;
