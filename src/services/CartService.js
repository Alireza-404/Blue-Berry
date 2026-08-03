import { supabase } from "../lib/supabase";

export const getCartItems = async (userId) => {
  try {
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);

    if (cartError) {
      console.log(cartError.message);
      return { data: [], sucess: false };
    }

    if (cartItems.length === 0) {
      return { data: [], sucess: true };
    }

    const productsId = cartItems.map((item) => item.product_id);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .in("id", productsId);

    if (productsError) {
      console.log(productsError.message);
      return { data: [], sucess: false };
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
    return { data: [], sucess: false };
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
