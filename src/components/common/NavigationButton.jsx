import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavigationButton = ({ children, to }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to); // 버튼 클릭 시 'to'로 이동
  };
  return (
    <StNavigationButton onClick={handleClick}>{children}</StNavigationButton>
  );
};

const StNavigationButton = styled.button`
  line-height: 46px;
  min-width: 150px;
  background-color: #fff;
  border-radius: 50px;
  color: #000;
  text-align: center;
  align-items: center;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1.25rem;
  padding: 0.25rem 2.5rem;

  &:hover {
    background: #eee;
  }
`;

export default NavigationButton;
