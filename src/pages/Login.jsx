import React from "react";

const Login = () => {
  const handleLogin = () => {};

  return (
    <div>
      <h1>Login</h1>
      {/* 제목을 제외한 반투명 컨테이너 div */}
      <div>
        {/* 로그인 폼 영역 */}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="이메일"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </form>

        <hr />
        {/* id/pw 찾기 버튼 */}
        <div>
          <Link to="/findidpw">
            <button>Finding PW</button>
          </Link>
          <Link to="/findidpw">
            <button>Finding ID</button>
          </Link>
        </div>
        {/* 소셜 로그인 버튼 */}
        <div>
          <button>
            <FaGithub />
            Sign up with Github
          </button>
          <button>
            <FaGoogle />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
