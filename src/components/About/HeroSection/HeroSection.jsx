import gsap from "gsap";
import HeroSectionImage from "../../../assets/images/About/hero-section-image.png";
import Counter from "../../Ui/Counter/Counter";

import { Trans, useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.5,
          ease: "power3.out",
          opacity: 0,
          delay: 0.05,
        },
      });

      tl.from(self.selector("#hero-section-image"), {
        x: -400,
      })
        .from(self.selector("#text-parent"), {
          y: -300,
        })
        .from(self.selector(".box"), {
          y: -200,
          stagger: 0.2,
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="about-hero-section"
      className="lg:h-[calc(100vh-232px)] overflow-hidden xl:flex xl:items-center"
    >
      <div className="container mx-auto">
        <div
          className="w-full h-full flex flex-col gap-y-12 lg:flex-row
            lg:justify-between lg:gap-x-10 lg:items-center py-12 px-4"
          ref={containerRef}
        >
          <img
            src={HeroSectionImage}
            alt="about-hero-section-image"
            className="xl:w-[650px] shrink-0 select-none duration-0"
            id="hero-section-image"
          />

          <div className="flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4 duration-0" id="text-parent">
              <h1 className="text-2xl xl:text-[28px] text-TB dark:text-white tracking-wider text-center lg:text-start">
                <Trans
                  i18nKey={"about.h1"}
                  components={{ 1: <span className="text-primary" /> }}
                />
              </h1>

              <h2 className="text-TB dark:text-white text-[19px] xl:font-mono">
                <i>{t("about.h2")}</i>
              </h2>

              <p className="text-secondary dark:text-secondary-D leading-7">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit, rem! Et obcaecati rem nulla, aut assumenda unde
                minima earum distinctio porro excepturi veritatis officiis
                dolorem quod. sapiente amet rerum beatae dignissimos aperiam id
                quae quia velit. Ab optio doloribus hic quas sit corporis
                numquam.
              </p>

              <p className="text-secondary dark:text-secondary-D leading-7">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit, rem! Et obcaecati rem nulla, aut assumenda unde
                minima earum distinctio porro excepturi veritatis officiis
                dolorem quod. sapiente amet rerum beatae dignissimos aperiam id
                quae quia velit. Ab optio doloribus hic quas sit corporis
                numquam.
              </p>
            </div>

            <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 duration-0">
              <div
                className="box border border-TB/15 dark:border-box-border-D rounded-lg bg-gray-200/85 dark:bg-box-D
                flex flex-col items-center justify-center w-full h-28 duration-0"
              >
                <div className="text-[33px] text-TB dark:text-white font-bold font-mono flex items-center gap-x-1">
                  <Counter to={202} duration={3} className="tracking-widest" />{" "}
                  +
                </div>

                <span className="text-secondary dark:text-secondary-D">
                  {t("about.vendors")}
                </span>
              </div>

              <div
                className="box border border-TB/15 dark:border-box-border-D rounded-lg bg-gray-200/85 dark:bg-box-D
                flex flex-col items-center justify-center w-full h-28 duration-0"
              >
                <div className="text-[33px] text-TB dark:text-white font-bold font-mono flex items-center gap-x-1">
                  <Counter to={505} duration={3} className="tracking-widest" />{" "}
                  +
                </div>

                <span className="text-secondary dark:text-secondary-D">
                  {t("about.sales")}
                </span>
              </div>

              <div
                className="box border border-TB/15 dark:border-box-border-D rounded-lg bg-gray-200/85 dark:bg-box-D
                flex flex-col items-center justify-center w-full h-28 duration-0"
              >
                <div className="text-[33px] text-TB dark:text-white font-bold font-mono flex items-center gap-x-1">
                  <Counter to={404} duration={3} className="tracking-widest" />{" "}
                  +
                </div>

                <span className="text-secondary dark:text-secondary-D">
                  {t("about.customers")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
