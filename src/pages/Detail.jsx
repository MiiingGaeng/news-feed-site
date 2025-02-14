import styled from "styled-components";
import Button from "../common/Button";
import CloseButton from "../components/feed/CloseButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchData } from "../api/fetchData";
import { useState } from "react";
import Comments from "../components/feed/Comments";

const Detail = () => {
  //-----url에서 게시글 id 추출-----
  //query param으로 feed_id 값 가져오기
  const [searchParams] = useSearchParams();
  const feedId = searchParams.get("id");

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
    navigate(`/edit?id=${feedId}`);
  };

  return (
    <StDetailBox>
      <CloseButton onClick={() => navigate("/feed")} />
      <StDetailUserContentsWrapper>
        <StDetailUserWrapper>
          <img src="/" alt="user_profile_img" />
          <h3>{writerData?.nickname}</h3>
        </StDetailUserWrapper>

        <h1>{selectedFeedData?.title}</h1>
        <p>{selectedFeedData?.contents}</p>
        <Button type="type" onClick={() => handleNavigateToEdit()}>
          EDIT
        </Button>
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

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
  }

  h3 {
    display: inline-block;
    width: 70px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
  }
`;
export default Detail;
