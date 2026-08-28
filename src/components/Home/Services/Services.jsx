import Img1 from "../../../assets/images/Services/1.png";
import Img2 from "../../../assets/images/Services/2.png";
import Img3 from "../../../assets/images/Services/3.png";
import Img4 from "../../../assets/images/Services/4.png";

import gsap from "gsap";

import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const { t } = useTranslation();
  const containerRef = useRef(null);

  const servicesArray = [
    {
      id: 1,
      title: "services.box1.text1",
      description: "services.box1.text2",
      src: Img1,
    },
    {
      id: 2,
      title: "services.box2.text1",
      description: "services.box2.text2",
      src: Img2,
    },
    {
      id: 3,
      title: "services.box3.text1",
      description: "services.box3.text2",
      src: Img3,
    },
    {
      id: 4,
      title: "services.box4.text1",
      description: "services.box4.text2",
      src: Img4,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray(".services-box").forEach((box, i) => {
          gsap.from(box, {
            scrollTrigger: {
              trigger: box,
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
            x: i % 2 === 0 ? -150 : 150,
            opacity: 0,
            ease: "power3.out",
            duration: 0.6,
          });
        });
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray(".services-box").forEach((box, i) => {
          gsap.from(box, {
            scrollTrigger: {
              trigger: box,
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
            x: i === 0 || i === 1 ? -150 : 150,
            opacity: 0,
            ease: "power3.out",
            duration: 0.6,
          });
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-6 gap-y-6"
    >
      {servicesArray.map((item) => {
        return (
          <div
            key={item.id}
            className="services-box rounded-3xl p-8 bg-transparent border border-TB/15
          dark:border-box-border-D flex flex-col justify-center items-center gap-y-2 duration-0"
          >
            <img
              src={item.src}
              alt={`service-${item.id}`}
              loading="lazy"
              className="w-16 select-none"
            />

            <h3 className="text-TB dark:text-white text-center text-xl">
              {t(item.title)}
            </h3>

            <p
              className="text-secondary dark:text-secondary-D text-center
                text-sm"
            >
              {t(item.description)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
