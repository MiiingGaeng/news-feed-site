import styled from "styled-components";
import Button from "../../common/Button";

const FeedForm = () => {
  return (
    <form>
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
    </form>
  );
};

//-----styled-components-----
//타이틀 인풋 영역
const StFormTitleWrapper = styled.div`
  width: 80%;
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
  border: 1px solid #504ba1;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 15px;
  line-height: 30px;
  margin-left: 5px;
`;

//본문 인풋 영역
const StFormContentsWrapper = styled.div`
  width: 80%;
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
  border: 1px solid #504ba1;
  border-radius: 20px;
  padding: 20px;
  font-size: 12px;
  line-height: 30px;
  margin-left: 5px;
  overflow-wrap: break-word;
`;

export default FeedForm;
