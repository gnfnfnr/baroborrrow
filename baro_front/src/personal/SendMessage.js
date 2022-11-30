import React, { useState } from "react";
import style from "styled-components";

const MessageLabel = style.label`
`;

const MessageReceiver = style.input`
  all: unset;
  &::placeholder {
    color: #D9D9D9;
    padding: 10px;
    font-weight: bold;
  }
`;

const MessageInput = style.input`
  all: unset;
  border-bottom: 1px solid #e6e6ea;
  padding: 5px;
  width: 90%;
  &::placeholder {
    color: #D9D9D9;
  }
`;

const MessageListDetail = style.li`
  padding: 20px 12px;
`;

const MessageInputArea = style.textarea`
  height: 190px;
  resize: none;
  border: 1px solid #e6e6ea;
  font-size: 14px;
  font-weight: 700;
  outline:none;
  border-radius: 12px;
  padding: 12px;
  &::placeholder {
  color: #D9D9D9;
  }
`;

const MessageContext = style.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SelectImg = style.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
  border: 1px solid #D9D9D9;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

const SelectRemove = style.span`
  position: relative;
`;

const MessageLabelText = style.div`
  padding-bottom: 20px;
`;

const MessageButton = style.button`
  all: unset;
  background: #56AEDF;
  padding: 23px 0;
  text-align: center;
  color: white;
  cursor: pointer;
  width: 100%;
`;

function SendMessage(props) {
  const [fileImg, setFileImg] = useState();
  const [file, setFile] = useState();
  return (
    <form>
      <ul>
        <MessageListDetail>
          <MessageLabel htmlFor="receiver">받는사람</MessageLabel>
          <MessageReceiver id="receiver" placeholder="123" disabled />
        </MessageListDetail>
        <MessageListDetail>
          {fileImg ? (
            <div>
              <SelectImg src={fileImg} />
              <SelectRemove
                onClick={() => {
                  setFileImg("");
                }}
              >
                <img src={require("../img/closeBtn.png")} />
              </SelectRemove>
            </div>
          ) : (
            <>
              <label htmlFor="imgFile">
                <MessageLabelText>이미지 첨부</MessageLabelText>
                <img src={require("../img/cam.png")} />
              </label>
              <input
                id="imgFile"
                type="file"
                name="img"
                accept="image/*"
                onChange={(event) => {
                  setFileImg(URL.createObjectURL(event.target.files[0]));
                  setFile(event.target.files[0]);
                }}
                style={{ width: "0", height: "0" }}
              />
            </>
          )}
        </MessageListDetail>
        <MessageListDetail>
          <MessageContext>
            <MessageLabel>보낼 내용</MessageLabel>
            <MessageInputArea placeholder="내용을 입력해주세요" />
          </MessageContext>
        </MessageListDetail>
        <MessageListDetail>
          <MessageButton>보내기</MessageButton>
        </MessageListDetail>
      </ul>
    </form>
  );
}

export default SendMessage;
