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
  //state
  //input value
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //추가 함수
  const handleAddComment = async (e) => {
    e.preventDefault();

    //예외처리: 빈칸의 경우 return
    if (!inputValue.trim()) {
      alert("댓글을 입력해주세요!");
      return;
    }

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
      //input 초기화
      setInputValue("");
      //사용자 알림
      alert("댓글이 추가 되었습니다!");

      //댓글 목록을 새롭게 fetch해서 즉시 반영하기
      const commentsData = await fetchData("comments", "users");
      const newCommentsData = commentsData.filter(
        (comment) => comment.feed_id === feedId
      );
      setCommentsData(newCommentsData);
    } catch (error) {
      console.log("add comment error => ", error);
      //사용자 알림
      alert("앗! 댓글을 추가하는데 문제가 발생했습니다🥲 다시 시도해주세요!");
    }
  };

  //-----댓글 수정 기능-----
  //state
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  //수정 함수
  //Edit Button 클릭 이벤트 핸들러
  // : Edit 버튼 클릭시 해당 댓글의 id값이 넘어가고, 내용이 input 안에 담기는 로직
  const handleEditButtonClick = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditInputValue(comment.comment);
  };

  //Edit input 체인지 이벤트 핸들러
  const handleEditValueChange = (e) => {
    setEditInputValue(e.target.value);
  };

  //수정 함수
  const handleEditComment = async (comment_id) => {
    //예외처리: 빈칸의 경우 return
    if (!editInputValue.trim()) {
      alert("수정된 내용을 입력해주세요!");
      return;
    }

    const editedComment = {
      comment_id,
      comment: editInputValue,
      feed_id: feedId,
      //writer_id는 임시 데이터값입니다!!
      writer_id: "1d4b5722-6a09-4256-9b9d-461903075838",
    };

    try {
      //supabase 데이터 업데이트
      await insertOrUpdateData(editedComment, "comments", "comment_id");
      //사용자 알림
      alert("댓글이 수정되었습니다!");
      //선택 초기화
      setEditingCommentId(null);

      //댓글 목록을 새롭게 fetch해서 즉시 반영하기
      const commentsData = await fetchData("comments", "users");
      const newCommentsData = commentsData.filter(
        (comment) => comment.feed_id === feedId
      );
      setCommentsData(newCommentsData);
    } catch (error) {
      console.log("edit comment error => ", error);
      //사용자 알림
      alert("앗! 댓글을 수정하는데 문제가 발생했습니다🥲 다시 시도해주세요!");
    }
  };

  //-----댓글 삭제 기능-----
  //삭제 함수
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
      //사용자 알림
      alert("앗! 댓글을 삭제하는데 문제가 발생했습니다🥲 다시 시도해주세요!");
    }
  };

  return (
    <>
      <StDetailCommentsWrapper>
        <h1>Comments</h1>
        {commentsData.length === 0 ? (
          <StDetailNoCommentsText>
            아직 댓글이 없습니다 🥲
          </StDetailNoCommentsText>
        ) : (
          commentsData.map((comment) => {
            return (
              <StDetailComment key={comment.comment_id}>
                <img src={comment.users.profile_img} alt="user_profile_img" />
                <h3>{comment.users.nickname}</h3>
                {editingCommentId === comment.comment_id ? (
                  <input
                    type="text"
                    value={editInputValue}
                    onChange={handleEditValueChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleEditComment(comment.comment_id);
                    }}
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}

                <StCommentButtonWrapper>
                  {editingCommentId === comment.comment_id ? (
                    <Button
                      onClick={() => handleEditComment(comment.comment_id)}
                    >
                      SAVE
                    </Button>
                  ) : (
                    <Button onClick={() => handleEditButtonClick(comment)}>
                      EDIT
                    </Button>
                  )}
                  <Button
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  >
                    DELETE
                  </Button>
                </StCommentButtonWrapper>
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

//댓글 없음 안내 텍스트
const StDetailNoCommentsText = styled.p`
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 15px;
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
    padding: 10px;
  }
`;

const StCommentButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
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
