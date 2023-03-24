import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
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

const HeaderSpace = styled.div`
  max-width: 1080px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0 15px;
`;

const LogoutBtn = styled.div`
  padding-right: 15px;
  color: #153547;
  &:hover {
    color: white;
  }
  cursor: pointer;
`;

const LoginBtn = styled.div`
  padding-right: 15px;
  color: white;
  cursor: pointer;
  &:hover {
    color: #153547;
  }
`;

const HeaderLogo = styled.img`
  object-fit: cover;
`;

function Header() {
  const { user } = useUserContext();
  const nav = useNavigate();
  const locate = useLocation();
  if (locate.pathname !== "/login" && locate.pathname !== "/join") {
    localStorage.setItem("path", locate.pathname);
  }
  return (
    <HeaderBox>
      <HeaderSpace>
        <HeaderLogo src={require("../img/headerLogo.png")} />
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
      </HeaderSpace>
    </HeaderBox>
  );
}

export default Header;
