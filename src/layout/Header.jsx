import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열고 닫는 상태

  const toggleMenu = () => setIsMenuOpen(prevState => !prevState); // 메뉴 토글 함수

  return (
    <StHeader>
      <StNav>
        <StLogo to="/">KEI👂</StLogo>
        <StMenuToggle onClick={toggleMenu}>
          {isMenuOpen ? "X" : "☰"}
        </StMenuToggle>
        <StNavLink $isOpen={isMenuOpen}>
          <StSubLink to="/signup" $isJoin>
            Join
          </StSubLink>
          <StSubLink to="/login">
            Login
          </StSubLink>
        </StNavLink>
      </StNav>
    </StHeader>
  );
};

const StHeader = styled.header`
  width: 100%;
  height: 61px;
  background: #F7F6FF;
  color: #343434;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 100;
  position: sticky;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
    padding: 1rem 0;
  }
`;

// Header 내부 영역
const StNav = styled.nav`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    padding: 0 2rem;
  }
  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

// Header 로고 영역
const StLogo = styled(Link)`
  font-size: 40px;
  font-weight: 800;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #343434;
  padding: 0 1.2rem;
`;

// Header Sub Menu 영역
const StNavLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    width: 100%;
    background-color: #F7F6FF;
    padding: 1rem 0;
    position: absolute;
    top: 100%;
    left: 0;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-100%)")};
  }

  @media (min-width: 769px) {
    display: flex;
    position: static;
    transform: none;
  }
`;

// Header Sub Menu Item
const StSubLink = styled(Link)`
  text-decoration: none;
  color: ${({ $isJoin }) => ($isJoin ? "#504BA1" : "#343434")};
  font-size: 23px;
  font-weight: 400;
  padding: 0.25rem 1.2rem;
  display: flex;
  align-items: center;
  border-radius: 50px;

  @media (max-width: 768px) {
    font-size: 20px;
    width: 100%;          
    box-sizing: border-box;
    justify-content: center;
    border-radius: 0;
  }

  &:hover {
    color: white;
    background-color: #504ba1;
  }
`;

// Header Mobile Sub Menu - Hamburger Menu
const StMenuToggle = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;

  @media (max-width: 768px) {
    display: block;
    font-size: 36px;
  }
`;

export default Header;
