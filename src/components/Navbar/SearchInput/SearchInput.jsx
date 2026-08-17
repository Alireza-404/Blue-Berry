import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import useProducts from "../../../hooks/useProducts";
import { Link } from "react-router-dom";

export default function SearchInput() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState("");
  const [searchBlur, setSearchBlur] = useState(true);
  const { products, loading, error } = useProducts();

  const filteredProducts = products.filter((product) =>
    product.title_en.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        id="search-input"
        name="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setSearchBlur(false)}
        onBlur={() => setSearchBlur(true)}
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

      <AnimatePresence>
        {value && !searchBlur && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "288px" }}
            exit={{ opacity: 0, height: 0 }}
            className={`bg-gray-200 dark:bg-box-D p-4 border border-TB/15 dark:border-box-border-D
            rounded-lg absolute z-30 -bottom-3 translate-y-full w-full duration-0 overflow-y-auto my-scroll
            ${
              loading || error || products.length === 0
                ? "flex items-center justify-center"
                : "flex flex-col divide-y divide-TB/15 dark:divide-box-border-D"
            }`}
          >
            {loading ? (
              <></>
            ) : error ? (
              <></>
            ) : products.length === 0 ? (
              <></>
            ) : (
              filteredProducts.map((product, i) => (
                <div
                  key={i}
                  className="w-full flex items-center gap-x-2.5 py-2.5"
                >
                  <img
                    src={product.image}
                    alt={`Product Image ${i + 1}`}
                    className="w-16 h-16 rounded-lg"
                  />

                  <div className="flex flex-col gap-y-1">
                    <Link
                      to={`/products/${product.id}`}
                      className="text-sm text-TB dark:text-white line-clamp-1"
                    >
                      {i18n.language === "de"
                        ? product.title_de
                        : product.title_en}
                    </Link>

                    <Link
                      to={`/shop?category=${product.category_en.toLowerCase()}`}
                      className="text-xs text-primary"
                    >
                      {i18n.language === "de"
                        ? product.category_de
                        : product.category_en}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
