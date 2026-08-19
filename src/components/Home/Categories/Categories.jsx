import Svg1 from "../../../assets/images/Categories/1.svg";
import Svg2 from "../../../assets/images/Categories/2.svg";
import Svg3 from "../../../assets/images/Categories/3.svg";
import Svg4 from "../../../assets/images/Categories/4.svg";
import Svg5 from "../../../assets/images/Categories/5.svg";
import Svg6 from "../../../assets/images/Categories/6.svg";

import gsap from "gsap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/autoplay";
import useProducts from "../../../hooks/useProducts";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const { products, error, loading } = useProducts();

  const categoriesArray = [
    { id: 1, text: "vegetables", src: Svg1 },
    { id: 2, text: "fruits", src: Svg2 },
    { id: 3, text: "coldDrinks", src: Svg3 },
    { id: 4, text: "bakery", src: Svg4 },
    { id: 5, text: "fastFood", src: Svg5 },
    { id: 6, text: "snack", src: Svg6 },
  ];

  const containerRef = useRef(null);
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("#child", {
        x: 200,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#child",
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
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
      className="lg:absolute lg:-bottom-10 lg:-left-32 lg:w-[120%]
     lg:bg-white lg:dark:bg-body lg:p-6 lg:rounded-3xl xl:lg:-bottom-20 xl:p-8"
    >
      <Swiper
        id="child"
        modules={[Autoplay]}
        spaceBetween={12}
        slidesPerView={2}
        freeMode={true}
        loop={true}
        breakpoints={{
          768: {
            spaceBetween: 16,
            slidesPerView: 3,
          },
          1280: { slidesPerView: 4 },
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        className="duration-0"
      >
        {loading
          ? categoriesArray.map((_, i) => {
              return (
                <SwiperSlide key={i}>
                  <div
                    className="select-non h-40 rounded-3xl bg-secondary/50
                    dark:bg-secondary-D/50 animate-pulse"
                  ></div>
                </SwiperSlide>
              );
            })
          : categoriesArray.map((category) => {
              let id = category.id;

              const count = products.filter(
                (product) => product.category_en.toLowerCase() === category.text
              ).length;

              return (
                <SwiperSlide key={category.id}>
                  <Link
                    to={`${
                      count === 0
                        ? "#"
                        : `/shop?category=${category.text.toLocaleLowerCase()}`
                    }`}
                  >
                    <article
                      className={`h-40 rounded-3xl flex flex-col items-center select-none
                    justify-center gap-y-1.5 duration-0
                    ${
                      id === 1 || id === 5
                        ? "bg-pink-100"
                        : id === 2 || id === 6
                        ? "bg-emerald-100"
                        : id === 3
                        ? "bg-purple-100"
                        : "bg-yellow-100"
                    }`}
                    >
                      <div className="w-14 h-14">
                        <img
                          src={category.src}
                          alt={`svg-${id}`}
                          className="w-full h-full"
                        />
                      </div>

                      <div className="flex flex-col gap-y-0.5 items-center">
                        <span className="text-lg text-TB">
                          {t(`categories.${category.text}`)}
                        </span>

                        <span
                          className={`font-normal text-sm ${
                            error
                              ? "text-red-500 tracking-wider"
                              : "text-secondary"
                          }`}
                        >
                          {error
                            ? `${i18n.language === "de" ? "Fehler" : "Error"}`
                            : `${count} ${t("categories.items")}`}
                        </span>
                      </div>
                    </article>
                  </Link>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
}
