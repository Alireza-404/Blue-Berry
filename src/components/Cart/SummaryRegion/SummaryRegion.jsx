import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function SummaryRegion() {
  const { t } = useTranslation();

  const regionArray = [
    `${t("summary.region/state")} 1`,
    `${t("summary.region/state")} 2`,
    `${t("summary.region/state")} 3`,
    `${t("summary.region/state")} 4`,
    `${t("summary.region/state")} 5`,
  ];

  const regionRef = useRef(null);
  const [showRegion, setShowRegion] = useState(false);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState(0);

  useEffect(() => {
    const handleClickOutsideRegionDropDown = (event) => {
      if (
        showRegion &&
        regionRef.current &&
        !regionRef.current.contains(event.target)
      ) {
        setShowRegion(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideRegionDropDown);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutsideRegionDropDown,
      );
  }, [showRegion]);

  return (
    <div ref={regionRef} className="relative flex flex-col gap-y-2">
      <div
        onClick={() => setShowRegion((prev) => !prev)}
        className={`flex items-center justify-between px-2.5 w-full h-12
        relative rounded-lg border gap-y-4 bg-white dark:bg-body cursor-pointer
            ${
              showRegion
                ? "border-TB/40 dark:border-[#5a606f]"
                : "border-TB/15 dark:border-box-border-D"
            }`}
      >
        <span className="text-secondary dark:text-secondary-D select-none">
          {regionArray[selectedRegionIndex]}
        </span>

        <span
          className={`text-secondary dark:text-secondary-D text-lg transition-all duration-200
             ${showRegion ? "rotate-180" : "rotate-0"}`}
        >
          <IoChevronDown />
        </span>
      </div>

      <AnimatePresence initial={false}>
        {showRegion && (
          <motion.ul
            className="h-44 w-11/12 overflow-y-auto bg-white dark:bg-body flex flex-col
            gap-y-1 rounded-lg border border-TB/15 dark:border-box-border-D
            absolute z-20 top-14 left-1/2 -translate-x-1/2 origin-top duration-0 my-scroll"
            initial={{ height: "0px", opacity: 0 }}
            animate={{ height: "176px", opacity: 1 }}
            exit={{ height: "0px", opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {regionArray.map((c, i) => {
              return (
                <li
                  key={i}
                  className={`text-secondary dark:text-secondary-D p-4 select-none flex items-center justify-between
                      ${
                        i === selectedRegionIndex
                          ? "bg-secondary/20 dark:bg-secondary-D/15"
                          : "bg-white dark:bg-body"
                      }`}
                  onClick={() => {
                    setSelectedRegionIndex(i);
                  }}
                >
                  {c}
                  {i === selectedRegionIndex && (
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
