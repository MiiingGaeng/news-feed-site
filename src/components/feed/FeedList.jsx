import { Link } from "react-router-dom"
import FeedCard from "./FeedCard";
import styled from "styled-components";

const FeedList = ({ posts }) => {
  return (
    <StFeedList>
      {posts.map((post) => {
        return (
          <Link to={`/detail`} key={post.id}>
            <FeedCard post={post} />
          </Link>
        );
      })}
    </StFeedList>
  )
}

const StFeedList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

export default FeedList