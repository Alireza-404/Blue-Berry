import gsap from "gsap";

import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryText() {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 100,
          rotationX: 120,
          transformOrigin: "bottom 25%",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, containerRef.current);

    ScrollTrigger.refresh();
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <h2
      ref={containerRef}
      className="hidden lg:flex flex-col text-[4.7rem] xl:text-[7.2rem] 
        leading-[100px] xl:leading-[150px] font-bold h-fit
        select-none duration-0 absolute left-10 top-0"
    >
      <span className="text-transparent text-stroke">
        {t("categories.exploreCategories1")}
      </span>

      <span className="text-transparent text-stroke">
        {t("categories.exploreCategories2")}
      </span>
    </h2>
  );
}
