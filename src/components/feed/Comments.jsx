import styled from "styled-components";
import Button from "../../common/Button";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../api/fetchData.js";

const Comments = ({ feedId }) => {
  //-----data fetch-----
  const [commentsData, setCommentsData] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const comments = await fetchData("comments", "users");
        //해당 게시글의 댓글만 가져오기
        const newComments = comments.filter(
          (comment) => comment.feed_id === feedId
        );

        setCommentsData(newComments);
      } catch (error) {
        console.log("fetching error => ", error);
      }
    }

    fetchComments();
  }, []);

  return (
    <>
      <StDetailCommentsWrapper>
        <h1>Comments</h1>
        {/* map돌려서 넣기 */}
        {!commentsData ? (
          <p>아직 댓글이 없습니다</p>
        ) : (
          commentsData.map((comment) => {
            return (
              <StDetailComment key={comment.comment_id}>
                <img src={comment.users.profile_img} alt="user_profile_img" />
                <h3>{comment.users.nickname}</h3>
                <p>{comment.comment}</p>
              </StDetailComment>
            );
          })
        )}
      </StDetailCommentsWrapper>

      <StCommentForm>
        <StCommentInput type="text" placeholder="댓글을 작성해주세요" />
        <Button type="submit">SUBMIT</Button>
      </StCommentForm>
    </>
  );
};

//-----styled-components-----
//댓글 영역
const StDetailCommentsWrapper = styled.ul`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid #504ba1;

  h1 {
    font-size: 20px;
    padding: 0 5px;
    margin: 20px 0;
  }
`;

const StDetailComment = styled.li`
  width: 100%;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
    margin-right: 10px;
  }

  h3 {
    width: 10%;
    font-size: 17px;
    margin-right: 20px;
  }

  p {
    width: 70%;
    font-size: 12px;
  }
`;

//댓글 입력 영역
const StCommentForm = styled.form`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StCommentInput = styled.input`
  width: 500px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #504ba1;
  font-size: 12px;
  padding: 0 20px;
`;

export default Comments;
