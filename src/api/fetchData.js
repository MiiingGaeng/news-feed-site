import supabase from "../supabase/client";

export const fetchData = async (table) => {
  try {
    const { data } = await supabase.from(table).select("*");

    return data;
  } catch (error) {
    console.log("error", error);
  }
};
