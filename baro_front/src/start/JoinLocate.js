import React, { useEffect, useState } from "react";
import axios from "axios";

function JoinLocate(props) {
  const [city, setCity] = useState();
  const [gu, setGu] = useState();
  console.log(city, gu);
  useEffect(() => {}, []);
  return (
    <div>
      <input
        value={city}
        onChange={(event) => {
          setCity(event.target.value);
        }}
        placeholder="활동 지역"
      />
      <input
        value={gu}
        onChange={(event) => {
          setGu(event.target.value);
        }}
        placeholder="세부 지역"
      />
      <button
        onClick={() => {
          axios.post(`http://127.0.0.1:8000/user/location/?username=dd`, {
            locationCity: city,
            locationGu: gu,
          });
        }}
      >
        활동 지역 입력
      </button>
    </div>
  );
}

export default JoinLocate;
