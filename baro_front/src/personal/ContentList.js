import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";

const ListTitle = styled.div`
  display: flex;
`;

const ListTitleDetail = styled.div`
  text-align: center;
  padding: 12px 0;
  @media only screen and (min-width: 700px) {
    padding: 24px 0;
    font-size: 20px;
  }
`;

const ListContent = styled.div``;

function ContentList() {
  const activeStyle = {
    color: "#56AEDF",
    borderBottom: "4px solid #56AEDF",
    width: "100%",
    height: "100%",
  };

  const nonActiveStyle = {
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <ListTitle>
        <NavLink
          to="/mypage/content/borrow"
          style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
        >
          <ListTitleDetail>빌린 내역</ListTitleDetail>
        </NavLink>
        <NavLink
          to="/mypage/content/lend"
          style={({ isActive }) => (isActive ? activeStyle : nonActiveStyle)}
        >
          <ListTitleDetail>빌려준 내역</ListTitleDetail>
        </NavLink>
      </ListTitle>
      <ListContent>
        <Outlet />
      </ListContent>
    </>
  );
}

export default ContentList;
