import styled from "styled-components";
import FeedAddButton from "../components/feed/FeedAddButton";
import { FaHome, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const StickyMenu = () => {
  // Login 여부 호출
  const { isLogin } = useContext(AuthContext);

  return (
    <StStickyMenu>
      <div className="sticky-menu-wrapper">
        <StStickyMenuItems>
          <StIconWrapper to={"/"}>
            <FaHome size={40} />
          </StIconWrapper>
          <StIconWrapper to={isLogin ? "/mypage" : "/login"}>
            <FaUserCircle size={40} />
          </StIconWrapper>
        </StStickyMenuItems>
        {/* login 시에만 feed 추가 가능 */}
        {isLogin && <FeedAddButton />}
      </div>
    </StStickyMenu>
  );
};

export default StickyMenu;

const StStickyMenu = styled.div`
  position: relative;
  display: flex;
  width: 66px;
  flex-direction: column;
  gap: 1rem;
  margin: 0 2rem;
  z-index: 50;

  .sticky-menu-wrapper {
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-direction: column;
  }
`;

const StStickyMenuItems = styled.nav`
  background-color: #ffffff80;
  border-radius: 50px;
  border: none;
  padding: 2rem 0.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;

const StIconWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  color: #f0f0f0;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #fff;
    border-color: #fff;
  }
`;
