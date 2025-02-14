import { useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const Mypage = () => {
  const { setIsLogin, user, setUser } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // NOTE: 라우터 이동

  useEffect(() => {
    //  user가 존재할 때만 실행
    if (user?.email) {
      const getUserInfo = async () => {
        try {
          const { data, error } = await supabase
            .from("users") // public.users 테이블에서
            .select("*") 
            .eq("email", user.email) //  이메일이 같은 유저만 가져옴
            .single(); //  단일 데이터만 가져오기

          if (error) throw error;

          setData(data); //  상태 업데이트
          console.log("현재 유저 정보:", data); //  콘솔에 출력
        } catch (error) {
          console.error("유저 정보 가져오기 오류:", error);
        }
      };

      getUserInfo();
    }
  }, [user]);


  return <div>Mypage입니다.</div>;
};

export default Mypage;
