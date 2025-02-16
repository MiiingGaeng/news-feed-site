import { useEffect, useState } from "react"
import styled from "styled-components";
import supabase from "../../supabase/client";

const Like = ({ feedId, user }) => {

  const [liked, setLiked] = useState(false); // 사용자가 좋아요를 눌렀는지 여부
  const [likeId, setLikeId] = useState(null); // 좋아요 데이터의 like_id
  const [likesCount, setLikesCount] = useState(0); // 좋아요 개수

  useEffect(() => {
    fetchLikeStatus();
    fetchLikesCount();
  }, []);

  // 현재 사용자가 좋아요를 눌렀는지 확인 (user 없이 확인)
  const fetchLikeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("like_id")
        .eq("feed_id", feedId)
        .maybeSingle(); // 하나만 가져옴

      if (error) throw error;

      if (data) {
        setLiked(true);
        setLikeId(data.like_id);
      }
    } catch (error) {
      console.error("좋아요 상태를 가져오는 중 오류 발생:", error);
    }
  };

  // 전체 좋아요 개수 가져오기
  const fetchLikesCount = async () => {
    try {
      const { count, error } = await supabase
        .from("likes")
        .select("*", { count: "exact", head: true })
        .eq("feed_id", feedId);

      if (error) throw error;

      setLikesCount(count || 0);
    } catch (error) {
      console.error("좋아요 개수를 가져오는 중 오류 발생:", error);
    }
  };

  // 좋아요 추가 또는 삭제
  const handleToggleLike = async (e) => {
    e.preventDefault();

    try {
      if (liked) {
        // 좋아요 취소
        const { error } = await supabase
          .from("likes")
          .delete()
          .eq("like_id", likeId); // like_id를 이용해 삭제

        if (error) throw error;

        setLiked(false);
        setLikeId(null);
        setLikesCount((prev) => prev - 1);
      } else {
        // 좋아요 추가
        const { data, error } = await supabase
          .from("likes")
          .insert([{ feed_id: feedId }]) // user_id 없이 추가
          .select("like_id")
          .single();

        if (error) throw error;

        setLiked(true);
        setLikeId(data.like_id);
        setLikesCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 추가/삭제 중 오류 발생:", error);
    }
  };
  return (
    <StLikeButton onClick={handleToggleLike}>
      {liked ? "❤️" : "🤍"} {likesCount}
    </StLikeButton>
  )
}

// 좋아요 버튼 styled-components
const StLikeButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ff4500;
  }
`

export default Like