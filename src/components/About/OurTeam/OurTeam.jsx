import Img1 from "../../../assets/images/About/1.jpg";
import Img2 from "../../../assets/images/About/2.jpg";
import Img3 from "../../../assets/images/About/3.jpg";
import Img4 from "../../../assets/images/About/4.jpg";
import TopShape from "../../../assets/images/About/top-shape.png";
import BottomShape from "../../../assets/images/About/bottom-shape.png";
import TopShapeDark from "../../../assets/images/About/top-shape-dark.png";
import BottomShapeDark from "../../../assets/images/About/bottom-shape-dark.png";

import gsap from "gsap";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { AiFillFacebook, AiFillLinkedin, AiOutlineX } from "react-icons/ai";
import { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "swiper/css";
import "swiper/css/autoplay";

gsap.registerPlugin(ScrollTrigger);

export default function OurTeam() {
  const containerRef = useRef(null);

  const teamArray = [
    { id: 1, src: Img1, name: "Elena Wilson", role: "Manager" },
    { id: 2, src: Img2, name: "Mario Bisop", role: "CEO" },
    { id: 3, src: Img3, name: "Maria Margret", role: "Co-Founder" },
    { id: 4, src: Img4, name: "Juliat Hilson", role: "Team Leader" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom bottom",
          toggleActions: "play none none reverse",
        },
        y: -150,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="duration-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={12}
        breakpoints={{
          450: {
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 3,
          },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        freeMode={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={500}
        className="duration-0"
      >
        {[...teamArray, ...teamArray].map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <article className="group flex flex-col gap-y-4 overflow-hidden">
                <div className="relative">
                  <img
                    className="w-full rounded-3xl select-none"
                    src={item.src}
                    alt={`Team-Image-${item.id}`}
                  />

                  <div
                    className="absolute top-1/2 right-0 -translate-y-1/2 bg-white
                    dark:bg-body rounded-l-2xl opacity-0 invisible translate-x-full
                    group-hover:opacity-100 group-hover:visible group-hover:translate-x-0"
                  >
                    <ul className="relative flex flex-col gap-y-5 p-[18px]">
                      <li>
                        <a
                          href="#"
                          className="text-xl text-secondary dark:text-secondary-D
                          hover:text-primary dark:hover:text-primary"
                        >
                          <AiFillFacebook />
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-xl text-secondary dark:text-secondary-D
                          hover:text-primary dark:hover:text-primary"
                        >
                          <AiOutlineX />
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="text-xl text-secondary dark:text-secondary-D
                          hover:text-primary dark:hover:text-primary"
                        >
                          <AiFillLinkedin />
                        </a>
                      </li>

                      <img
                        src={TopShape}
                        alt="Top-Shape"
                        className="absolute top-0 right-0 -translate-y-full block dark:hidden"
                      />

                      <img
                        src={BottomShape}
                        alt="Bottom"
                        className="absolute bottom-0 right-0 translate-y-full block dark:hidden"
                      />

                      <img
                        src={TopShapeDark}
                        alt="Top-Shape"
                        className="absolute top-0 right-0 -translate-y-full hidden dark:block"
                      />

                      <img
                        src={BottomShapeDark}
                        alt="Bottom"
                        className="absolute bottom-0 right-0 translate-y-full hidden dark:block"
                      />
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <h5 className="text-TB dark:text-white text-xl tracking-wider">
                    {item.name}
                  </h5>

                  <p
                    className="text-secondary dark:text-secondary-D font-mono
                    tracking-wide"
                  >
                    {item.role}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
