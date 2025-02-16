import React, { useEffect, useState, createContext } from "react";
import supabase from "../supabase/client";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // login state , user state
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  console.log("isLogin", isLogin);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("✅check", event, session);

      if (session) {
        setIsLogin(true);
        setUser(session.user);
        setUserId(session.user.id);
      } else {
        setIsLogin(false);
        setUser(null);
        setUserId(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, user, setUser, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
