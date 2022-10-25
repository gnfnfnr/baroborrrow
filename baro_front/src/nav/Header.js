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

function Header() {
  const { user } = useUserContext();
  const nav = useNavigate();

  return (
    <HeaderBox>
      {user ? (
        <div
          onClick={() => {
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          로그아웃
        </div>
      ) : (
        <div
          onClick={() => {
            nav("/login");
          }}
        >
          로그인하기
        </div>
      )}
    </HeaderBox>
  );
}

export default Header;
