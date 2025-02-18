import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import UserFeeds from "../components/user/UserFeeds";
import UserInfo from "../components/user/UserInfo";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); //user에 session.user(로그인한 유저정보)가 들어가있음
  const [userData, setUserData] = useState({
    // public.users에서 해당 유저의 정보를 가져왔음
    id: "",
    name: "",
    email: "",
    nickname: "",
    image: "",
  });
  const [mySelfFeed, setMySelfFeed] = useState([]);

  // NOTE: 로그인 상태 확인

  useEffect(() => {
    //현재 로그인상태 확인하는 로직
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        // console.log("session => ", session);
      } else {
        alert("로그인 하셔야합니다.");
        navigate("/login");
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    //  user가 존재할 때만 실행
    if (user?.id) {
      const getUserInfo = async () => {
        try {
          const { data, error } = await supabase
            .from("users") // public.users 테이블에서
            .select("*")
            .eq("user_id", user.id) //  id가가 같은 유저만 가져옴
            .single(); //  단일 데이터만 가져오기

          if (error) throw error;

          setUserData(data); //  상태 업데이트
        } catch (error) {
          console.error("유저 정보 가져오기 오류:", error);
        }
      };

      getUserInfo();

      const getFeedData = async () => {
        try {
          const { data, error } = await supabase
            .from("feeds") // public.feeds 테이블에서
            .select("*")
            .eq("writer_id", user.id); //  id이 해당유저와같은 feed만 가져옴

          if (error) throw error;

          setMySelfFeed(data); //  상태 업데이트
        } catch (error) {
          console.error("피드 정보 가져오기 오류:", error);
        }
      };
      getFeedData();
    }
  }, [user]);

  return (
    <StMyPageWrapper>
      <h1>My Page</h1>
      <UserInfo userData={userData} setUserData={setUserData} user={user} />
      <StContentsHeader>
        <div></div>
        <h2>My Contents</h2>
        <div></div>
      </StContentsHeader>
      <UserFeeds mySelfFeed={mySelfFeed} />
    </StMyPageWrapper>
  );
};

const StMyPageWrapper = styled.div`
  // styles폴더에 styledComponents.js로 관리해야할것같음
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
  h1 {
    font-size: 50px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const StContentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-bottom: 20px;
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  div {
    flex: 1;
    height: 2px;
    background: #ccc;
    margin: 0 10px;
  }
`;
export default MyPage;
