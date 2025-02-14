import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      const { error } = supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      alert(`로그인 성공!`);
      navigate("/");
    } catch (error) {
      alert(error.message);
      console.log("⛔️로그인 오류", error);
    }
  };

  return (
    <StLoginWrapper>
      <h1>Login</h1>
      {/* 제목을 제외한 반투명 컨테이너 div */}
      <StContainer>
        {/* 로그인 폼 영역 */}
        <form onSubmit={handleLogin}>
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
        </form>
        <SignInButton>
          <button type="submit">Login</button>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </SignInButton>

        <hr />
        {/* id/pw 찾기 버튼 */}
        <StFindPassword>
          <p>비밀번호를 잊으셨나요?</p>
          <Link to="/findidpw">
            <button>Finding PW</button>
          </Link>
          /
          <Link to="/findidpw">
            <button>Finding ID</button>
          </Link>
        </StFindPassword>
        {/* 소셜 로그인 버튼 */}
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
      </StContainer>
    </StLoginWrapper>
  );
};

export default Login;

const StLoginWrapper = styled.div`
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

const StContainer = styled.div`
  width: 350px;
  height: 400px;
  background: #a7a5d0;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  hr {
    width: 350px;
    opacity: 0.7;
    margin-bottom: -5px;
  }
  form {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    input {
      width: 280px;
      height: 40px;
      border: none;
      border-radius: 20px;
      padding-left: 15px;
    }
  }
`;

const StFindPassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  p {
    font-size: 14px;
    color: #fff;
  }
  button {
    width: 90px;
    height: 20px;
    border: none;
    border-radius: 10px;
    background: #a7a5d0;
    color: #fff;
    font-size: 13px;
    transition: all 0.3s;
    &:hover {
      background: #ffffff;
      color: #504ba1;
    }
  }
`;

const SignInButton = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: -10px;
  button {
    width: 260px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    font-size: 17px;
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

const StSNSBtn = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  button {
    width: 280px;
    height: 40px;
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
