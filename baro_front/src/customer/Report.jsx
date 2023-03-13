import React from "react";
import styled from "styled-components";

const ReportBox = styled.div`
  width: 80%;
  height: 70vh;
  padding: 20px;
  margin: 0 auto;
`;

const ReportCover = styled.div`
  border: 2px solid #56aedf;
  border-radius: 40px;
  padding: 20px;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 5fr 0.5fr;
  gap: 20px;
`;

const ReportButton = styled.button`
  color: #fff;
  background-color: #397293;
  border: none;
  padding: 10px;
  justify-self: center;
  width: 30%;
`;

const ReportTitleInput = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  & > input {
    width: 80%;
    border: 1px solid #56aedf7a;
    padding: 10px 12px;
    border-radius: 10px;
    width: 90%;
  }
`;
const ReportContentInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & > textarea {
    resize: none;
    height: 80%;
    border: 1px solid #56aedf7a;
    border-radius: 10px;
    padding: 10px 12px;
  }
`;

export default function Report() {
  return (
    <ReportBox>
      <ReportCover>
        <ReportTitleInput>
          <label htmlFor="title">제목</label>
          <input placeholder="제목을 입력하세요" id="title" />
        </ReportTitleInput>
        <ReportContentInput>
          <label htmlFor="content">내용</label>
          <textarea placeholder="제목을 입력하세요" id="content" />
        </ReportContentInput>
        <ReportButton>올리기</ReportButton>
      </ReportCover>
    </ReportBox>
  );
}
