import { supabase } from "../lib/supabase";

export const getUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      return {
        data: null,
        success: false,
        error: "role_error",
      };
    }

    return {
      data,
      success: true,
      error: null,
    };
  } catch {
    return { data: null, success: false, error: "catch_error" };
  }
};
