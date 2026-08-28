import Vendor1 from "../../../assets/images/TopVendors/vendor-1.jpg";
import Vendor2 from "../../../assets/images/TopVendors/vendor-2.jpg";
import Vendor3 from "../../../assets/images/TopVendors/vendor-3.jpg";
import Img1 from "../../../assets/images/TopVendors/img-1.jpg";
import Img2 from "../../../assets/images/TopVendors/img-2.jpg";
import Img3 from "../../../assets/images/TopVendors/img-3.jpg";
import Img4 from "../../../assets/images/TopVendors/img-4.jpg";

import gsap from "gsap";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TopVendors() {
  const topVendorsArray = [
    {
      id: 1,
      title: "topVendors.box1.title",
      fruits: "5",
      vegetables: "30",
      snacks: "09",
      sales: "512",
    },
    {
      id: 2,
      title: "topVendors.box2.title",
      fruits: "8",
      vegetables: "15",
      snacks: "04",
      sales: "430",
    },
    {
      id: 3,
      title: "topVendors.box3.title",
      fruits: "16",
      vegetables: "42",
      snacks: "18",
      sales: "1024",
    },
    {
      id: 4,
      title: "topVendors.box4.title",
      fruits: "2",
      vegetables: "10",
      snacks: "02",
      sales: "210",
    },
  ];

  const topVendorsImagesArray = [
    { id: 1, mainImg: Img1, vendorImg: Vendor1 },
    { id: 2, mainImg: Img2, vendorImg: Vendor2 },
    { id: 3, mainImg: Img3, vendorImg: Vendor3 },
    { id: 4, mainImg: Img4, vendorImg: Vendor1 },
  ];

  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#images-parent",
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(self.selector("#vendor-images-elem"), {
        opacity: 0,
        x: -150,
        ease: "power3.out",
        duration: 0.6,
      })
        .from(self.selector("#right-vendor-effect"), {
          opacity: 0,
          x: 200,
          ease: "power3.out",
          duration: 0.3,
        })
        .from(
          self.selector("#left-vendor-effect"),
          {
            opacity: 0,
            x: -200,
            ease: "power3.out",
            duration: 0.3,
          },
          "<"
        );

      mm.add("(min-width: 1024px)", () => {
        gsap.from(self.selector(".vendor-box"), {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: -150,
          ease: 0.6,
          stagger: 0.2,
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(self.selector(".vendor-box"), {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 30%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: -150,
          ease: 0.6,
          stagger: 0.2,
        });
      });
    }, containerRef.current);

    ScrollTrigger.refresh();
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col lg:flex-row lg:gap-x-6 gap-y-6"
    >
      <div id="images-parent" className="duration-0 shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="duration-0 xs:flex xs:justify-center h-full"
          >
            <div
              id="left-vendor-effect"
              className="w-3 h-96 md:h-[505px] rounded-l-3xl bg-primary sm:block hidden
              lg:h-[450px] xl:h-full duration-0"
            ></div>

            <div
              id="vendor-images-elem"
              className="relative duration-0 w-fit h-fit xl:h-full"
            >
              <div
                className="w-full xs:w-96 h-96 md:w-[480px] md:h-[505px] lg:w-[440px] lg:h-[450px] 
                xl:w-[505px] xl:h-full"
              >
                <img
                  src={topVendorsImagesArray[index].mainImg}
                  alt={`main-image-${index + 1}`}
                  loading="lazy"
                  className="rounded-3xl sm:rounded-none object-cover select-none h-full w-full"
                />
              </div>

              <img
                src={topVendorsImagesArray[index].vendorImg}
                alt={`vendor-image-${index + 1}`}
                className="w-20 md:w-24 rounded-3xl absolute right-4 bottom-4 select-none"
              />
            </div>

            <div
              id="right-vendor-effect"
              className="w-3 h-96 md:h-[505px] rounded-r-3xl bg-primary sm:block hidden
              lg:h-[450px] xl:h-full duration-0"
            ></div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-y-6 w-full">
        {topVendorsArray.map((item, i) => {
          const active = i === index;
          return (
            <article
              key={item.id}
              className={`vendor-box p-6 rounded-3xl border bg-gray-200/85
                cursor-pointer select-none dark:bg-box-D duration-0 ${
                  active
                    ? "border-primary"
                    : "border-TB/15 dark:border-box-border-D"
                }`}
              onClick={() => setIndex(i)}
            >
              <div className="lg:hidden flex flex-col gap-y-2.5">
                <h3
                  className={`text-xl font-bold ${
                    active ? "text-primary" : "text-TB dark:text-white"
                  }`}
                >
                  {t(item.title)}
                </h3>

                <p className="text-secondary dark:text-secondary-D">
                  {t("topVendors.sales")} - {item.sales}
                </p>

                <p className="text-secondary dark:text-secondary-D">
                  {t("topVendors.fruits")} ({item.fruits}) |{" "}
                  {t("topVendors.vegetables")} ({item.vegetables}) |{" "}
                  {t("topVendors.snacks")} ({item.snacks})
                </p>
              </div>

              <div className="hidden lg:flex items-center justify-between">
                <div className="flex flex-col gap-y-2.5">
                  <h3
                    className={`text-xl font-bold ${
                      active ? "text-primary" : "text-TB dark:text-white"
                    }`}
                  >
                    {t(item.title)}
                  </h3>

                  <p className="text-secondary dark:text-secondary-D">
                    {t("topVendors.fruits")} ({item.fruits}) |{" "}
                    {t("topVendors.vegetables")} ({item.vegetables}) |{" "}
                    {t("topVendors.snacks")} ({item.snacks})
                  </p>
                </div>

                <p className="text-secondary dark:text-secondary-D">
                  {t("topVendors.sales")} - {item.sales}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
