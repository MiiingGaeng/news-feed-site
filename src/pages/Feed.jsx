import { useEffect, useState, useContext } from "react";
import FeedList from "../components/feed/FeedList";
import { fetchData } from "../api/fetchData";
import { FeedContext } from "../contexts/FeedContext";
import FeedForm from "../components/feed/FeedForm";
import Modal from "../components/feed/Modal.jsx";
import StickyMenu from "../layout/StickyMenu.jsx";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";
import supabase from "../supabase/client.js";

const Feed = () => {
  const [feedsData, setFeedsData] = useState([]);
  const { toggleModal, isModalOpen } = useContext(FeedContext);
  const { isLogin, setIsLogin } = useContext(AuthContext);

  useEffect(() => {
    async function fetchFeeds() {
      const newFeedsData = await fetchData("feeds", "users");
      setFeedsData(newFeedsData);
    }
    fetchFeeds();
  }, []);

  const handleLogin = () => {
    Navigate("/login");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLogin(false);
  };

  return (
    <>
      <StickyMenu />
      <FeedList posts={feedsData} setPosts={setFeedsData} />

      {/* 로그인 버튼 조건부 렌더링 테스트용 */}
      {isLogin ? (
        <button onClick={handleLogout}>🫥Log Out</button>
      ) : (
        <button onClick={handleLogin}>😀Log in</button>
      )}
      {isModalOpen && <Modal onShowModal={toggleModal}><FeedForm /></Modal>}
      {isModalOpen && (
        <Modal onShowModal={toggleModal}>
          <FeedForm isMode="addFeedMode" />
        </Modal>
      )}
    </>
  );
};

export default Feed;