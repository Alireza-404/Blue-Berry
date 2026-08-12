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

export const addProduct = async (values) => {
  try {
    const { error } = await supabase.from("products").insert({
      title_en: values.title_en,
      title_de: values.title_de,
      description: values.description,
      category_en: values.category_en,
      category_de: values.category_de,
      image: values.image,
      second_image: values.second_image,
      stars: Number(values.stars),
      label: values.label,
      price: Number(values.price),
      discount: Number(values.discount),
      stock: Number(values.stock),
      unit: values.unit,
      sku: values.sku,
      country: values.country,
      brand: values.brand,
      shelf_life: values.shelf_life,
      color_en: values.color_en,
      color_de: values.color_de,
      rating: Number(values.rating),
      is_deal: values.is_deal,
      is_organic: values.is_organic,
    });

    if (error) {
      return { success: false, error: "insert_error" };
    }

    return { success: true, error: null };
  } catch {
    return { success: false, error: "catch_error" };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      return { error: "delete_error", success: false };
    }

    return { error: null, success: true };
  } catch {
    return { error: "catch_error", success: false };
  }
};

export const updateProduct = async (productId, values) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(values)
      .eq("id", productId)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        error: "update_error",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: "catch_error",
    };
  }
};

export const getProductById = async (productId) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

    if (error) {
      return {
        data: null,
        error: "fetch_error",
        success: false,
      };
    }

    return {
      data,
      error: null,
      success: true,
    };
  } catch {
    return {
      data: null,
      error: "catch_error",
      success: false,
    };
  }
};
