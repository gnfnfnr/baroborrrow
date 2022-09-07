import style from "styled-components";

export const PdContainer = style.div`
  margin: 52px auto 0;
  padding: 0 24px;
  font-weight: 700;
  color: #666666;
  box-sizing: border-box;
  max-width: 900px;
  @media only screen and (max-width: 500px) {
      width: 100%;
    }
`;

export const PdInfo = style.ul`
  padding-bottom: 18px;
`;

export const InfoBox = style.li`
  border-bottom: 1px solid #D9D9D9;
  padding: 20px 0;
`;

export const InfoTitle = style.div`
  padding: 0 12px 20px;
`;

export const InfoWon = style.span`
  padding-left: 4px;
`;

export const InfoDes = style.div`
  padding: 0 12px;
  overflow: hidden;
  font-size: 14px;
  line-height: 21px;
`;

export const InfoMoney = style.div`
  padding: 0 12px;
`;

export const InfoLoc = style.div`
  padding-top: 20px;
`;

export const PdBtn = style.div`
  background: #56AEDF;
  padding: 23px 0;
  text-align: center;
  color: white;
  cursor: pointer;
`;
