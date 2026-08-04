import { useDispatch, useSelector } from "react-redux";
import {
  removeCartItem,
  setCartItems,
  updateQuantity,
} from "../redux/Slices/CartItemsSlice";
import { useEffect, useState } from "react";
import {
  addProductToCart,
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../services/CartService";
import { showToast } from "../redux/Slices/ToastSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function useCart() {
  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [idsForUpdateQuantity, setIdsForUpdateQuantity] = useState([]);
  const [idsForDelete, setIdsForDelete] = useState([]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    setAddToCartLoading(true);
    const result = await addProductToCart(user.id, productId);

    switch (result.type) {
      case "added":
        dispatch(
          showToast({
            type: "success",
            message: t("cartProducts.successAddedToCart"),
          })
        );
        break;
      case "updated":
        dispatch(
          showToast({
            type: "success",
            message: t("cartProducts.cartItemUpdate"),
          })
        );
        break;
      case "fetch_error":
        dispatch(
          showToast({
            type: "error",
            message: t("cartProducts.fetchCartError"),
          })
        );
        break;
      case "updated_error":
        dispatch(
          showToast({
            type: "error",
            message: t("cartProducts.updateCartError"),
          })
        );
        break;
      case "insert_error":
        dispatch(
          showToast({
            type: "error",
            message: t("cartProducts.addToCartError"),
          })
        );
        break;
      default:
        dispatch(
          showToast({
            type: "error",
            message: t("cartProducts.unknownError"),
          })
        );
    }
    const { data } = await getCartItems(user.id);
    dispatch(setCartItems(data));
    setAddToCartLoading(false);
  };

  const handleRemoveCartItem = async (cartId) => {
    setIdsForDelete((prev) => [...prev, cartId]);

    const success = await deleteCartItem(cartId);

    if (!success) return;

    dispatch(removeCartItem(cartId));
    setIdsForDelete((prev) => prev.filter((id) => id !== cartId));
  };

  const fetchCartItems = async () => {
    if (!user.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data } = await getCartItems(user.id);
    dispatch(setCartItems(data));

    setLoading(false);
  };

  const handleIncreaseQuantity = async (item) => {
    setIdsForUpdateQuantity((prev) => [...prev, item.id]);
    const { id, quantity } = item;
    const newQuantity = quantity + 1;

    const success = await updateCartItemQuantity(id, newQuantity);
    if (!success) {
      removeUpdatingId(id);

      dispatch(
        showToast({
          type: "error",
          message: t("cartProducts.failedToIncreaseQuantity"),
        })
      );

      return;
    }

    dispatch(
      updateQuantity({
        cartId: id,
        quantity: newQuantity,
      })
    );
    removeUpdatingId(id);
  };

  const handleDecreaseQuantity = async (item) => {
    setIdsForUpdateQuantity((prev) => [...prev, item.id]);
    const { id, quantity } = item;
    const newQuantity = quantity - 1;

    if (newQuantity <= 0) {
      removeUpdatingId(id);
      return;
    }

    const success = await updateCartItemQuantity(id, newQuantity);

    if (!success) {
      removeUpdatingId(id);

      dispatch(
        showToast({
          type: "error",
          message: t("cartProducts.failedToDecreaseQuantity"),
        })
      );

      return;
    }

    dispatch(
      updateQuantity({
        cartId: id,
        quantity: newQuantity,
      })
    );
    removeUpdatingId(id);
  };

  const removeUpdatingId = (cartId) => {
    setIdsForUpdateQuantity((prev) => prev.filter((id) => id !== cartId));
  };

  useEffect(() => {
    fetchCartItems();
  }, [user?.id]);

  return {
    handleAddToCart,
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    loading,
    addToCartLoading,
    idsForDelete,
    idsForUpdateQuantity,
  };
}
