import supabase from "../supabase/client";

/**
 * deleteData 함수
 * - 테이블 명과 테이블 column값, 해당 게시글의 id을 받아서 데이터를 삭제합니다.
 *
 * @param {string} tableName
 * @param {string} column
 * @param {id} id
 */
export const deleteData = async (tableName, column, id) => {
  if (!tableName) {
    console.error("tableName 값은 필수입니다.");
  }
  try {
    const { error } = await supabase.from(tableName).delete().eq(column, id);

    if (error) {
      console.error("데이터 삭제 실패: ", error);
    }
  } catch (error) {
    console.error("서버오류가 발생하였습니다.: ", error);
  }
};
