import React from "react";
import styled from "styled-components";
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
  return <HeaderBox></HeaderBox>;
}

export default Header;
