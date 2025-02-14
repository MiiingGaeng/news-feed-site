import styled from "styled-components";
import Button from "../common/Button";
import CloseButton from "../components/feed/CloseButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchData } from "../api/fetchData";
import { useState } from "react";

const Detail = () => {
  //-----url에서 게시글 id 추출-----
  //query param으로 feed_id 값 가져오기
  const [searchParams] = useSearchParams();
  const feedId = searchParams.get("id");

  //-----data fetch-----
  //feeds, comments 테이블 Data 가져오기
  const [feedsData, setFeedsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

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
        <Button type="type">EDIT</Button>
      </StDetailUserContentsWrapper>

      <StDetailCommentsWrapper>
        <h1>Comments</h1>
        {/* map돌려서 넣기 */}
        {/* 예시 */}
        <StDetailComment>
          <img src="/" alt="user_profile_img" />
          <h3>user</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            labore nostrum corporis commodi laudantium vero quasi omnis enim
            saepe, nobis voluptate beatae quidem ipsa nulla atque sequi,
            aspernatur facere delectus.
          </p>
          <Button type="button">EDIT</Button>
        </StDetailComment>
        <StDetailComment>
          <img src="/" alt="user_profile_img" />
          <h3>sample456</h3>
          <p>Loremslkdjflsdlkfjsdlfjsldksj</p>
        </StDetailComment>
      </StDetailCommentsWrapper>

      <StCommentForm>
        <StCommentInput type="text" placeholder="댓글을 작성해주세요" />
        <Button type="submit">SUBMIT</Button>
      </StCommentForm>
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

//댓글 영역
const StDetailCommentsWrapper = styled.ul`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid #504ba1;

  h1 {
    font-size: 20px;
    padding: 0 5px;
    margin: 20px 0;
  }
`;

const StDetailComment = styled.li`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
    margin-right: 10px;
  }

  h3 {
    width: auto;
    font-size: 17px;
    margin-right: 20px;
  }

  p {
    width: 100%;
    font-size: 12px;
  }
`;

//댓글 입력 영역
const StCommentForm = styled.form`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StCommentInput = styled.input`
  width: 500px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #504ba1;
  font-size: 12px;
  padding: 0 20px;
`;

export default Detail;
