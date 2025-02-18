import { createClient } from "@supabase/supabase-js";
import { createContext, useState } from "react";

export const FeedContext = createContext();

const FeedProvider = ({ children }) => {
  // 게시글 추가 모달 핸들링
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((state) => !state);

  //테이블별 데이터 불러오기
  //table : feeds, comments, likes, users

  //게시글/댓글 추가 함수

  //게시글/댓글 삭제 함수

  //게시글/댓글 수정 함수

  //좋아요 추가 함수

  //좋아요 취소 함수

  return (
    <FeedContext.Provider value={{ isModalOpen, toggleModal }}>
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
