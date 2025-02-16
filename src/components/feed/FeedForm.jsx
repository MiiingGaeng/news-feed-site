import styled from "styled-components";
import Button from "../../common/Button";
import { useContext, useEffect, useState } from "react";
import { insertOrUpdateData } from "../../api/insertOrUpdateData";
import { FeedContext } from "../../contexts/FeedContext";
import { fetchData } from "../../api/fetchData";
import { useNavigate } from "react-router-dom";

const INITIAL_ADD_FEED_DATA = {
  title: "",
  contents: "",
};

//-----addFeedMode 게시글 추가 컴포넌트------
const AddFeedForm = ({ addFeedData, handleInputChange, handleAddFeed }) => (
  <form>
    {/* 타이틀 인풋 영역 */}
    <StFormTitleWrapper>
      <h1>Title</h1>
      <StFormTitleInput
        type="text"
        value={addFeedData.title}
        onChange={(e) => handleInputChange(e, "title")}
      />
    </StFormTitleWrapper>
    {/* 본문 인풋 영역 */}
    <StFormContentsWrapper>
      <h1>Contents</h1>
      <StFormContentsInput
        type="text"
        value={addFeedData.contents}
        onChange={(e) => handleInputChange(e, "contents")}
      />
    </StFormContentsWrapper>
    {/* SUBMIT 버튼 영역 */}
    <Button type="submit" onClick={(e) => handleAddFeed(e)}>
      글 업로드
    </Button>
  </form>
);

//-----editFeedMode 게시글 수정 컴포넌트-----
const EditFeedForm = ({ feedId }) => {
  //state
  const [editTitle, setEditTitle] = useState("");
  const [editContents, setEditContents] = useState("");

  //-----data fetch-----
  useEffect(() => {
    async function fetchFeeds() {
      try {
        const feed = await fetchData("feeds", "users");
        //해당 게시글 정보만 가져오기
        const post = feed.find((post) => post.feed_id === feedId);

        setEditTitle(post.title);
        setEditContents(post.contents);
      } catch (error) {
        console.log("fetching error => ", error);
      }
    }

    fetchFeeds();
  }, []);

  //수정 완료시 Detail로 이동 로직
  const navigate = useNavigate();

  //Edit input 체인지 이벤트 핸들러
  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditContentChange = (e) => {
    setEditContents(e.target.value);
  };

  //게시글 수정 함수
  const handleEditFeedSubmit = async (e) => {
    e.preventDefault();

    //예외처리: 빈칸의 경우 return
    if (!editTitle.trim() || !editContents.trim()) {
      alert("수정된 내용을 입력해주세요!");
      return;
    }

    const editedFeed = {
      feed_id: feedId,
      title: editTitle,
      contents: editContents,
      //writer_id는 임시 데이터값입니다!!!
      writer_id: "44319787-433a-4f21-b2dc-309ddfc7e21c",
    };

    try {
      //사용자 확인 요청
      const isConfirm = window.confirm("수정하시겠습니까?");
      if (isConfirm) {
        //supabase 데이터 업데이트
        await insertOrUpdateData(editedFeed, "feeds", "feed_id");
        //사용자 알림
        alert("글이 수정되었습니다!");
        //Detail 페이지로 이동
        navigate(`/detail?feed_id=${feedId}`);
      }
    } catch (error) {
      console.log("edit feed error => ", error);
      //사용자 알림
      alert("앗! 글을 수정하는데 문제가 발생했습니다🥲 다시 시도해주세요!");
    }
  };

  return (
    <StForm onSubmit={handleEditFeedSubmit}>
      {/* 타이틀 인풋 영역 */}
      <StFormTitleWrapper>
        <h1>Title</h1>
        <StFormTitleInput
          type="text"
          value={editTitle}
          onChange={handleEditTitleChange}
        />
      </StFormTitleWrapper>
      {/* 본문 인풋 영역 */}
      <StFormContentsWrapper>
        <h1>Contents</h1>
        <StFormContentsInput
          type="text"
          value={editContents}
          onChange={handleEditContentChange}
        />
      </StFormContentsWrapper>
      {/* SUBMIT 버튼 영역 */}
      <Button>SUBMIT</Button>
    </StForm>
  );
};

const FeedForm = ({ isMode, feedId }) => {
  // 추가할 Feed 상태관리
  const [addFeedData, setAddFeedData] = useState(INITIAL_ADD_FEED_DATA);
  const { toggleModal } = useContext(FeedContext);

  useEffect(() => {
    // 글 업로드시 insertOrUpdateData 함수를 실행하여 테이블을 업데이트
    if (addFeedData?.writer_id) {
      insertOrUpdateData(addFeedData, "feeds");
      setAddFeedData(INITIAL_ADD_FEED_DATA);
      toggleModal();
      alert("새로운 피드가 추가되었습니다.");
    }
  }, [addFeedData, toggleModal]);

  // onChange시에 event와 field 객체를 받아, input value 추가
  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setAddFeedData((state) => ({
      ...state,
      [field]: value,
    }));
  };

  // 실제 테이블에 feed 데이터 추가
  const handleAddFeed = async (e) => {
    e.preventDefault();
    setAddFeedData((feed) => ({
      ...feed,
      writer_id: "1d4b5722-6a09-4256-9b9d-461903075838",
    }));
  };

  return (
    <>
      {isMode === "addFeedMode" ? (
        <AddFeedForm
          addFeedData={addFeedData}
          handleInputChange={handleInputChange}
          handleAddFeed={handleAddFeed}
        />
      ) : (
        <EditFeedForm feedId={feedId} />
      )}
    </>
  );
};

//-----styled-components-----
//전체 레이아웃
const StForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//타이틀 인풋 영역
const StFormTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;

  h1 {
    font-size: 20px;
  }
`;

const StFormTitleInput = styled.input`
  width: 90%;
  height: 30px;
  background: #4f4ba164;
  border: none;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 15px;
  line-height: 30px;
  margin-left: 5px;
`;

//본문 인풋 영역
const StFormContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;

  h1 {
    font-size: 20px;
  }
`;

const StFormContentsInput = styled.textarea`
  width: 90%;
  height: 300px;
  background: #4f4ba164;
  border: none;
  border-radius: 20px;
  padding: 20px;
  font-size: 12px;
  line-height: 30px;
  margin-left: 5px;
  overflow-wrap: break-word;
`;

export default FeedForm;
