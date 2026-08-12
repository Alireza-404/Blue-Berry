import SummaryCountry from "../SummaryCountry/SummaryCountry";
import SummaryRegion from "../SummaryRegion/SummaryRegion";
import SecondaryButton from "../../Ui/SecondaryButton/SecondaryButton";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Summary() {
  const { cartItems, loading } = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce((total, item) => {
    return (
      Math.floor(total) +
      (item.product.price -
        (item.product.price * item.product.discount) / 100) *
        item.quantity
    );
  }, 0);

  const { t } = useTranslation();
  const [showCouponInput, setShowCouponInput] = useState(false);

  return (
    <div className="lg:w-[404px]">
      <div
        className="bg-gray-200/50 dark:bg-box-D rounded-xl p-6 flex flex-col gap-y-8 w-full
        border border-TB/15 dark:border-box-border-D"
      >
        <h2 className="text-xl font-bold text-TB dark:text-white">
          {t("summary.summary")}
        </h2>

        <div className="flex flex-col gap-y-2">
          <label className="text-TB dark:text-white">
            {t("summary.country")} *
          </label>

          <SummaryCountry />
        </div>

        <div className="flex flex-col gap-y-2">
          <label className="text-TB dark:text-white">
            {t("summary.region/state")} *
          </label>

          <SummaryRegion />
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-secondary dark:text-secondary-D">
            {t("summary.sub-total")}
          </span>

          {loading ? (
            <span
              className="bg-secondary/50 dark:bg-secondary-D/50 w-[50px] h-6 animate-pulse
              rounded"
            ></span>
          ) : (
            <span className="text-secondary dark:text-secondary-D font-bold">
              ${subTotal.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary dark:text-secondary-D">
            {t("summary.deliveryCharges")}
          </span>

          {loading ? (
            <span
              className="bg-secondary/50 dark:bg-secondary-D/50 w-[50px] h-6 animate-pulse
              rounded"
            ></span>
          ) : (
            <span className="text-secondary dark:text-secondary-D font-bold">
              $40.00
            </span>
          )}
        </div>

        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <span className="text-secondary dark:text-secondary-D">
              {t("summary.couponDiscount")}
            </span>

            <span
              onClick={() => setShowCouponInput((prev) => !prev)}
              className="text-red-500 font-bold cursor-pointer"
            >
              {t("summary.applyCoupon")}
            </span>
          </div>

          <div>
            <AnimatePresence initial={false}>
              {showCouponInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.3 },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden transition-none flex gap-x-1.5 items-center"
                >
                  <input
                    placeholder={t("summary.couponCodePlaceholder")}
                    className="w-full md:w-80 h-12 pl-2.5 text-TB outline-none rounded-lg 
                    border border-TB/15 dark:border-box-border-D focus:border-TB/40
                    transition-colors duration-200 bg-white dark:bg-box-D dark:text-white
                  dark:focus:border-[#5a606f] placeholder:select-none"
                  />

                  <SecondaryButton className={"h-12 px-4"}>
                    {t("summary.apply")}
                  </SecondaryButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <span className="bg-TB/15 dark:bg-box-border-D w-full h-px"></span>

        <div className="flex items-center justify-between mt-2">
          <span className="text-secondary dark:text-secondary-D text-lg">
            {t("summary.totalAmount")}
          </span>

          {loading ? (
            <span
              className="bg-secondary/50 dark:bg-secondary-D/50 w-14 h-7 animate-pulse
              rounded"
            ></span>
          ) : (
            <span className="text-secondary dark:text-secondary-D font-bold text-lg">
              ${subTotal === 0 ? "0.00" : (subTotal + 40).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
