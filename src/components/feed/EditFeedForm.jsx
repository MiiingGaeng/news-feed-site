import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { fetchData } from "../../api/fetchData";
import { useNavigate } from "react-router-dom";
import { insertOrUpdateData } from "../../api/insertOrUpdateData";
import {
  StForm,
  StFormContentsInput,
  StFormContentsWrapper,
  StFormTitleInput,
  StFormTitleWrapper
} from "../../styles/styledComponents";
import Button from "../common/Button";
import BANNED_WORDS from "../../constant/bannedWords";

const EditFeedForm = ({ feedId }) => {
  //-----Context-----
  const { userId } = useContext(AuthContext);

  //수정 완료시 Detail로 이동 로직
  const navigate = useNavigate();

  //react-hook-form을 사용하여 폼 데이터 관리
  const INITIAL_EDIT_FEED_DATA = {
    title: "",
    contents: ""
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: INITIAL_EDIT_FEED_DATA
  });

  //금칙어 필터링을 위한 boolean 값
  const checkBannedWords = (text) => {
    return BANNED_WORDS.every((word) => !text.includes(word));
  };

  //-----data fetch-----
  useEffect(() => {
    async function fetchFeeds() {
      try {
        const feed = await fetchData("feeds", "users");
        //해당 게시글 정보만 가져오기
        const post = feed.find((post) => post.feed_id === feedId);

        if (post) {
          setValue("title", post.title);
          setValue("contents", post.contents);
        }
      } catch (error) {
        console.log("fetching error => ", error);
      }
    }

    fetchFeeds();
  }, []);

  //게시글 수정 함수
  const handleEditFeedSubmit = async (data) => {
    //예외처리: 금칙어
    if (!checkBannedWords(data.title)) {
      alert("제목에 금칙어가 포함되어 있습니다.");
      return;
    }
    if (!checkBannedWords(data.contents)) {
      alert("본문에 금칙어가 포함되어 있습니다.");
      return;
    }

    const editedFeed = {
      feed_id: feedId,
      title: data.title,
      contents: data.contents,
      writer_id: userId
    };

    try {
      //사용자 확인 요청
      const isConfirm = window.confirm("수정하시겠습니까?");
      if (isConfirm) {
        //supabase 데이터 업데이트
        await insertOrUpdateData(editedFeed, "feeds", "feed_id");
        //사용자 알림
        alert("글이 수정되었습니다!");
        //Detail 페이지로 이동
        navigate(`/detail?feed_id=${feedId}`);
      }
    } catch (error) {
      console.log("edit feed error => ", error);
      //사용자 알림
      alert("앗! 글을 수정하는데 문제가 발생했습니다🥲 다시 시도해주세요!");
    }
  };

  return (
    <StForm onSubmit={handleSubmit(handleEditFeedSubmit)}>
      {/* 타이틀 인풋 영역 */}
      <StFormTitleWrapper>
        <h1>Title</h1>
        <StFormTitleInput
          type="text"
          maxLength="50"
          // onChange={handleEditTitleChange}
          {...register("title", {
            required: true,
            minLength: {
              value: 6,
              message: "※ 제목은 최소 6자 이상이어야 합니다"
            },
            maxLength: {
              value: 50,
              message: "※ 제목은 최대 50자를 초과할 수 없습니다"
            },
            setValueAs: (value) => value.trim()
          })}
        />
        {errors.title && (
          <p>
            {errors.title.type === "required" && "※ 제목은 필수입니다."}
            {errors.title.type === "minLength" &&
              "※ 제목은 최소 6자 이상이어야 합니다"}
            {errors.title.type === "maxLength" &&
              "※ 제목은 최대 50자를 초과할 수 없습니다"}
          </p>
        )}
      </StFormTitleWrapper>
      {/* 본문 인풋 영역 */}
      <StFormContentsWrapper>
        <h1>Contents</h1>
        <StFormContentsInput
          type="text"
          maxLength="500"
          // onChange={handleEditContentChange}
          {...register("contents", {
            required: true,
            minLength: {
              value: 6,
              message: "※ 본문은 최소 6자 이상이어야 합니다"
            },
            maxLength: {
              value: 500,
              message: "※ 내용은 500자를 초과할 수 없습니다"
            },
            setValueAs: (value) => value.trim()
          })}
        />
        {errors.contents && (
          <p>
            {errors.contents.type === "required" && "※ 본문은 필수입니다."}
            {errors.contents.type === "minLength" &&
              "※ 본문은 최소 6자 이상이어야 합니다"}
            {errors.contents.type === "maxLength" &&
              "※ 본문은 최대 500자를 초과할 수 없습니다"}
          </p>
        )}
      </StFormContentsWrapper>
      {/* SUBMIT 버튼 영역 */}
      <Button type="submit">SUBMIT</Button>
    </StForm>
  );
};

export default EditFeedForm;
