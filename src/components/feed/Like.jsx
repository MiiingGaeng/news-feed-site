import { useContext, useEffect, useState } from "react"
import styled from "styled-components";
import supabase from "../../supabase/client";
import { fetchData } from "../../api/fetchData";
import { AuthContext } from "../../contexts/AuthContext";

const Like = ({ feedId }) => {

  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [likesCount, setLikesCount] = useState(0);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchLikeStatus();
    }
    fetchLikesCount();
  }, [user]);

  // 사용자가 해당 피드(feed_id)에 좋아요를 눌렀는지 확인
  const fetchLikeStatus = async () => {
    try {
      const data = await fetchData("likes", "users");
      if (!data) return;

      const userLike = data.find(
        (like) => like.feed_id === feedId && like.user_id === user.id
      );

      if (userLike) {
        setLiked(true);
        setLikeId(userLike.like_id);
      }
    } catch (error) {
      console.error("좋아요 상태를 가져오는 중 오류 발생:", error);
    }
  };

  // 피드의 총 좋아요 개수 가져오기
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

    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

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
          .insert([{ feed_id: feedId, user_id: user.id }]) // feed_id 사용
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