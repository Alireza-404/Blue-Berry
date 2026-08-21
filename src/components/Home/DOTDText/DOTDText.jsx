import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DOTDText() {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(self.selector("#limited-time-elem"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.3,
      })
        .from(self.selector("#DOTD-text"), {
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
      <span
        id="limited-time-elem"
        className=" inline-flex items-center gap-2 rounded-full duration-0
        bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block bg-primary animate-pulse"></span>
        {t("dayOfTheDealSection.limitedTime")}
      </span>

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
    </div>
  );
}
