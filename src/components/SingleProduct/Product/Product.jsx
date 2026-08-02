import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
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
import ShowProductModal from "../../Home/ShowProductModal/ShowProductModal";
import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";
import InfoAndDetail from "../InfoAndDetail/InfoAndDetail";

export default function Product({ product }) {
  const { t, i18n } = useTranslation();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [idsForUpdateQuantity, setIdsForUpdateQuantity] = useState([]);
  const [showProduct, setShowProduct] = useState(false);

  const cartItem = cartItems.find((item) => item.product_id === product.id);
  const wishlistItem = wishlist.find((item) => item.product_id === product.id);

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
      return;
    }

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

  const removeUpdatingId = () => {
    setIdsForUpdateQuantity((prev) => prev.filter((id) => id !== cartItem.id));
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 w-full">
        <h3 className="text-TB dark:text-white font-bold tracking-wide text-2xl">
          {i18n.language === "en" ? product.title : product.title}
        </h3>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-0.5">
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <span key={i}>
                  {product.stars >= i + 1 ? (
                    <AiFillStar className="text-orange-400 text-lg" />
                  ) : (
                    <AiOutlineStar className="text-secondary dark:text-secondary-D text-lg" />
                  )}
                </span>
              );
            })}
          </div>

          <span className="block w-px h-5 bg-secondary dark:text-secondary-D"></span>

          <span className="text-primary font-normal">404 Ratings</span>
        </div>

        <p className="text-secondary dark:text-secondary-D font-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi
          dolorem sapiente commodi fugiat laborum, deleniti qui ratione ad
          accusantium non tenetur ullam explicabo vero?
        </p>

        <div className="flex items-start justify-between mt-4">
          {product.discount ? (
            <div className="flex flex-col gap-y-1">
              <div className="flex items-center gap-x-2">
                <span className="text-secondary dark:text-secondary-D line-through text-xl">
                  ${product.price.toFixed(2)}
                </span>

                <span
                  className="w-10 h-7 bg-primary text-white text-sm rounded-full
                flex items-center justify-center select-none"
                >
                  {product.discount}%
                </span>
              </div>

              <span className="text-TB dark:text-white font-bold text-2xl">
                $
                {Math.floor(
                  product.price - (product.price * product.discount) / 100
                ).toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-TB dark:text-white font-bold text-2xl">
              ${product.price.toFixed(2)}
            </span>
          )}

          <div className="flex flex-col gap-y-1">
            <span className="text-secondary dark:text-secondary-D text-lg">
              SKU#: AA10
            </span>

            <span className="text-primary text-lg font-normal">In Stock</span>
          </div>
        </div>

        <ul className="flex flex-col gap-y-4 list-disc px-4 mt-4">
          <li className="text-secondary dark:text-secondary-D font-normal">
            {t("singleProduct.text1")}
          </li>
          <li className="text-secondary dark:text-secondary-D font-normal">
            {t("singleProduct.text2")}
          </li>
          <li className="text-secondary dark:text-secondary-D font-normal">
            {t("singleProduct.text3")}
          </li>
          <li className="text-secondary dark:text-secondary-D font-normal">
            {t("singleProduct.text4")}
          </li>
        </ul>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          <SecondaryButton
            type={"button"}
            className={"px-4 h-11 w-fit"}
            click={handleAddToCart}
          >
            {t("cartProducts.addToCart")}
          </SecondaryButton>

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
            className={`px-4 h-11 ${
              wishlist
                ? "text-red-500 dark:text-red-600"
                : "dark:text-secondary-D"
            }`}
            heart={wishlistItem}
          >
            <AiOutlineHeart className="text-xl" />
          </PrimaryButton>

          <PrimaryButton
            type={"button"}
            className={"px-4 h-11 dark:text-secondary-D"}
            click={() => setShowProduct(true)}
          >
            <AiOutlineEye className="text-xl" />
          </PrimaryButton>
        </div>
      </div>

      <ShowProductModal
        showProduct={showProduct}
        setShowProduct={setShowProduct}
        product={product}
      />
    </>
  );
}
