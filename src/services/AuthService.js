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

export const register = async (
  email,
  password,
  firstname,
  lastname,
  phoneNumber,
  address,
  city,
  postCode,
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { data: null, success: false, error: "sign-up-error" };

    const user = data.user;
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: user.id,
        first_name: firstname,
        last_name: lastname,
        phone_number: phoneNumber,
        address,
        city,
        post_code: postCode,
      },
    ]);

    if (profileError)
      return { data: null, success: false, error: "profile-error" };

    return { data: user, success: true, error: null };
  } catch {
    return { data: null, success: false, error: "catch-error" };
  }
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) return { success: false, error: true };

  return { success: true, error: false };
};
