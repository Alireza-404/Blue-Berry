import OneImage from "../../../assets/images/ShopCategory/one.webp";
import TwoImage from "../../../assets/images/ShopCategory/two.webp";

import { useTranslation } from "react-i18next";
import { PRODUCT_CATEGORIES } from "../../../constants/Categories";
import { useSearchParams } from "react-router-dom";

export default function ShopCategory() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
      return;
    }

    setSearchParams({
      category,
    });
  };

  return (
    <div
      className="border border-TB/15 dark:border-box-border-D rounded-xl p-4 lg:p-6 flex flex-col
        gap-y-8 bg-gray-200/85 dark:bg-box-D"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={OneImage}
            alt="First Image"
            className="w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <h4
            className="absolute right-4 top-4 z-10 text-3xl sm:text-4xl
            lg:text-[42px] font-bold text-white xl:right-6 xl:bottom-6"
          >
            50%
          </h4>

          <div
            className="absolute bottom-4 right-4 z-10 text-white text-end text-lg
            sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl xl:right-6 xl:bottom-6 flex flex-col"
          >
            <span>{t("shopPage.firstCategoryText1")}</span>
            <span>{t("shopPage.secondCategoryText1")}</span>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={TwoImage}
            alt="First Image"
            className="w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <h4
            className="absolute right-4 top-4 z-10 text-3xl sm:text-4xl
            lg:text-[42px] font-bold text-white xl:right-6 xl:bottom-6"
          >
            50%
          </h4>

          <div
            className="absolute bottom-4 right-4 z-10 text-white text-end text-lg
            sm:text-2xl md:text-4xl lg:text-3xl xl:text-4xl xl:right-6 xl:bottom-6 flex flex-col"
          >
            <span>{t("shopPage.firstCategoryText1")}</span>
            <span>{t("shopPage.secondCategoryText1")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {PRODUCT_CATEGORIES.map((item, i) => (
          <button
            type="button"
            key={i}
            className={`border
            bg-white dark:bg-body rounded-xl py-2 px-4 cursor-pointer ${
              activeCategory === item.value
                ? "text-primary border-primary"
                : `border-TB/15 dark:border-box-border-D hover:border-primary
                   dark:hover:border-primary text-secondary dark:text-secondary-D`
            }`}
            onClick={() => handleCategoryChange(item.value)}
          >
            {t(item.translationKey)}
          </button>
        ))}
      </div>
    </div>
  );
}
