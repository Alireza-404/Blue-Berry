import Img from "../../../assets/images/Organic/banner.jpg";

import PrimaryButton from "../../Ui/PrimaryButton/PrimaryButton";
import gsap from "gsap";

import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function OrganicComponent() {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const organicEffectRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.from(self.selector("#organic-box"), {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: 150,
        ease: "power3.out",
        duration: 0.6,
      });

      gsap.from(self.selector(".organic-effect"), {
        scrollTrigger: {
          trigger: organicEffectRef.current,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -150,
        stagger: 0.1,
        ease: "power3.out",
        duration: 0.6,
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <img
        src={Img}
        alt="organic-banner"
        className="w-full h-96 md:h-[480px] lg:h-[620px] object-cover select-none"
      />

      <div
        id="organic-box"
        className="absolute bottom-0 right-0 bg-white dark:bg-body
        rounded-tl-3xl w-40 sm:w-60 lg:w-96 p-4 lg:p-0 lg:flex lg:justify-between
        lg:items-start duration-0"
      >
        <div className="flex flex-col gap-y-2 sm:gap-y-4 lg:p-4">
          <span className="text-lg text-primary lg:text-xl">
            {t("organicSection.discount")}
          </span>

          <h3
            className="text-TB dark:text-white text-2xl sm:text-3xl lg:text-4xl font-medium
            md:!leading-[50px]"
          >
            {t("organicSection.text")}
          </h3>

          <PrimaryButton
            type={"button"}
            className={"dark:text-secondary-D w-28 h-11 mt-2 sm:mt-1 md:mt-0"}
          >
            <Link
              to={"/shop?category=vegetables"}
              className="w-full h-full duration-0 flex items-center justify-center"
            >
              {t("organicSection.btnText")}
            </Link>
          </PrimaryButton>
        </div>

        <div className="h-[240px] w-4 bg-primary lg:block hidden"></div>
      </div>

      <div
        ref={organicEffectRef}
        className="hidden lg:flex flex-col gap-y-6 w-96 absolute left-0 top-10"
      >
        <div
          className="organic-effect w-full h-8 bg-yellow-300/100 duration-0
        border-2 border-green-400"
        ></div>

        <div
          className="organic-effect w-[80%] h-8 bg-yellow-300/90 duration-0
        border-2 border-green-400"
        ></div>

        <div
          className="organic-effect w-[60%] h-8 bg-yellow-300/80 duration-0
        border-2 border-green-400"
        ></div>

        <div
          className="organic-effect w-[40%] h-8 bg-yellow-300/70 duration-0
        border-2 border-green-400"
        ></div>

        <div
          className="organic-effect w-[20%] h-8 bg-yellow-300/60 duration-0
        border-2 border-green-400"
        ></div>
      </div>
    </div>
  );
}
