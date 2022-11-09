import React, { useEffect, useState } from "react";
import style from "styled-components";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import ko from "date-fns/locale/ko";
import { Link } from "react-router-dom";
import moment from "moment";
import "./calendar.css";
import axios from "axios";

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
  min-height: 100%;
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

const CalendarBtnLink = style(Link)`
  background: #56AEDF;
  border-radius: 5px;
  padding: 13px 45px;
  align-self: flex-end;
  color: white;
  margin-top: 20px;
`;

function Calendar({ item }) {
  let compare = new Date();
  if (compare <= new Date(item.barrowAvailableStart)) {
    compare = new Date(item.barrowAvailableStart);
  }
  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
      key: "selection",
      color: "#56AEDF",
    },
  ]);
  const start = moment(state[0].startDate).format("YYYY-MM-DD");
  const end = moment(state[0].endDate).format("YYYY-MM-DD");
  const lender = JSON.parse(localStorage.getItem("user"));
  const [banDate, setBanDate] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/barrowedinfo/${item.id}/`).then((res) => {
      const preventDate = res.data.map((alreday) => [
        alreday.barrowStart,
        alreday.barrowEnd,
      ]);
      const ban = [];
      preventDate.forEach(([start, end]) => {
        const st = new Date(start);
        const lt = new Date(end);
        while (st <= lt) {
          ban.push(new Date(st));
          st.setDate(st.getDate() + 1);
        }
        setBanDate(ban);
      });
    });
  }, []);
  return (
    <CalendarSection>
      <CalendarInside>
        <CalendarInfo>
          {start !== "Invalid date" && end !== "Invalid date" ? (
            <>
              <InfoTitle>대여날짜</InfoTitle>
              <InfoCnt>{start}</InfoCnt>
              <InfoCnt>-</InfoCnt>
              <InfoCnt>{end}</InfoCnt>
            </>
          ) : (
            "대여 시작일과 반납일을 선택해주세요"
          )}
        </CalendarInfo>
        <DateRange
          editableDateInputs={false}
          onChange={(item) => setState([item.selection])}
          minDate={compare} // 과거 날짜 disable
          maxDate={new Date(item.barrowAvailableEnd)}
          locale={ko}
          showDateDisplay={false}
          disabledDates={banDate} // 빌리는 거 금지 날짜
          color={"#aeb9bf"}
          showMonthAndYearPickers={false}
          ranges={state}
          monthDisplayFormat={"yyyy-mmm"}
        />
        {start !== "Invalid date" && end !== "Invalid date" ? (
          <CalendarBtnLink
            to={`/detail${item.id}/result`}
            state={{
              borrow: item,
              borrower: {
                user: lender,
                borrowDate: start,
                borrowEndDate: end,
              },
            }}
            onClick={() => {
              axios({
                method: "POST",
                url: `http://127.0.0.1:8000/product/${item.id}/borrow/`,
                data: {
                  user: lender,
                  product: item.id,
                  barrowStart: start,
                  barrowEnd: end,
                  isReturn: false,
                },
              })
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => console.log(error));
            }}
          >
            바로
          </CalendarBtnLink>
        ) : (
          <CalendarBtn>바로</CalendarBtn>
        )}
      </CalendarInside>
    </CalendarSection>
  );
}

export default Calendar;
