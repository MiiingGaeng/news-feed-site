import styled from "styled-components";
import Button from "../../common/Button";
import { useContext, useEffect, useState } from "react";
import { insertOrUpdateData } from "../../api/insertOrUpdateData";
import { FeedContext } from "../../contexts/FeedContext";

const INITIAL_ADD_FEED_DATA = {
  title: "",
  contents: "",
};

// Feed 추가 Form 별도 분리
const AddFeedForm = ({ addFeedData, handleInputChange, handleAddFeed }) => (
  <form>
    {/* 타이틀 인풋 영역 */}
    <StFormTitleWrapper>
      <h3>Title</h3>
      <StFormTitleInput
        type="text"
        value={addFeedData.title}
        onChange={(e) => handleInputChange(e, "title")}
      />
    </StFormTitleWrapper>
    {/* 본문 인풋 영역 */}
    <StFormContentsWrapper>
      <h3>Contents</h3>
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

const FeedForm = ({ isMode }) => {
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
        <StForm>
          {/* 타이틀 인풋 영역 */}
          <StFormTitleWrapper>
            <h1>Title</h1>
            <StFormTitleInput type="text" />
          </StFormTitleWrapper>
          {/* 본문 인풋 영역 */}
          <StFormContentsWrapper>
            <h1>Contents</h1>
            <StFormContentsInput type="text" />
          </StFormContentsWrapper>
          {/* SUBMIT 버튼 영역 */}
          <Button>SUBMIT</Button>
        </StForm>
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

  h3 {
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

  h3 {
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
