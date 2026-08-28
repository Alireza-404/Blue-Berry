import ManagerImg from "../../../assets/images/Manager/manager.jpg";

import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function ManagerComponent() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        gsap.from(self.selector("#image-parent"), {
          scrollTrigger: {
            trigger: "#image-parent",
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -150,
          duration: 0.6,
          ease: "power3.out",
        });

        gsap.from(self.selector("#description"), {
          scrollTrigger: {
            trigger: "#image-parent",
            start: "top 65%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 150,
          duration: 0.6,
          ease: "power3.out",
        });
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.from(self.selector("#image-parent"), {
          scrollTrigger: {
            trigger: "#image-parent",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(self.selector("#texts-parent"), {
          scrollTrigger: {
            trigger: "#image-parent",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          x: -150,
          duration: 0.8,
          ease: "power3.out",
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
      className="flex flex-col gap-y-6 md:flex-row md:gap-x-8 xl:w-11/12 mx-auto"
    >
      <div
        id="image-parent"
        className="flex items-center gap-x-4 shrink-0 duration-0"
      >
        <div className="lg:flex lg:gap-x-2.5 lg:items-center">
          <div className="relative w-20 xl:w-24 h-64 hidden lg:block">
            <span
              className="text-stroke text-transparent -rotate-90 absolute top-1/2
              text-[44px] xl:text-5xl -translate-y-1/2 -left-20 select-none"
            >
              Testimonials
            </span>
          </div>

          <div className="aspect-square">
            <img
              src={ManagerImg}
              alt="manager-image"
              loading="lazy"
              className="w-16 h-16 rounded-2xl md:w-56 md:h-56 lg:w-64 lg:h-64 select-none
              xl:w-72 xl:h-72 lg:border-4 lg:border-primary"
            />
          </div>
        </div>

        <div
          className="text-TB dark:text-white text-[22px] font-bold flex flex-col
          gap-y-1 md:hidden"
        >
          <h3>{t("managerSection.managerName")}</h3>

          <span className="text-secondary dark:text-secondary-D text-sm">
            ({t("managerSection.manager")})
          </span>
        </div>
      </div>

      <div
        id="texts-parent"
        className="md:flex md:flex-col md:justify-center lg:justify-end md:gap-y-4
        duration-0"
      >
        <div className="flex-col gap-y-1 xl:gap-y-1.5 md:flex hidden">
          <h3 className="text-[22px] xl:text-2xl font-bold text-TB dark:text-white">
            {t("managerSection.managerName")}
          </h3>

          <span
            className="text-secondary dark:text-secondary-D text-sm
            xl:text-base"
          >
            ({t("managerSection.manager")})
          </span>
        </div>

        <div
          id="description"
          className="p-4 rounded-3xl border border-TB/15 bg-gray-200/85 dark:bg-box-D
        dark:border-box-border-D duration-0"
        >
          <p
            id="manager-description"
            className="bg-clip-text text-transparent bg-gradient-to-r from-secondary
          via-gray-900 to-secondary dark:from-secondary-D dark:via-white
          dark:to-secondary-D text-[15px] xl:text-[17px] xl:leading-8"
          >
            "{t("managerSection.description")}"
          </p>
        </div>
      </div>
    </div>
  );
}
