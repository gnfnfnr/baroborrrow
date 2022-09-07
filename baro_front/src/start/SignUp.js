import React, { useDebugValue, useEffect } from "react";
import { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, NavLink, Link, Navigate } from "react-router-dom";
import axios from "axios";

const WelcomeDiv = styled.div`
  position: relative;
  width: 287px;
  height: 53px;
  top: 120px;
  left: 24px;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 33px;

  color: rgba(86, 174, 223, 1);
`;

const SmallWelcome = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: rgba(102, 102, 102, 1);
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

const SignUpIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 20px;
  left: 12px;
  top: 14px;
  object-fit: contain;
`;

const SignUpDiv = styled.div`
  position: relative;
  width: 327px;
  height: 48px;
  top: 145px;
  left: 24px;
  background: #f7f7f7;
  border-radius: 5px;

  margin-bottom: 10px;
`;

const SignUpButton = styled.button`
  left: 24px;
  position: relative;
  width: 327px;
  height: 48px;

  margin-top: 200px;
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

const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const CheckIconimg = styled.img`
  position: absolute;
  left: 292px;
  right: 4.17%;
  top: 13px;
  bottom: 4.17%;
`;

const TextDiv = styled.div`
  left: 24px;
  position: relative;
  width: 219px;
  height: 22px;
  top: 160px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: rgba(102, 102, 102, 1);
`;

const InputText2 = styled.input`
  all: unset;
  position: relative;
  width: 327px;
  height: 48px;
  top: 175px;
  left: 24px;
  background: #f7f7f7;
  border-radius: 5px;
  margin-left: 3px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  text-indent: 13px;
  overflow: hidden;
  background: rgba(246, 246, 246, 1);
  color: rgba(136, 136, 136, 1);
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorPassword, setErrorPassword] = useState(false);
  const [nickname, setNickname] = useState("");
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onIDHandler = (event) => {
    setID(event.currentTarget.value);
  };

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      console.log({
        password,
        confirmPassword,
        errorPassword,
      });
    },
    [password, confirmPassword]
  );

  const userData = {
    username: ID,
    name: name,
    password: password,
    nickname: nickname,
  };
  console.log(userData);
  useEffect(() => {
    if (
      password === confirmPassword &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      console.log(password);
      console.log(confirmPassword);
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  }, [confirmPassword, password]);
  const navigate = useNavigate();
  return (
    <>
      <WelcomeDiv>
        WELCOME!
        <SmallWelcome>회원 정보를 입력하여 가입을 완료해주세요.</SmallWelcome>
      </WelcomeDiv>

      <SignUpDiv>
        <label htmlFor="input_name">
          <SignUpIcon src="img/Name.png" />
        </label>
        <InputText
          type="text"
          id="input_name"
          placeholder="이름"
          value={name}
          onChange={onNameHandler}
        />
      </SignUpDiv>

      <SignUpDiv>
        <label htmlFor="input_id">
          <SignUpIcon src="img/LoginIcon.png" />
        </label>
        <InputText
          type="text"
          id="input_id"
          placeholder="아이디"
          value={ID}
          onChange={onIDHandler}
        />
      </SignUpDiv>

      <SignUpDiv>
        <label htmlFor="input_pw">
          <SignUpIcon src="img/PassWordIcon.png" />
        </label>
        <InputText
          type="password"
          id="input_pw"
          placeholder="비밀번호"
          value={password}
          onChange={onPasswordHandler}
        />
      </SignUpDiv>

      <SignUpDiv>
        <label htmlFor="input_confirmpw">
          <SignUpIcon src="img/PassWordIcon.png" />
        </label>
        <InputText
          type="password"
          id="input_confirmpw"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          required={true}
        />
        <CheckIconimg src={errorPassword === false ? null : "img/check.png"} />
      </SignUpDiv>
      <TextDiv>사용하실 닉네임을 입력해주세요.</TextDiv>
      <InputText2
        type="text"
        id="input_nickname"
        placeholder="ex) 홍길동"
        value={nickname}
        onChange={(event) => {
          setNickname(event.target.value);
        }}
      />

      <div>
        <SignUpButton type="submit" onSubmit={onSubmit}>
          <div
            style={{ color: "white" }}
            onClick={() => {
              navigate("/Login");
              console.log(userData);
              axios
                .post("http://127.0.0.1:8000/user/accounts/", userData)
                .then(function (response) {
                  console.log(response);
                });
            }}
          >
            회원가입
          </div>
        </SignUpButton>
      </div>
    </>
  );
};

export default SignUp;
