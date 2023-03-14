import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "./data.json";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ServiceBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  width: 80%;
  margin: 0 auto;
`;
const ServiceTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    padding: 24px 0;
    font-size: 20px;
    @media only screen and (max-width: 500px) {
      padding: 12px 0;
    }
  }

  & > div {
    background-color: #56aedf;
    padding: 8px 10px;
    color: white;
    font-size: 14px;
    cursor: pointer;
  }
`;

const ServiceList = styled.ul``;
const ListBox = styled.li`
  padding: 14px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
  cursor: pointer;
  gap: 4px;

  &:hover {
    background: #f7f7f7;
  }
`;

const ServicePage = styled.div`
  align-self: center;
  padding: 24px;
  @media only screen and (max-width: 500px) {
    padding: 12px 0;
  }
`;

const PageNumber = styled.span`
  padding-right: 12px;
  ${({ current, index }) => current === index && "color: #56aedf;"}
`;

export default function Service() {
  const [pages, setPages] = useState(
    Array.from({ length: Math.ceil(data / 10) }, (_, number) => number + 1)
  );

  const [current, setCurrent] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/mypage/service/").then((res) => {
      console.log(res);
      setCurrentData(
        res.data.filter((_, index) => Math.floor(index / 10) === current)
      );
    });
  }, [current]);
  const navigate = useNavigate();
  return (
    <ServiceBox>
      <ServiceTitle>
        <span>고객센터</span>
        <div onClick={() => navigate("/mypage/service/report")}>글쓰기</div>
      </ServiceTitle>
      <ServiceList>
        {currentData.map(({ id, title, user }) => (
          <ListBox
            key={id}
            onClick={() => {
              navigate(`/mypage/service/${id}`);
            }}
          >
            <span>{id}</span>
            <div>{title}</div>
            <div>{user.username}</div>
          </ListBox>
        ))}
      </ServiceList>
      <ServicePage>
        {pages.map((page, index) => (
          <PageNumber
            current={current}
            index={index}
            key={`page${page}`}
            onClick={() => setCurrent(index)}
          >
            {page}
          </PageNumber>
        ))}
      </ServicePage>
    </ServiceBox>
  );
}
