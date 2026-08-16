import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InfoAndDetail({ product }) {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("detail");

  return (
    <div className="flex flex-col gap-y-6 mt-12">
      <ul className="flex items-center">
        <li>
          <button
            type="button"
            className={`relative bg-transparent px-5 py-2 text-lg ${
              activeTab === "detail"
                ? "text-primary"
                : "text-secondary dark:text-secondary-D"
            }`}
            onClick={() => setActiveTab("detail")}
          >
            {t("singleProduct.detail")}
            <span
              className="absolute text-secondary dark:text-secondary-D right-0 top-1/2
                -translate-y-1/2 translate-x-1/2"
            >
              /
            </span>
          </button>
        </li>

        <li>
          <button
            type="button"
            className={`bg-transparent px-5 py-2 text-lg ${
              activeTab === "information"
                ? "text-primary"
                : "text-secondary dark:text-secondary-D"
            }`}
            onClick={() => setActiveTab("information")}
          >
            {t("singleProduct.information")}
          </button>
        </li>
      </ul>

      <AnimatePresence initial={false} mode="wait">
        {activeTab === "detail" && (
          <motion.div
            key={"detail"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="duration-0 border border-TB/15 dark:border-box-border-D rounded-2xl
            p-4 flex flex-col gap-y-4 marker:text-TB marker:dark:text-white"
          >
            <p className="text-secondary dark:text-secondary-D font-normal">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia nisi
              dolorem sapiente commodi fugiat laborum, deleniti qui ratione ad
              accusantium non tenetur ullam explicabo vero?
            </p>

            <ul className="flex flex-col gap-y-4 list-disc px-4">
              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail1")}
              </li>

              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail2")}
              </li>

              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail3")}
              </li>

              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail4")}
              </li>

              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail5")}
              </li>

              <li className="text-secondary dark:text-secondary-D font-normal">
                {t("singleProduct.productDetail6")}
              </li>
            </ul>
          </motion.div>
        )}

        {activeTab === "information" && (
          <motion.div
            key={"information"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="duration-0 border border-TB/15 dark:border-box-border-D rounded-2xl
            p-4 flex flex-col gap-y-4"
          >
            <div>
              <h3 className="text-TB dark:text-white font-bold text-xl">
                {t("singleProduct.information")}
              </h3>

              <h3 className="text-secondary dark:text-secondary-D text-sm mt-2">
                {t("singleProduct.informationDescription")}
              </h3>

              <ul className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.unit")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {product.unit}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.sku")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {product.sku}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.origin")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {product.country}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.organic")}
                  <span
                    className={`text-[17px] flex items-center gap-x-2.5 ${
                      product.is_organic ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 inline-block rounded-full animate-ping ${
                        product.is_organic ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {product.is_organic ? "Yes" : "No"}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.color")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {i18n.language === "en" || i18n.language === "en-US"
                      ? product.color_en
                      : product.color_de}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary"
                >
                  {t("singleProduct.informationItems.shelflife")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {product.shelf_life}
                  </span>
                </li>

                <li
                  className="bg-gray-200/85 dark:bg-box-D text-TB dark:text-white p-4 flex flex-col gap-y-2
                  rounded-xl border border-TB/15 dark:border-box-border-D hover:border-primary
                  dark:hover:border-primary md:col-span-2 lg:col-span-1"
                >
                  {t("singleProduct.informationItems.brand")}
                  <span className="text-secondary dark:text-secondary-D text-[17px]">
                    {product.brand}
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
