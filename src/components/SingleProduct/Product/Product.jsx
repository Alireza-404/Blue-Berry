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
import {
  getWishlistItems,
  toggleWishlistItem,
} from "../../../services/ProductsService";
import { showToast } from "../../../redux/Slices/ToastSlice";
import ShowProductModal from "../../Home/ShowProductModal/ShowProductModal";
import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";
import {
  removeWishlist,
  setWishlistItem,
} from "../../../redux/Slices/WishlistSlice";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";

export default function Product({ product }) {
  const { t, i18n } = useTranslation();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const {
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    idsForUpdateQuantity,
    addToCartLoading,
  } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProduct, setShowProduct] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);

  const cartItem = cartItems.find((item) => item.product_id === product.id);
  const isWishlisted = wishlist.some((item) => item.product_id === product.id);

  const handleToggleWishlist = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    setHeartLoading(true);
    const result = await toggleWishlistItem(user.id, product.id);

    if (result.type === "fetch_error") {
      setHeartLoading(false);
      return;
    }

    if (result.type === "insert_error") {
      setHeartLoading(false);
      return;
    }

    if (result.type === "unknown_error") {
      setHeartLoading(false);
      return;
    }

    if (result.type === "added") {
      dispatch(
        showToast({
          type: "primary",
          message: t("wishlist.addedToWishlist"),
        })
      );

      const { data } = await getWishlistItems(user.id);
      dispatch(setWishlistItem(data));
      setTimeout(() => {
        setHeartLoading(false);
      }, 100);
    }

    if (result.type === "deleted") {
      dispatch(
        showToast({
          type: "primary",
          message: t("wishlist.removedFromWishlist"),
        })
      );

      dispatch(removeWishlist(result.product_id));
      setTimeout(() => {
        setHeartLoading(false);
      }, 100);
    }
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
            className={"px-4 h-11 flex items-center gap-x-2 w-fit"}
            click={() => handleAddToCart(product.id)}
            disabled={addToCartLoading}
          >
            {t("cartProducts.addToCart")}
            {addToCartLoading && (
              <div
                className="w-4 h-4 border-x-2 border-b-2 border-gray-200
                rounded-full animate-spin"
              ></div>
            )}
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
                onClick={() => handleDecreaseQuantity(cartItem)}
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
                onClick={() => handleIncreaseQuantity(cartItem)}
              >
                <AiOutlinePlus />
              </button>
            </div>
          )}

          <PrimaryButton
            type={"button"}
            className={`group w-12 h-11 flex items-center justify-center ${
              isWishlisted
                ? "text-red-500 dark:text-red-600"
                : "dark:text-secondary-D"
            }`}
            disabled={heartLoading}
            click={handleToggleWishlist}
          >
            {heartLoading ? (
              <div
                className="w-4 h-4 border-x-2 border-b-2 border-secondary
                dark:border-secondary-D rounded-full animate-spin group-hover:border-white"
              ></div>
            ) : (
              <AiOutlineHeart className="text-xl" />
            )}
          </PrimaryButton>

          <PrimaryButton
            type={"button"}
            className={
              "w-12 h-11 flex items-center justify-center dark:text-secondary-D"
            }
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
