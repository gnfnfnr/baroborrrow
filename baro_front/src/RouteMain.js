import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./nav/Footer";
import Header from "./nav/Header";

const Container = styled.main`
  max-width: 1080px;
  margin: 52px auto 80px;
`;

function RouteMain() {
  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default RouteMain;
