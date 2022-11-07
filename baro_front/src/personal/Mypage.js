import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context";
import axios from "axios";

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
  const { user } = useUserContext();
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/mypage/reviewresult/?username=${user.username}`
      )
      .then((res) => {
        console.log(res);
      });
  }, []);
  return (
    <>
      {user ? (
        <MypageBox>
          <MypageTitle>
            <NickName>{user.nickname}</NickName>
            <NickNameText>님</NickNameText>
          </MypageTitle>
          <MypageList>
            <Link to="/mypage/profile">
              <MypageDetail>
                <DetailIcon src={require("../img/profile.png")} />
                <DetailTitle>내 프로필</DetailTitle>
              </MypageDetail>
            </Link>
            <Link to="/mypage/content/borrow">
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
      ) : (
        "로그인이 필요한 서비스입니다"
      )}
    </>
  );
}

export default Mypage;
