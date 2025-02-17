import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/client";
import { AlertError, AlertInfo, AlertSorry } from "../common/Alert";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  // 회원가입 로직
  const handleSignup = async (e) => {
    e.preventDefault();

    // 비밀번호 일치여부 확인
    if (password !== passwordCheck) {
      AlertError("잠깐!", "비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // name 저장
            nickname, // nickname 저장
          },
        },
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
            AlertError("Warning", `${error.code}`);
        }
      } else {
        AlertSuccess("회원가입 완료!", "KEI 회원이 되신것을 환영합니다.");
        // 회원가입 후 홈으로 랜딩
        navigate("/");
      }
    } catch (error) {
      AlertError(`회원가입중 오류가 발생했습니다. 다시 시도해주세요!
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
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호를 다시한번 입력해주세요"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </StContainer>

      {/* 기존 가입자 => Login 페이지로 이동 */}
      <StGoToLogin>
        <span>계정이 이미 있으신가요?</span>
        <Link to="/login">
          <button>Login</button>
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
    button {
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
    }
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
  button {
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
  }
`;
