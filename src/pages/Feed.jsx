import { useEffect, useState } from "react";
import FeedList from "../components/feed/FeedList";
import { fetchData } from "../api/fetchData";

const Feed = () => {
  const [feedsData, setFeedsData] = useState([]);

  useEffect(() => {
    async function fetchFeeds() {
      const newFeedsData = await fetchData("feeds", "users");
      setFeedsData(newFeedsData);
    }

    fetchFeeds();
  }, []);

  console.log("feedsData", feedsData);

  return <>{feedsData.length && <FeedList posts={feedsData} />}</>;
};

export default Feed;
