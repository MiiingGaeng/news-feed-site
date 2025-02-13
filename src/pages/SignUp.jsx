import React from "react";

const SignUp = () => {
  const handleSignup = () => {};

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSignup}>
        <div>
          <button>Sign up with Github</button>
          <button>Sign up with Google</button>
        </div>

        <hr />

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
        <input
          type="text"
          placeholder="이름"
          // value={userName}
          // onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="닉네임"
          // value={nickName}
          // onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <div>
        <span>계정이 이미 있으신가요?</span>
        <button>Log in</button>
      </div>
    </div>
  );
};

export default SignUp;
