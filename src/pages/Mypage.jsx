import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabase/client";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import UserProfileImage from "../components/user/UserProfileImage";
import Masonry from "react-masonry-css";

const MyPage = () => {
  const breakpointColumnsObj = {
    default: 2, // 기본 2열 레이아웃
    768: 1, // 768px 이하에서는 1열 레이아웃 (모바일)
  };
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
        console.log("session => ", session);
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
          console.log("현재 유저 정보:", data); //  콘솔에 출력
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
          console.log("현재 유저Feeds 정보:", mySelfFeed); //  콘솔에 출력
        } catch (error) {
          console.error("피드 정보 가져오기 오류:", error);
        }
      };
      getFeedData();
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    //예외처리: 빈칸의 경우 return
    if (
      !userData.email.trim() ||
      !userData.name.trim() ||
      !userData.nickname.trim()
    ) {
      alert("계정 정보를 제대로 입력해주세요 !");
      return;
    }

    const newProfileInfo = {
      // 우선 지금은 닉네임만 변경가능 하도록함
      nickname: userData.nickname,
    };

    //supabase에 추가
    try {
      const { error } = await supabase
        .from("users")
        .update(newProfileInfo)
        .eq("user_id", user.id); // 현재 로그인한 유저의 ID 기준 업데이트

      if (error) throw error;

      //사용자 알림
      alert("프로필정보가 변경되었습니다!");
      console.log("프로필 업데이트 성공:", userData);
    } catch (error) {
      console.error("프로필 업데이트 오류:", error.message);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleNaviageFeed = () => {
    navigate("../feed");
  };
  return (
    <StMyPageWrapper>
      <h1>My Page</h1>{" "}
      <StContainer width="500px" height="300px">
        <UserProfileImage userData={userData} />
        <Input
          text="이메일"
          type="email"
          placeholder="이메일"
          value={userData.email}
          onChangeFunc={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
          required
        />
        <Input
          text="이름"
          type="text"
          placeholder="이름"
          value={userData.name}
          onChangeFunc={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
          required
        />
        <Input
          text="닉네임"
          type="text"
          placeholder="닉네임"
          value={userData.nickname}
          onChangeFunc={(e) =>
            setUserData({ ...userData, nickname: e.target.value })
          }
          required
        />
        <StButtonWrapper>
          <Button onClick={handleUpdateProfile}>수정하기</Button>
          <Button onClick={handleNaviageFeed}>feeds로 이동</Button>
        </StButtonWrapper>
      </StContainer>
      <StContentsHeader>
        <div></div>
        <h2>My Contents</h2>
        <div></div>
      </StContentsHeader>
      <StContentBoxWrapper>
        <StyledMasonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
        >
          {mySelfFeed.map((feed) => (
            <div key={feed.feed_id} className="masonry-grid_item">
              <Link to={`/detail?feed_id=${feed.feed_id}`}>
                <StFeedCard>
                  {" "}
                  <StFeedCardContent>
                    <StTitle>{feed.title}</StTitle>
                    <StContents>{feed.contents}</StContents>
                  </StFeedCardContent>
                </StFeedCard>
              </Link>
            </div>
          ))}
        </StyledMasonry>
      </StContentBoxWrapper>
    </StMyPageWrapper>
  );
};
const StButtonWrapper = styled.div``;

const StContentBoxWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
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

const StContainer = styled.div`
  // styledComponents.js로 관리해야할것같음 (height, width를 props로 받아서 사용)
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "300px"};
  background: #a7a5d0;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  margin-bottom: 20px;
  hr {
    width: 350px;
    opacity: 0.7;
  }
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
// Masonry 스타일 적용
const StyledMasonry = styled(Masonry)`
  display: flex;
  width: 100%;
  gap: 30px;

  .masonry-grid_item {
    margin-bottom: 30px; /* 카드 사이 간격 */
  }
`;

// Feed카드
const StFeedCard = styled.li`
  width: 300px;
  max-width: 400px;
  height: 100%;
  max-height: 600px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }
`;
// 게시글 내용 전체 박스
const StFeedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
  
`;
// 제목
const StTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  display: block;
  margin-bottom: 8px;
`;

// 본문
const StContents = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  text-align: center;
  white-space: pre-wrap;
  display: block;
`;
export default MyPage;
