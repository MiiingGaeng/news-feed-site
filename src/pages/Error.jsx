import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  const navigate = useNavigate();
  return (
    <StErrorContainer>
      <StErrorMessage>404 Not Found</StErrorMessage>
      <StHomeButton onClick={() => navigate("/")}>홈으로 돌아가기</StHomeButton>
    </StErrorContainer>
  );
};

const StErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const StErrorMessage = styled.h2`
  font-size: 2.5rem;
  color: #eee;
  margin: 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const StHomeButton = styled.button`
  padding: 12px 24px;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  background-color: #fff;
  color: #000;
  box-sizing: border-box;
  transition: all 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export default Error;
