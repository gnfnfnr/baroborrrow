import styled from "styled-components";

export const LoginBox = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const LoginLogo = styled.img`
  padding: 36px 0 20px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

export const LoginForm = styled.div``;

export const LoginInput = styled.div`
  width: 100%;
  display: flex;
  background: #f7f7f7;
  border-radius: 5px;
  padding: 12px 24px 12px 12px;
  box-sizing: border-box;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 60px;
  }
  @media only screen and (max-width: 700px) {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;

export const LoginInputLabel = styled.label`
  padding-right: 12px;
`;

export const LoginInputText = styled.input`
  padding-left: 12px;
  all: unset;
  width: 100%;
`;

export const LoginButton = styled.button`
  all: unset;
  background: #56aedf;
  border-radius: 5px;
  color: white;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  cursor: pointer;
`;

export const LoginToReg = styled.div`
  float: right;
  padding: 20px;
  color: #888;
  cursor: pointer;
`;

export const JoinWelcome = styled.p`
  color: #56aedf;
  text-transform: uppercase;
  font-size: 24px;
  padding-top: 30px;
`;

export const JoinText = styled.div`
  padding: 10px 0 20px;
`;
