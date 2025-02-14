import { useState } from "react"
import styled from "styled-components";

const Like = () => {

  // 좋아요 상태 변화 함수
  const [isLiked, setIsLiked] = useState(false);

  // 좋아요 버튼 이벤트 핸들러
  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
  }
  return (
    <StLikeButton onClick={handleLike} isLiked={isLiked}>
      {isLiked ? "❤️" : "🤍"}
    </StLikeButton>
  )
}

// 좋아요 버튼 styled-components
const StLikeButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  // 좋아요 상태에 따라 조건부 스타일링을 사용해 색상 변경
  /* color: ${(props) => (props.$isLiked ? "#ff4500" : "#aaa")}; */
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff4500;
  }
`

export default Like