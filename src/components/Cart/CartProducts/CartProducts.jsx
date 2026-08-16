import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";

import { useEffect, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  updateCartItemQuantity,
} from "../../../services/CartService";
import {
  setCartItems,
  updateQuantity,
} from "../../../redux/Slices/CartItemsSlice";
import { showToast } from "../../../redux/Slices/ToastSlice";
import useCart from "../../../hooks/useCart";

export default function CartProducts() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {
    handleRemoveCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    loading,
    idsForUpdateQuantity,
    idsForDelete,
  } = useCart();

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-y-4">
      <div
        className="border border-TB/15 dark:border-box-border-D rounded-xl w-full overflow-x-auto my-scroll
        lg:max-h-[595px]"
      >
        <table className="w-[768px] md:w-full">
          <thead className="border-b border-TB/15 dark:border-box-border-D">
            <tr>
              <th className="text-start text-TB dark:text-white text-lg p-4 border-TB/15 dark:border-box-border-D">
                {t("cartProducts.product")}
              </th>

              <th className="text-start text-TB dark:text-white text-lg p-4 border-TB/15 dark:border-box-border-D">
                {t("cartProducts.price")}
              </th>

              <th className="text-start text-TB dark:text-white text-lg p-4 border-TB/15 dark:border-box-border-D">
                {t("cartProducts.quantity")}
              </th>

              <th className="text-start text-TB dark:text-white text-lg p-4 border-TB/15 dark:border-box-border-D">
                {t("cartProducts.total")}
              </th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              {Array.from({ length: 2 }).map((_, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className="flex items-center gap-x-2.5 p-4 animate-pulse">
                        <div
                          className="border border-TB/15 dark:border-box-border-D rounded-lg w-[68px] h-[68px]
                        bg-secondary/50 dark:bg-secondary-D/50"
                        ></div>

                        <span className="bg-secondary/50 dark:bg-secondary-D/50 w-40 h-6 inline-block rounded"></span>
                      </div>
                    </td>

                    <td>
                      <div className="p-4 animate-pulse flex items-center">
                        <span className="bg-secondary/50 dark:bg-secondary-D/50 w-7 h-6 inline-block rounded"></span>
                      </div>
                    </td>

                    <td>
                      <div className="p-4">
                        <div
                          className="bg-secondary/50 dark:bg-secondary-D/50 w-20 h-11
                          border border-TB/15 dark:border-box-border-D rounded-xl animate-pulse"
                        ></div>
                      </div>
                    </td>

                    <td>
                      <div className="p-4 animate-pulse flex items-center">
                        <span className="bg-secondary/50 dark:bg-secondary-D/50 w-7 h-6 inline-block rounded"></span>
                      </div>
                    </td>

                    <td>
                      <div className="p-4 animate-pulse flex items-center">
                        <span className="bg-secondary/50 dark:bg-secondary-D/50 w-7 h-6 inline-block rounded"></span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              {cartItems.length !== 0 ? (
                cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <a href="#" className="flex items-center gap-x-2.5 p-4">
                          <img
                            src={item.product.image}
                            alt="product-1"
                            className="border border-TB/15 dark:border-box-border-D rounded-lg w-[68px] h-[68px]"
                          />

                          <span className="line-clamp-1 text-secondary dark:text-secondary-D">
                            {item.product.title}
                          </span>
                        </a>
                      </div>
                    </td>

                    <td>
                      <div className="p-4">
                        <span className="text-TB dark:text-white text-lg">
                          $
                          {Math.floor(
                            item.product.price -
                              (item.product.price * item.product.discount) / 100
                          )}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="p-4">
                        <div
                          className={`flex items-center gap-x-1 border rounded-xl w-fit ${
                            idsForUpdateQuantity.includes(item.id)
                              ? "border-TB/5 dark:border-box-border-D/50"
                              : "border-TB/15 dark:border-box-border-D"
                          }`}
                        >
                          <button
                            type="button"
                            className={`py-2.5 px-3.5 ${
                              idsForUpdateQuantity.includes(item.id) ||
                              item.quantity === 1
                                ? "text-secondary/50 dark:text-secondary-D/50 cursor-default"
                                : "text-secondary dark:text-secondary-D cursor-pointer"
                            }`}
                            disabled={idsForUpdateQuantity.includes(item.id)}
                            onClick={() => handleDecreaseQuantity(item)}
                          >
                            <AiOutlineMinus />
                          </button>

                          <span className="text-secondary dark:text-secondary-D select-none">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            disabled={idsForUpdateQuantity.includes(item.id)}
                            className={`py-2.5 px-3.5 ${
                              idsForUpdateQuantity.includes(item.id)
                                ? "text-secondary/50 dark:text-secondary-D/50 cursor-default"
                                : "text-secondary dark:text-secondary-D cursor-pointer"
                            }`}
                            onClick={() => handleIncreaseQuantity(item)}
                          >
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="p-4">
                        <span className="text-TB dark:text-white text-lg">
                          $
                          {item.quantity *
                            Math.floor(
                              item.product.price -
                                (item.product.price * item.product.discount) /
                                  100
                            )}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div className="p-2 flex items-start">
                        <button
                          type="button"
                          disabled={idsForDelete.includes(item.id)}
                          onClick={() => handleRemoveCartItem(item.id)}
                          className={`text-[22px]
                          inline-block p-1 ${
                            idsForDelete.includes(item.id)
                              ? "text-secondary/50 dark:text-secondary-D/50"
                              : "text-secondary dark:text-secondary-D dark:hover:text-red-500 hover:text-red-500 cursor-pointer"
                          }`}
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="h-72">
                    <div className="flex flex-col items-center justify-center h-full gap-y-3">
                      <span className="text-6xl text-primary">
                        <AiOutlineShoppingCart />
                      </span>

                      <h3 className="text-2xl font-bold text-TB dark:text-white">
                        {t("cartProducts.emptyCart")}
                      </h3>

                      <p className="max-w-sm text-center text-secondary dark:text-secondary-D">
                        {t("cartProducts.emptyCartDescription")}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>

      {!loading && (
        <SecondaryButton type={"button"} className={"px-4 py-2 w-fit"}>
          Check Out
        </SecondaryButton>
      )}
    </div>
  );
}
