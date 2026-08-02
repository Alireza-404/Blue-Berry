import NavLinks from "../../Navbar/NavLinks/NavLinks";
import Logo from "../../Navbar/Logo/Logo";
import NavLocation from "../../Navbar/NavLocation/NavLocation";
import ToggleTheme from "../../Navbar/ToggleTheme/ToggleTheme";
import Overlay from "../../Ui/Overlay/Overlay";

import {
  AiOutlineUser,
  AiOutlineStar,
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineLogout,
} from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../../lib/supabase";
import { clearUser, setLoading } from "../../../redux/Slices/AuthSlice";
import { showToast } from "../../../redux/Slices/ToastSlice";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, loading } = useSelector((state) => state.auth);
  const [menu, setMenu] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (menu) {
      window.document.documentElement.classList.add("overflow-y-hidden");
    } else {
      window.document.documentElement.classList.remove("overflow-y-hidden");
    }
  }, [menu]);

  const changeLanguageHandler = (lng) => {
    i18n.changeLanguage(lng);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const logout = async () => {
    dispatch(setLoading(true));
    const { error } = await supabase.auth.signOut();

    if (error) {
      dispatch(setLoading(false));
      return;
    }

    dispatch(clearUser());
    dispatch(
      showToast({ type: "success", message: t("validation.success.logout") })
    );
    navigate("/", { replace: true });
  };

  return (
    <nav className="flex flex-col">
      <div className="px-4 sm:px-24 md:px-4 py-6 border-b border-b-TB/15 dark:border-b-box-border-D">
        <div
          className="container mx-auto w-full flex flex-col items-center md:flex-row md:justify-between
            gap-y-4 bg-white dark:bg-body"
        >
          <div className="w-full md:w-auto">
            <Logo className={"select-none"} />
          </div>

          <div className="w-full md:w-auto flex items-center gap-x-4">
            <div
              className="shrink-0 h-12 w-16 lg:w-20 border border-TB/15 dark:border-box-border-D
              rounded-lg hidden lg:flex items-center overflow-hidden"
            >
              <span
                className={`cursor-pointer h-full w-full flex justify-center items-center ${
                  i18n.language === "en"
                    ? "bg-primary text-white"
                    : "bg-transparent text-TB dark:text-white"
                }`}
                onClick={() => changeLanguageHandler("en")}
              >
                En
              </span>

              <span
                className={`cursor-pointer h-full w-full flex justify-center items-center ${
                  i18n.language === "de"
                    ? "bg-primary text-white"
                    : "bg-transparent text-TB dark:text-white"
                }`}
                onClick={() => changeLanguageHandler("de")}
              >
                De
              </span>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                id="search-input"
                name="search"
                placeholder={t("searchInputPlaceholder")}
                spellCheck={false}
                className="w-full md:w-80 h-12 pl-2.5 pr-10 text-TB outline-none rounded-lg 
                border border-TB/15 dark:border-box-border-D focus:border-TB/40
                transition-colors duration-200 bg-white dark:bg-box-D dark:text-white
                dark:focus:border-[#5a606f] placeholder:select-none"
              />
              <label
                htmlFor="search-input"
                className="text-secondary dark:text-secondary-D text-xl absolute top-1/2 right-4 -translate-y-1/2"
              >
                <AiOutlineSearch />
              </label>
            </div>
          </div>

          <div className="flex items-center xl:items-end justify-end gap-x-6 xl:w-[460px]">
            {loading ? (
              [1, 2, 3].map((i) => {
                return (
                  <span
                    key={i}
                    className="text-primary text-[26px] md:text-[28px] lg:text-3xl xl:text-[38px]
                    flex items-center gap-x-1.5 h-full animate-pulse"
                  >
                    <div
                      className="w-10 h-10 bg-secondary/50 dark:bg-secondary-D/50
                      rounded-lg"
                    ></div>

                    <div className="hidden xl:flex flex-col gap-y-1">
                      <span
                        className="bg-secondary/50 dark:bg-secondary-D/50 w-14 h-3 rounded
                        text-sm leading-3"
                      ></span>

                      <span
                        className="bg-TB/50 dark:bg-white/50 w-14 h-3 rounded
                        font-bold"
                      ></span>
                    </div>
                  </span>
                );
              })
            ) : (
              <>
                {user ? (
                  <button
                    type="button"
                    className="text-primary text-[26px] md:text-[28px] lg:text-3xl xl:text-[38px]
                    cursor-pointer flex items-end gap-x-1.5"
                    onClick={logout}
                  >
                    <AiOutlineLogout />

                    <div className="hidden xl:flex flex-col">
                      <span className="text-secondary dark:text-secondary-D text-sm leading-3">
                        {t("user.account")}
                      </span>
                      <span className="text-TB dark:text-white text-base font-bold">
                        {t("user.logout")}
                      </span>
                    </div>
                  </button>
                ) : (
                  <Link
                    to={"/auth/login"}
                    className="text-primary text-[26px] md:text-[28px] lg:text-3xl xl:text-[38px]
                    cursor-pointer flex items-end gap-x-1.5"
                  >
                    <AiOutlineUser />

                    <div className="hidden xl:flex flex-col">
                      <span className="text-secondary dark:text-secondary-D text-sm leading-3">
                        {t("user.account")}
                      </span>
                      <span className="text-TB dark:text-white text-base font-bold">
                        {t("user.login")}
                      </span>
                    </div>
                  </Link>
                )}

                <Link
                  to={"/wishlist"}
                  className="text-primary text-[26px] md:text-[28px] lg:text-3xl xl:text-[38px]
                  cursor-pointer flex items-end gap-x-1.5"
                >
                  <AiOutlineStar />

                  <div className="hidden xl:flex flex-col">
                    <span className="text-secondary dark:text-secondary-D text-sm leading-3">
                      {wishlist.length} {t("user.items")}
                    </span>
                    <span className="text-TB dark:text-white text-base font-bold">
                      {t("user.wishlist")}
                    </span>
                  </div>
                </Link>

                <Link
                  to={"/cart"}
                  className="text-primary text-[26px] md:text-[28px] lg:text-3xl xl:text-[38px]
                  cursor-pointer flex items-end gap-x-1.5"
                >
                  <AiOutlineShoppingCart />

                  <div className="hidden xl:flex flex-col">
                    <span className="text-secondary dark:text-secondary-D text-sm leading-3">
                      {cartItems.length} {t("user.items")}
                    </span>
                    <span className="text-TB dark:text-white text-base font-bold">
                      {t("user.cart")}
                    </span>
                  </div>
                </Link>

                <span
                  className="text-primary text-[26px] md:text-[28px] lg:hidden cursor-pointer"
                  onClick={() => setMenu(true)}
                >
                  <AiOutlineMenu />
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block px-4 py-2 border-b border-b-TB/15 bg-white dark:bg-box-D
        dark:border-b-box-border-D"
      >
        <div className="container mx-auto w-full flex items-center justify-between">
          <NavLinks />

          <div className="flex items-center gap-x-2.5">
            <ToggleTheme />
            <NavLocation />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed z-40 top-0 bottom-0 w-72 bg-white dark:bg-body duration-0
              px-4 py-8 flex flex-col gap-y-10"
            >
              <div className="flex items-end justify-between">
                <h3 className="text-TB dark:text-white font-semibold text-xl">
                  Menu
                </h3>

                <span className="p-0.5">
                  <AiOutlineClose
                    className="text-red-500 dark:text-red-600 text-2xl"
                    onClick={closeMenu}
                  />
                </span>
              </div>

              <span className="h-px w-full inlint-block bg-TB/15 dark:bg-box-border-D"></span>

              <NavLinks />

              <span className="h-px w-full inlint-block bg-TB/15 dark:bg-box-border-D"></span>

              <div className="flex items-center gap-x-4">
                <ToggleTheme />

                <div
                  className="shrink-0 h-12 w-16 lg:w-20 border-2 border-TB/15
                  dark:border-box-border-D rounded-lg flex items-center overflow-hidden"
                >
                  <span
                    className={`cursor-pointer h-full w-full flex justify-center items-center ${
                      i18n.language === "en"
                        ? "bg-primary text-white"
                        : "bg-transparent text-TB dark:text-white"
                    }`}
                    onClick={() => changeLanguageHandler("en")}
                  >
                    En
                  </span>

                  <span
                    className={`cursor-pointer h-full w-full flex justify-center items-center ${
                      i18n.language === "de"
                        ? "bg-primary text-white"
                        : "bg-transparent text-TB dark:text-white"
                    }`}
                    onClick={() => changeLanguageHandler("de")}
                  >
                    De
                  </span>
                </div>
              </div>
            </motion.div>

            <Overlay click={closeMenu} />
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
