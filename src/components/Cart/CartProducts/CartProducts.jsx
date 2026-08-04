import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";

import { useEffect, useState } from "react";
import {
  AiOutlineDelete,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoTrash, IoTrashOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  getCartItems,
  updateCartItemQuantity,
} from "../../../services/CartService";
import {
  removeCartItem,
  setCartItems,
  updateQuantity,
} from "../../../redux/Slices/CartItemsSlice";
import { showToast } from "../../../redux/Slices/ToastSlice";

export default function CartProducts() {
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [idsForDelete, setIdsForDelete] = useState([]);
  const [idsForUpdateQuantity, setIdsForUpdateQuantity] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchCartItems();
    }
  }, [user?.id]);

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

  const handleRemoveCartItem = async (cartId) => {
    setIdsForDelete((prev) => [...prev, cartId]);

    const success = await deleteCartItem(cartId);

    if (!success) return;

    dispatch(removeCartItem(cartId));
    setIdsForDelete((prev) => prev.filter((id) => id !== cartId));
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

  return (
    <div className="flex flex-col gap-y-4">
      <div className="border border-TB/15 dark:border-box-border-D rounded-xl w-full overflow-x-auto my-scroll">
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
