import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context";

const HeaderBox = styled.header`
  background: #56aedf;
  height: 52px;
  position: fixed;
  width: 100%;
  z-index: 98;
  top: 0;
  left: 0;
`;

const LogoutBtn = styled.div`
  float: right;
  padding: 15px;
  color: #153547;
  &:hover {
    color: white;
  }
  cursor: pointer;
`;

const LoginBtn = styled.div`
  float: right;
  padding: 15px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #153547;
  }
`;

function Header() {
  const { user } = useUserContext();
  const nav = useNavigate();

  return (
    <HeaderBox>
      {user ? (
        <LogoutBtn
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          로그아웃
        </LogoutBtn>
      ) : (
        <LoginBtn
          onClick={() => {
            nav("/login");
          }}
        >
          로그인하기
        </LoginBtn>
      )}
    </HeaderBox>
  );
}

export default Header;
