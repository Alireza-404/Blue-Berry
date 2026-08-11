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
