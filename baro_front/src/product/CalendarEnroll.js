import React, { useState } from "react";
import style from "styled-components";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import ko from "date-fns/locale/ko";
import axios from "axios";
import moment from "moment";
import "./calendar.css";
import { useNavigate } from "react-router-dom";

const CalendarSection = style.section`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #FFFFFF;
  border-radius: 30px 30px 0px 0px;
  z-index: 99;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  font-weight: 700;
  height: 100vh;
`;

const CalendarInside = style.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  align-items: center;
  max-width: 900px;
`;

const CalendarInfo = style.div`
  align-self: baseline;
  color: #666666;
  height: 80px;
`;

const InfoTitle = style.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const InfoCnt = style.div`
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 1.2px;
`;

const CalendarBtn = style.div`
  border-radius: 5px;
  padding: 13px 45px;
  align-self: flex-end;
  color: white;
  margin-top: 20px;
  background-color: #DADADA;
`;

const CalendarBtnLink = style.input`
  background: #56AEDF;
  border-radius: 5px;
  padding: 13px 45px;
  align-self: flex-end;
  color: white;
  margin-top: 20px;
`;

function CalendarEnroll({ borrowInfo }) {
  const naviagte = useNavigate();
  const today = new Date();
  const [state, setState] = useState([
    {
      startDate: today,
      endDate: today,
      key: "selection",
      color: "#56AEDF",
    },
  ]);
  const start = moment(state[0].startDate).format("YYYY-MM-DD");
  const end = moment(state[0].endDate).format("YYYY-MM-DD");

  return (
    <CalendarSection>
      <CalendarInside>
        <CalendarInfo>
          {start !== "Invalid date" && end !== "Invalid date" ? (
            <>
              <InfoTitle>대여 가능일 날짜</InfoTitle>
              <InfoCnt>{start}</InfoCnt>
              <InfoCnt>-</InfoCnt>
              <InfoCnt>{end}</InfoCnt>
            </>
          ) : (
            "대여 가능 시작일과 반납일을 선택해주세요"
          )}
        </CalendarInfo>

        <DateRange
          editableDateInputs={false}
          onChange={(item) => setState([item.selection])}
          minDate={today} // 과거 날짜 disable
          locale={ko}
          showDateDisplay={false}
          color={"#aeb9bf"}
          showMonthAndYearPickers={false}
          ranges={state}
          monthDisplayFormat={"yyyy-mmm"}
        />
        {start !== "Invalid date" && end !== "Invalid date" ? (
          <CalendarBtnLink type="submit" value="바로" />
        ) : (
          <CalendarBtn>바로</CalendarBtn>
        )}
        {/* <form
          onSubmit={() => {
            const formData = new FormData();
            formData.append("photo", borrowInfo.productPhoto);
            axios
              .post("http://127.0.0.1:8000/product/", {
                owner: {
                  // 객체
                },
                ...borrowInfo,
                barrowAvailableStart: start,
                barrowAvailableEnd: end,
              })
              .then(() => {});

            naviagte("/user/main");
          }}
        ></form> */}
      </CalendarInside>
    </CalendarSection>
  );
}

export default CalendarEnroll;
