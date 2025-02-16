import { Link } from "react-router-dom";
import FeedCard from "./FeedCard";
import styled from "styled-components";

const FeedList = ({ posts, setPosts }) => {
  return (
    <StFeedList>
      {posts.map((post) => {
        return (
          <Link to={`/detail?id=${post.feed_id}`} key={post.feed_id}>
            <FeedCard post={post} setPosts={setPosts} />
          </Link>
        );
      })}
    </StFeedList>
  );
};

const StFeedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  flex:1;
`;

export default FeedList;
