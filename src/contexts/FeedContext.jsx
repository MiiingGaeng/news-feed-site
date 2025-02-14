import { createContext } from "react";

export const FeedContext = createContext();

const FeedProvider = ({ children }) => {
  //테이블별 데이터 불러오기
  //table : feeds, comments, likes, users

  //게시글/댓글 추가 함수

  //게시글/댓글 삭제 함수

  //게시글/댓글 수정 함수

  //좋아요 추가 함수

  //좋아요 취소 함수

  return <FeedContext.Provider value={{}}>{children}</FeedContext.Provider>;
};

export default FeedProvider;
