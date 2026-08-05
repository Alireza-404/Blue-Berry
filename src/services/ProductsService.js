import { supabase } from "../lib/supabase";

export const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    console.log(error.message);

    return {
      data: null,
      error: error.message,
      success: false,
    };
  }
};
