import { useContext } from "react";
import { SlPlus } from "react-icons/sl";
import styled from "styled-components";
import { FeedContext } from "../../contexts/FeedContext";

const FeedAddButton = () => {
  const { toggleModal } = useContext(FeedContext);
  return (
    <StTransparentButton onClick={toggleModal}>
      <SlPlus size={50} />
    </StTransparentButton>
  );
};

export default FeedAddButton;

const StTransparentButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    *{
      color: #FFF;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  *{
    color: #FFFFFF80;
  }
`;
