import Img1 from "../../../assets/images/Articles/1.jpg";
import Img2 from "../../../assets/images/Articles/2.jpg";
import Img3 from "../../../assets/images/Articles/3.jpg";
import Img4 from "../../../assets/images/Articles/4.jpg";

import gsap from "gsap";

import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/autoplay";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Articles() {
  const articlesArray = [
    {
      id: 1,
      label: "Guide",
      src: Img1,
      text: "articlesSection.box1.text",
      title_en: "Marketing Guide: 5 Steps to Success",
    },
    {
      id: 2,
      label: "Business",
      src: Img2,
      text: "articlesSection.box2.text",
      title_en: "Best Way to Solve Business Deal Issues",
    },
    {
      id: 3,
      label: "Growth",
      src: Img3,
      text: "articlesSection.box3.text",
      title_en: "Business Ideas to Grow Your Business",
    },
    {
      id: 4,
      label: "Trends",
      src: Img4,
      text: "articlesSection.box4.text",
      title_en: "31 Customer Trends to Know in 2026",
    },
  ];

  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1279px)", () => {
        gsap.from(self.selector("#articles-swiper"), {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
          scale: 0.7,
          opacity: 0,
          ease: "power3.out",
          duration: 0.6,
        });
      });

      mm.add("(min-width: 1280px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(self.selector(".article-box-1"), {
          y: -150,
          opacity: 0,
          ease: "power3.out",
          duration: 0.5,
        })
          .from(
            self.selector(".article-box-4"),
            {
              y: 150,
              opacity: 0,
              ease: "power3.out",
              duration: 0.5,
            },
            "<"
          )
          .from(self.selector(".article-box-2"), {
            x: -150,
            opacity: 0,
            ease: "power3.out",
            duration: 0.3,
          })
          .from(self.selector(".article-box-3"), {
            x: 150,
            opacity: 0,
            ease: "power3.out",
            duration: 0.3,
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
    <div ref={containerRef} className="xl:grid xl:grid-cols-4 xl:gap-6">
      <Swiper
        modules={[Autoplay]}
        id="articles-swiper"
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        grabCursor
        className="duration-0 xl:hidden"
      >
        {articlesArray.map((article) => {
          return (
            <SwiperSlide key={article.id}>
              <article className="group overflow-hidden rounded-3xl">
                <img
                  src={article.src}
                  alt={`article-image-${article.id}`}
                  className="group-hover:rotate-6 group-hover:scale-[1.15] select-none"
                />

                <div className="relative w-full">
                  <div
                    className="absolute bottom-1.5 left-1.5 right-1.5 bg-gray-100/85 rounded-3xl p-4 
                    flex flex-col gap-y-1"
                  >
                    <span className="text-secondary text-sm font-medium">
                      {article.label}
                    </span>

                    <h4 className="text-TB">
                      <Link to={`/blog/${article.title_en}`}>
                        {t(article.text)}
                      </Link>
                    </h4>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {articlesArray.map((article) => {
        return (
          <article
            key={article.id}
            className={`article-box-${article.id} group overflow-hidden
            rounded-3xl hidden xl:block duration-0`}
          >
            <img
              src={article.src}
              alt={`article-image-${article.id}`}
              className="group-hover:rotate-6 group-hover:scale-[1.15] select-none"
            />

            <div className="relative w-full">
              <div
                className="absolute bottom-1.5 left-1.5 right-1.5 bg-gray-100/85 rounded-3xl p-4 
                flex flex-col gap-y-1"
              >
                <span className="text-secondary text-sm font-medium">
                  {article.label}
                </span>

                <h4
                  className={`text-TB ${
                    (i18n.language === "en" || i18n.language === "en-US") &&
                    article.id === 4
                      ? "pr-10"
                      : "pr-0"
                  }`}
                >
                  <Link to={`/blog/${article.title_en}`}>
                    {t(article.text)}
                  </Link>
                </h4>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
