import React, { useState } from "react";
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
import { useNavigate, useOutletContext } from "react-router-dom";

const Detail = ({ list }) => {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [rental, setRental] = useState();
  const today = new Date();
  const diff = Math.floor(
    (today - new Date(list.endDate)) / (1000 * 60 * 60 * 24)
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
  const [borData, setBorData] = useState([
    {
      id: 3,
      productName: "df",
      address: "dkdfasdfasdf",
      deposit: 34767,
      rentalFee: 346767,
      endDate: "2022-11-20",
      productPhoto:
        "data:image/jpeg;base64,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",
    },
    {
      id: 4,
      productName: "df",
      address: "dkdfsdfsfadf",
      deposit: 3467,
      rentalFee: 3467,
      endDate: "2022-04-03",
    },
  ]);

  return (
    <>
      {borData.map((list) => (
        <Detail list={list} key={list.id} />
      ))}
    </>
  );
}

export default Borrow;
