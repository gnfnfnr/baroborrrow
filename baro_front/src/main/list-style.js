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

export const ProductRentalInfo = styled.div`
  padding-left: 12px;
  width: calc(100% - 100px);
  position: relative;
  display: flex;
  justify-content: space-between;
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
export const ProductDes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
export const ProductText = styled.p``;
export const ProductCheck = styled.div`
  // align-self: flex-end;
  @media only screen and (max-width: 500px) {
    padding: 4px 14px;
  }
`;
export const ProductCheckDate = styled.div`
  padding: 6px 16px;
  background: #888888;
  border-radius: 5px;
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;
export const ProductCheckBtn = styled.div`
  padding: 6px 16px;
  background: #56aedf;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  @media only screen and (max-width: 500px) {
    padding: 4px 14px;
  }
`;

export const ProductComBtn = styled.div`
  padding: 6px 16px;
  background: #d9d9d9;
  border-radius: 5px;
  color: #666666;
`;
