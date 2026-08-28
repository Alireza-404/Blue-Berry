import { useEffect, useRef, useCallback } from "react";
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

  const previousUserId = useRef(null);

  const getCart = useCallback(async () => {
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
  }, [user, dispatch]);

  const getWishlist = useCallback(async () => {
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
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      previousUserId.current = null;
      getCart();
      getWishlist();
      return;
    }

    if (previousUserId.current === user.id) return;

    previousUserId.current = user.id;

    getCart();
    getWishlist();
  }, [user, getCart, getWishlist]);

  return {
    getCart,
    getWishlist,
  };
}
