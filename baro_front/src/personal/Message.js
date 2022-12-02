import React, { useState } from "react";
import style from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

const MessageUserPicker = style.select`
  outline: none;
  border: 1px solid #F1F3F5;
  color: #495057;
  width: 75px;
  height: 35px;
  margin: 25px 0 10px;
`;

const MessageUser = style.option`
  background: #F1F3F5;
  padding: 3px 0;
`;

const MessageBox = style.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-auto-rows: 1fr 1fr 0.8fr;
  grid-template-areas:
    "hd lt"
    "rt lt";
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  &:hover{
    background-color: #F1F3F5;
  }
  cursor: pointer;
`;

const MessageSender = style.div`
  color: black;
  padding-bottom: 12px;
  grid-area: hd;
`;
const SenderItem = style.span`
  font-size: 14px;
  color: #397293;
  padding-left: 10px;
`;
const SenderPerson = style.span`
  font-size: 18px;
`;

const MessageInfo = style.div`
  grid-area: lt;
  justify-self: end;
`;
const MessageRecent = style.div`
  grid-area: rt;
`;
const MessageDate = style.div`
  font-size: 14px;
  padding-bottom: 4px;
`;
const MessageUpdate = style.span`
  font-size: 14px;
  color: #56AEDF;

`;

function MessageDetail({ detail }) {
  const navigate = useNavigate();
  return (
    <MessageBox
      onClick={() => {
        navigate(
          `/mypage/chatting/nickname=${detail.receiver}&&item=${detail.items}`
        );
      }}
    >
      <MessageSender>
        <SenderPerson>{detail.receiver}</SenderPerson>
        <SenderItem>커피보다는 차</SenderItem>
      </MessageSender>
      <MessageInfo>
        <MessageDate>2022-03-33</MessageDate>
        <MessageUpdate>N</MessageUpdate>
      </MessageInfo>
      <MessageRecent>안녕하세요~ 거래하고 싶어요</MessageRecent>
    </MessageBox>
  );
}

function Message() {
  const [messageFullData, setMessageFullData] = useState([
    {
      id: 1,
      receiver: "123",
      sender: "cc",
      content: "안녕하세요~",
      img: "",
      items: "커피보다는 차",
    },
    {
      id: 2,
      receiver: "46",
      sender: "cc",
      content: "안녕하세요~",
      img: "",
      items: "커피보다는 차",
    },
  ]);
  const [messageData, setMessageData] = useState(messageFullData);
  return (
    <>
      <MessageUserPicker
        onChange={(event) => {
          setMessageData(
            event.target.value === "all"
              ? messageFullData
              : messageFullData.filter(
                  (msg) => msg.receiver === event.target.value
                )
          );
        }}
      >
        <MessageUser value="all">전부</MessageUser>
        {messageFullData.map((msg) => (
          <MessageUser key={msg.id}>{msg.receiver}</MessageUser>
        ))}
      </MessageUserPicker>
      {messageData.map((msg) => {
        return <MessageDetail key={msg.id} detail={msg} />;
      })}
    </>
  );
}

export default Message;
