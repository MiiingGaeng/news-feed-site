import styled from "styled-components";
import Button from "../common/Button.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { fetchData } from "../../api/fetchData.js";
import { insertOrUpdateData } from "../../api/insertOrUpdateData.js";
import { deleteData } from "../../api/deleteData.js";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { useForm } from "react-hook-form";
import BANNED_WORDS from "../../constant/bannedWords.js";
import { AlertCheck, AlertError, AlertSuccess } from "../common/Alert.js";

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

  //Context로 로그인한 유저의 user_id 값 가져오기
  const { userId } = useContext(AuthContext);

  //react-hook-form을 사용하여 폼 데이터 관리
  //react-hook-form : ADD
  const {
    handleSubmit: handleAddSubmit,
    register: registerAdd,
    reset: resetAdd,
    formState: { errors: addErrors }
  } = useForm({
    defaultValues: ""
  });
  //react-hook-form : ADD
  const {
    handleSubmit: handleEditSubmit,
    register: registerEdit,
    setValue: setEditValue
  } = useForm({
    defaultValues: ""
  });

  //금칙어 필터링
  const checkBannedWords = (text) => {
    return BANNED_WORDS.every((word) => !text.includes(word));
  };

  //-----댓글 추가 기능-----
  //추가 함수
  const handleAddComment = async (data) => {
    if (!data) return;

    //예외처리: 금칙어 사용시 return
    if (!checkBannedWords(data.comment)) {
      return AlertError(
        "금칙어가 포함되어 있습니다",
        "쾌적한 커뮤니티를 위해 나쁜말은 삼가해주세요!"
      );
    }

    //새로운 댓글 객체 생성
    const newComment = {
      ...data,
      feed_id: feedId,
      writer_id: userId
    };

    try {
      //supabase에 추가
      await insertOrUpdateData(newComment, "comments");
      //사용자 알림
      AlertSuccess("추가 완료", "댓글이 추가 되었습니다!");
      //input창 비워주기
      resetAdd();

      //댓글 목록을 새롭게 fetch해서 즉시 반영하기
      const commentsData = await fetchData("comments", "users");
      const newCommentsData = commentsData.filter(
        (comment) => comment.feed_id === feedId
      );
      setCommentsData(newCommentsData);
    } catch (error) {
      console.log("add comment error => ", error);
      //사용자 알림
      AlertError("앗! 문제 발생", "다시 시도해주세요!");
    }
  };

  //-----댓글 수정 기능-----
  //state
  const [editingCommentId, setEditingCommentId] = useState(null);

  //수정 함수
  //Edit Button 클릭 이벤트 핸들러: Edit 버튼 클릭시 해당 댓글의 id값 전달
  const handleEditButtonClick = (comment) => {
    setEditingCommentId(comment.comment_id);
    setEditValue("comment_id", comment.comment_id);
    setEditValue("comment", comment.comment);
  };

  //수정 함수
  const handleEditComment = async (data) => {
    //예외처리: 빈칸의 경우 return
    if (!data) {
      AlertError("빈칸입니다", "수정된 내용을 입력해주세요!");
      return;
    }
    //예외처리: 금칙어 사용시 return
    if (!checkBannedWords(data.comment)) {
      return AlertError(
        "금칙어가 포함되어 있습니다",
        "쾌적한 커뮤니티를 위해 나쁜말은 삼가해주세요!"
      );
    }

    const editedComment = {
      comment_id: data.comment_id,
      comment: data.comment,
      feed_id: feedId,
      writer_id: userId
    };

    try {
      //supabase 데이터 업데이트
      await insertOrUpdateData(editedComment, "comments", "comment_id");
      //사용자 알림
      AlertSuccess("수정 완료", "댓글이 수정 되었습니다!");
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
      AlertError("앗! 문제 발생", "다시 시도해주세요!");
    }
  };

  //-----댓글 삭제 기능-----
  //삭제 함수
  const handleDeleteComment = async (comment_id) => {
    try {
      const isConfirm = await AlertCheck(
        "정말로 삭제하시겠습니까?",
        "이 작업은 되돌릴 수 없습니다!"
      );

      if (isConfirm) {
        //supabase에 삭제
        await deleteData("comments", "comment_id", comment_id);

        //댓글 목록을 새롭게 fetch해서 즉시 반영하기
        const comments = await fetchData("comments", "users");
        const newComments = comments.filter(
          (comment) => comment.feed_id === feedId
        );
        setCommentsData(newComments);
      }
    } catch (error) {
      console.log("delete comment error => ", error);
      //사용자 알림
      alert("앗! 댓글을 삭제하는데 문제가 발생했습니다. 다시 시도해주세요!");
    }
  };

  return (
    <>
      <StDetailCommentsWrapper>
        <h2>Comments</h2>
        {commentsData.length === 0 ? (
          <StDetailNoCommentsText>아직 댓글이 없습니다</StDetailNoCommentsText>
        ) : (
          commentsData.map((comment) => {
            return (
              <StDetailComment key={comment.comment_id}>
                <img src={comment.users.profile_img} alt="user_profile_img" />
                <h3>{comment.users.nickname}</h3>
                {editingCommentId === comment.comment_id ? (
                  <StCommentEditInput
                    type="text"
                    maxLength="200"
                    {...registerEdit("comment", {
                      required: true,
                      maxLength: {
                        value: 200,
                        message: "※ 댓글은 200자를 초과할 수 없습니다"
                      },
                      setValueAs: (value) => value.trim()
                    })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleEditSubmit(handleEditComment);
                    }}
                  />
                ) : (
                  <p>{comment.comment}</p>
                )}

                {comment.writer_id === userId && (
                  <StCommentButtonWrapper>
                    {editingCommentId === comment.comment_id ? (
                      <Button onClick={handleEditSubmit(handleEditComment)}>
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
                )}
              </StDetailComment>
            );
          })
        )}
      </StDetailCommentsWrapper>

      <StCommentForm onSubmit={handleAddSubmit(handleAddComment)}>
        <StCommentInput
          type="text"
          placeholder="댓글을 작성해주세요! 댓글은 최대 200자 작성이 가능합니다."
          maxLength="200"
          //react-hook-form의 register를 통해 폼 값 연결
          {...registerAdd("comment", {
            required: true,
            maxLength: {
              value: 200,
              message: "※ 댓글은 200자를 초과할 수 없습니다"
            },
            setValueAs: (value) => value.trim()
          })}
        />
        {/* 내용 입력시 발생할 수 있는 에러 메시지 */}
        {addErrors.contents && (
          <p>
            {addErrors.comment.type === "required" && "※ 내용은 필수입니다."}
            {addErrors.comment.type === "maxLength" &&
              "※ 내용은 최대 500자를 초과할 수 없습니다"}
          </p>
        )}
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

  //Comments 타이틀
  h2 {
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

//댓글 표시 UI 부분
const StDetailComment = styled.li`
  width: 100%;
  display: flex;
  align-items: center;

  //유저 프로필 이미지
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #ffa600;
    margin-right: 10px;
  }

  //유저 닉네임
  h3 {
    width: 80px;
    font-size: 17px;
    margin-right: 20px;
  }

  //댓글 본문
  p {
    width: 50%;
    font-size: 12px;
    padding: 10px;
    overflow-wrap: break-word;
  }
`;
//댓글 수정 입력창
const StCommentEditInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #504ba1;
  border-radius: 30px;
  font-size: 12px;
  padding: 0 20px;
`;

//EDIT/DELETE 버튼 wrapper
const StCommentButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
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

//댓글 입력창
const StCommentInput = styled.input`
  width: 500px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #504ba1;
  font-size: 12px;
  padding: 0 20px;
`;

export default Comments;
