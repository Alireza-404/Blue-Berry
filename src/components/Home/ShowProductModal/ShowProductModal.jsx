import Overlay from "../../Ui/Overlay/Overlay";
import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";

import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProductToCart } from "../../../services/ProductsService";
import { showToast } from "../../../redux/Slices/ToastSlice";
import {
  getCartItems,
  updateCartItemQuantity,
} from "../../../services/CartService";
import {
  setCartItems,
  updateQuantity,
} from "../../../redux/Slices/CartItemsSlice";

export default function ShowProductModal({
  showProduct,
  setShowProduct,
  product,
}) {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isCursorInImage, setIsCursorInImage] = useState(false);
  const [idsForUpdateQuantity, setIdsForUpdateQuantity] = useState([]);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const cartItem = cartItems.find((item) => item.product_id === product.id);

  const handleMouseMove = (event) => {
    setIsCursorInImage(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const { clientX, clientY } = event;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPosition({
      x,
      y,
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/auth/login", { replace: true });
      return;
    }

    const result = await addProductToCart(user.id, product.id);

    if (result.type === "fetch_error") {
      return;
    }

    if (result.type === "updated_error") {
      return;
    }

    if (result.type === "insert_error") {
      return;
    }

    if (result.type === "unknown_error") {
      return;
    }

    if (result.type === "added") {
      dispatch(
        showToast({
          type: "success",
          message: t("cartProducts.successAddedToCart"),
        })
      );
    }

    if (result.type === "updated") {
      dispatch(
        showToast({
          type: "success",
          message: t("cartProducts.cartItemUpdate"),
        })
      );
    }

    const data = await getCartItems(user.id);
    dispatch(setCartItems(data));
  };

  const handleIncreaseQuantity = async () => {
    setIdsForUpdateQuantity((prev) => [...prev, cartItem.id]);
    const newQuantity = cartItem.quantity + 1;

    const success = await updateCartItemQuantity(cartItem.id, newQuantity);

    if (!success) {
      removeUpdatingId();

      dispatch(
        showToast({
          type: "error",
          message: t("cartProducts.failedToIncreaseQuantity"),
        })
      );

      return;
    }

    dispatch(updateQuantity({ cartId: cartItem.id, quantity: newQuantity }));
    removeUpdatingId();
  };

  const handleDecreaseQuantity = async () => {
    setIdsForUpdateQuantity((prev) => [...prev, cartItem.id]);
    const newQuantity = cartItem.quantity - 1;

    if (newQuantity <= 0) {
      removeUpdatingId(cartItem.id);
      return;
    }

    const success = updateCartItemQuantity(cartItem.id, newQuantity);

    if (!success) {
      removeUpdatingId();

      dispatch(
        showToast({
          type: "error",
          message: t("cartProducts.failedToIncreaseQuantity"),
        })
      );

      return;
    }

    dispatch(updateQuantity({ cartId: cartItem.id, quantity: newQuantity }));
    removeUpdatingId();
  };

  const removeUpdatingId = () => {
    setIdsForUpdateQuantity((prev) => prev.filter((id) => id !== cartItem.id));
  };

  return (
    <>
      <AnimatePresence>
        {showProduct && (
          <>
            <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-40">
              <motion.div
                initial={{ scale: 0.6, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: 40 }}
                transition={{ duration: 0.3 }}
                className="duration-0 p-4 bg-white dark:bg-box-D flex items-start gap-x-4
                rounded-2xl z-40 w-[666px]"
              >
                <div className="overflow-hidden shrink-0 rounded-3xl">
                  <img
                    src={product.image}
                    alt={`Product-Image-${product.id}`}
                    className={`w-60 h-[320px] object-cover transition-transform duration-300 ${
                      isCursorInImage ? "scale-[1.8]" : "scale-100"
                    }`}
                    style={
                      isCursorInImage
                        ? { transformOrigin: `${position.x}% ${position.y}%` }
                        : { transformOrigin: "center center" }
                    }
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setIsCursorInImage(false)}
                  />
                </div>

                <div className="flex flex-col gap-y-4">
                  <h5 className="text-TB dark:text-white text-xl">
                    {product.title} This Is A Elan Mosk Very Good Is For She Man
                    HE
                  </h5>

                  <div className="flex items-center gap-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      return (
                        <span key={star}>
                          {product.stars >= star ? (
                            <AiFillStar className="text-orange-400" />
                          ) : (
                            <AiOutlineStar className="text-secondary dark:text-secondary-D" />
                          )}
                        </span>
                      );
                    })}
                  </div>

                  <p className="text-secondary dark:text-secondary-D font-normal">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Repudiandae consequuntur iste esse earum perferendis
                    temporibus, minus dicta, non commodi consequatur magnam
                    doloremque suscipit.
                  </p>

                  {product.discount ? (
                    <div className="flex gap-x-2 items-end">
                      <span className="text-TB dark:text-white font-bold text-lg">
                        $
                        {Math.floor(
                          product.price -
                            (product.price * product.discount) / 100
                        ).toFixed(2)}
                      </span>

                      <span className="text-secondary dark:text-secondary-D line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-TB dark:text-white font-bold text-lg">
                      ${product.price.toFixed(2)}
                    </span>
                  )}

                  <div className="flex items-center gap-x-4">
                    {cartItem && (
                      <div
                        className={`flex items-center gap-x-1 border rounded-lg w-fit
                          h-11 ${
                            idsForUpdateQuantity.includes(cartItem.id)
                              ? "border-TB/5 dark:border-box-border-D/50"
                              : "border-TB/15 dark:border-box-border-D"
                          }`}
                      >
                        <button
                          type="button"
                          className={`h-full px-2 ${
                            idsForUpdateQuantity.includes(cartItem.id) ||
                            cartItem.quantity === 1
                              ? "text-secondary/50 dark:text-secondary-D/50 cursor-default"
                              : "text-secondary dark:text-secondary-D cursor-pointer"
                          }`}
                          disabled={idsForUpdateQuantity.includes(cartItem.id)}
                          onClick={() => handleDecreaseQuantity()}
                        >
                          <AiOutlineMinus />
                        </button>

                        <span className="text-secondary dark:text-secondary-D select-none">
                          {cartItem.quantity}
                        </span>

                        <button
                          type="button"
                          disabled={idsForUpdateQuantity.includes(cartItem.id)}
                          className={`h-full px-2 ${
                            idsForUpdateQuantity.includes(cartItem.id)
                              ? "text-secondary/50 dark:text-secondary-D/50 cursor-default"
                              : "text-secondary dark:text-secondary-D cursor-pointer"
                          }`}
                          onClick={() => handleIncreaseQuantity()}
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    )}

                    <PrimaryButton
                      type={"button"}
                      className={
                        "px-4 h-11 w-fit dark:text-secondary-D flex items-center gap-x-2"
                      }
                      click={handleAddToCart}
                    >
                      <LuShoppingBag className="text-lg" />
                      {t("cartProducts.addToCart")}
                    </PrimaryButton>
                  </div>
                </div>
              </motion.div>
            </div>

            <Overlay click={() => setShowProduct(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
