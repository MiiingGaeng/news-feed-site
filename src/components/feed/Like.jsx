import { useContext, useEffect, useState } from "react"
import styled from "styled-components";
import supabase from "../../supabase/client";
import { fetchData } from "../../api/fetchData";
import { AuthContext } from "../../contexts/AuthContext";

const Like = ({ feedId }) => {

  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);


  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchLikeStatus();
    }

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





  return (
    <StLikeButton>
      {liked ? "❤️" : "🤍"}
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