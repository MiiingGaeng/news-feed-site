import supabase from "../supabase/client";

/** 해당 table의 데이터를 가져오는 로직
 *
 * @param {"string"} table
 * @returns Promise객체
 *
 * 사용할 컴포넌트에서 async 함수로 감싼 후 사용해야합니다!
 */
export const fetchData = async (table) => {
  try {
    const { data } = await supabase.from(table).select("*");

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
