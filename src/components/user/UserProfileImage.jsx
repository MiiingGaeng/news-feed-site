import { useContext, useEffect, useRef, useState } from "react";
import default_img from "../../assets/image/profile_default.png";
import styled, { keyframes } from "styled-components";
import supabase from "../../supabase/client";
import { AuthContext } from "../../contexts/AuthContext";

const UserProfileImage = ({ userData }) => {
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null); // input 담긴 file경로 담기
  const [uploading, setUploading] = useState(false); // 로딩 애니메이션 효과 주기
  const [imageUrl, setImageUrl] = useState(default_img); //imageUrl 담기
  const handleImageClick = () => { // 프로필 영역을 누르면 파일업로드 모달이 열림
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // useEffect해서 스토리지에서 이미지 가져오기
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!userData?.profile_img) return;
      // 업로드한 이미지 URL 가져오기
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(userData.profile_img);
      if (publicUrlData) {
        setImageUrl(publicUrlData.publicUrl);
      }
    };

    fetchImageUrl();
  }, [userData]);

  // 이미지 storage에 저장하고 users의 profile_img컬럼에 저장하고 그전의 프로필사진은 storage에서 삭제제
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
  

    const fileExt = file.name.split(".").pop(); // 이미지확장자 따로 뽑기기
    const fileName = `profile_${user.user_metadata.nickname}_${Date.now()}.${fileExt}`; // 파일이름 내맘대로 정하기 
    const filePath = `profiles/${fileName}`; // 최종 파일 이름 => users.profile_img 값값

    // storage에 이미지 업로드드
    const { data: uploadStorageData, error: uploadStorageError } =
      await supabase.storage
        .from("images") // 'images'라는 이름의 버킷에 업로드
        .upload(filePath, file); // filePath영역에 받아온 file주소 넣기

    // 업로드 중 오류가 발생하면 콘솔에 오류 메시지를 출력
    if (uploadStorageError) {
      console.error("이미지 업로드 실패:", uploadStorageError.message);
      setUploading(false);
      return;
    }
    // 업로드가 성공하면 성공 메시지와 데이터를 콘솔에 출력
    console.log("이미지 업로드 성공:", uploadStorageData);

    // DB 업데이트
    const { error: tableImgUpdateError } = await supabase
      .from("users")
      .update({ profile_img: filePath })
      .eq("user_id", user.id);

    if (tableImgUpdateError) {
      console.error("테이블이미지 업로드 실패:", tableImgUpdateError.message);
    } else {
      // 업로드가 성공하면 성공 메시지와 데이터를 콘솔에 출력
      console.log("테이블이미지 업로드 성공:", filePath);
    }

    //그전 사진 storage에서 삭제
    const { error: deleteStorageError } = await supabase.storage
      .from("images")
      .remove(userData.profile_img);

    // storage 삭제 중 오류가 발생하면 콘솔에 오류 메시지를 출력
    if (deleteStorageError) {
      console.error("이미지 삭제 실패:", deleteStorageError.message);
      return;
    }

    // 달라진 이미지경로 넣기기
    setImageUrl(`${import.meta.env.VITE_APP_SUPABASE_URL}${filePath}`);
  };
  // users테이블에 저장

  return (
    <>
      <StProfileImg
        src={uploading ? "/loading_spinner.gif" : imageUrl}
        alt="프로필 사진"
        onClick={handleImageClick}
      />{" "}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: "none" }}
      />
    </>
  );
};
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
export default UserProfileImage;
