import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import supabase from "../supabase/client";

const Home = () => {
  const navigate = useNavigate();
  const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext);

  // login state check
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // session check
      console.log("✅ session", session);

      setIsLogin(session?.user ?? null);
      setUser(session?.user || null);
    };
    getSession();
  }, [setIsLogin]);

  // login
  const handleLogin = () => {
    navigate("/login");
  };

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLogin(false);
  };

  return (
    <>
      <div>Home</div>
      {/* 테스트용 */}
      <h3>{isLogin ? "로그인 되었습니다." : "로그인이 필요합니다."}</h3>

      {/* 로그인 버튼 조건부 렌더링 테스트용 */}
      {isLogin ? (
        <button onClick={handleLogout}>🫥Log Out</button>
      ) : (
        <button onClick={handleLogin}>😀Log in</button>
      )}
    </>
  );
};

export default Home;
