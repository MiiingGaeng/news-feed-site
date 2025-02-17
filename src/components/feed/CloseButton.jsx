import styled from "styled-components";
import { FaXmark } from "react-icons/fa6";

const CloseButton = ({ onClick }) => {
  return (
    <StCloseButton type="button" onClick={onClick}>
      <FaXmark />
    </StCloseButton>
  );
};

const StCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 30px;
  color: #4f4ba1a6;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 50;

  &:hover {
    color: #504ba1;
  }
`;

export default CloseButton;
