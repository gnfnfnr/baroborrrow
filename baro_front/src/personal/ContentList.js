import React, { useState } from "react";
import {
  ProductBox,
  ProductImg,
  ProductInfo,
  ProductName,
  ProductLocal,
  ProductText,
  ProductDes,
  ProductCheck,
  ProductCheckDate,
  ProductCheckBtn,
} from "../main/list-style";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import RentalCheck from "./RentalCheck";

const ListTitle = styled.div`
  display: flex;
`;

const ListTitleDetail = styled.span`
  width: 50%;
  text-align: center;
  padding: 12px 0;
  @media only screen and (min-width: 700px) {
    padding: 24px 0;
    font-size: 20px;
  }
`;

const ListContent = styled.div``;

function ContentList(props) {
  const today = new Date();
  const [pdData, setPdData] = useState([
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
    },
  ]);
  const navigate = useNavigate();
  const [rental, setRental] = useState();
  return (
    <div>
      <ListTitle>
        <ListTitleDetail>빌린 내역</ListTitleDetail>
        <ListTitleDetail>빌려준 내역</ListTitleDetail>
      </ListTitle>
      <ListContent>
        {pdData.map((list) => (
          <ProductBox key={list.id}>
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
            <ProductInfo>
              <ProductName
                onClick={() => {
                  navigate(`/user/detail${list.id}`);
                }}
              >
                {list.productName}
              </ProductName>
              <ProductLocal>{list.address}</ProductLocal>
              <ProductDes>
                <ProductText>약속된 장소에 반납하셨나요?</ProductText>
                <ProductCheck>
                  <ProductCheckDate>
                    {Math.floor(
                      (today - new Date(list.endDate)) / (1000 * 60 * 60 * 24)
                    ) >= 0
                      ? ` D + ${Math.floor(
                          (today - new Date(list.endDate)) /
                            (1000 * 60 * 60 * 24)
                        )}`
                      : `D - ${Math.abs(
                          Math.floor(
                            (today - new Date(list.endDate)) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}`}
                  </ProductCheckDate>
                  <ProductCheckBtn
                    onClick={() => {
                      setRental(true);
                    }}
                  >
                    반납하기
                  </ProductCheckBtn>
                </ProductCheck>
              </ProductDes>
            </ProductInfo>
          </ProductBox>
        ))}
        {rental ? <RentalCheck setRental={setRental} /> : ""}
      </ListContent>
    </div>
  );
}

export default ContentList;
