import { useContext, useEffect, useState } from "react";
import supabase from "../supabase/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styled, { keyframes } from "styled-components";
import default_img from "../assets/image/profile_default.png";
import Button from "../common/Button";
import Input from "../common/Input";

const MyPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); //user에 session.user(로그인한 유저정보)가 들어가있음
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    nickname: "",
    image: "",
  });
  const [mySelfFeed, setMySelfFeed] = useState([]);
  // NOTE: 로그인 상태 확인
  useEffect(() => { //현재 로그인상태 확인하는 로직
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

          setData(data); //  상태 업데이트
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
          console.log("현재 유저Feeds 정보:", data); //  콘솔에 출력
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
    if (!data.email.trim() || !data.name.trim() || !data.nickname.trim()) {
      alert("계정 정보를 제대로 입력해주세요 !");
      return;
    }

    const newProfileInfo = { // 우선 지금은 닉네임만 변경가능 하도록함
      nickname: data.nickname,
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
      console.log("프로필 업데이트 성공:", data);
    } catch (error) {
      console.error("프로필 업데이트 오류:", error.message);
      alert("프로필 업데이트에 실패했습니다.");
    }
  };
  return (
    <StMyPageWrapper>
      <h1>My Page</h1>{" "}
        {" "}
        <StContainer width="500px" height="300px">
          <StProfileImg src={default_img} alt="사진없음" />
          <Input
            text="이메일"
            type="email"
            placeholder="이메일"
            value={data.email}
            onChangeFunc={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <Input
            text="이름"
            type="text"
            placeholder="이름"
            value={data.name}
            onChangeFunc={(e) => setData({ ...data, name: e.target.value })}
            required
          />
          <Input
            text="닉네임"
            type="text"
            placeholder="닉네임"
            value={data.nickname}
            onChangeFunc={(e) => setData({ ...data, nickname: e.target.value })}
            required
          />
          <Button children="수정하기" onClick={handleUpdateProfile} />
        </StContainer>
      <StContentsHeader>
        <div></div>
        <h2>My Contents</h2>
        <div></div>
      </StContentsHeader>
      <StContentBoxWrapper>
        {mySelfFeed.map((feed) => { // 해당 유저의 feed만 모아져있는 mySelfFeed에 담긴 list로 화면에 출력
          return (
            <StContentBox key={feed.feed_id}>
              <h2>{feed.title}</h2>
              <p>{feed.contents} </p>
            </StContentBox>
          );
        })}
      </StContentBoxWrapper>
    </StMyPageWrapper>
  );
};

const StContentBox = styled.div`
  background: #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  height: 100px;
  text-align: center;
  margin-left: 10px;
  margin-bottom: 10px;
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
  }
`;
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
  padding: 40px;
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

// 스켈레톤 로딩 애니메이션 정의
const shine = keyframes`
  0% {
    background-position: left -40px top 0;
  }
  100% {
    background-position: right 100% top 0;
  }
`;

// 스타일이 적용된 프로필 이미지
const StProfileImg = styled.img`
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  overflow-clip-margin: content-box;
  overflow: clip;
  margin-bottom: 10px;

  /* 프로필 이미지 둥글게 */
  border-radius: 30%;

  /* 특정 속성을 가진 이미지 */
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "100px"};
  aspect-ratio: 1 / 1;

  /* 스켈레톤 로딩 효과 */
  &.skeleton {
    background-color: #e2e5e7;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -40px top 0;
    animation: ${shine} 1s ease infinite;
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
