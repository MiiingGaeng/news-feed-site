import { Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  min-height: calc(100vh - 61px - 150px);
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  animation: ${fadeIn} 0.5s ease-out;
`;

const StContent = styled.div`
  width: 100%;
`;

const Layout = () => {
  return (
    <>
      <Header>Header</Header>
      <StMain>
        <StContent>
          <Outlet />
        </StContent>
      </StMain>
      <Footer/>
    </>
  );
};

export default Layout;
