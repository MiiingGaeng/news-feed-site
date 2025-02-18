import { useContext, useEffect, useRef, useState } from "react";
import default_img from "../../assets/image/profile_default.png";
import styled, { keyframes } from "styled-components";
import supabase from "../../supabase/client";
import { AuthContext } from "../../contexts/AuthContext";

const UserProfileImage = ({ userData }) => {
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef(null); // input file 참조
  const [uploading, setUploading] = useState(false); // 로딩 상태
  const [imageUrl, setImageUrl] = useState(default_img); // 프로필 이미지

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //  프로필 이미지 불러오기
  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!userData?.profile_img) return;

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(userData.profile_img);

      if (data) {
        setImageUrl(`${data.publicUrl}?t=${Date.now()}`); // 캐싱 방지
      }
    };

    fetchImageUrl();
    setUploading(false);
  }, [userData, userData?.profile_img, uploading]);

  //  프로필 이미지 업로드 + 기존 이미지 삭제 + DB 업데이트
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop(); // 확장자 추출
    const fileName = `profile_${userData.user_id}.${fileExt}`; // 파일명 생성
    const filePath = `profiles/${fileName}`; // 파일 경로

    //  기존 이미지 삭제 (기존 파일이 있을 경우)
    if (userData.profile_img) {
      const { error: deleteStorageError } = await supabase.storage
        .from("images")
        .remove([userData.profile_img]); //  배열 형식으로 전달

      if (deleteStorageError) {
        console.error("기존 이미지 삭제 실패:", deleteStorageError.message);
      } else {
        console.log("기존 이미지 삭제 성공:", userData.profile_img);
      }
    }

    //  새로운 이미지 업로드
    const { data: uploadStorageData, error: uploadStorageError } =
      await supabase.storage
        .from("images")
        .upload(filePath, file, { upsert: true }); //  upsert 옵션 추가

    if (uploadStorageError) {
      console.error("이미지 업로드 실패:", uploadStorageError.message);
      setUploading(false);
      return;
    }

    console.log("이미지 업로드 성공:", uploadStorageData);

    //  DB 업데이트
    const { error: tableImgUpdateError } = await supabase
      .from("users")
      .update({ profile_img: filePath })
      .eq("user_id", user.id);

    if (tableImgUpdateError) {
      console.error("DB 업데이트 실패:", tableImgUpdateError.message);
    } else {
      console.log("DB 업데이트 성공:", filePath);
    }

    //  UI 업데이트 - 업로드된 이미지 즉시 반영 (캐싱 방지)
    setImageUrl(`${VITE_APP_SUPABASE_STORAGE_URL}${filePath}`);

    setUploading(false);
  };

  return (
    <>
      <StProfileImg
        className={uploading ? "skeleton" : ""}
        src={imageUrl}
        onClick={handleImageClick}
      />
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

// 🟢 스켈레톤 로딩 애니메이션
const shine = keyframes`
  0% {
    background-position: left -40px top 0;
  }
  100% {
    background-position: right 100% top 0;
  }
`;

// 🟢 스타일 적용
const StProfileImg = styled.img`
  display: inline-block;
  max-width: 100%;
  vertical-align: middle;
  overflow: hidden;
  margin-bottom: 10px;
  border-radius: 30%;
  width: ${(props) => props.width || "100px"};
  height: ${(props) => props.height || "100px"};
  aspect-ratio: 1 / 1;

  /* 🟢 스켈레톤 로딩 */
  &.skeleton {
    background-color: transparent;
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
