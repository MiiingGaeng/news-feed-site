import styled from "styled-components";

const CloseButton = ({ onClick }) => {
  return (
    <StCloseButton type="button" onClick={onClick}>
      X
    </StCloseButton>
  );
};

const StCloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background: none;
  border: none;
  font-size: 25px;
  color: #4f4ba1a6;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    color: #504ba1;
  }
`;

export default CloseButton;
