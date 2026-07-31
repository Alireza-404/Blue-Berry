import { supabase } from "../lib/supabase";

export const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      return {
        data: null,
        success: false,
      };
    }

    return {
      data,
      success: true,
    };
  } catch (error) {
    console.log(error.message);

    return {
      data: null,
      success: false,
    };
  }
};

export const addProductToCart = async (userId, productId) => {
  try {
    const { data: item, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (fetchError) {
      console.log(fetchError.message);
      return { type: "fetch_error" };
    }

    if (item) {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: item.quantity + 1 })
        .eq("id", item.id);

      if (error) {
        return { type: "updated_error" };
      }

      return { type: "updated" };
    }

    const { error } = await supabase.from("cart").insert({
      user_id: userId,
      product_id: productId,
      quantity: 1,
    });

    if (error) {
      return { type: "insert_error" };
    }

    return { type: "added" };
  } catch (error) {
    console.log(error.message);

    return {
      type: "unknown_error",
    };
  }
};
