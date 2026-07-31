import { supabase } from "../lib/supabase";

export const getCartItems = async (userId) => {
  try {
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", userId);

    if (cartError) {
      console.log(cartError.message);
      return [];
    }

    if (cartItems.length === 0) {
      return [];
    }

    const productsId = cartItems.map((item) => item.product_id);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("*")
      .in("id", productsId);

    if (productsError) {
      console.log(productsError.message);
      return [];
    }

    const cartWithProducts = cartItems.map((item) => {
      return {
        ...item,
        product: products.find((p) => p.id === item.product_id),
      };
    });

    return cartWithProducts;
  } catch (error) {
    console.log(error);
    return [];
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
