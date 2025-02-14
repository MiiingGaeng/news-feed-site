import { useContext, useState } from "react";
import FeedList from "../components/feed/FeedList";
import MOCK_DATA from "../constants/MOCK_DATA";
import Modal from "../components/common/Modal";
import { FeedContext } from "../contexts/FeedContext";
import FeedForm from "../components/feed/FeedForm";

const Feed = () => {
  const [posts, setPosts] = useState(MOCK_DATA);
  const {toggleModal, isModalOpen} = useContext(FeedContext);
  return (
    <>
      <FeedList posts={posts} />
      {/* <button onClick={toggleModal}>모달창 열기</button> */}
      { isModalOpen && <Modal onShowModal={toggleModal}><FeedForm isMode="addFeedMode"/></Modal>}
    </>

  );
};

export default Feed;
