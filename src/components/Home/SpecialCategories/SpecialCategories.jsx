import Img1 from "../../../assets/images/SpecialCategories/one.png";
import Img2 from "../../../assets/images/SpecialCategories/two.png";

import gsap from "gsap";
import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";

import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpecialCategories() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.from(box1.current, {
          scrollTrigger: {
            trigger: box1.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -150,
          ease: "power3.out",
          duration: 0.6,
        });

        gsap.from(box2.current, {
          scrollTrigger: {
            trigger: box2.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 150,
          ease: "power3.out",
          duration: 0.6,
        });
      });

      mm.add("(max-width: 639px)", () => {
        gsap.from(box1.current, {
          scrollTrigger: {
            trigger: box1.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -150,
          ease: "power3.out",
          duration: 0.6,
        });

        gsap.from(box2.current, {
          scrollTrigger: {
            trigger: box2.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 150,
          ease: "power3.out",
          duration: 0.6,
        });
      });

      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
        gsap.from(box1.current, {
          scrollTrigger: {
            trigger: box1.current,
            start: "top 30%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -150,
          ease: "power3.out",
          duration: 0.6,
        });

        gsap.from(box2.current, {
          scrollTrigger: {
            trigger: box2.current,
            start: "top 30%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: 150,
          ease: "power3.out",
          duration: 0.6,
        });
      });
    }, containerRef);

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
      className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 lg:gap-x-6"
    >
      <div
        ref={box1}
        id="specialcateogry-1"
        className="relative w-full rounded-3xl bg-[#fbf2e5] overflow-hidden
        after:bg-[#f4dab4] before:bg-[#f4dab4] after:absolute after:w-72 after:h-full
        after:top-0 after:rotate-45 after:left-0 after:-translate-x-[34%] after:-translate-y-[44%]
        hover:after:-left-12 after:transition-all hover:before:-right-12 before:transition-all
        before:absolute before:w-32 xs:before:w-40 before:h-full before:top-0 before:rotate-45 before:right-0 
        before:translate-x-[34%] before:translate-y-[44%] sm:after:h-[152%]
        md:after:-translate-x-[20%] md:after:-translate-y-[40%] duration-0"
      >
        <div
          className="relative p-8 sm:p-2 sm:px-8 md:p-8 md:px-12 lg:px-8 z-10 w-full h-full
            flex flex-col sm:flex-row sm:justify-between items-center gap-y-4 lg:gap-x-4
            xl:gap-x-6"
        >
          <div>
            <img
              src={Img1}
              alt="special-categories-img-1"
              className="w-60 sm:w-52 md:w-72 select-none"
            />
          </div>

          <div
            className="flex flex-col items-center gap-y-2 sm:w-52 sm:gap-y-3 md:gap-y-4
            sm:items-start lg:w-64"
          >
            <h3
              className="text-TB text-2xl sm:text-3xl font-medium !leading-10
              text-center sm:text-start"
            >
              {t("specialCategories.box1.text1")}
            </h3>

            <h4 className="text-sm text-secondary md:text-base">
              {t("specialCategories.box1.text2")}
            </h4>

            <PrimaryButton
              type={"button"}
              className={"py-2 px-4 dark:text-box-border-D"}
            >
              {t("specialCategories.btnText")}
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div
        ref={box2}
        className="relative w-full rounded-3xl bg-[#ffe8ee] overflow-hidden
        after:bg-[#ffc6ec] before:bg-[#ffc6ec] after:absolute after:w-72 after:h-full
        after:top-0 after:rotate-45 after:left-0 after:-translate-x-[34%] after:-translate-y-[44%]
        hover:after:-left-12 after:transition-all hover:before:-right-12 before:transition-all
        before:absolute before:w-32 xs:before:w-40 before:h-full before:top-0 before:rotate-45 before:right-0 
        before:translate-x-[34%] before:translate-y-[44%] sm:after:h-[152%]
        md:after:-translate-x-[20%] md:after:-translate-y-[40%] duration-0"
      >
        <div
          className="relative p-8 sm:p-2 sm:px-8 md:p-8 md:px-12 lg:px-8 z-10 w-full h-full
            flex flex-col sm:flex-row sm:justify-between items-center gap-y-4 lg:gap-x-4
            xl:gap-x-6"
        >
          <div>
            <img
              src={Img2}
              alt="special-categories-img-1"
              className="w-60 sm:w-52 md:w-72 select-none"
            />
          </div>

          <div
            className="flex flex-col items-center gap-y-2 sm:w-52 sm:gap-y-3 md:gap-y-4
            sm:items-start lg:w-64"
          >
            <h3
              className="text-TB text-2xl sm:text-3xl font-medium !leading-10
              text-center sm:text-start"
            >
              {t("specialCategories.box2.text1")}
            </h3>

            <h4 className="text-sm text-secondary md:text-base">
              {t("specialCategories.box2.text2")}
            </h4>

            <PrimaryButton
              type={"button"}
              className={"py-2 px-4 dark:text-box-border-D"}
            >
              {t("specialCategories.btnText")}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
