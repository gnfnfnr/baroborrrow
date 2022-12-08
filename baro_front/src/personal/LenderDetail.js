import React, { useState } from "react";
import { useParams } from "react-router-dom";
import style from "styled-components";

const LenderDetailBox = style.section`
    background: #717e85;
    min-height: 100px;
    max-height: 300px;
    color: white;
`;

export default function LenderDetail() {
  const [lenderList, setLenderList] = useState([
    {
      name: 123,
      borrowStart: "2022-04-05",
      borrowEnd: "2022-04-03",
    },
    {
      name: "dd",
      borrowStart: "2022-04-05",
      borrowEnd: "2022-04-03",
    },
  ]);
  const params = useParams();
  console.log(params);
  return (
    <LenderDetailBox>
      {lenderList.map((detail) => {
        return (
          <div>
            <div>{detail.name}</div>
            <div>
              {detail.borrowStart} ~ {detail.borrowEnd}
            </div>
            <div>
              <div>수락 거절</div>
              <div>결제완료</div>
              <div>바로 보내기</div>
              <div>빌리는 중</div>
            </div>
          </div>
        );
      })}
    </LenderDetailBox>
  );
}
