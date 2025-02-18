import React from "react";
import styled from "styled-components";

const UserInput = ({ name, type, placeholder, value, onChange, ...props }) => {
  return (
    <StInput
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      {...props}
    />
  );
};

export default UserInput;

// styled-components
const StInput = styled.input`
  width: 280px;
  height: 40px;
  border: none;
  border-radius: 20px;
  padding-left: 15px;
`;
