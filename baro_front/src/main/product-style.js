import styled from "styled-components";

export const ProductBox = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  padding: 10px 24px;
`;

export const ProductImg = styled.div`
  border-radius: 5px;
  width: 160px;
  height: 160px;
  position: relative;
  @media only screen and (max-width: 500px) {
    width: 100px;
    height: 100px;
  }
`;

export const ProductName = styled.div`
  font-size: 20px;
  cursor: pointer;
  text-decoration: underline;
  padding: 3px 0;
  @media only screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

export const ProductLocal = styled.div`
  margin-bottom: 20px;
  padding: 2px 0;
  @media only screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

export const ProductFee = styled.div`
  font-size: 18px;
  color: #000000;
  padding: 2px 0;
  @media only screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

export const ProductInfo = styled.div`
  padding-left: 12px;
  width: calc(100% - 100px);
  position: relative;
`;

export const ProductCart = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ProductBorrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #e9f6fd;
  border-radius: 5px;
  padding: 8px 0;
  width: 60%;
  text-align: center;
  @media only screen and (max-width: 500px) {
    padding: 4px 0;
    font-size: 12px;
  }
`;
