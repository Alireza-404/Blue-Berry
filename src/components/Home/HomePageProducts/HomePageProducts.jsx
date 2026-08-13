import { useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineStar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ShowProductModal from "../ShowProductModal/ShowProductModal";
import ProductsSkeleton from "../../Ui/ProductsSkeleton/ProductsSkeleton";
import ProductsError from "../../Ui/ProductsError/ProductsError";
import useCart from "../../../hooks/useCart";
import useWishlist from "../../../hooks/useWishlist";
import useProducts from "../../../hooks/useProducts";

export default function HomePageProducts() {
  const { t, i18n } = useTranslation();
  const { handleAddToCart, addToCartLoading } = useCart();
  const { handleToggleWishlist, heartLoading } = useWishlist();
  const { handleGetProducts, products, loading, error } = useProducts();

  const { items: wishlist, loading: wishlistLoading } = useSelector(
    (state) => state.wishlist
  );
  const [showProduct, setShowProduct] = useState(false);
  const [productForShow, setProductForShow] = useState([]);

  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  useEffect(() => {
    if (!loading && products.length) {
      ScrollTrigger.refresh(true);
    }
  }, [loading, products]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [loading]);

  const wishlistIds = useMemo(() => {
    return new Set(wishlist.map((item) => item.product_id));
  }, [wishlist]);

  return (
    <div className="grid grid-cols-4 gap-6">
      {loading ? (
        <ProductsSkeleton />
      ) : error ? (
        <ProductsError
          text={t("homePageProducts.productsLoadError")}
          getProducts={handleGetProducts}
        />
      ) : (
        <>
          {products.map((product) => {
            const isWishlisted = wishlistIds.has(product.id);

            return (
              <div
                key={product.id}
                className="group rounded-3xl overflow-hidden border border-TB/15
                relative dark:border-box-border-D"
              >
                <div className="divide-y divide-TB/15 dark:divide-box-border-D">
                  <div className="overflow-hidden relative flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={`product-${product.id}`}
                      className={`select-none h-[298px] w-[298px] ${
                        product.second_image
                          ? "group-hover:opacity-0 group-hover:invisible opacity-100 visible"
                          : "group-hover:scale-110"
                      }`}
                    />

                    {product.second_image && (
                      <img
                        src={product.second_image}
                        alt={`product-${product.id}`}
                        className="select-none group-hover:scale-110 group-hover:opacity-100
                      group-hover:visible opacity-0 invisible absolute top-0 left-0"
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
                          onClick={() => handleToggleWishlist(product.id)}
                        >
                          {heartLoading || wishlistLoading ? (
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
                          className="bg-white dark:bg-body border border-TB/15 w-11 h-11
                        dark:border-box-border-D text-[22px] rounded-lg flex items-center justify-center
                        text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                        dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                        dark:hover:border-primary hover:border-primary group-hover:opacity-100
                          group-hover:visible"
                          onClick={() => {
                            setShowProduct((prev) => !prev);
                            setProductForShow(product);
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
                            handleAddToCart(product.id, product.stock)
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

                  <div className="p-4 flex flex-col gap-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-secondary dark:text-secondary-D">
                        <a href="#">
                          {i18n.language === "en" || i18n.language === "en-US"
                            ? product.category_en
                            : product.category_de}
                        </a>
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
                    </div>

                    <h3>
                      <a
                        className="text-TB dark:text-white text-lg line-clamp-1 tracking-widest
                      hover:text-primary"
                        href={`/products/${product.id}`}
                      >
                        {i18n.language === "en" || i18n.language === "en-US"
                          ? product.title_en
                          : product.title_de}
                      </a>
                    </h3>

                    <div className="flex items-center justify-between">
                      {product.discount && product.stock !== 0 ? (
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
                        <>
                          <span className="text-TB dark:text-white font-bold text-lg">
                            ${product.price.toFixed(2)}
                          </span>

                          {product.stock === 0 && (
                            <span className="text-primary font-normal">
                              {i18n.language === "en" ||
                              i18n.language === "en-US"
                                ? "Out of Stock"
                                : "Nicht vorrätig"}
                            </span>
                          )}
                        </>
                      )}

                      {product.stock !== 0 && (
                        <span className="text-secondary dark:text-secondary-D">
                          {product.unit}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {product.label && (
                  <div
                    className="absolute top-4 left-4 flex flex-col gap-y-1 text-secondary
                  select-none group-hover:invisible group-hover:opacity-0
                  font-mono font-bold"
                  >
                    {product.label.split("").map((text, i) => (
                      <span key={i}>{text}</span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <ShowProductModal
            showProduct={showProduct}
            setShowProduct={setShowProduct}
            product={productForShow}
          />
        </>
      )}
    </div>
  );
}
