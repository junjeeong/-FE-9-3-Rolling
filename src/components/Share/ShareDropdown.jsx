import { useEffect, useState } from "react";
import styled from "styled-components";
import ShareImage from "../../assets/images/icons/share.png";
import { Toast } from "../common/Toast";
import useShareKakao from "../../hooks/useShareKakao";
import OutlineButton from "../common/Button/OutlineButton";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  @media (max-width: 768px) {
  }
`;

const DropdownImg = styled.img`
  width: 24px;
  height: 24px;
  // 모바일 사이즈
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
  width: 160px;
  padding: 8px 0;
`;

const DropdownItem = styled.button`
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

const KakaoShareButton = ({ onCloseDropdown, iskakaoReady }) => {
  useEffect(() => {
    if (iskakaoReady) {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
      }

      if (window.Kakao.Share) {
        window.Kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-btn",
          objectType: "feed",
          content: {
            title: "롤링 페이퍼",
            description: "Rolling에서 롤링 페이퍼를 작성해보세요!",
            imageUrl: "https://fe93.netlify.app/logo.png",
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
          buttons: [
            {
              title: "웹으로 보기",
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            },
            {
              title: "앱으로 보기",
              link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href,
              },
            },
          ],
        });
      } else {
        console.error("Kakao.Share is not available.");
      }
    }
  }, [iskakaoReady]);

  useEffect(() => {
    const originalWindowOpen = window.open;

    window.open = (...args) => {
      onCloseDropdown();
      return originalWindowOpen(...args);
    };

    return () => {
      window.open = originalWindowOpen;
    };
  }, [onCloseDropdown]);

  return <DropdownItem id="kakaotalk-sharing-btn">카카오톡 공유</DropdownItem>;
};

const ShareDropdown = () => {
  const iskakaoReady = useShareKakao(); // Kakao SDK 로드 여부
  const [isOpen, setIsOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToastVisible(true); // 토스트를 보이도록 설정
      handleCloseDropdown(); // 드롭다운 닫기

      setTimeout(() => {
        setToastVisible(false);
      }, 1500);
    } catch (err) {
      console.error("URL 복사 실패:", err);
    }
  };

  return (
    <DropdownContainer>
      <OutlineButton onClick={handleToggleDropdown}>
        <DropdownImg src={ShareImage} alt="카카오 공유" />
      </OutlineButton>
      {isOpen && (
        <DropdownMenu>
          <KakaoShareButton
            onCloseDropdown={handleCloseDropdown}
            iskakaoReady={iskakaoReady}
          />
          <DropdownItem onClick={copyURL}>URL 공유</DropdownItem>
        </DropdownMenu>
      )}
      {toastVisible && <Toast message="URL이 복사되었습니다." />}
      {/* 토스트는 toast 상태에 따라 표시 */}
    </DropdownContainer>
  );
};

export default ShareDropdown;
