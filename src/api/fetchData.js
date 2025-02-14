import supabase from "../supabase/client";

export const fetchData = async (table) => {
  try {
    const { data } = await supabase.from(table).select("contents, created_at, feed_id, title, users(*)");

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
