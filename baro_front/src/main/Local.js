import React, { useState, useRef } from "react";
import style from "styled-components";

const SearchSection = style.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666666;
  font-weight: bold;
  z-index: 99;
  `;

const SearchContainer = style.div`
  background-color: white;
  width: 86%;
  padding: 20px 15px 14px;
`;

const SearchHeader = style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchBox = style.div`
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
`;

const SearchList = style.div`
  width: 100%;
  cursor: pointer;
  padding-right: 21px;
  max-height: 540px;
  overflow: auto;
`;

const SearchCategory = style.div`
  text-align: center;
  cursor: pointer;
  padding: 10px 0;
  `;

const SearchListDetail = style.div`
  width: 100%;
  overflow: auto;
  text-align: center;
  cursor: pointer;
  max-height: 540px;
  overflow: auto;
`;

const DetailContent = style.div`
  cursor: pointer;
  padding: 10px 0;
`;

const SearchBtn = style.div`
  padding: 14px 0;
  background: #56AEDF;
  border-radius: 5px;
  color: white;
  text-align: center;
  margin-top: 14px;
  cursor: pointer;
`;

const SearchDes = style.div`
  border-bottom: 2px solid #56aedf;
  padding: 10px 0;
  text-align: center;
`;

const category = [
  {
    cityName: "서울",
    cityFullName: "서울시",
    cityId: "seoul",
    cityDt: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
  },
  {
    cityName: "경기",
    cityFullName: "경기도",
    cityId: "gyeonggi",
    cityDt: [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "여주군",
      "연천군",
    ],
  },
  {
    cityName: "강원",
    cityFullName: "강원도",
    cityId: "gangwon",
    cityDt: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },

  {
    cityName: "경남",
    cityFullName: "경상남도",
    cityId: "gyeongsangnam",
    cityDt: [
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
  },
  {
    cityName: "경북",
    cityFullName: "경상북도",
    cityId: "gyeongsangbuk",
    cityDt: [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
  },
  {
    cityName: "광주",
    cityFullName: "광주시",
    cityId: "gwangju",
    cityDt: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
  {
    cityName: "대구",
    cityFullName: "대구시",
    cityId: "daegu",
    cityDt: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
  },
  {
    cityName: "대전",
    cityFullName: "대전시",
    cityId: "daejeon",
    cityDt: ["대덕구", "동구", "서구", "유성구", "중구"],
  },
  {
    cityName: "부산",
    cityFullName: "부산시",
    cityId: "buson",
    cityDt: [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
  },
  {
    cityName: "울산",
    cityFullName: "울산시",
    cityId: "ulsan",
    cityDt: ["남구", "동구", "북구", "중구", "울주군"],
  },
  {
    cityName: "인천",
    cityFullName: "인천시",
    cityId: "incheon",
    cityDt: [
      "계양구",
      "남구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
  },
  {
    cityName: "전남",
    cityFullName: "전라남도",
    cityId: "jeonnam",
    cityDt: [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
  },
  {
    cityName: "전북",
    cityFullName: "전라북도",
    cityId: "jeonbuk",
    cityDt: [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
  },
  {
    cityName: "제주",
    cityFullName: "제주시",
    cityId: "jeju",
    cityDt: ["서귀포시", "제주시", "남제주군", "북제주군"],
  },
  {
    cityName: "충북",
    cityFullName: "충청북도",
    cityId: "chungbuk",
    cityDt: [
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
  },
  {
    cityName: "충남",
    cityFullName: "충청남도",
    cityId: "chungnam",
    cityDt: [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
  },
];

function Local({ setLocal, setLocalName }) {
  const [selectState, setSelectState] = useState(["지역을 선택해주세요"]);
  const [infoState, setInfoState] = useState("");
  const [infoGu, setInfoGu] = useState("");
  console.log(infoState, infoGu);
  const guRef = useRef([]);
  return (
    <SearchSection>
      <SearchContainer>
        <SearchHeader>
          <span>BORROW 지역 선택</span>
          <img
            src={require("../img/close.png")}
            onClick={() => {
              setLocal(false);
            }}
          />
        </SearchHeader>
        <SearchBox>
          <SearchList>
            <SearchDes>시/도</SearchDes>
            {category.map((list) => (
              <SearchCategory
                key={`cate${list.cityId}`}
                onClick={(event) => {
                  setSelectState(list.cityDt);
                  setInfoState(list.cityFullName);
                  if (guRef.current[infoGu]) {
                    guRef.current[infoGu].style.background = "";
                    guRef.current[infoGu].style.color = "";
                  }
                  setInfoGu("");
                  for (
                    let index = 0;
                    index < event.target.parentElement.children.length;
                    index++
                  ) {
                    event.target.parentElement.children[
                      index
                    ].style.background = "";
                    event.target.parentElement.children[index].style.color = "";
                  }
                  event.target.style.background = "#99D0EF";
                  event.target.style.color = "white";
                }}
              >
                {list.cityName}
              </SearchCategory>
            ))}
          </SearchList>
          <SearchListDetail>
            <SearchDes>구/군</SearchDes>
            {selectState.map((li) => (
              <DetailContent
                key={li}
                ref={(gu) => (guRef.current[li] = gu)}
                onClick={() => {
                  if (guRef.current[infoGu]) {
                    guRef.current[infoGu].style.background = "";
                    guRef.current[infoGu].style.color = "";
                  }
                  setInfoGu(li);
                  guRef.current[li].style.background = "#99D0EF";
                  guRef.current[li].style.color = "white";
                }}
              >
                {li}
              </DetailContent>
            ))}
          </SearchListDetail>
        </SearchBox>
        <SearchBtn
          onClick={() => {
            setLocal(false);
            setLocalName(`${infoState} ${infoGu}`);
          }}
        >
          선택
        </SearchBtn>
      </SearchContainer>
    </SearchSection>
  );
}

export default Local;
