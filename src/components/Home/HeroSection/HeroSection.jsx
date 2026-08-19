import Img1 from "../../../assets/images/Header/h-1.png";
import Img2 from "../../../assets/images/Header/h-2.png";
import Img3 from "../../../assets/images/Header/h-3.png";
import Effect from "../../../assets/images/Header/effect.png";

import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";
import ScrollPage from "../../Ui/ScrollPage/ScrollPage";
import HeroLabels from "../HeroLabels/HeroLabels";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const slideDur = 4500;

export default function HeroSection() {
  const slidesArray = [
    {
      id: 1,
      src: Img1,
      text: "heroSection.text1",
      discountText: "heroSection.discountText1",
      to: "/shop?category=fruits",
    },
    {
      id: 2,
      src: Img2,
      text: "heroSection.text2",
      discountText: "heroSection.discountText2",
      to: "/shop?category=snack",
    },
    {
      id: 3,
      src: Img3,
      text: "heroSection.text3",
      discountText: "heroSection.discountText3",
      to: "/shop?category=vegetables",
    },
  ];

  const currentTheme = useSelector((state) => state.theme.theme);
  const { t, i18n } = useTranslation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidesArray.length);
    }, slideDur);

    return () => clearInterval(interval);
  }, [index]);

  const handlePaginationClick = (i) => {
    setIndex(i);
  };

  return (
    <div
      id="hero-section"
      className={`relative ${
        i18n.language === "en" || i18n.language === "en-US"
          ? "h-[calc(100vh-130px)]"
          : "h-[calc(100vh-80px)]"
      }
       sm:pb-0 sm:h-auto lg:h-[calc(100vh-232px)] overflow-hidden`}
    >
      <div className="container mx-auto h-full">
        <AnimatePresence mode="wait" initial={true}>
          <div
            key={slidesArray[index].id}
            className="w-full h-full flex flex-col-reverse justify-end gap-y-12 lg:flex-row
            lg:justify-between lg:gap-x-10 lg:items-center py-12 px-4"
          >
            <div>
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative flex flex-col items-center lg:items-start gap-y-2 w-fit mx-auto
                lg:mx-0 duration-0"
              >
                <img
                  src={Effect}
                  alt="hero-section-effect"
                  className="absolute -top-0 -right-2 w-8 md:-right-6 md:w-auto select-none"
                />

                <span className="text-secondary dark:text-secondary-D text-xl">
                  {t(slidesArray[index].discountText)}
                </span>

                {index === 0 ? (
                  <h1
                    className={`text-[2.2rem] sm:text-[2.5rem] md:text-[2.8rem] xl:text-[3.3rem]
                    w-80 sm:w-96 md:w-[480px] text-TB dark:text-white font-bold text-center
                    lg:text-start ${
                      i18n.language === "de" ? "lg:w-[525px]" : "lg:w-[500px]"
                    }`}
                  >
                    <Trans
                      i18nKey={slidesArray[index].text}
                      components={{
                        1: <span className="text-primary" />,
                      }}
                    />
                  </h1>
                ) : (
                  <p
                    className={`text-[2.2rem] sm:text-[2.5rem] md:text-[2.8rem] xl:text-[3.3rem]
                    w-80 sm:w-96 md:w-[480px] text-TB dark:text-white font-bold text-center
                    lg:text-start ${
                      i18n.language === "de" ? "lg:w-[525px]" : "lg:w-[500px]"
                    }`}
                  >
                    <Trans
                      i18nKey={slidesArray[index].text}
                      components={{
                        1: <span className="text-primary" />,
                      }}
                    />
                  </p>
                )}

                <PrimaryButton
                  type={"button"}
                  className={"dark:text-secondary-D w-28 h-11"}
                >
                  <Link
                    to={slidesArray[index].to}
                    className="w-full h-full duration-0 flex items-center justify-center"
                  >
                    {t("heroSection.btnText")}
                  </Link>
                </PrimaryButton>
              </motion.div>

              <div className="hidden lg:flex items-center gap-2 mt-20">
                {[0, 1, 2].map((i) => {
                  const active = i === index;
                  return (
                    <motion.div
                      key={i}
                      animate={{
                        width: active ? 48 : 24,
                      }}
                      className={`inline-block -skew-x-[14deg] w-6 h-4 duration-0 cursor-pointer ${
                        active
                          ? "bg-[#6c7fd8]"
                          : "bg-[#3d4750] dark:bg-[#494e5d]"
                      }`}
                      onClick={() => handlePaginationClick(i)}
                    />
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className=" relative duration-0"
            >
              <img
                src={slidesArray[index].src}
                alt={t(slidesArray[index].text)}
                className="relative z-10 px-2 xs:px-10 sm:px-2 sm:w-[500px] md:w-[550px] lg:w-[580px] lg:h-auto mx-auto select-none"
              />

              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                xl:block hidden"
              >
                <svg
                  width="720"
                  height="720"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill={currentTheme === "dark" ? "#777" : "#fff"}
                    fillOpacity={currentTheme === "dark" ? 0.05 : 0.2}
                    d="M450,480Q300,550 150,450T100,200T300,100T500,250T450,480Z"
                  />
                </svg>
              </div>

              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                xl:block hidden rotate-90"
              >
                <svg
                  width="720"
                  height="720"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill={currentTheme === "dark" ? "#777" : "#fff"}
                    fillOpacity={currentTheme === "dark" ? 0.05 : 0.2}
                    d="M450,480Q300,550 150,450T100,200T300,100T500,250T450,480Z"
                  />
                </svg>
              </div>

              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                xl:block hidden rotate-180"
              >
                <svg
                  width="720"
                  height="720"
                  viewBox="0 0 600 600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill={currentTheme === "dark" ? "#777" : "#fff"}
                    fillOpacity={currentTheme === "dark" ? 0.04 : 0.2}
                    d="M450,480Q300,550 150,450T100,200T300,100T500,250T450,480Z"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>

      <ScrollPage />

      <HeroLabels />
    </div>
  );
}
