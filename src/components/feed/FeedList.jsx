import { Link } from "react-router-dom";
import FeedCard from "./FeedCard";
import styled from "styled-components";
import Masonry from "react-masonry-css";

const FeedList = ({ posts, setPosts }) => {
  const breakpointColumnsObj = {
    default: 2, // 기본 2열 레이아웃
    768: 1, // 768px 이하에서는 1열 레이아웃 (모바일)
  };

  return (
    <StyledMasonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
    >
      {posts.map((post) => (
        <div key={post.feed_id} className="masonry-grid_item">
          <Link to={`/detail?feed_id=${post.feed_id}`}>
            <FeedCard post={post} setPosts={setPosts} />
          </Link>
        </div>
      ))}
    </StyledMasonry>
  );
};

// Masonry 스타일 적용
const StyledMasonry = styled(Masonry)`
  display: flex;
  width: 100%;
  gap: 30px;

  .masonry-grid_item {
    margin-bottom: 30px; /* 카드 사이 간격 */
  }
`;

export default FeedList;
