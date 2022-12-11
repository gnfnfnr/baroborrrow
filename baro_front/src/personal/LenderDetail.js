import React, { useState } from "react";
import { useParams } from "react-router-dom";
import style from "styled-components";
import Deal from "./Deal.json";
import LenderState from "./LenderState";

const LenderDetailBox = style.section`
  background: #D9D9D9;
  min-height: 100px;
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

export default function LenderDetail() {
  console.log(Math.ceil(Deal.length / 5));
  const [lenderList, setLenderList] = useState(Deal);
  const matchLenderState = new LenderState();
  return (
    <LenderDetailBox>
      <LenderDetailTable>
        <tbody>
          {lenderList.map((detail, index) => {
            return (
              <tr key={`${detail.user}${index}`}>
                <td>{detail.user}</td>
                <td>
                  {detail.barrowStart} ~ {detail.barrowEnd}
                </td>
                <td>{matchLenderState.getValue(detail)[0][1]()}</td>
              </tr>
            );
          })}
        </tbody>
      </LenderDetailTable>
    </LenderDetailBox>
  );
}
