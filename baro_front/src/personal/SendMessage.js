import axios from "axios";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import style from "styled-components";
import { useUserContext } from "../Context";

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

function SendMessage() {
  const [fileImg, setFileImg] = useState();
  const [file, setFile] = useState();
  const params = useParams();
  const [content, setContent] = useState();
  console.log(params);

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("encType", "multipart/form-data");
        formData.append("sender", params.id);
        if (file) {
          formData.append("message_photo", file);
        }
        formData.append("text", content);
        axios({
          method: "POST",
          url: `http://127.0.0.1:8000/message/detail/${params.int}/?user=${params.id}`,
          headers: {
            "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
          },
          data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
          .then(() => {
            alert("쪽지가 성공적으로 보내졌습니다.");
            window.location.reload();
          })
          .catch(() => {
            alert("알 수 없는 오류가 발생했습니다.");
          });
      }}
    >
      <ul>
        <MessageListDetail>
          <MessageLabel htmlFor="receiver">받는사람</MessageLabel>
          <MessageReceiver id="receiver" placeholder={params.nickname} disabled />
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
            <MessageInputArea
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
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
