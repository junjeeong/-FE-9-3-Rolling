import React from "react";
import styled from "styled-components";
import OutlineButton from "../common/Button/OutlineButton";
import plus from "../../assets/images/icons/emoji_plus.png";
import { EmojiSelector } from "./EmojiSelector";
import { useEmojiPicker } from "../../hooks/useEmojiPicker";

const Container = styled.div`
  position: relative;
`;

const EmojiBtnWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: var(--gray-900);
  font-size: 16px;
  font-weight: var(--font-medium);
  p {
    // 모바일 사이즈
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
``;

const EmojiWrap = styled.div`
  position: absolute;
  z-index: 2;
  top: 100%;
  right: 0;
  height: 100px;
  @media (max-width: 768px) {
    right: -100px;
  }
`;
// 이모티콘을 선택하고 표시하는 기능을 담당합니다.
export const AddEmoji = ({ onAdd }) => {
  const { showPicker, setShowPicker, handleEmojiSelect, pickerRef } = useEmojiPicker(); // 커스텀 훅 사용

  return (
    <Container>
      <OutlineButton onClick={() => setShowPicker(!showPicker)}>
        <EmojiBtnWrap>
          <img src={plus} alt="emoji_plus" width="24px" />
          <p>추가</p>
        </EmojiBtnWrap>
      </OutlineButton>
      <EmojiWrap>
        <EmojiSelector
          showPicker={showPicker}
          onSelectEmoji={(emoji) => {
            handleEmojiSelect(emoji); // 기존의 이모지 선택 로직
            onAdd(emoji); // 부모 컴포넌트로 이모지 전달
          }}
          pickerRef={pickerRef}
        />
      </EmojiWrap>
    </Container>
  );
};
