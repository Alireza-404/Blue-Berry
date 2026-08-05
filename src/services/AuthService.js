import { supabase } from "../lib/supabase";

export const login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, success: false, error: "login_error" };
    }

    return { data, success: true, error: null };
  } catch {
    return { data: null, success: false, error: "catch_error" };
  }
};
