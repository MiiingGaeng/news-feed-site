import { useState } from "react";
import FeedList from "../components/feed/FeedList";
import MOCK_DATA from "../constants/MOCK_DATA";

const Feed = () => {

  const [posts, setPosts] = useState(MOCK_DATA);
  return (
    <>
      <FeedList posts={posts} />
    </>

  );
};

export default Feed;
