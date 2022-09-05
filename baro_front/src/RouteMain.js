import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Container = styled.main`
  max-width: 1080px;
  margin: 52px auto 80px;
`;

function RouteMain() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default RouteMain;
