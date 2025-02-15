import { useEffect, useState, useContext } from "react";
import FeedList from "../components/feed/FeedList";
import { fetchData } from "../api/fetchData";
import { FeedContext } from "../contexts/FeedContext";
import FeedForm from "../components/feed/FeedForm";
import Modal from "../components/common/Modal.jsx";

const Feed = () => {
  const [feedsData, setFeedsData] = useState([]);
  const { toggleModal, isModalOpen } = useContext(FeedContext);

  useEffect(() => {
    async function fetchFeeds() {
      const newFeedsData = await fetchData("feeds", "users");
      setFeedsData(newFeedsData);
    }

    fetchFeeds();
  }, []);

  return (
    <>
      <FeedList posts={feedsData} />
      {/* <button onClick={toggleModal}>모달창 열기</button> */}
      {isModalOpen && (
        <Modal onShowModal={toggleModal}>
          <FeedForm />
        </Modal>
      )}
    </>
  );
};

export default Feed;