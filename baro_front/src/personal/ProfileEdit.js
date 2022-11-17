import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ProfileEditForm = styled.form`
  max-width: 450px;
  margin: 0 auto;
  padding: 60px 24px 0;
  display: flex;
  flex-direction: column;
`;
const ProfileEditLabel = styled.label`
  margin-bottom: 24px;
`;
const ProfileEditInput = styled.input`
  all: unset;
  padding: 13px 12px;
  width: 100%;
  background: #f7f7f7;
  border-radius: 5px;
  margin-bottom: 24px;
  box-sizing: border-box;
`;
const ProfileEditConfirm = styled.button`
  all: unset;
  background: #56aedf;
  border-radius: 5px;
  color: white;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
`;

function ProfileEdit() {
  const [cgNickName, setCgNickName] = useState("");
  const [cgLocal, setCgLocal] = useState("");
  console.log(cgLocal, cgNickName);
  return (
    <ProfileEditForm>
      <ProfileEditLabel htmlFor="changeNick">닉네임</ProfileEditLabel>
      <ProfileEditInput
        id="changeNick"
        placeholder="홍길동"
        value={cgNickName}
        onChange={(event) => {
          setCgNickName(event.target.value);
        }}
      />
      <ProfileEditLabel htmlFor="changeLocal">활동 지역</ProfileEditLabel>
      <ProfileEditInput
        id="changeLocal"
        placeholder="서울시 성북구"
        value={cgLocal}
        onChange={(event) => {
          setCgLocal(event.target.value);
        }}
      />
      <ProfileEditConfirm
        onClick={(event) => {
          event.preventDefault();
          axios.post(`http://127.0.0.1:8000/user/changename/?username=user1`, {
            nickname: cgNickName,
            locationGu: "구로구",
            locationCity: "서울시",
          });
        }}
      >
        수정하기
      </ProfileEditConfirm>
    </ProfileEditForm>
  );
}

export default ProfileEdit;
