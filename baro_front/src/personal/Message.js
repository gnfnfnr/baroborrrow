import React, { useEffect, useState } from "react";
import style from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Context";

const MessageUserPicker = style.select`
  outline: none;
  border: 1px solid #F1F3F5;
  color: #495057;
  width: 75px;
  height: 35px;
  margin: 25px 10px 10px;
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

function MessageDetail({ detail, username }) {
  const navigate = useNavigate();
  console.log(detail);
  const opposite =
    detail.member1.username !== username
      ? detail.member1.username
      : detail.member2.username;
  const memberNumber = detail.member1.username === username ? 1 : 2;
  return (
    <MessageBox
      onClick={() => {
        navigate(
          `/mypage/chatting/nickname=${opposite}&&item=${detail.product.productName}&&roomId=${detail.id}&&member=${memberNumber}`
        );
      }}
    >
      <MessageSender>
        <SenderPerson>{opposite}</SenderPerson>
        <SenderItem>{detail.product.productName}</SenderItem>
      </MessageSender>
      <MessageInfo>
        <MessageDate>{detail.lastAt.slice(0, 10)}</MessageDate>
        {memberNumber === detail.unread ? <MessageUpdate>N</MessageUpdate> : ""}
      </MessageInfo>
      <MessageRecent>{detail.lastMessage}</MessageRecent>
    </MessageBox>
  );
}

function Message() {
  const [messageFullData, setMessageFullData] = useState([]);
  const [messageData, setMessageData] = useState(messageFullData);
  const { user } = useUserContext();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/message/?username=${user.username}`)
      .then((res) => {
        setMessageFullData(res.data);
        setMessageData(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <MessageUserPicker
        onChange={(event) => {
          setMessageData(
            event.target.value === "all"
              ? messageFullData
              : messageFullData.filter((msg) => {
                  const opposite =
                    msg.member1.username !== user.username
                      ? msg.member1.username
                      : msg.member2.username;
                  return opposite === event.target.value;
                })
          );
        }}
      >
        <MessageUser value="all">전부</MessageUser>
        {messageFullData.map((msg) => {
          const opposite =
            msg.member1.username !== user.username
              ? msg.member1.username
              : msg.member2.username;
          return <MessageUser key={msg.id}>{opposite}</MessageUser>;
        })}
      </MessageUserPicker>
      {messageData.map((msg) => {
        return (
          <MessageDetail key={msg.id} detail={msg} username={user.username} />
        );
      })}
    </>
  );
}

export default Message;
