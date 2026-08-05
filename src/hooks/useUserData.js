import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  setCartError,
  setCartItems,
  setCartLoading,
} from "../redux/Slices/CartItemsSlice";
import { getCartItems } from "../services/CartService";
import {
  clearWishlist,
  setWishlistError,
  setWishlistItem,
  setWishlistLoading,
} from "../redux/Slices/WishlistSlice";
import { getWishlistItems } from "../services/WishlistService";

export default function useUserData() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getCart = async () => {
    if (!user) {
      dispatch(clearCart());
      return;
    }

    dispatch(setCartLoading(true));

    const { data, success } = await getCartItems(user.id);

    if (!success) {
      dispatch(setCartError(true));
      return;
    }

    dispatch(setCartItems(data));
  };

  const getWishlist = async () => {
    if (!user) {
      dispatch(clearWishlist());
      return;
    }

    dispatch(setWishlistLoading(true));

    const { data, success } = await getWishlistItems(user.id);

    if (!success) {
      dispatch(setWishlistError(true));
      return;
    }

    dispatch(setWishlistItem(data));
  };

  useEffect(() => {
    getCart();
    getWishlist();
  }, [user, dispatch]);

  return { getCart, getWishlist };
}
