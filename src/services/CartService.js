import { supabase } from "../lib/supabase";

export const getCartItems = async (userId) => {
  try {
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);

    if (cartError) {
      console.log(cartError.message);
      return { data: [], success: false };
    }

    if (cartItems.length === 0) {
      return { data: [], success: true };
    }

    const productsId = cartItems.map((item) => item.product_id);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .in("id", productsId);

    if (productsError) {
      console.log(productsError.message);
      return { data: [], success: false };
    }

    const cartWithProducts = cartItems.map((item) => {
      return {
        ...item,
        product: products.find((p) => p.id === item.product_id),
      };
    });

    return { data: cartWithProducts, success: true };
  } catch (error) {
    console.log(error);
    return { data: [], success: false };
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
      console.log(error);
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

export const deleteCartItem = async (cartId) => {
  try {
    const { error } = await supabase.from("cart").delete().eq("id", cartId);

    if (error) {
      console.log(error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const updateCartItemQuantity = async (cartId, quantity) => {
  try {
    const { error } = await supabase
      .from("cart")
      .update({ quantity })
      .eq("id", cartId);

    if (error) {
      console.log(error.message);
      return false;
    }

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
