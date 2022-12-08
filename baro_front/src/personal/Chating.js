import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "styled-components";
import axios from "axios";

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
  overflow-y: auto;
  height: calc(100vh - 150px);
  position: relative;
  top: 50px;
  padding: 0 12px;
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
    @media only screen and (max-width: 700px) {
      font-size: 12px;
    }
`;

const OpponentText = style.div`
    background-color: #5F6278;
    color: white;
    border-radius: 20px;
    padding: 20px 15px;
    align-self: baseline;
    @media only screen and (max-width: 700px) {
      border-radius: 10px;
      padding: 12px 10px;
    }
`;
const Myself = style.div`
  display: flex;
  align-items: end;
  column-gap: 10px;
`;
const MyselfText = style.div`
    background-color: #57AEDE;
    color: white;
    border-radius: 20px;
    padding: 20px 15px;
    align-self: flex-end;
    @media only screen and (max-width: 700px) {
      border-radius: 10px;
      padding: 12px 10px;
    }
`;
const ChatSend = style.form`
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

const ChatPreview = style.div`
  align-self: flex-end;
  padding: 20px;
`;

const PreviewImg = style.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const ChatImg = style.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 10px;
  @media only screen and (max-width: 700px) {
    width: 100px;
    height: 100px;
  }
`;

const ChatBox = style.div`
  display: flex;
  align-items: end;
  margin-top: 16px;
  justify-content: flex-end;
  column-gap: 10px;
  flex-direction: column;
  @media only screen and (max-width: 700px) {
    font-size: 12px;
  }
`;

const ChatInput = ({ params }) => {
  const [inputText, setInputText] = useState();
  const [imgFile, setImgFile] = useState();
  return (
    <ChatSend
      encType="multipart/form-data"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("encType", "multipart/form-data");
        formData.append("sender", params.member);
        if (imgFile) {
          console.log(imgFile);
          formData.append("message_photo", imgFile);
        }
        formData.append("text", inputText);
        axios({
          method: "POST",
          url: `http://127.0.0.1:8000/message/detail/${params.roomId}/?user=${params.member}`,
          headers: {
            "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
          },
          data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
        })
          .then(() => {
            setInputText("");
            window.location.reload();
          })
          .catch((err) => {
            alert("알 수 없는 오류가 발생했습니다.");
            console.log(err);
          });
      }}
    >
      {imgFile ? (
        <ChatPreview>
          <PreviewImg src={URL.createObjectURL(imgFile)} alt="사진 미리보기" />

          <img
            src={require("../img/closeBtn.png")}
            alt="선택한 사진 제거"
            onClick={() => {
              setImgFile("");
            }}
            style={{ cursor: "pointer" }}
          />
        </ChatPreview>
      ) : (
        ""
      )}
      <ChatSendTextInput
        placeholder="내용을 입력해주세요"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
      <ChatSendButton>
        <label htmlFor="file" style={{ cursor: "pointer" }}>
          <img src={require("../img/fileClip.png")} alt="파일 이미지" />
        </label>
        <ChatSendFileInput
          type="file"
          id="file"
          onChange={(event) => {
            setImgFile(event.target.files[0]);
          }}
        />
        <ChatSendingButton>전송</ChatSendingButton>
      </ChatSendButton>
    </ChatSend>
  );
};

const OpponentChat = ({ chat, params }) => {
  return (
    <div>
      <p>{params.nickname}</p>
      <Opponent>
        <OpponentText>{chat.text}</OpponentText>
        <time dateTime={chat.sendAt}>{new Date(chat.sendAt).toTimeString().slice(0, 5)}</time>
      </Opponent>
      {chat.messagePhoto ? <ChatImg src={`http://127.0.0.1:8000/${chat.messagePhoto}`} /> : ""}
    </div>
  );
};

const MyChat = ({ chat }) => {
  return (
    <ChatBox>
      <Myself>
        <time dateTime={chat.sendAt}>{new Date(chat.sendAt).toTimeString().slice(0, 5)}</time>
        <MyselfText>{chat.text}</MyselfText>
      </Myself>
      {chat.messagePhoto ? <ChatImg src={`http://127.0.0.1:8000/${chat.messagePhoto}`} /> : ""}
    </ChatBox>
  );
};

function Chating() {
  const [chattingData, setChattingData] = useState([]);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://127.0.0.1:8000/message/detail/${params.roomId}/?user=${params.member}`,
    })
      .then((res) => setChattingData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ChattingSpace>
      <ChattingSpaceBox>
        <ChatHeader>
          <ChatTraderName>{params.nickname}</ChatTraderName>
          <ChatTraderitem>{params.item}</ChatTraderitem>
        </ChatHeader>
        <ChatMain>
          {/* <ChatDate>2022-04-33</ChatDate> */}
          {chattingData.map((chat) => {
            console.log(chat);
            const compare = parseInt(params.member) === chat.sender ? true : false;
            console.log(params.member, chat.sender);
            if (compare) {
              return <MyChat key={chat.id} chat={chat} />;
            } else {
              return <OpponentChat key={chat.id} chat={chat} params={params} />;
            }
          })}
        </ChatMain>
        <ChatInput params={params} />
      </ChattingSpaceBox>
    </ChattingSpace>
  );
}

export default Chating;
