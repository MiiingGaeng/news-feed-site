import styled from "styled-components";
import Button from "../../common/Button";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../api/fetchData.js";
import { insertOrUpdateData } from "../../api/insertOrUpdateData.js";
import { deleteData } from "../../api/deleteData.js";

const Comments = ({ feedId }) => {
  //-----data fetch-----
  const [commentsData, setCommentsData] = useState([]);

  //-----init-----
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

  //-----댓글 추가 기능-----
  //input값
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //추가 함수
  const handleAddComment = async (e) => {
    e.preventDefault();
    //새로운 댓글 객체 생성
    const newComment = {
      comment: inputValue,
      feed_id: feedId,
      //writer_id는 임시 데이터값입니다!!
      writer_id: "1d4b5722-6a09-4256-9b9d-461903075838",
    };

    try {
      //supabase에 추가
      await insertOrUpdateData(newComment, "comments");
      alert("댓글이 추가 되었습니다!");
      //input 초기화
      setInputValue("");

      //댓글 목록을 새롭게 fetch해서 즉시 반영하기
      const comments = await fetchData("comments", "users");
      const newComments = comments.filter(
        (comment) => comment.feed_id === feedId
      );
      setCommentsData(newComments);
    } catch (error) {
      console.log("add comment error => ", error);
    }
  };

  //-----댓글 삭제 기능-----
  const handleDeleteComment = async (comment_id) => {
    try {
      //supabase에 삭제
      await deleteData("comments", "comment_id", comment_id);
      alert("댓글이 삭제 되었습니다!");

      //댓글 목록을 새롭게 fetch해서 즉시 반영하기
      const comments = await fetchData("comments", "users");
      const newComments = comments.filter(
        (comment) => comment.feed_id === feedId
      );
      setCommentsData(newComments);
    } catch (error) {
      console.log("delete comment error => ", error);
    }
  };

  return (
    <>
      <StDetailCommentsWrapper>
        <h1>Comments</h1>
        {commentsData.length === 0 ? (
          <p>아직 댓글이 없습니다</p>
        ) : (
          commentsData.map((comment) => {
            return (
              <StDetailComment key={comment.comment_id}>
                <img src={comment.users.profile_img} alt="user_profile_img" />
                <h3>{comment.users.nickname}</h3>
                <p>{comment.comment}</p>
                <Button onClick={() => handleDeleteComment(comment.comment_id)}>
                  DELETE
                </Button>
              </StDetailComment>
            );
          })
        )}
      </StDetailCommentsWrapper>

      <StCommentForm onSubmit={handleAddComment}>
        <StCommentInput
          type="text"
          placeholder="댓글을 작성해주세요"
          value={inputValue}
          onChange={handleInputChange}
        />
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
