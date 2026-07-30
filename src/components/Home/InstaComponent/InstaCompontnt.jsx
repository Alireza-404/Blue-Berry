import Img1 from "../../../assets/images/Insta/1.jpg";
import Img2 from "../../../assets/images/Insta/2.jpg";
import Img3 from "../../../assets/images/Insta/3.jpg";
import Img4 from "../../../assets/images/Insta/4.jpg";
import Img5 from "../../../assets/images/Insta/5.jpg";
import Img6 from "../../../assets/images/Insta/6.jpg";

import gsap from "gsap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/autoplay";
import { AiOutlineInstagram } from "react-icons/ai";

gsap.registerPlugin(ScrollTrigger);

export default function InstaCompontnt() {
  const srcArray = [Img1, Img2, Img3, Img4, Img5, Img6];

  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1279px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom",
            toggleActions: "play none none reverse",
          },
        });

        tl.from(self.selector("#insta-swiper"), {
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

        tl.from(self.selector(".insta-box"), {
          y: -100,
          opacity: 0,
          ease: "power3.out",
          duration: 0.6,
          stagger: 0.2,
        }).from(self.selector(".insta-effect"), {
          y: -100,
          scale: 0.5,
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
    <div
      ref={containerRef}
      className="relative xl:grid xl:grid-cols-6 xl:gap-6"
    >
      <Swiper
        id="insta-swiper"
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
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
        {srcArray.map((src, i) => {
          return (
            <SwiperSlide key={i}>
              <article
                id="insta-swiper-slide"
                className="group relative rounded-3xl overflow-hidden"
              >
                <img
                  src={src}
                  alt={`insta-image-${i + 1}`}
                  className="select-none"
                />

                <div
                  className="absolute top-0 right-0 w-full h-full bg-black/50
                  flex items-center justify-center opacity-0 invisible scale-[2.2] rotate-90
                  group-hover:opacity-100 group-hover:visible group-hover:scale-100
                  group-hover:rotate-0 duration-300"
                >
                  <span className="text-5xl text-white">
                    <AiOutlineInstagram />
                  </span>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {srcArray.map((src, i) => {
        return (
          <article
            key={i}
            className="relative insta-box group overflow-hidden
            rounded-3xl hidden xl:block duration-0 cursor-pointer"
          >
            <img
              src={src}
              alt={`insta-image-${i + 1}`}
              className="select-none"
            />

            <div
              id="insta-effect"
              className="absolute inset-0 bg-black/50
                  flex items-center justify-center opacity-0 invisible scale-[2.2] rotate-90
                  group-hover:opacity-100 group-hover:visible group-hover:scale-100
                  group-hover:rotate-0 duration-300"
            >
              <span className="text-5xl text-white">
                <AiOutlineInstagram />
              </span>
            </div>
          </article>
        );
      })}

      <span
        className="insta-effect px-5 py-1.5 rounded-full bg-white text-TB text-2xl
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 select-none
        duration-0"
      >
        #Insta
      </span>
    </div>
  );
}
