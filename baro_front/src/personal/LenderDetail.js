import React, { useState } from "react";
import { useParams } from "react-router-dom";
import style from "styled-components";
import Deal from "./Deal.json";
import LenderState from "./LenderState";

const LenderDetailBox = style.section`
    background: #D9D9D9;
    min-height: 100px;
    max-height: 300px;
`;

export default function LenderDetail() {
  const [lenderList, setLenderList] = useState(Deal);
  const params = useParams();
  console.log(params);
  const matchLenderState = new LenderState();
  return (
    <LenderDetailBox>
      <div>
        <table>
          <tbody>
            {lenderList.map((detail) => {
              console.log();
              return (
                <tr>
                  <td>{detail.user}</td>
                  <td>
                    {detail.barrowStart} ~ {detail.barrowEnd}
                  </td>
                  <td>{matchLenderState.getValue(detail)[0][1]()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </LenderDetailBox>
  );
}
