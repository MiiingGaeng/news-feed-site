import { useState } from "react";
import styled, { keyframes } from "styled-components";
import default_img from "../assets/image/profile_default.png";
import Button from "../common/Button";
import Input from "../common/Input";

const MyPage = () => {
  const [data, setData] = useState({
    id: "",
    name: "",
    email: "",
    nickname: "",
    image: ""
  });

  return (
    <StMyPageWrapper>
      <h1>My Page</h1>
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
        <Button children="수정하기" />
      </StContainer>

      <StContentsHeader>
        <div></div>
        <h2>My Contents</h2>
        <div></div>
      </StContentsHeader>
      <StContentBoxWrapper>
        {/* 지금은 기본 UI 이기때문에 예시 데이터로 여러개 만들어둠. 추후
supabase로 데이터 가져와서 map사용할예정정 */}
        <StContentBox>
          <h2>팀 프로젝트 발제</h2>
          <p>
            뉴스피드 프로젝트, 내가 이번학기에 참여했던 프로젝트를 정리했다.
          </p>
        </StContentBox>
        <StContentBox>
          <h2>점메추</h2>
          <p>오늘의 점심 메뉴를 AI가 추천해준다! 이 서비스를 만들어보았다.</p>
        </StContentBox>
        <StContentBox>
          <h2>리액트 9기 화이팅</h2>
          <p>리액트 9기 동기들과 우리 다같이 성장해보자!</p>
        </StContentBox>
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
