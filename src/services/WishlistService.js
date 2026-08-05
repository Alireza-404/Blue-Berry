import { supabase } from "../lib/supabase";

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
    const { data: wishlist, error: wishlistError } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", userId);

    if (wishlistError) {
      return {
        data: [],
        success: false,
        error: wishlistError.message,
      };
    }

    if (wishlist.length === 0) {
      return {
        data: [],
        success: true,
        error: null,
      };
    }

    const productIds = wishlist.map((item) => item.product_id);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .in("id", productIds);

    if (productsError) {
      return {
        data: [],
        success: false,
        error: productsError.message,
      };
    }

    const wishlistWithProducts = wishlist.map((item) => ({
      ...item,
      product: products.find((product) => product.id === item.product_id),
    }));

    return {
      data: wishlistWithProducts,
      success: true,
      error: null,
    };
  } catch (error) {
    console.log(error.message);

    return {
      data: [],
      success: false,
      error: error.message,
    };
  }
};
