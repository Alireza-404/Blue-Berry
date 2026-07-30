import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DOTDText() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(self.selector("#DOTD-text"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.3,
      })
        .from(self.selector("#DOTD-sec-text"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.3,
        })
        .from(self.selector("#countdown"), {
          y: 60,
          opacity: 0,
          ease: "power3.out",
          duration: 0.3,
        });
    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-y-2.5"
      key={i18n.language}
    >
      <h2
        id="DOTD-text"
        className="text-[33px] font-bold text-center text-TB dark:text-white duration-0"
      >
        <Trans
          i18nKey={"dayOfTheDealSection.text"}
          components={{
            1: <span className="text-primary" />,
          }}
        />
      </h2>

      <p
        id="DOTD-sec-text"
        className="text-center text-secondary dark:text-secondary-D text-sm duration-0"
      >
        {t("dayOfTheDealSection.secondaryText")}
      </p>

      <div
        id="countdown"
        className="py-2 px-4 rounded-3xl bg-secondary/15 dark:bg-secondary-D/15 w-fit
        mt-4 border-2 border-TB/15 dark:border-box-border-D duration-0"
      >
        <p className="text-TB dark:text-white font-bold">25 Day 23 : 51 : 3</p>
      </div>
    </div>
  );
}
