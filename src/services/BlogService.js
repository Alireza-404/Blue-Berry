import { supabase } from "../lib/supabase";

export const getBlogs = async () => {
  try {
    const { error, data } = await supabase.from("blogs").select("*");

    if (error) {
      return {
        data: null,
        success: false,
        error: "fetch_error",
      };
    }

    return { data, success: true, error: null };
  } catch {
    return {
      data: null,
      success: false,
      error: "catch_error",
    };
  }
};

export const addBlog = async (values) => {
  try {
    const { error } = await supabase.from("blogs").insert({
      title_en: values.title_en,
      title_de: values.title_de,
      description_en: values.description_en,
      description_de: values.description_de,
      content_en: values.content_en,
      content_de: values.content_de,
      author: values.author,
      image: values.image,
    });

    if (error) {
      return { success: false, error: "insert_error" };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "catch_error" };
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const { error } = await supabase.from("blogs").delete().eq("id", blogId);

    if (error) {
      return { success: false, error: "delete_error" };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "catch_error" };
  }
};

export const updateBlog = async (blogId, values) => {
  try {
    const { error } = await supabase
      .from("blogs")
      .update(values)
      .eq("id", blogId)
      .select()
      .single();

    if (error) {
      return { success: false, error: "update_error" };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "catch_error" };
  }
};

export const getSignleBlog = async (blogTitle) => {
  try {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("title_en", blogTitle)
      .maybeSingle();

    if (error) {
      return { data: null, success: false, error: "fetch_error" };
    }

    return { data, success: true, error: null };
  } catch {
    return { data: null, success: false, error: "catch_error" };
  }
};
