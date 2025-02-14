import supabase from "../supabase/client";

/**
 * insertOrUpdateData 함수
 * - 데이터 객체와 테이블 명을 받아서 테이블을 업데이트합니다.
 *
 * @param {object} upsertData - 추가/수정 할 데이터 객체
 * @param {string} tableName - 데이터가 삽입되거나 업데이트 될 테이블 명
 * @returns {Promise}
 */
export const insertOrUpdateData = async (upsertData, tableName) => {
  if (!upsertData) {
    console.error("upsertData값은 필수입니다.");
    return;
  }
  if (!tableName) {
    console.error("tableName은 필수입니다.");
    return;
  }
  try {
    const { error } = await supabase.from(tableName).upsert(upsertData);

    if (error) {
      console.error("데이터 삽입/업데이트 실패: ", error.message);
      return;
    }
  } catch (error) {
    console.error("서버오류가 발생하였습니다.: ", error);
  }
};
