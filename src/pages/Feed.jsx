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

  return (
    <>
      <StickyMenu />
      <FeedList posts={feedsData} setPosts={setFeedsData} />

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