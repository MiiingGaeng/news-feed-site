import React, { useContext } from "react";
import supabase from "../../supabase/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import UserProfileImage from "../../components/user/UserProfileImage";
import { AuthContext } from "../../contexts/AuthContext";

const UserInfo = ({ userData, setUserData, user }) => {
  const navigate = useNavigate();
  const { setUserNickName } = useContext(AuthContext); 
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

      setUserNickName(userData.nickname);

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
    <>
      {" "}
      <StContainer width="500px" height="300px">
        <UserProfileImage userData={userData} setUserData={setUserData} />
        <Input
          text="이메일"
          type="email"
          placeholder="이메일"
          value={userData.email}
          onChangeFunc={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
          bool={true}
        />
        <Input
          text="이름"
          type="text"
          placeholder="이름"
          value={userData.name}
          onChangeFunc={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
          bool={true}
        />
        <Input
          text="닉네임"
          type="text"
          placeholder="닉네임"
          value={userData.nickname}
          onChangeFunc={(e) =>
            setUserData({ ...userData, nickname: e.target.value })
          }
          bool={false}
        />
        <StButtonWrapper>
          <Button onClick={handleUpdateProfile}>수정하기</Button>
          <Button onClick={handleNaviageFeed}>feeds로 이동</Button>
        </StButtonWrapper>
      </StContainer>
    </>
  );
};
const StButtonWrapper = styled.div``;

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
export default UserInfo;
