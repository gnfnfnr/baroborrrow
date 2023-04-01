import React, { useEffect, useState } from "react";
import style from "styled-components";
import Deal from "./Deal.json";
import LenderState from "./LenderState";
import axios from "axios";
import { useParams } from "react-router-dom";

const LenderDetailBox = style.section`
  background: #D9D9D9;
  height: 224px;
  padding: 20px;
  @media only screen and (max-width: 700px) {
    font-size: 14px;
  }
`;

const LenderDetailTable = style.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border-bottom: 1px solid #c6c3c3;
    text-align: center;
    padding: 10px;
    @media only screen and (max-width: 700px) {
      padding: 10px 6px;
    }
  }
`;

const LenderPagesNumber = style.ul`
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

const PageNumber = style.li`
  cursor: pointer;
  padding: 3px;
  margin-right: 5px;
  ${(props) =>
    props.active
      ? "color: inherit; border-bottom: 1px solid;"
      : "color: #a4a4a4"}
`;

export default function LenderDetail() {
  const [lenderList, setLenderList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/barrowedinfo/${id}/?level=m`)
      .then((res) => {
        // console.log(res);
        // const dividePages = Array.from(
        //   { length: Math.ceil(Deal.length / 5) },
        //   () => []
        // );
        // res.data.map((content, index) =>
        //   dividePages[Math.ceil((index + 1) / 5) - 1].push(content)
        // );
        setLenderList(res.data);
      });
  }, []);
  const matchLenderState = new LenderState();
  const [page, setPage] = useState(0);
  const fullPageNumber = Array.from(
    { length: lenderList.length },
    (_, index) => index + 1
  );

  return (
    <LenderDetailBox>
      <LenderDetailTable>
        <tbody>
          {lenderList.length ? (
            lenderList.map((detail, index) => {
              return (
                <>
                  {detail.user.username && (
                    <tr key={`${detail.user.username}${index}`}>
                      <td>{detail.user.username}</td>
                      <td>
                        {detail.barrowStart} ~ {detail.barrowEnd}
                      </td>
                      <td>{matchLenderState.getValue(detail)[0][1]()}</td>
                    </tr>
                  )}
                </>
              );
            })
          ) : (
            <tr>
              <td>빌린 내역이 없습니다</td>
            </tr>
          )}
        </tbody>
      </LenderDetailTable>
      <LenderPagesNumber>
        {fullPageNumber.map((number) => (
          <PageNumber
            key={`page${number}`}
            onClick={() => {
              setPage(number - 1);
            }}
            active={page === number - 1 ? true : false}
          >
            {number}
          </PageNumber>
        ))}
      </LenderPagesNumber>
    </LenderDetailBox>
  );
}
