import styled from "styled-components";
import { EmojiBadge } from "./EmojiBadge";
const Container = styled.div`
  display: flex;
  gap: 14px;
  justify-content: center;
  align-items: center;
`;

const EmojiBadgeWrap = styled.div`
  display: flex;
  gap: 8px;
  // 모바일
  @media (max-width: 768px) {
    gap: 4px;
  }
`;

// reaction 받은 상위 이모티콘을 시각적으로 표시합니다.
//CardList 페이지 모바일 반응형 구현을 위해 isCardList prop 추가로 내림
export const EmojiTopBadge = ({ recipient }) => {
  return (
    <Container>
      <EmojiBadgeWrap>
        {recipient.topReactions.map((reaction) => (
          <EmojiBadge
            key={reaction.id}
            emoji={reaction.emoji}
            count={reaction.count}
          />
        ))}
      </EmojiBadgeWrap>
    </Container>
  );
};
