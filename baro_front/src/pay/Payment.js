import React from "react";

import styled from "styled-components";
import { Outlet } from "react-router-dom";

const PayBox = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #56aedf;
`;

const PayInside = styled.div`
  width: 70%;
  max-width: 700px;
  background-color: #f6fcff;
  height: 50%;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export default function Payment() {
  return (
    <PayBox>
      <PayInside>
        <Outlet />
      </PayInside>
    </PayBox>
  );
}
