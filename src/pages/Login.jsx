import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import UserInput from "../components/user/UserInput";
import UserAuthButton from "../components/user/UserAuthButton";
import { AlertError, AlertSorry, AlertSuccess } from "../common/Alert";
import supabase from "../supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("로그인 실패=>", error);
        // 로그인이 실패하는 경우 안내메세지 출력
        if (error.message === "Invalid login credentials") {
          AlertError("로그인 실패", "이메일 또는 비밀번호 오류입니다.");
          return;
        }
      }

      // 로그인 성공 메세지에 사용자 닉네임 포함
      if (data?.user) {
        // 로그인한 사용자 정보 fetch
        const { data: userInfo, error: userError } =
          await supabase.auth.getUser();

        if (userError) throw userError;

        // 사용자 닉네임 가져오기
        const nickname = userInfo.user?.user_metadata?.nickname;

        // 로그인 성공 메세지 출력
        AlertSuccess("로그인 성공!", `안녕하세요, ${nickname}님!`);
        navigate("/");
      }
    } catch (error) {
      AlertError(
        "Error",
        `회원가입 중 오류가 발생했습니다. 다시 시도해주세요!
      ${error.massage}`,
      );
      console.error("⛔️로그인 오류", error);
    }
  };

  return (
    <StLoginWrapper>
      <h1>Login</h1>
      <StContainer>
        {/* 로그인 폼 */}
        <form onSubmit={handleLogin}>
          <section>
            <UserInput
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <UserInput
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>
          <SignInButton>
            <UserAuthButton
              $buttonWidth="260px"
              $buttonHeight="40px"
              type="submit"
            >
              Login
            </UserAuthButton>
            <Link to="/signup">
              <UserAuthButton $buttonWidth="260px" $buttonHeight="40px">
                Sign Up
              </UserAuthButton>
            </Link>
          </SignInButton>
        </form>

        <hr />

        {/* 아이디/비밀번호 찾기 */}
        {/* <StFindPassword>
          <p>비밀번호를 잊으셨나요?</p>
          <Link to="/findidpw">
            <button>Finding ID</button>
          </Link>
          /
          <Link to="/findidpw">
            <button>Finding PW</button>
          </Link>
        </StFindPassword> */}

        {/* SNS로 로그인 */}
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
      </StContainer>
    </StLoginWrapper>
  );
};

export default Login;

// 전체 화면 wrapping
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

// form 태그 영역 + Sign Up 버튼 + ID/PW찾기 + SNS 연동 버튼
const StContainer = styled.div`
  width: 430px;
  height: 470px;
  background: #a7a5d0;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  // Login / Signup 버튼 아래 line
  hr {
    width: 350px;
    opacity: 0.7;
    margin-bottom: 15px;
  }

  form {
    width: 100%;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    section {
      width: 100%;
      height: 100px;
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
    }
  }
`;

// Login / Signup 버튼
const SignInButton = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* button {
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
  } */
`;

// ID/PW 찾기
const StFindPassword = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  margin-top: -15px;
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
    font-size: 12px;
    transition: all 0.3s;
    &:hover {
      background: #ffffff;
      color: #504ba1;
    }
  }
`;

// SNS 로 로그인
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
