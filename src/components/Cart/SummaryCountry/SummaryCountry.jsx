import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function SummaryCountry() {
  const { t } = useTranslation();

  const countriesArray = [
    `${t("summary.country")} 1`,
    `${t("summary.country")} 2`,
    `${t("summary.country")} 3`,
    `${t("summary.country")} 4`,
    `${t("summary.country")} 5`,
  ];

  const countryRef = useRef(null);
  const [showCountry, setShowCountry] = useState(false);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(0);

  useEffect(() => {
    const handleClickOutsideCountryDropDown = (event) => {
      if (
        showCountry &&
        countryRef.current &&
        !countryRef.current.contains(event.target)
      ) {
        setShowCountry(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideCountryDropDown);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutsideCountryDropDown,
      );
  }, [showCountry]);

  return (
    <div ref={countryRef} className="relative flex flex-col gap-y-2">
      <div
        onClick={() => setShowCountry((prev) => !prev)}
        className={`flex items-center justify-between px-2.5 w-full h-12
        relative rounded-lg border gap-y-4 bg-white dark:bg-body cursor-pointer
            ${
              showCountry
                ? "border-TB/40 dark:border-[#5a606f]"
                : "border-TB/15 dark:border-box-border-D"
            }`}
      >
        <span className="text-secondary dark:text-secondary-D select-none">
          {countriesArray[selectedCountryIndex]}
        </span>

        <span
          className={`text-secondary dark:text-secondary-D text-lg transition-all duration-200
             ${showCountry ? "rotate-180" : "rotate-0"}`}
        >
          <IoChevronDown />
        </span>
      </div>

      <AnimatePresence initial={false}>
        {showCountry && (
          <motion.ul
            className="h-44 w-11/12 overflow-y-auto bg-white dark:bg-body flex flex-col
            gap-y-1 rounded-lg border border-TB/15 dark:border-box-border-D
            absolute z-20 top-14 left-1/2 -translate-x-1/2 origin-top duration-0 my-scroll"
            initial={{ height: "0px", opacity: 0 }}
            animate={{ height: "176px", opacity: 1 }}
            exit={{ height: "0px", opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {countriesArray.map((c, i) => {
              return (
                <li
                  key={i}
                  className={`text-secondary dark:text-secondary-D p-4 select-none flex items-center justify-between
                      ${
                        i === selectedCountryIndex
                          ? "bg-secondary/20 dark:bg-secondary-D/15"
                          : "bg-white dark:bg-body"
                      }`}
                  onClick={() => {
                    setSelectedCountryIndex(i);
                  }}
                >
                  {c}
                  {i === selectedCountryIndex && (
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
