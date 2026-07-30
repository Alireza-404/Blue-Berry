import gsap from "gsap";

import { useLayoutEffect, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurTeamText() {
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

      tl.from(self.selector("#our-team-text"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.3,
      }).from(self.selector("#our-team-sec-text"), {
        y: 60,
        opacity: 0,
        ease: "power3.out",
        duration: 0.3,
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
      className="flex flex-col items-center gap-y-3"
      key={i18n.language}
    >
      <h2
        id="our-team-text"
        className="text-[33px] lg:text-[40px] font-bold text-center text-TB dark:text-white duration-0"
      >
        <Trans
          i18nKey={"about.ourTeam"}
          components={{
            1: <span className="text-primary" />,
          }}
        />
      </h2>

      <p
        id="our-team-sec-text"
        className="text-center text-secondary dark:text-secondary-D text-sm
          lg:text-base duration-0 lg:w-96"
      >
        {t("about.ourTeamDescription")}
      </p>
    </div>
  );
}
