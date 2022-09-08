import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProductBox,
  ProductImg,
  ProductRentalInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
} from "../main/list-style";

const Detail = ({ list }) => {
  const today = new Date();
  const navigate = useNavigate();
  const diff = Math.floor(
    (today - new Date(list.endDate)) / (1000 * 60 * 60 * 24)
  );
  return (
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
          <ProductText>약속된 장소에 반납되었나요?</ProductText>
        </div>
        <ProductCheck>
          <ProductCheckDate>
            {diff >= 0 ? ` D + ${diff}` : `D - ${Math.abs(diff)}`}
          </ProductCheckDate>
          <ProductCheckBtn>
            {diff > 0 ? "신고하기" : "알려주기"}
          </ProductCheckBtn>
        </ProductCheck>
      </ProductRentalInfo>
    </ProductBox>
  );
};

function Lend() {
  const [lendData, setLendData] = useState([
    {
      id: 1,
      productName: "df",
      address: "dkdf",
      deposit: 34,
      rentalFee: 34,
      endDate: "2022-10-20",
    },
    {
      id: 2,
      productName: "df",
      address: "dkdf",
      deposit: 34,
      rentalFee: 34,
      endDate: "2022-09-03",
      productPhoto:
        "data:image/jpeg;base64,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",
    },
  ]);

  return (
    <>
      {lendData.map((list) => (
        <Detail list={list} key={list.id} />
      ))}
    </>
  );
}

export default Lend;
