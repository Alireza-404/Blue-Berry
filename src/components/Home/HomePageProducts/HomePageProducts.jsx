import { useEffect, useMemo, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineStar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../redux/Slices/ToastSlice";
import { setCartItems } from "../../../redux/Slices/CartItemsSlice";
import { getCartItems } from "../../../services/CartService";
import ShowProductModal from "../ShowProductModal/ShowProductModal";
import {
  addProductToCart,
  getProducts,
  toggleWishlistItem,
} from "../../../services/ProductsService";
import {
  addWishlistItem,
  removeWishlist,
} from "../../../redux/Slices/WishlistSlice";

export default function HomePageProducts() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [productForShow, setProductForShow] = useState([]);

  useEffect(() => {
    handleGetProducts();
  }, []);

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

  const handleGetProducts = async () => {
    setLoading(true);

    const result = await getProducts();

    if (!result.success) {
      console.log(result.error);
      setLoading(false);
    } else {
      setProducts(result.data);
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      navigate("/auth/login", { replace: true });
      return;
    }

    setAddToCartLoading(true);
    const result = await addProductToCart(user.id, product.id);
    setAddToCartLoading(false);

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

  const handleToggleWishlist = async (productId) => {
    setHeartLoading(true);
    const result = await toggleWishlistItem(user.id, productId);
    setHeartLoading(false);

    if (result.type === "fetch_error") {
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
          type: "primary",
          message: t("wishlist.addedToWishlist"),
        })
      );

      dispatch(addWishlistItem(result.item));
    }

    if (result.type === "deleted") {
      dispatch(
        showToast({
          type: "primary",
          message: t("wishlist.removedFromWishlist"),
        })
      );

      dispatch(removeWishlist(result.product_id));
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {!loading ? (
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
                      <a href="#">
                        <img
                          src={product.second_image}
                          alt={`product-${product.id}`}
                          className="select-none group-hover:scale-110 group-hover:opacity-100
                      group-hover:visible opacity-0 invisible absolute top-0 left-0"
                        />
                      </a>
                    )}

                    <ul
                      className="flex items-center gap-x-1.5 absolute bottom-5 left-1/2
                    -translate-x-1/2"
                    >
                      <li>
                        <button
                          type="button"
                          disabled={heartLoading}
                          className={`bg-white dark:bg-body border border-TB/15 
                        dark:border-box-border-D text-[22px] rounded-lg inline-block p-2.5
                        hover:text-white hover:bg-primary
                        dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                        dark:hover:border-primary hover:border-primary
                          group-hover:opacity-100 group-hover:visible ${
                            isWishlisted
                              ? "text-red-500 dark:text-red-600"
                              : "text-secondary dark:text-secondary-D"
                          }`}
                          onClick={() => handleToggleWishlist(product.id)}
                        >
                          <AiOutlineHeart />
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          className="bg-white dark:bg-body border border-TB/15 
                        dark:border-box-border-D text-[22px] rounded-lg inline-block p-2.5
                        text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                        dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                        dark:hover:border-primary hover:border-primary
                          group-hover:opacity-100 group-hover:visible"
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
                          className="bg-white dark:bg-body border border-TB/15 
                        dark:border-box-border-D text-[22px] rounded-lg inline-block p-2.5
                        text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                        dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                        dark:hover:border-primary hover:border-primary
                          group-hover:opacity-100 group-hover:visible"
                          onClick={() => handleAddToCart(product)}
                        >
                          <AiOutlineShopping />
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 flex flex-col gap-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-secondary dark:text-secondary-D">
                        <a href="#">{product.category}</a>
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
                        {product.title}
                      </a>
                    </h3>

                    <div className="flex items-center justify-between">
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

                      <span className="text-secondary dark:text-secondary-D">
                        {product.unit}
                      </span>
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
      ) : (
        Array.from({ length: 4 }).map((_, i) => {
          return (
            <div
              key={i}
              className="h-[421px] bg-secondary/50 dark:bg-secondary-D/50 rounded-3xl
                animate-pulse"
            ></div>
          );
        })
      )}
    </div>
  );
}
