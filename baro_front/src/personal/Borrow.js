import React, { useEffect, useState } from "react";
import {
  ProductBox,
  ProductImg,
  ProductRentalInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductDes,
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
  ProductComBtn,
} from "../main/list-style";
import RentalCheck from "./RentalCheck";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context";

const Detail = ({ list }) => {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [rental, setRental] = useState();
  const today = new Date();
  const diff = Math.floor(
    (today - new Date(list.barrowEnd)) / (1000 * 60 * 60 * 24)
  );
  return (
    <>
      <ProductBox>
        <ProductImg>
          <img
            src={list.productPhoto}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </ProductImg>
        <ProductRentalInfo>
          <div>
            <ProductName
              onClick={() => {
                navigate(`/user/detail${list.id}`);
              }}
            >
              {list.productName}
            </ProductName>
            <ProductLocal>{list.address}</ProductLocal>
            <ProductText>약속된 장소에 반납하셨나요?</ProductText>
          </div>
          <ProductDes>
            <ProductCheck>
              <ProductCheckDate>
                {diff >= 0 ? ` D + ${diff}` : `D - ${Math.abs(diff)}`}
              </ProductCheckDate>
              {complete ? (
                <ProductComBtn>반납완료</ProductComBtn>
              ) : (
                <ProductCheckBtn
                  onClick={() => {
                    setRental(true);
                  }}
                >
                  반납하기
                </ProductCheckBtn>
              )}
            </ProductCheck>
          </ProductDes>
        </ProductRentalInfo>
      </ProductBox>
      {rental ? (
        <RentalCheck
          setRental={setRental}
          setComplete={setComplete}
          list={list}
        />
      ) : (
        ""
      )}
    </>
  );
};

function Borrow() {
  const [borData, setBorData] = useState([]);
  const { user } = useUserContext();
  console.log(user);
  let cnt = 1;
  useEffect(() => {
    let clear = [];
    while (cnt < 11) {
      axios
        .get(`http://127.0.0.1:8000/barrow/${cnt}/`)
        .then((response) => {
          if (response.data.user.nickname === user.nickname) {
            clear.push(response.data);
            borData.push(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      cnt++;
    }
  }, []);
  console.log(borData);
  // useEffect(() => {
  //   while (cnt < 10) {
  //     //   axios
  //     //     .get(`http://127.0.0.1:8000/barrow/${cnt}/`)
  //     //     .then((response) => {
  //     //       cnt += 1;
  //     //       console.log(response);
  //     //     })
  //     //     .catch((err) => {
  //     //       console.log(err);
  //     //       return;
  //     //     });
  //     cnt++;
  //     console.log(cnt);
  //   }
  // }, []);

  return (
    <>
      {borData
        ? borData.map((list) => <Detail list={list} key={list.id} />)
        : ""}
    </>
  );
}

export default Borrow;
