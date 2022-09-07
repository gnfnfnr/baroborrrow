import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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
  return (
    <HeaderBox>
      <Link to={"/login"}>로그인하기</Link>
    </HeaderBox>
  );
}

export default Header;
