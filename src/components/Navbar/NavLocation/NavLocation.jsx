import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoChevronDown, IoLocationOutline } from "react-icons/io5";

export default function NavLocation() {
  const citiesArray = [
    "London",
    "Manchester",
    "Birmingham",
    "Liverpool",
    "Bristol",
    "Tokyo",
    "Kyoto",
    "Osaka",
    "Sapporo",
    "Fukuoka",
    "Berlin",
    "Munich",
    "Hamburg",
    "Frankfurt",
    "Cologne",
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
  ];

  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdown]);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-64 h-12 rounded-lg border flex flex-col justify-center gap-y-4
        bg-white dark:bg-body cursor-pointer 
          ${
            dropdown
              ? "border-TB/40 dark:border-[#5a606f]"
              : "border-TB/15 dark:border-box-border-D"
          }`}
    >
      <div
        className="flex items-center justify-between h-full px-2.5"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-x-2">
          <span className="text-primary text-2xl">
            <IoLocationOutline />
          </span>

          <span className="text-TB dark:text-white select-none">
            {citiesArray[index]}
          </span>
        </div>

        <span
          className={`text-secondary dark:text-secondary-D text-lg transition-all duration-200
             ${dropdown ? "rotate-180" : "rotate-0"}`}
        >
          <IoChevronDown />
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {dropdown && (
          <motion.ul
            className="h-64 w-full overflow-y-auto bg-white dark:bg-body flex flex-col gap-y-1
            rounded-lg border border-TB/15 dark:border-box-border-D
            absolute z-20 top-16 left-0 origin-top duration-0 my-scroll"
            initial={{ height: "0px", opacity: 0 }}
            animate={{ height: "256px", opacity: 1 }}
            exit={{ height: "0px", opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {citiesArray.map((city, i) => {
              return (
                <li
                  key={i}
                  className={`text-TB dark:text-white p-4 select-none flex items-center justify-between
                    ${i === index ? "bg-secondary/20 dark:bg-secondary-D/15" : "bg-white dark:bg-body"}`}
                  onClick={() => {
                    setIndex(i);
                  }}
                >
                  {city}
                  {i === index && (
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
