import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Masonry from "react-masonry-css";

const UserFeeds = ({ mySelfFeed }) => {
  const breakpointColumnsObj = {
    default: 2, // 기본 2열 레이아웃
    768: 1, // 768px 이하에서는 1열 레이아웃 (모바일)
  };
  return (
    <>
      <StContentBoxWrapper>
        <StyledMasonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
        >
          {mySelfFeed.map((feed) => (
            <div key={feed.feed_id} className="masonry-grid_item">
              <Link to={`/detail?feed_id=${feed.feed_id}`}>
                <StFeedCard>
                  {" "}
                  <StFeedCardContent>
                    <StTitle>{feed.title}</StTitle>
                    <StContents>{feed.contents}</StContents>
                  </StFeedCardContent>
                </StFeedCard>
              </Link>
            </div>
          ))}
        </StyledMasonry>
      </StContentBoxWrapper>
    </>
  );
};

const StContentBoxWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// Masonry 스타일 적용
const StyledMasonry = styled(Masonry)`
  display: flex;
  width: 100%;
  gap: 30px;

  .masonry-grid_item {
    margin-bottom: 30px; /* 카드 사이 간격 */
  }
`;

// Feed카드
const StFeedCard = styled.li`
  width: 300px;
  max-width: 400px;
  height: 100%;
  max-height: 600px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;
// 게시글 내용 전체 박스
const StFeedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;
// 제목
const StTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-bottom: 8px;
`;

// 본문
const StContents = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  display: block;
`;
export default UserFeeds;
