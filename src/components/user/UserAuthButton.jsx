import React from "react";
import styled from "styled-components";

const UserAuthButton = ({
  type,
  children,
  onClick,
  $buttonWidth,
  $buttonHeight,
}) => {
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

export default UserAuthButton;

//-----styled-components-----
const StButton = styled.button`
  width: ${(props) => (props.$buttonWidth ? props.$buttonWidth : "120px")};
  height: ${(props) => (props.$buttonHeight ? props.$buttonHeight : "30px")};
  background: #504ba1;
  color: #fff;
  border: none;
  font-size: 17px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #343434;
  }
`;
