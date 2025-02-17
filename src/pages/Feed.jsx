import { useEffect, useState, useContext } from "react";
import FeedList from "../components/feed/FeedList";
import { fetchData } from "../api/fetchData";
import { FeedContext } from "../contexts/FeedContext";
import Modal from "../components/feed/Modal.jsx";
import StickyMenu from "../layout/StickyMenu.jsx";
import AddFeedForm from "../components/feed/AddFeedForm.jsx";

const Feed = () => {
  const [feedsData, setFeedsData] = useState([]);
  const { toggleModal, isModalOpen } = useContext(FeedContext);

  async function fetchFeeds() {
    const newFeedsData = await fetchData("feeds", "users");
    setFeedsData(newFeedsData);
  }

  useEffect(() => {
    fetchFeeds();
  }, []);

  const onHandleAddFeed = () => {
    fetchFeeds();
  };

  return (
    <>
      <StickyMenu />
      <FeedList posts={feedsData} setPosts={setFeedsData} />
      {isModalOpen && <Modal onShowModal={toggleModal}><FeedForm /></Modal>}
      {isModalOpen && (
        <Modal onShowModal={toggleModal}>
          <AddFeedForm onAddFeed={onHandleAddFeed} />
        </Modal>
      )}
    </>
  );
};

export default Feed;
