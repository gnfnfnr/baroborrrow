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

const CalendarBtnLink = style.button`
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
  const user = JSON.parse(localStorage.getItem("user"));
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
          <form
            enctype="multipart/form-data"
            onSubmit={() => {
              const formData = new FormData();
              formData.append("owner", JSON.stringify(user));
              formData.append("productName", borrowInfo.productName);
              formData.append("listPrice", borrowInfo.listPrice);
              formData.append("deposit", borrowInfo.deposit);
              formData.append("rentalFee", borrowInfo.rentalFee);
              formData.append("explanation", borrowInfo.explanation);
              formData.append("condition", borrowInfo.condition);
              formData.append("address", borrowInfo.address);
              formData.append("detailAddress", borrowInfo.detailAddress);
              formData.append("productPhoto", borrowInfo.productPhoto);
              formData.append("barrowMethod", borrowInfo.barrowMethod);
              formData.append("barrowAvailableStart", start);
              formData.append("barrowAvailableEnd", end);
              formData.append("encType", "multipart/form-data");
              axios({
                method: "POST",
                url: "http://127.0.0.1:8000/product/",
                headers: {
                  "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
                },
                data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
              }).catch((error) => console.log(error));
              naviagte("/main");
            }}
          >
            <CalendarBtnLink type="submit">바로</CalendarBtnLink>
          </form>
        ) : (
          <CalendarBtn>바로</CalendarBtn>
        )}
      </CalendarInside>
    </CalendarSection>
  );
}

export default CalendarEnroll;
