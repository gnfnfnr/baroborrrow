import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LoginBox,
  LoginForm,
  LoginInput,
  LoginInputLabel,
  LoginInputText,
  LoginButton,
  JoinWelcome,
  JoinText,
} from "./login-style";

function Join() {
  const [inputName, setInputName] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputPwCheck, setInputPwCheck] = useState("");
  const [inputNick, setInputNick] = useState("");
  const [pwCompare, setPwCompare] = useState({ cp: false, password: "" });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    const joinData = {
      username: inputId,
      name: inputName,
      password: pwCompare.password,
      nickname: inputNick,
    };
    axios
      .post("http://127.0.0.1:8000/user/accounts/", {
        username: inputId,
        name: inputName,
        password: pwCompare.password,
        nickname: inputNick,
      })
      .then(function (response) {
        console.log(response);
      });
    //   오류 처리하기
    // e.preventDefault();
    navigate("/login");
    console.log(joinData);
  };
  useEffect(() => {
    if (inputPw === inputPwCheck && inputPw !== "" && inputPwCheck !== "") {
      console.log(inputPw, inputPwCheck, "확인");
      setPwCompare({ cp: true, password: inputPwCheck });
    } else {
      console.log(inputPw, inputPwCheck);
      setPwCompare({ cp: false, password: "" });
    }
  }, [inputPw, inputPwCheck]);
  return (
    <LoginBox>
      <JoinWelcome>welcome!</JoinWelcome>
      <JoinText>회원 정보를 입력하여 가입을 완료해주세요.</JoinText>
      <LoginForm>
        <LoginInput>
          <LoginInputLabel htmlFor="loginName">
            <img src={require("../img/name.png")} />
          </LoginInputLabel>
          <LoginInputText
            placeholder="이름"
            id="loginName"
            value={inputName}
            onChange={(event) => {
              setInputName(event.target.value);
            }}
            required
          />
        </LoginInput>
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
          <LoginInputLabel htmlFor="loginPw">
            <img src={require("../img/password.png")} />
          </LoginInputLabel>
          <LoginInputText
            type="password"
            placeholder="비밀번호"
            id="loginPw"
            value={inputPw}
            onChange={(event) => {
              setInputPw(event.target.value);
            }}
            required
          />
        </LoginInput>
        <LoginInput>
          <LoginInputLabel htmlFor="loginPwCheck">
            <img src={require("../img/password.png")} />
          </LoginInputLabel>
          <LoginInputText
            type="password"
            placeholder="비밀번호 확인"
            id="loginPwCheck"
            value={inputPwCheck}
            onChange={(event) => {
              setInputPwCheck(event.target.value);
            }}
            required
          />
          {pwCompare.cp ? (
            <img
              src={require("../img/pwCheck.png")}
              style={{ objectFit: "contain" }}
            />
          ) : (
            ""
          )}
        </LoginInput>
        <div>
          <label htmlFor="loginNick">사용하실 닉네임을 입력해주세요</label>
          <LoginInput style={{ marginTop: "20px" }}>
            <LoginInputText
              placeholder="닉네임"
              id="loginNick"
              value={inputNick}
              onChange={(event) => {
                setInputNick(event.target.value);
              }}
            />
          </LoginInput>
        </div>
        <LoginButton onClick={onSubmit}>회원가입</LoginButton>
      </LoginForm>
    </LoginBox>
  );
}

export default Join;
