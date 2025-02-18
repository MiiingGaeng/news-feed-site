import styled from "styled-components";
import Button from "../components/common/Button";
import CloseButton from "../components/feed/CloseButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchData } from "../api/fetchData";
import { useState } from "react";
import Comments from "../components/feed/Comments";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { deleteData } from "../api/deleteData";
import DEFAULT_PROFILE_IMG from "../assets/image/user_default.png";
import { AlertCheck } from "../common/Alert";

const Detail = () => {
  //-----feed_id / user_id-----
  //url에서 게시글 id 추출 : query param으로 feed_id 값 가져오기
  const [searchParams] = useSearchParams();
  const feedId = searchParams.get("feed_id");

  //Context로 로그인한 유저의 user_id 값 가져오기
  const { userId } = useContext(AuthContext);

  //-----data fetch-----
  //feeds, comments 테이블 Data 가져오기
  const [feedsData, setFeedsData] = useState([]);

  useEffect(() => {
    async function fetchFeeds() {
      const newFeedsData = await fetchData("feeds", "users");

      setFeedsData(newFeedsData);
    }

    fetchFeeds();
  }, []);

  //-----해당 게시글 데이터 가져오기-----
  //게시글 정보
  const selectedFeedData = feedsData.find((feed) => feed.feed_id === feedId);
  //작성자 정보
  const writerData = selectedFeedData?.users;

  //CloseButton 클릭시 Feed로 이동 로직
  const navigate = useNavigate();

  const handleNavigateToEdit = () => {
    navigate(`/edit?feed_id=${feedId}`);
  };

  //-----해당 게시글 삭제 로직-----
  const handleDeletePost = async (feed_id) => {
    //사용자 확인 여부
    const isConfirm = await AlertCheck(
      "정말로 삭제하시겠습니까?",
      "이 작업은 되돌릴 수 없습니다!"
    );
    if (isConfirm) {
      //supabase 데이터 삭제
      await deleteData("feeds", "feed_id", feed_id);
      //feed로 이동
      navigate("/feed");
    }
  };

  return (
    <StDetailBox>
      <CloseButton onClick={() => navigate("/feed")} />
      <StDetailUserContentsWrapper>
        <StDetailUserWrapper>
          {console.log(writerData)}
          <StUserProfileImage
            src={
              writerData?.profile_img
                ? `${import.meta.env.VITE_APP_SUPABASE_STORAGE_URL}${
                    writerData?.profile_img
                  }`
                : DEFAULT_PROFILE_IMG
            }
          />
          <h3>{writerData?.nickname}</h3>
        </StDetailUserWrapper>

        <h1>{selectedFeedData?.title}</h1>
        <p>{selectedFeedData?.contents}</p>
        {selectedFeedData?.writer_id === userId && (
          <StDetailButtonWrapper>
            <Button onClick={handleNavigateToEdit}>EDIT</Button>
            <Button onClick={() => handleDeletePost(feedId)}>DELETE</Button>
          </StDetailButtonWrapper>
        )}
      </StDetailUserContentsWrapper>

      <Comments feedId={feedId} />
    </StDetailBox>
  );
};

//-----styled-components-----
//전체 레이아웃
const StDetailBox = styled.div`
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

//user + 본문 영역
const StDetailUserContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  h1 {
    font-size: 20px;
    padding: 0 5px;
  }

  p {
    margin-bottom: 20px;
    padding: 0 5px;
  }
`;

const StDetailUserWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  gap: 20px;

  h3 {
    display: inline-block;
    width: 70px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
  }
`;

//user 프로필 이미지
const StUserProfileImage = styled.img.attrs((props) => ({
  src: props.src || DEFAULT_PROFILE_IMG
}))`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

//EDIT/DELETE 버튼 wrapper
const StDetailButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-left: 10px;
`;

export default Detail;
