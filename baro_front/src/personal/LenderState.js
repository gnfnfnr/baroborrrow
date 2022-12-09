import React from "react";
import styled from "styled-components";

const AllowButton = styled.button`
  all: unset;
  padding: 5px 6px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  margin-right: 10px;
  background-color: #397293;
  color: white;
  cursor: pointer;
`;
const RefuseButton = styled.button`
  all: unset;
  padding: 5px 6px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  background-color: #94484b;
  color: white;
  cursor: pointer;
`;
const ItemReturnButton = styled.button`
  all: unset;
  padding: 5px 6px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  margin-right: 10px;
  background-color: #397293;
  color: white;
  cursor: pointer;
`;

export default class LenderState {
  #stateMap;
  #userKey;

  constructor() {
    this.#stateMap = this.#makeMap();
  }

  #makeMap() {
    const map = new Map();
    // 수락 대기 표시
    map.set([null, false, false, false, false], () => (
      <div>
        <AllowButton>수락</AllowButton>
        <RefuseButton>거절</RefuseButton>
      </div>
    ));
    // 수락
    map.set([true, false, false, false, false], () => <div>결제 대기중</div>);
    // 거절
    map.set([false, false, false, false, false], () => <div>거절</div>);
    // 대여자가 결제 완료
    map.set([true, true, false, false, false], () => <div>바로 중</div>);
    // 대여자가 물건을 반납했다
    map.set([true, true, true, false, false], () => {
      //보증금과 대여비 결제 취소 axios 넣기
      return <ItemReturnButton>반납 확인</ItemReturnButton>;
    });
    // 대여자가 빌린 물건을 받았다
    map.set([true, true, true, true, false], () => <div>설문 대기</div>);
    // 설문완료
    map.set([true, true, true, true, true], () => <div>설문 완료</div>);
    return map;
  }

  getValue(state) {
    const { isAccepted, isPayed, isReturnUser, isReturnOwner, isReviewed } = state;
    this.#userKey = [isAccepted, isPayed, isReturnUser, isReturnOwner, isReviewed];
    return [...this.#stateMap].filter(([stateKey]) => {
      return (
        this.#userKey.filter((user, index) => user === stateKey[index]).length ===
        this.#userKey.length
      );
    });
  }
}
