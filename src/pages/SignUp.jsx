import React, { useState } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase/client";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  // 회원가입 로직
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name, // name 저장
            nickname, // nickname 저장
          },
        },
      });

      alert(`KEI 회원이 되신것을 환영합니다.`);

      // 회원가입 후 기본은 홈으로 랜딩
      navigate("/");
    } catch (error) {
      alert(error.massage);
      console.log("⛔️회원가입 오류", error);
    }
  };

  return (
    // 기본 회원가입 로직만 완성되어 있습니다.
    // 테스트용으로 먼저 업로드하오니 참고 부탁드립니다.
    <StSignUpWrapper>
      <h1>SignUp</h1>
      <StContainer>
        <StSNSBtn>
          <button>
            <FaGithub />
            Sign up with Github
          </button>
          <button>
            <FcGoogle />
            Sign up with Google
          </button>
        </StSNSBtn>

        <hr />

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

// SNS 연동 버튼 + form 태그 영역 + Sign Up 버튼
const StContainer = styled.div`
  width: 350px;
  height: 460px;
  background: #a7a5d0;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  margin-bottom: 20px;

  // SNS 연동 버튼 아래 line
  hr {
    width: 350px;
    opacity: 0.7;
  }

  // email, pw, name, nickname 입력창
  form {
    width: 100%;
    height: 300px;
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

    // Sign Up 버튼
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

// SNS 연동 버튼 UI
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

// 계정이 이미 있으신가요? -> Login
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
