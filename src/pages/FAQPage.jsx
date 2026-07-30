import Img from "../assets/images/TopVendors/img-1.jpg";

import Footer from "../components/Layout/Footer/Footer";
import Navbar from "../components/Layout/Navbar/Navbar";

import gsap from "gsap";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { Trans, useTranslation } from "react-i18next";

export default function FAQPage() {
  const faqArray = [
    { id: 1, title: "FAQPage.title1" },
    { id: 2, title: "FAQPage.title2" },
    { id: 3, title: "FAQPage.title3" },
    { id: 4, title: "FAQPage.title4" },
    { id: 5, title: "FAQPage.title5" },
    { id: 6, title: "FAQPage.title6" },
  ];

  const { t } = useTranslation();
  const [index, setIndex] = useState(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline();

      tl.from(self.selector("#faq-title"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.4,
      })
        .from(self.selector("#faq-description"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        })
        .from(self.selector("#faq-image"), {
          x: -150,
          opacity: 0,
          ease: "power3.out",
          duration: 0.4,
        })
        .from(self.selector(".faq-box"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          stagger: 0.2,
          duration: 0.4,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <div
          className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 py-20 lg:py-28
          flex flex-col gap-y-6 lg:gap-y-12"
          ref={containerRef}
        >
          <div className="flex flex-col gap-y-3 items-center">
            <h2
              className="text-[33px] lg:text-[40px] font-bold text-center
             text-TB dark:text-white duration-0"
              id="faq-title"
            >
              <Trans
                i18nKey={"FAQPage.h1"}
                components={{
                  1: <span className="text-primary" />,
                }}
              />
            </h2>

            <p
              className="text-center text-secondary dark:text-secondary-D lg:text-lg
              duration-0"
              id="faq-description"
            >
              {t("FAQPage.description")}
            </p>
          </div>

          <div className="flex flex-col gap-y-8 items-center lg:flex-row lg:gap-x-8 lg:items-start">
            <div>
              <img
                src={Img}
                alt="FAQ-image"
                className="w-[600px] lg:w-[800px] rounded-3xl select-none duration-0"
                id="faq-image"
              />
            </div>

            <div className="overflow-hidden w-full flex flex-col gap-y-6 lg:gap-y-8">
              {faqArray.map((item) => {
                return (
                  <div className="faq-box duration-0" key={item.id}>
                    <div
                      className="flex items-center justify-between py-4 px-6 rounded-xl
                      border border-TB/15 dark:border-box-border-D cursor-pointer
                      gap-x-2.5"
                      onClick={() =>
                        setIndex(index === item.id ? null : item.id)
                      }
                    >
                      <h3 className="text-xl text-TB dark:text-white font-bold select-none">
                        {t(item.title)}
                      </h3>

                      <span
                        className={`text-secondary dark:text-secondary-D text-xl 
                        ${item.id === index ? "rotate-180" : "rotate-0"}`}
                      >
                        <IoChevronDown />
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {index === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="overflow-hidden duration-0"
                        >
                          <p
                            className="text-secondary dark:text-secondary-D px-4
                            py-3"
                          >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatibus repellendus iure sit dignissimos
                            quos velit illum. Amet explicabo odio, repellat
                            accusamus, dolores aut nam tenetur optio ex vero
                            soluta eos!
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200/85 dark:bg-box-D">
        <div className="container mx-auto px-4 sm:px-14 md:px-10 lg:px-4 pt-12 pb-4">
          <Footer />
        </div>
      </footer>
    </>
  );
}
