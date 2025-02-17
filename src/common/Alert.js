import Swal from "sweetalert2";
import alertalt from "../assets/image/alertalt.png"; // 이미지 경로

/**
 * Success
 * @param {string} title -> 알림 이름 (성공)
 * @param {string} text -> 알림 내용 (선택)
 */

export const AlertSuccess = (title = "Success", text = "") => {
  Swal.fire({
    icon: "success",
    title,
    text,
    customClass: {
      popup: "swal-custom", // 팝업 스타일링
      icon: "swal-icon", // 아이콘 스타일링
    },
  });
};

/**
 * Fail
 * @param {string} title -> 경고 제목
 * @param {string} text -> 경고 내용
 */

export const AlertError = (title = "Error", text = "") => {
  Swal.fire({
    icon: "error",
    title,
    text,
  });
};

/**
 * Check
 * @param {string} title -> 안내 제목
 * @param {string} text -> 안내 내용
 */

export const AlertInfo = (title = "Info", text = "") => {
  Swal.fire({
    icon: "info",
    title,
    text,
  });
};

/**
 * 실행 여부 확인
 * @param {string} title -> 실행 여부 확인할 제목
 * @param {string} text -> 경고 내용
 */

export const AlertCheck = (
  title = "Warning",
  text = "이 작업은 되돌릴 수 없습니다!"
) => {
  Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#504ba1",
    cancelButtonColor: "#CD2E57",
    confirmButtonText: "삭제",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted",
        text: "삭제되었습니다.",
        icon: "success",
      });
    }
  });
};

/**
 * SNS 로 로그인
 * @param {string} title -> 미안해
 * @param {string} text -> 구현하지 못했어
 */

export const AlertSorry = () => {
  Swal.fire({
    title: "미안해!",
    text: "구현하지 못했어.",
    imageUrl: alertalt,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
};
