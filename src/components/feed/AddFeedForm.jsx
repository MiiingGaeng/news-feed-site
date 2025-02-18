import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FeedContext } from "../../contexts/FeedContext";
import { useForm } from "react-hook-form";
import { insertOrUpdateData } from "../../api/insertOrUpdateData";
import {
  StFormContentsInput,
  StFormContentsWrapper,
  StFormTitleInput,
  StFormTitleWrapper,
} from "../../styles/styledComponents";
import Button from "../common/Button";
import BANNED_WORDS from "../../constant/BANNED_WORDS";
import { AlertError, AlertSuccess } from "../../common/Alert";

// 초기 피드 데이터를 정의 (title과 contents는 빈 문자열로 설정)
const INITIAL_ADD_FEED_DATA = {
  title: "",
  contents: "",
};

const AddFeedForm = ({ onAddFeed }) => {
  //-----Context-----
  // FeedContext에서 toggleModal 함수를 가져옴 (모달을 열거나 닫을 때 사용)
  const { toggleModal } = useContext(FeedContext);
  // userId
  const { userId } = useContext(AuthContext);

  // react-hook-form을 사용하여 폼 데이터 관리
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_ADD_FEED_DATA,
  });

  // 금칙어 필터링
  const checkBannedWords = (text) => {
    return BANNED_WORDS.every((word) => !text.includes(word));
  };

  // 실제 테이블에 feed 데이터 추가하는 함수
  const handleAddFeed = async (data) => {
    if (!data) return;
    if (!checkBannedWords(data.title)) {
      return AlertError(
        "금칙어가 포함되어 있습니다",
        "쾌적한 커뮤니티를 위해 나쁜말은 삼가해주세요!",
      );
    }
    if (!checkBannedWords(data.contents)) {
      return AlertError(
        "금칙어가 포함되어 있습니다",
        "쾌적한 커뮤니티를 위해 나쁜말은 삼가해주세요!",
      );
    }
    // feed 데이터를 확장 (writer_id 추가)
    const feedData = {
      ...data,
      writer_id: userId,
    };

    // 데이터 삽입 또는 업데이트 함수 호출
    await insertOrUpdateData(feedData, "feeds");
    // 모달 닫기
    toggleModal();

    // 데이터 리스트 조회
    await onAddFeed();

    // 피드 추가 메시지
    return AlertSuccess("새로운 게시글이 추가되었습니다.");
  };

  return (
    <form onSubmit={handleSubmit(handleAddFeed)}>
      {/* 타이틀 인풋 영역 */}
      <StFormTitleWrapper>
        <h3>Title</h3>
        <StFormTitleInput
          type="text"
          placeholder="제목은 최소 6자, 최대 50자를 사용하실 수 있습니다"
          maxLength="50"
          // react-hook-form의 register를 통해 폼 값 연결
          {...register("title", {
            required: true,
            minLength: {
              value: 6,
              message: "※ 제목은 최소 6자 이상이어야 합니다",
            },
            maxLength: {
              value: 50,
              message: "※ 제목은 최대 50자를 초과할 수 없습니다",
            },
            setValueAs: (value) => value.trim(), // 입력값 양옆 공백 제거
          })}
        />
        {/* 제목 입력시 발생할 수 있는 에러 메시지 */}
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
        <h3>Contents</h3>
        <StFormContentsInput
          type="text"
          placeholder="내용은 최소 6자, 최대 500자를 사용하실 수 있습니다."
          maxLength="500"
          // react-hook-form의 register를 통해 폼 값 연결
          {...register("contents", {
            required: true,
            minLength: {
              value: 6,
              message: "※ 내용은 최소 6자 이상이어야 합니다",
            },
            maxLength: {
              value: 500,
              message: "※ 내용은 500자를 초과할 수 없습니다",
            },
            setValueAs: (value) => value.trim(), // 입력값 양옆 공백 제거
          })}
        />
        {/* 내용 입력시 발생할 수 있는 에러 메시지 */}
        {errors.contents && (
          <p>
            {errors.contents.type === "required" && "※ 내용은 필수입니다."}
            {errors.contents.type === "minLength" &&
              "※ 내용은 최소 6자 이상이어야 합니다"}
            {errors.contents.type === "maxLength" &&
              "※ 내용은 최대 500자를 초과할 수 없습니다"}
          </p>
        )}
      </StFormContentsWrapper>
      {/* SUBMIT 버튼 영역 */}
      <Button type="submit">UPLOAD</Button>
    </form>
  );
};

export default AddFeedForm;
