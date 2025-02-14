import styled from "styled-components";
import FeedForm from "../components/feed/FeedForm";
import CloseButton from "../components/feed/CloseButton";

const FeedEdit = () => {
  return (
    <StEditBox>
      <CloseButton></CloseButton>
      <FeedForm />
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
