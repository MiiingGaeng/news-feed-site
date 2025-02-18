import supabase from "../supabase/client";

/** 해당 table의 데이터를 join해서 가져오는 로직
 *
 * @param {"string"} table1 - 메인 테이블 (e.g. "feeds")
 * @param {"string"} table2 - 조인할 테이블 (e.g. "users")
 * @returns {Promise} - 데이터를 반환하는 Promise 객체
 *
 * 사용할 컴포넌트에서 async 함수로 감싼 후 사용해야합니다!
 * 단, users 테이블과 fk로 연결되어있어야 합니다.
 */
export const fetchData = async (table1, table2, ascending = true) => {
  try {
    const { data } = await supabase
      .from(table1)
      .select(`*, ${table2}(*)`)
      .order("created_at", { ascending });

    return data;
  } catch (error) {
    console.log("fetching error", error);
  }
};
