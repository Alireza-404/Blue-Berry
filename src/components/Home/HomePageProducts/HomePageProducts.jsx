import gsap from "gsap";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineStar,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { showToast } from "../../../redux/Slices/ToastSlice";
import { setCartItems } from "../../../redux/Slices/CartItemsSlice";
import { getCartItems } from "../../../services/CartService";

export default function HomePageProducts() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
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

  const getProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      setProducts(data);
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      navigate("/auth/login", { replace: true });
      return;
    }

    const { data: item, error: fetchError } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .maybeSingle();

    if (fetchError) {
      console.log(fetchError.message);
      return;
    }

    if (item) {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: item.quantity + 1 })
        .eq("id", item.id);

      if (error) {
        console.log(error.message);
        return;
      }

      dispatch(
        showToast({
          type: "success",
          message: t("cartProducts.cartItemUpdate"),
        }),
      );

      return;
    }

    dispatch(
      showToast({
        type: "success",
        message: t("cartProducts.successAddedToCart"),
      }),
    );

    const { error } = await supabase.from("cart").insert({
      user_id: user.id,
      product_id: product.id,
      quantity: 1,
    });

    if (error) {
      console.log(error.message);
      return;
    }

    const data = await getCartItems(user.id);
    dispatch(setCartItems(data));
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {!loading
        ? products.map((product) => (
            <div
              key={product.id}
              className="group rounded-3xl overflow-hidden border border-TB/15
              relative dark:border-box-border-D"
            >
              <div className="divide-y divide-TB/15 dark:divide-box-border-D">
                <div className="overflow-hidden relative flex justify-center items-center">
                  <a href="#">
                    <img
                      src={product.image}
                      alt={`product-${product.id}`}
                      className={`select-none h-[298px] w-[298px] ${
                        product.second_image
                          ? "group-hover:opacity-0 group-hover:invisible opacity-100 visible"
                          : "group-hover:scale-110"
                      }`}
                    />
                  </a>

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
                        className="bg-white dark:bg-body border border-TB/15 
                      dark:border-box-border-D text-[22px] rounded-lg inline-block p-2.5
                      text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                      dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                      dark:hover:border-primary hover:border-primary
                        group-hover:opacity-100 group-hover:visible"
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
                      >
                        <AiOutlineEye />
                      </button>
                    </li>

                    <li>
                      <button
                        type="button"
                        title={t("cartProducts.addToCart")}
                        className="bg-white dark:bg-body border border-TB/15 
                      dark:border-box-border-D text-[22px] rounded-lg inline-block p-2.5
                      text-secondary dark:text-secondary-D hover:text-white hover:bg-primary
                      dark:hover:bg-primary dark:hover:text-white invisible opacity-0
                      dark:hover:border-primary hover:border-primary
                        group-hover:opacity-100 group-hover:visible"
                        onClick={() => addToCart(product)}
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
                      href="#"
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
                              (product.price * product.discount) / 100,
                          )}
                        </span>

                        <span className="text-secondary dark:text-secondary-D line-through">
                          ${product.price}
                        </span>
                      </div>
                    ) : (
                      <span className="text-TB dark:text-white font-bold text-lg">
                        ${product.price}
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
          ))
        : Array.from({ length: 4 }).map((_, i) => {
            return (
              <div
                key={i}
                className="h-[421px] bg-secondary/50 dark:bg-secondary-D/50 rounded-3xl
                animate-pulse"
              ></div>
            );
          })}
    </div>
  );
}
