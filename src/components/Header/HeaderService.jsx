import styled from "styled-components";
import { EmojiTopBadge } from "../Emoji/EmojiTopBadge";
import { AddEmoji } from "../Emoji/AddEmoji";
import { AuthorNotice } from "./AuthorNotice";
import arrowDown from "../../assets/images/icons/arrow_down.png";
import { EmojiAllBadge } from "../Emoji/EmojiAllBadge";
import { useEffect, useState } from "react";
import ShareDropdown from "../Share/ShareDropdown";
import useReactions from "../../hooks/useReactions";
import { EMOJI_TYPES } from "../../constants/emojiTypes";
import { Divider as Horizontal } from "../common/Card/PaperCard";
import useRecipients from "../../hooks/useRecipients";

const Container = styled.div`
  background-color: white;
  margin-top: 65px;
  display: flex;
  height: 68px;
  justify-content: center;
  height: 68px;
  // 태블릿 사이즈
  @media (max-width: 1200px) {
    padding: 0 24px;
  }
  // 모바일 사이즈
  @media (max-width: 768px) {
    margin-top: 0;
    padding: 12px 20px;
    height: 104px;
  }
`;
const Wrap = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    gap: 10px;
  }
`;
const AuthorWrap = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    display: none;
  }
`;
const ServiceWrap = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: var(--gray-800);
  font-weight: var(--font-bold);
  // 모바일 사이즈
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    // min-width: 320px;
  }
`;
const RecipientName = styled.p`
  //모바일
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const Divider = styled.div`
  width: 1px;
  height: 28px;
  border: 1px solid var(--gray-200);
`;
const MobileOnlyHorizontal = styled(Horizontal)`
  display: none;

  @media (max-width: 768px) {
    // position: fixed;
    // top: 45px;
    // left: 0;
    display: block;
    height: 1px;
    margin-top: 0px;
    border: 1px solid var(--gray-200);
  }
`;

const ArrowDown = styled.img`
  width: 12px;
  height: 7px;
  transition: transform 0.3s ease-in-out; /* 회전 애니메이션 설정 */
  transform: ${({ showAllBadge }) =>
    showAllBadge ? "rotate(180deg)" : "rotate(0deg)"};
`;
const ArrowDownBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const HeaderService = ({ messages }) => {
  const [showAllBadge, setShowAllBadge] = useState(false);
  // Jotai 쓴 useRecipients 훅을 사용해서 recipient 을 전역적으로 상태 관리
  const { recipient, setRecipient } = useRecipients();
  // useReactions 훅을 사용하여 이모지 추가 기능을 구현
  const { reactions, setReactions, addReaction } = useReactions(recipient.id);

  useEffect(() => {
    //console.log("Updated reactions:", reactions);
  }, [reactions]);

  const handleAddEmoji = async (emoji) => {
    try {
      // 선택된 이모지를 서버로 전송
      const newReactions = await addReaction({
        emoji: emoji,
        type: EMOJI_TYPES.INCREASE,
      });
      // 새로 가져온 리액션 리스트를 설정
      setReactions(newReactions);
      // count 기준으로 상위 3개의 반응을 선택하여 topReactions에 설정
      const topReactions = newReactions
        .slice() // 원본 배열을 변경하지 않기 위해 복사
        .sort((a, b) => b.count - a.count) // count 기준으로 내림차순 정렬
        .slice(0, 3); // 상위 3개의 요소만 선택

      // recipient 상태 업데이트
      setRecipient({
        ...recipient,
        topReactions: topReactions, // 상위 3개의 반응으로 topReactions 설정
      });
    } catch (err) {
      console.error("Error adding reaction:", err);
    }
  };

  return (
    <Container>
      {recipient && (
        <ServiceWrap>
          <RecipientName>To. {recipient.name}</RecipientName>
          <MobileOnlyHorizontal />
          <Wrap style={{ gap: "28px" }}>
            <AuthorWrap>
              <AuthorNotice paperInfo={recipient} authors={messages} />
              <Divider />
            </AuthorWrap>
            <Wrap>
              {recipient.topReactions.length > 0 && (
                <EmojiTopBadge recipient={recipient} />
              )}
              <Wrap style={{ position: "relative" }}>
                {recipient.topReactions.length > 0 && (
                  <ArrowDownBtn onClick={() => setShowAllBadge(!showAllBadge)}>
                    <ArrowDown src={arrowDown} showAllBadge={showAllBadge} />
                  </ArrowDownBtn>
                )}
                {showAllBadge && <EmojiAllBadge reactions={reactions} />}
                <AddEmoji onAdd={handleAddEmoji} />{" "}
                {/* AddEmoji에 onAdd 전달 */}
                <Divider />
              </Wrap>
              <ShareDropdown />
            </Wrap>
          </Wrap>
        </ServiceWrap>
      )}
    </Container>
  );
};
