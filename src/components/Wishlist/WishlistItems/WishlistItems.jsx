import ShowProductModal from "../../Home/ShowProductModal/ShowProductModal";
import ProductsSkeleton from "../../Ui/ProductsSkeleton/ProductsSkeleton";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import useUserData from "../../../hooks/useUserData";
import ErrorSkeleton from "../../Ui/ErrorSkeleton/ErrorSkeleton";

import {
  AiFillCloseCircle,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineStar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function WishlistItems() {
  const { t, i18n } = useTranslation();
  const { items, loading, error } = useSelector((state) => state.wishlist);
  const { handleAddToCart, addToCartLoading } = useCart();
  const { handleToggleWishlist, heartLoading } = useWishlist();
  const { getWishlist } = useUserData();

  const [showProduct, setShowProduct] = useState(false);
  const [productForShow, setProductForShow] = useState([]);

  const wishlistIds = useMemo(() => {
    return new Set(items.map((item) => item.product_id));
  }, [items]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading ? (
        <ProductsSkeleton />
      ) : error ? (
        <ErrorSkeleton
          text={t("wishlist.wishlistLoadError")}
          get={getWishlist}
          className={"h-80 justify-center"}
        />
      ) : items.length > 0 ? (
        <>
          {items.map((item) => {
            const isWishlisted = wishlistIds.has(item.product_id);

            return (
              <div
                key={item.id}
                className="group rounded-3xl overflow-hidden border border-TB/15
                  relative dark:border-box-border-D"
              >
                <div className="divide-y divide-TB/15 dark:divide-box-border-D">
                  <div className="overflow-hidden relative flex justify-center items-center">
                    <img
                      src={item.product.image}
                      alt={`product-${item.product.id}`}
                      className={`select-none ${
                        item.product.second_image
                          ? "group-hover:opacity-0 group-hover:invisible opacity-100 visible"
                          : "group-hover:scale-110"
                      }`}
                    />

                    {item.product.second_image && (
                      <img
                        src={item.product.second_image}
                        alt={`product-${item.product.id}`}
                        className="select-none group-hover:scale-110 group-hover:opacity-100
                        group-hover:visible opacity-0 invisible absolute top-0 left-0 h-full"
                      />
                    )}

                    <ul
                      className="flex items-center gap-x-1.5 absolute bottom-5 left-1/2
                      -translate-x-1/2"
                    >
                      <li>
                        <button
                          type="button"
                          disabled={heartLoading}
                          title={t("cartProducts.wishlist")}
                          className={`group/button bg-white dark:bg-body border border-TB/15 
                          dark:border-box-border-D text-[22px] rounded-lg w-11 h-11
                          hover:text-white hover:bg-primary flex items-center justify-center
                          dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                          dark:hover:border-primary hover:border-primary
                            group-hover:opacity-100 group-hover:visible ${
                              isWishlisted
                                ? "text-red-500 dark:text-red-600"
                                : "text-secondary dark:text-secondary-D"
                            }`}
                          onClick={() => handleToggleWishlist(item.product.id)}
                        >
                          {heartLoading || loading ? (
                            <div
                              className="w-4 h-4 border-x-2 border-b-2 border-secondary
                              dark:border-secondary-D rounded-full animate-spin 
                              group-hover/button:border-white"
                            ></div>
                          ) : (
                            <AiOutlineHeart />
                          )}
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          title={t("cartProducts.quickView")}
                          className="bg-white dark:bg-body border border-TB/15 w-11 h-11
                          dark:border-box-border-D text-[22px] rounded-lg flex items-center justify-center
                          text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                          dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                          dark:hover:border-primary hover:border-primary group-hover:opacity-100
                            group-hover:visible"
                          onClick={() => {
                            setShowProduct((prev) => !prev);
                            setProductForShow(item.product);
                          }}
                        >
                          <AiOutlineEye />
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          title={t("cartProducts.addToCart")}
                          disabled={addToCartLoading}
                          className="group/button bg-white dark:bg-body border border-TB/15 w-11 h-11
                          dark:border-box-border-D text-[22px] rounded-lg flex items-center justify-center
                          text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                          dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                          dark:hover:border-primary hover:border-primary group-hover:opacity-100
                            group-hover:visible"
                          onClick={() =>
                            handleAddToCart(item.product.id, item.product.stock)
                          }
                        >
                          {addToCartLoading ? (
                            <div
                              className="w-4 h-4 border-x-2 border-b-2 border-secondary
                              dark:border-secondary-D rounded-full animate-spin 
                              group-hover/button:border-white"
                            ></div>
                          ) : (
                            <AiOutlineShopping />
                          )}
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 flex flex-col gap-y-2 lg:gap-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-secondary dark:text-secondary-D">
                        <Link
                          to={`/shop?category=${item.product.category_en.toLowerCase()}`}
                        >
                          {i18n.language === "en" || i18n.language === "en-US"
                            ? item.product.category_en
                            : item.product.category_de}
                        </Link>
                      </h5>

                      <div className="flex items-center gap-x-0.5">
                        {[1, 2, 3, 4, 5].map((star) => {
                          return (
                            <span key={star}>
                              {item.product.stars >= star ? (
                                <AiFillStar className="text-orange-400" />
                              ) : (
                                <AiOutlineStar className="text-secondary dark:text-secondary-D" />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <h3>
                      <a
                        className="text-TB dark:text-white lg:text-lg line-clamp-1 tracking-widest
                        hover:text-primary"
                        href={`/products/${item.product.id}`}
                      >
                        {i18n.language === "en" || i18n.language === "en-US"
                          ? item.product.title_en
                          : item.product.title_de}
                      </a>
                    </h3>

                    <div className="flex items-center justify-between">
                      {item.product.discount && item.product.stock !== 0 ? (
                        <div className="flex gap-x-2 items-end">
                          <span className="text-TB dark:text-white font-bold lg:text-lg">
                            $
                            {Math.floor(
                              item.product.price -
                                (item.product.price * item.product.discount) /
                                  100
                            ).toFixed(2)}
                          </span>

                          <span
                            className="text-secondary dark:text-secondary-D line-through
                            text-sm lg:text-base"
                          >
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <>
                          <span className="text-TB dark:text-white font-bold lg:text-lg">
                            ${item.product.price.toFixed(2)}
                          </span>

                          {item.product.stock === 0 && (
                            <span className="text-primary font-normal text-sm lg:text-base">
                              {i18n.language === "en" ||
                              i18n.language === "en-US"
                                ? "Out of Stock"
                                : "Nicht vorrätig"}
                            </span>
                          )}
                        </>
                      )}

                      {item.product.stock !== 0 && (
                        <span
                          className="text-secondary dark:text-secondary-D
                        text-sm lg:text-base"
                        >
                          {item.product.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {item.product.label && (
                  <div
                    className="absolute top-4 left-4 flex flex-col gap-y-1 text-secondary
                    select-none group-hover:invisible group-hover:opacity-0
                    font-mono font-bold"
                  >
                    {item.product.label.split("").map((text, i) => (
                      <span key={i}>{text}</span>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  disabled={heartLoading}
                  className={`absolute top-4 right-4 text-2xl text-TB/90
                    ${
                      heartLoading || loading
                        ? "opacity-65"
                        : "opacity-100 cursor-pointer hover:text-primary"
                    }`}
                  onClick={() => handleToggleWishlist(item.product.id)}
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            );
          })}

          <ShowProductModal
            showProduct={showProduct}
            setShowProduct={setShowProduct}
            product={productForShow}
          />
        </>
      ) : (
        <div className="col-span-4 flex flex-col items-center justify-center gap-y-3 h-72">
          <span className="text-6xl text-primary">
            <AiOutlineStar />
          </span>

          <h3 className="text-2xl font-bold text-TB dark:text-white">
            {t("wishlist.emptyWishlist")}
          </h3>

          <p className="max-w-sm text-center text-secondary dark:text-secondary-D">
            {t("wishlist.emptyWishlistDescription")}
          </p>
        </div>
      )}
    </div>
  );
}
