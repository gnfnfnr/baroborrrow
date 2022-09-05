import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MypageBox = styled.div``;
const MypageTitle = styled.div`
  padding: 25px;
  border-bottom: 1px solid #dadada;
  font-size: 24px;
  @media only screen and (max-width: 500px) {
    font-size: 20px;
  }
`;
const NickName = styled.span`
  color: #56aedf;
  padding-right: 15px;
`;
const NickNameText = styled.span``;
const MypageList = styled.ul``;
const MypageDetail = styled.li`
  display: flex;
  padding: 25px 20px;
  align-items: center;
  border-bottom: 1px solid #dadada;
  font-size: 20px;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const DetailIcon = styled.img`
  margin-right: 15px;
`;
const DetailTitle = styled.div``;

function Mypage() {
  return (
    <MypageBox>
      <MypageTitle>
        <NickName>닉네임</NickName>
        <NickNameText>님</NickNameText>
      </MypageTitle>
      <MypageList>
        <Link to="/mypage/profile">
          <MypageDetail>
            <DetailIcon src={require("../img/profile.png")} />
            <DetailTitle>내 프로필</DetailTitle>
          </MypageDetail>
        </Link>
        <Link to="/mypage/content">
          <MypageDetail>
            <DetailIcon src={require("../img/list.png")} />
            <DetailTitle>내 바로 내역</DetailTitle>
          </MypageDetail>
        </Link>
        <MypageDetail>
          <DetailIcon src={require("../img/center.png")} />
          <DetailTitle>고객센터</DetailTitle>
        </MypageDetail>
      </MypageList>
    </MypageBox>
  );
}

export default Mypage;
