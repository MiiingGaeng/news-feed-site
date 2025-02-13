import styled from 'styled-components';

const Button = ({ type, children, onClick, $buttonWidth, $buttonHeight }) => {
  return (
    <StButton
      type={type}
      onClick={onClick}
      $buttonWidth={$buttonWidth}
      $buttonHeight={$buttonHeight}
    >
      {children}
    </StButton>
  );
};

//-----styled-components-----
const StButton = styled.button`
  width: ${(props) => (props.$buttonWidth ? props.$buttonWidth : '120px')};
  height: ${(props) => (props.$buttonHeight ? props.$buttonHeight : '30px')};
  background: #4f4ba1a6;
  color: #f7f6ff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #504ba1;
  }
`;

export default Button;
