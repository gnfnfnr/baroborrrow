import React from "react";
import { Navigate } from "react-router-dom";
import Search from "./Search";

function IsSearch() {
  const search = localStorage.getItem("search");

  if (search) {
    return <Search />;
  } else {
    alert("검색어를 입력해주세요");
    return <Navigate replace to="/main" />;
  }
}

export default IsSearch;
