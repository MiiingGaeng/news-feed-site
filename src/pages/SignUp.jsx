import { useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, Navigate } from "react-router-dom";
import UserInput from "../components/user/UserInput";
import UserAuthButton from "../components/user/UserAuthButton";
import {
  AlertError,
  AlertInfo,
  AlertSorry,
  AlertSuccess
} from "../components/common/Alert";
import supabase from "../supabase/client";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkPassword: "",
    username: "",
    nickname: ""
  });
  // DB 존재 확인 state
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  // state 객체 set handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (name === "nickname") {
      setIsNicknameChecked(false);
    }
  };

  // 닉네임 중복검사
  const handleNicknameCheck = async () => {
    // 닉네임이 비어있는지 확인
    if (!formData.nickname.trim()) {
      alert("닉네임을 입력하세요");
      return false;
    }

    try {
      const { data, error } = await supabase
        .from("users")
        .select("nickname")
        .eq("nickname", formData.nickname)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("결과 없음", error.message);
        alert(`알 수 없는 오류가 발생하였습니다`);
        return false;
      }

      if (data) {
        alert(`동일한 닉네임이 존재합니다`);
        setFormData((prev) => ({ ...prev, nickname: "" }));
        return false;
      } else {
        alert(`사용가능한 닉네임입니다`);
        return true;
      }
    } catch (error) {
      console.error("예기치 못한 에러:", error);
      alert(`알 수 없는 에러가 발생하였습니다`);
    }
  };

  // 회원가입 로직
  const handleSignup = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (formData.password !== formData.checkPassword) {
      // 비밀번호 일치여부 확인
      AlertError("잠깐!", "비밀번호가 일치하지 않습니다.");
      return;
    }

    // supabase를 통해 회원가입
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.username, // name 저장
            nickname: formData.nickname // nickname 저장
          }
        }
      });

      // 회원가입 에러코드별 예외처리
      if (error) {
        switch (error.code) {
          case "email_exists":
            AlertInfo("잠깐!", "이미 존재하는 이메일입니다.");
            return;
          case "user_already_exists":
            AlertInfo("잠깐!", "이미 사용 중인 이메일입니다.");
            return;
          case "weak_password":
            AlertError("경고", "보안에 취약한 비밀번호입니다.");
            return;
          default:
            AlertError("Error", `${error.code}`);
        }
      } else {
        AlertSuccess("회원가입 완료!", "KEI 회원이 되신것을 환영합니다.");
        // 회원가입 후 홈으로 랜딩
        Navigate("/");
      }
    } catch (error) {
      AlertError(`회원가입 중 오류가 발생했습니다. 다시 시도해주세요!
      ${error.massage}`);
      console.log("⛔️회원가입 오류", error);
    }
  };

  return (
    <StSignUpWrapper>
      <h1>SignUp</h1>
      <StContainer>
        {/* 타 SNS 계정으로 로그인 */}
        <StSNSBtn>
          <button onClick={AlertSorry}>
            <FaGithub />
            Sign up with Github
          </button>
          <button onClick={AlertSorry}>
            <FcGoogle />
            Sign up with Google
          </button>
        </StSNSBtn>

        <hr />

        {/* 가입자 정보 입력창 */}
        <form onSubmit={handleSignup}>
          <UserInput
            name="email"
            type="email"
            placeholder="이메일 주소를 입력해주세요"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <UserInput
            name="password"
            type="password"
            placeholder="비밀번호는 8자리 이상 입력해주세요"
            value={formData.password}
            onChange={handleInputChange}
            minLength="8"
            required
          />
          <UserInput
            name="checkPassword"
            type="password"
            placeholder="비밀번호를 다시한번 입력해주세요"
            value={formData.checkPassword}
            onChange={handleInputChange}
            minLength="8"
            required
          />
          <UserInput
            name="username"
            type="text"
            placeholder="이름은 추후 변경이 불가합니다"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <UserInput
            name="nickname"
            type="text"
            placeholder="닉네임은 커뮤니티 활동명"
            value={formData.nickname}
            onChange={handleInputChange}
            required
          />
          {/* 닉네임 중복 확인 버튼 */}
          {!!isNicknameChecked ? (
            <span>사용 가능</span>
          ) : (
            <UserAuthButton type="button" onClick={handleNicknameCheck}>
              중복 확인
            </UserAuthButton>
          )}
          <UserAuthButton type="submit">Sign Up</UserAuthButton>
        </form>
      </StContainer>

      {/* 기존 가입자 => Login 페이지로 이동 */}
      <StGoToLogin>
        <span>계정이 이미 있으신가요?</span>
        <Link to="/login">
          <UserAuthButton>Login</UserAuthButton>
        </Link>
      </StGoToLogin>
    </StSignUpWrapper>
  );
};

export default SignUp;

// 전체 화면 wrapping
const StSignUpWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
  }
`;

// form 태그 전체 wrapper
const StContainer = styled.div`
  width: 430px;
  height: 540px;
  background: #a7a5d0;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  margin-bottom: 20px;

  // SNS 로 로그인 버튼 아래 라인
  hr {
    width: 350px;
    opacity: 0.7;
  }

  // 가입자 정보 입력 창 + signup 버튼
  form {
    width: 100%;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    input {
      width: 280px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding-left: 15px;
    }

    // Signup 버튼
    /* button {
      width: 200px;
      height: 40px;
      border: none;
      border-radius: 20px;
      background: #504ba1;
      color: #fff;
      font-size: 17px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover {
        background: #343434;
      }
    } */
  }
`;

// SNS 로 로그인 버튼
const StSNSBtn = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  button {
    width: 260px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 21px;
    font-size: 16px;
    gap: 10px;
    cursor: pointer;
    transition: all 0.3s;
    &:first-child {
      background: #504ba1;
      color: #fff;
    }
    &:hover {
      background: #343434;
      color: #fff;
    }
  }
`;

// 계정이 이미 있으신가요? => go to Login 페이지
const StGoToLogin = styled.div`
  width: 410px;
  height: 60px;
  background: #a7a5d0;
  border-radius: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 0.95rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  /* button {
    width: 90px;
    height: 35px;
    border: none;
    border-radius: 17.5px;
    background: #504ba1;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #343434;
    }
  } */
`;
