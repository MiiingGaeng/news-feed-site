import Swal from "sweetalert2";
import AlertAlternative from "../assets/image/AlertAlternative.png";

/**
 * Success
 * @param {string} title -> 알림 이름 (성공)
 * @param {string} text -> 알림 내용 (선택)
 */

export const AlertSuccess = (title) => {
  Swal.fire({
    icon: "success",
    title: "Success",
  });
};

/**
 * Fail
 * @param {string} title -> 경고 제목
 * @param {string} text -> 경고 내용
 */

export const AlertFail = (title, text) => {
  Swal.fire({
    icon: "error",
    title: "Fail",
    text: "비밀번호가 일치하지 않습니다.",
  });
};

/**
 * Check
 * @param {string} title -> 안내 제목
 * @param {string} text -> 안내 내용
 */

export const AlertInfo = (title, text) => {
  Swal.fire({
    icon: "info",
    title: "잠깐!",
    text: "이미 존재하는 이메일입니다.",
  });
};

/**
 * 실행 여부 확인
 * @param {string} title -> 실행 여부 확인할 제목
 * @param {string} text -> 경고 내용
 */

export const AlertCheck = (title, text) => {
  Swal.fire({
    title: "삭제할까요?",
    text: "이 작업은 되돌릴 수 없습니다!",
    icon: "warning",
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

export const AlertSorry = (title, text) => {
  Swal.fire({
    title: "미안해!",
    text: "구현하지 못했어.",
    imageUrl: AlertAlternative,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
};
