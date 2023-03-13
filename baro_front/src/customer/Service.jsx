import React, { useEffect, useState } from "react";
import styled from "styled-components";
import data from "./data.json";

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
  }
`;

const ServiceList = styled.ul``;
const ListBox = styled.li`
  padding: 14px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ebebeb;
`;

const ServicePage = styled.div`
  align-self: center;
  padding: 24px;
  @media only screen and (max-width: 500px) {
    padding: 12px 0;
  }

  & > span {
    padding-right: 12px;
  }
`;

export default function Service() {
  const [pages, setPages] = useState(
    Array.from(
      { length: Math.ceil(data.length / 10) },
      (_, number) => number + 1
    )
  );

  const [current, setCurrent] = useState(0);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    setCurrentData(
      data.filter((_, index) => Math.floor(index / 10) === current)
    );
  }, [current]);

  return (
    <ServiceBox>
      <ServiceTitle>
        <span>고객센터</span>
        <div>글쓰기</div>
      </ServiceTitle>
      <ServiceList>
        {currentData.map(({ id, title, user }, index) => (
          <ListBox key={id}>
            <span>{id}</span>
            <div>{title}</div>
            <div>{user}</div>
          </ListBox>
        ))}
      </ServiceList>
      <ServicePage>
        {pages.map((page, index) => (
          <span key={`page${page}`} onClick={() => setCurrent(index)}>
            {page}
          </span>
        ))}
      </ServicePage>
    </ServiceBox>
  );
}
