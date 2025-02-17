import styled from "styled-components";
import FeedForm from "../components/feed/FeedForm";
import CloseButton from "../components/feed/CloseButton";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FeedEdit = () => {
  //-----url에서 게시글 id 추출-----
  //query param으로 feed_id 값 가져오기
  const [searchParams] = useSearchParams();
  const feedId = searchParams.get("feed_id");

  //CloseButton 클릭시 Detail 페이지로 이동
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    //사용자 확인 여부
    const isConfirm = window.confirm("수정을 그만두시겠습니까?");

    if (isConfirm) {
      navigate(`/detail?feed_id=${feedId}`);
    }
  };

  return (
    <StEditBox>
      <CloseButton onClick={handleNavigateToDetail}></CloseButton>
      <FeedForm feedId={feedId} />
    </StEditBox>
  );
};

//-----styled-components-----
//전체 레이아웃
const StEditBox = styled.div`
  width: 80%;
  border-radius: 30px;
  background-color: #f7f6ff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export default FeedEdit;
