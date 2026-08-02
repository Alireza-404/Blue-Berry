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

export const toggleWishlistItem = async (userId, productId) => {
  try {
    const { data: item, error: fetchError } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (fetchError) {
      console.log(fetchError.message);
      return { type: "fetch_error" };
    }

    if (item) {
      const { error } = await supabase
        .from("wishlists")
        .delete()
        .eq("id", item.id);

      if (error) {
        return { type: "delete_error" };
      }

      return { type: "deleted", product_id: productId };
    }

    const { data, error: insertError } = await supabase
      .from("wishlists")
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select()
      .single();

    if (insertError) {
      return { type: "insert_error" };
    }

    return { type: "added", item: data };
  } catch (error) {
    console.log(error.message);

    return {
      type: "unknown_error",
    };
  }
};

export const getWishlistItems = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      return {
        data: null,
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      error: null,
      data,
    };
  } catch (error) {
    console.log(error.message);

    return {
      data: null,
      success: false,
      error: error.message,
    };
  }
};
