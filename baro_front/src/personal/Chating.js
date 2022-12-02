import React from "react";
import { useParams } from "react-router-dom";
import style from "styled-components";

const ChattingSpace = style.div`
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 1000;
    background-color: white;
    width: 100%;
    left: 0;
`;

const ChattingSpaceBox = style.div`
    max-width: 1080px;
    margin: 0 auto;
`;

const ChatHeader = style.div`
    position: fixed;
    background-color: #397293;
    width: 100%;
    padding: 16px 12px;
    max-width: 1080px;
`;
const ChatTraderName = style.span`
    font-size: 18px;
    color: black;
    margin-right: 16px;
    `;
const ChatTraderitem = style.span`
    font-size: 14px;
    color: white;
`;
const ChatMain = style.section`
    padding: 52px 24px 80px;
`;
const ChatDate = style.div`
    font-weight: 400;
    text-align: center;
    margin: 25px 0;
`;

const Opponent = style.div`
    display: flex;
    align-items: end;
    margin: 16px 0;
    column-gap: 10px;
`;

const OpponentText = style.div`
    background-color: #5F6278;
    color: white;
    border-radius: 20px;
    padding: 20px 15px;
    align-self: baseline;
`;
const Myself = style.div`
    display: flex;
    align-items: end;
    margin: 16px 0;
    justify-content: flex-end;
    column-gap: 10px;
`;
const MyselfText = style.div`
    background-color: #57AEDE;
    color: white;
    border-radius: 20px;
    padding: 20px 15px;
    align-self: flex-end;
`;
const ChatSend = style.div`
    position: fixed;
    bottom: 0;
    background-color: #397293;
    width: 100%;
    max-width: 1080px;
    display:flex;
    flex-direction: column;
    
    `;
const ChatSendTextInput = style.textarea`
    all: unset;
    resize: none;
    margin: 10px 10px 8px;
    color: white;
    &::placeholder {
        color: #a6a6a6;
    }
`;
const ChatSendFileInput = style.input`
    resize: none;
    display: none
`;
const ChatSendButton = style.div`
    margin: 0 10px 4px;
    align-self: flex-end;
    display:flex;
    align-items: center;
`;
const ChatSendingButton = style.button`
    all: unset;
    margin-left: 10px;
    color: white;
    padding: 5px 10px;
    border: 1px solid white;
`;

function Chating() {
  const params = useParams();
  return (
    <ChattingSpace>
      <ChattingSpaceBox>
        <ChatHeader>
          <ChatTraderName>{params.nickname}</ChatTraderName>
          <ChatTraderitem>{params.item}</ChatTraderitem>
        </ChatHeader>
        <ChatMain>
          <ChatDate>2022-04-33</ChatDate>
          <>
            <span>123</span>
            <Opponent>
              <OpponentText>안녕하세요 거래하고 싶어요!</OpponentText>
              <time>04:04</time>
            </Opponent>
          </>
          <Myself>
            <time>04:04</time>
            <MyselfText>네~ 차 거래하고 싶은 신 분 맞으시죠?</MyselfText>
          </Myself>
        </ChatMain>
        <ChatSend>
          <ChatSendTextInput placeholder="내용을 입력해주세요" />
          <ChatSendButton>
            <label htmlFor="file">
              <img src={require("../img/fileClip.png")} alt="파일 이미지" />
            </label>
            <ChatSendFileInput type="file" id="file" />
            <ChatSendingButton>전송</ChatSendingButton>
          </ChatSendButton>
        </ChatSend>
      </ChattingSpaceBox>
    </ChattingSpace>
  );
}

export default Chating;
