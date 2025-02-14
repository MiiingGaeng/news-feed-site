import styled from "styled-components"
import Like from "./Like"

const FeedCard = ({ post }) => {
  return (
    <StFeedCard>
      <StFeedCardHeader>
        <StProfileImage src={post.users.profile_img} />
        <StCardId>
          {post.users.nickname}
          <Like />
        </StCardId>
      </StFeedCardHeader>

      <StFeedCardContent>
        {post.title}
        {post.contents}
      </StFeedCardContent>
    </StFeedCard>
  )
}

//-----styled-components-----

// Feed카드
const StFeedCard = styled.li`
  width: 400px;
  max-width: 600px;
  height: 100%;
  max-height: 800px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`

// 카드 header
const StFeedCardHeader = styled.div`
  display: flex;
`

// 프로필 이미지
const StProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

// 게시글 작성자 ID
const StCardId = styled.h2`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

// 게시글 내용
const StFeedCardContent = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: normal;
`;

export default FeedCard