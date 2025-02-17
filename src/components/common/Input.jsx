import React from "react";
import styled from "styled-components";
const Input = ({ value, text, width, type, placeholder, onChangeFunc }) => {
  return (
    <StInputWrapper>
      <StLabel htmlFor={value}>{text}</StLabel>
      <StCommentInput
        width={width}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeFunc}
        required
      />
    </StInputWrapper>
  );
};
const StInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  left: -5px;
  margin-bottom: 10px;
`;

const StLabel = styled.label`
  width: ${(props) => (props.$buttonWidth ? props.$buttonWidth : "50px")};
  height: ${(props) => (props.$buttonHeight ? props.$buttonHeight : "30px")};
  background: #4f4ba1a6;
  color: #f7f6ff;
  border: none;
  border-radius: 15px;
  font-size: 13px;
  transition: all 0.3s;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const StCommentInput = styled.input`
  // styles폴더에 styledComponents.js로 관리해야할것같음
  width: ${(props) => props.width || "150px"};
  height: 30px;
  border-radius: 30px;
  border: 1px solid #504ba1;
  font-size: 12px;
  padding: 0 20px;
`;
export default Input;
