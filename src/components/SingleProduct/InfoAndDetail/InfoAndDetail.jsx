import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function InfoAndDetail({ product }) {
  const { t } = useTranslation();
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
            p-4 flex flex-col gap-y-4"
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
            p-4"
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
