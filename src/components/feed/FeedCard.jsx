import styled from "styled-components";
import Like from "./Like";
import { deleteData } from "../../api/deleteData";
import { FaRegTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AlertCheck } from "../../common/Alert";
import DEFAULT_PROFILE_IMG from "../../assets/image/user_default.png";

const FeedCard = ({ post, setPosts }) => {
  const { userId } = useContext(AuthContext);

  // 게시글 삭제 함수
  const handleDeletePost = async (e, id) => {
    e.preventDefault();
    const isConfirm = await AlertCheck(
      "정말로 삭제하시겠습니까?",
      "이 작업은 되돌릴 수 없습니다!",
    );
    if (isConfirm) {
      await deleteData("feeds", "feed_id", id);
      setPosts((prev) => prev.filter((p) => p.feed_id !== post.feed_id));
    }
  };

  return (
    <StFeedCard>
      <StFeedCardHeader>
        <StCardId>
          <StProfileImage
            src={
              post.users.profile_img
                ? `${import.meta.env.VITE_APP_SUPABASE_STORAGE_URL}${
                    post.users.profile_img
                  }`
                : DEFAULT_PROFILE_IMG
            }
          />
          {post.users.nickname}
        </StCardId>
        <Like feedId={post.feed_id} user={post.users} />
      </StFeedCardHeader>

      <StFeedCardContent>
        <StTitle>{post.title}</StTitle>
        <StContents>{post.contents}</StContents>
      </StFeedCardContent>

      {post.writer_id === userId && (
        <StDeleteButton onClick={(e) => handleDeletePost(e, post.feed_id)}>
          <StTrashIcon />
        </StDeleteButton>
      )}
    </StFeedCard>
  );
};

//-----styled-components-----

// Feed 카드
const StFeedCard = styled.li`
  width: 400px;
  max-width: 400px;
  height: 100%;
  max-height: 600px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;

// 카드 Header
const StFeedCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

// 프로필 이미지
const StProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 8px;
`;

// 게시글 작성자 ID
const StCardId = styled.h2`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 게시글 내용 전체 박스
const StFeedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

// 제목
const StTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-bottom: 8px;
`;

// 본문
const StContents = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  display: block;
`;
// 삭제 버튼
const StDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 8px;
  border: none;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    background-color: #f5f5f5;
  }
`;

// 삭제 아이콘
const StTrashIcon = styled(FaRegTrashAlt)`
  font-size: 30px;
  background: white;
  border-radius: 50%;
  padding: 4px;
  transition:
    color 0.2s ease-in-out,
    background-color 0.2s ease-in-out;

  ${StDeleteButton}:hover & {
    color: #fc090d;
    background: white;
  }
`;

export default FeedCard;
