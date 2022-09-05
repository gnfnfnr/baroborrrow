import React from "react";
import {
  PdContainer,
  PdInfo,
  InfoDes,
  InfoBox,
  InfoTitle,
  InfoMoney,
  InfoWon,
  PdBtn,
} from "../product/procuct-style";
import styled from "styled-components";

const ContentListHeader = styled.div``;

function ContentList(props) {
  return (
    <div>
      <ContentListHeader>
        <div>빌린 내역</div>
        <div>빌려준 내역</div>
      </ContentListHeader>
    </div>
  );
}

export default ContentList;
