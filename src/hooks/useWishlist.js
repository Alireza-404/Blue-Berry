import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../redux/Slices/ToastSlice";
import { removeWishlist, setWishlistItem } from "../redux/Slices/WishlistSlice";
import {
  getWishlistItems,
  toggleWishlistItem,
} from "../services/WishlistService";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useWishlist() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [heartLoading, setHeartLoading] = useState(false);

  const handleToggleWishlist = async (productId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    setHeartLoading(true);
    const result = await toggleWishlistItem(user.id, productId);

    switch (result.type) {
      case "added":
        const { data } = await getWishlistItems(user.id);
        dispatch(setWishlistItem(data));
        setTimeout(() => {
          setHeartLoading(false);
        }, 100);
        break;
      case "deleted":
        dispatch(removeWishlist(result.product_id));
        setTimeout(() => {
          setHeartLoading(false);
        }, 100);
        break;
      case "fetch_error":
        dispatch(
          showToast({
            type: "error",
            message: t("wishlist.fetchWishlistError"),
          }),
        );
        setHeartLoading(false);
        break;
      case "insert_error":
        dispatch(
          showToast({
            type: "error",
            message: t("wishlist.addToWishlistError"),
          }),
        );
        setHeartLoading(false);
        break;
      case "delete_error":
        dispatch(
          showToast({
            type: "error",
            message: t("wishlist.removeFromWishlistError"),
          }),
        );
        setHeartLoading(false);
        break;
      default:
        dispatch(
          showToast({
            type: "error",
            message: t("wishlist.unknownWishlistError"),
          }),
        );
        setHeartLoading(false);
    }
  };

  return { handleToggleWishlist, heartLoading, setHeartLoading };
}
