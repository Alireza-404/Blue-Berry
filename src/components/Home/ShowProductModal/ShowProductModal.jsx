import Overlay from "../../Ui/Overlay/Overlay";
import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";

import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import { LuShoppingBag } from "react-icons/lu";
import { BiX } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import { useSelector } from "react-redux";

export default function ShowProductModal({
  showProduct,
  setShowProduct,
  product,
}) {
  const { t, i18n } = useTranslation();
  const {
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    idsForUpdateQuantity,
    addToCartLoading,
  } = useCart();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const root = window.document.documentElement;

  const [isCursorInImage, setIsCursorInImage] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const cartItem = cartItems.find((item) => item.product_id === product.id);

  useEffect(() => {
    if (showProduct) {
      root.classList.add("overflow-y-hidden");
    } else {
      root.classList.remove("overflow-y-hidden");
    }
  }, [showProduct]);

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
                className="relative duration-0 px-4 pb-4 pt-9 md:px-5 md:pb-4
                bg-white dark:bg-box-D rounded-2xl z-40 w-80 sm:w-96 md:w-[666px] h-fit 
                flex flex-col gap-y-4 md:flex-row gap-x-4  overflow-hidden"
              >
                <div
                  className="overflow-hidden shrink-0 rounded-3xl w-fit border
                  border-TB/15 dark:border-box-border-D"
                >
                  <img
                    src={product.image}
                    alt={`Product-Image-${product.id}`}
                    className={`w-full md:w-[260px] md:h-full object-cover transition-transform 
                      duration-300 ${
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
                    {i18n.language === "en" || i18n.language === "en-US"
                      ? product.title_en
                      : product.title_de}
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
                    <PrimaryButton
                      type={"button"}
                      className={
                        "group px-4 h-11 w-fit dark:text-secondary-D flex items-center gap-x-2"
                      }
                      click={() => handleAddToCart(product.id, product.stock)}
                      disabled={addToCartLoading}
                    >
                      <LuShoppingBag className="text-lg" />

                      {t("cartProducts.addToCart")}

                      {addToCartLoading && (
                        <div
                          className="w-4 h-4 border-x-2 border-b-2 border-secondary
                        dark:border-secondary-D rounded-full animate-spin group-hover:border-white"
                        ></div>
                      )}
                    </PrimaryButton>

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
                  </div>
                </div>

                <span
                  className="w-9 h-16 bg-red-600 rounded-full flex items-end justify-center
                  p-1 absolute top-0 right-4 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowProduct(false)}
                >
                  <BiX className="text-white text-3xl" />
                </span>
              </motion.div>
            </div>

            <Overlay click={() => setShowProduct(false)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
