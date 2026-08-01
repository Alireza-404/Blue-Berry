import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function Image({ src, title }) {
  const [index, setIndex] = useState(0);
  const [isCursorInImage, setIsCursorInImage] = useState(false);
  const [position, setPosition] = useState({
    x: 50,
    y: 50,
  });

  const images = [
    {
      id: 1,
      src,
      filter: "none",
    },
    {
      id: 2,
      src,
      filter: "brightness(1.1) hue-rotate(80deg)",
    },
    {
      id: 3,
      src,
      filter: "hue-rotate(160deg)",
    },
    {
      id: 4,
      src,
      filter: "hue-rotate(240deg)",
    },
    {
      id: 5,
      src,
      filter: "hue-rotate(320deg)",
    },
  ];

  const activeImage = images[index];

  const handleMouseMove = (event) => {
    setIsCursorInImage(true);
    const rect = event.currentTarget.getBoundingClientRect();

    const { clientX, clientY } = event;

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div
      className="rounded-2xl border border-TB/15 dark:border-box-border-D p-4
      flex flex-col gap-y-4 md:w-[404px] xl:w-[500px] md:mx-auto h-fit"
    >
      <div className="overflow-hidden rounded-2xl">
        <div
          style={{
            transformOrigin: isCursorInImage
              ? `${position.x}% ${position.y}%`
              : "center center",
            filter: activeImage.filter,
          }}
          className={`transition-transform duration-300 ${
            isCursorInImage ? "scale-[1.8]" : "scale-100"
          }`}
        >
          <AnimatePresence initial={true} mode="wait">
            <motion.img
              key={activeImage.id}
              src={activeImage.src}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setIsCursorInImage(false)}
              alt={"Big-Image"}
              className="w-full h-96 xl:h-[505px] duration-0 object-cover select-none rounded-2xl"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.15 }}
              title={title}
            />
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          className="swiper-button-prev-custom text-secondary 
          dark:text-secondary-D text-3xl"
        >
          <LuChevronLeft />
        </button>

        <Swiper
          className="w-full"
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          loop={true}
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {images.map((image, i) => (
            <SwiperSlide key={image.id}>
              <div
                className={`rounded-xl overflow-hidden ${
                  i === index
                    ? "border-2 border-primary"
                    : "border-2 border-transparent"
                }`}
              >
                <img
                  src={image.src}
                  style={{ filter: image.filter }}
                  onClick={() => setIndex(i)}
                  className="cursor-pointer select-none"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className="swiper-button-next-custom text-secondary 
          dark:text-secondary-D text-3xl"
        >
          <LuChevronRight />
        </button>
      </div>
    </div>
  );
}
