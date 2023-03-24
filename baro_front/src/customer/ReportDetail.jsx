import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import detail from "./data.json";

const ReportDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 25px;
  height: calc(100vh - 212px);
  background: #edf5fa;
`;

const ReportDetailCover = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const DetailTitle = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 3px solid #cadeea;
  padding: 10px;
`;
const DetailInfo = styled.div`
  padding: 10px;
  font-size: 14px;

  & span {
    padding-right: 10px;
  }
`;
const DetailContent = styled.div`
  padding: 10px;
  & > div {
    padding-bottom: 10px;
  }

  & > p {
    border: 1px solid #cadeea;
    padding: 10px;
    height: 400px;
    overflow: auto;
    border-radius: 15px;
  }
`;

export default function ReportDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/mypage/service/${id}`)
      .then((res) => setData(res.data));
    setData(detail[42 - id]);
  }, []);

  return (
    <ReportDetailBox>
      <ReportDetailCover>
        {data ? (
          <>
            <DetailTitle>
              <span>제목</span>
              <p>{data.title}</p>
            </DetailTitle>
            <DetailInfo>
              <span>{data.user && data.user.username}</span>
              {data.createdAt && (
                <span>
                  {new Date(data.createdAt).toISOString().slice(0, 10)}
                </span>
              )}
            </DetailInfo>
            <DetailContent>
              <div>내용</div>
              <p>{data.content}</p>
            </DetailContent>
          </>
        ) : (
          "잠시만 기다려주세요"
        )}
      </ReportDetailCover>
    </ReportDetailBox>
  );
}
