import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setCartLoading,
  setCartItems,
  setCartError,
} from "../redux/Slices/CartItemsSlice";

import {
  setWishlistLoading,
  setWishlistItem,
  setWishlistError,
} from "../redux/Slices/WishlistSlice";

import { getCartItems } from "../services/CartService";
import { getWishlistItems } from "../services/WishlistService";

export default function useUserActions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const getCart = useCallback(async () => {
    if (!user) return;

    dispatch(setCartLoading(true));

    const { data, success } = await getCartItems(user.id);

    if (!success) {
      dispatch(setCartError(true));
      return;
    }

    dispatch(setCartItems(data));
  }, [dispatch, user]);

  const getWishlist = useCallback(async () => {
    if (!user) return;

    dispatch(setWishlistLoading(true));

    const { data, success } = await getWishlistItems(user.id);

    if (!success) {
      dispatch(setWishlistError(true));
      return;
    }

    dispatch(setWishlistItem(data));
  }, [dispatch, user]);

  return { getCart, getWishlist };
}
