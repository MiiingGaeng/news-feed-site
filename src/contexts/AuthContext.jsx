import { useEffect, useState, createContext } from "react";
import supabase from "../supabase/client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // login state , user state, userId state
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userNickname, setUserNickName] = useState(null);

  // console.log("*isLogin", isLogin);
  // console.log("*userID", userId);
  // console.log("*user", user);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log("✅check", event, session);

      if (session) {
        setIsLogin(true);
        setUser(session.user);
        setUserId(session.user.id);
        setUserNickName(session?.user.user_metadata.nickname || "게스트");
      } else {
        setIsLogin(false);
        setUser(null);
        setUserId(null);
        setUserNickName(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        user,
        setUser,
        userId,
        setUserId,
        userNickname,
        setUserNickName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
