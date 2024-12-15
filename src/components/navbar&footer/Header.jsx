import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import header1 from "../../assets/landingPage1.jpg";
import header2 from "../../assets/landingPage2.jpg";
import header3 from "../../assets/landingPage3.jpg";

export default function Header() {
  // Data untuk Swiper slides
  const slides = [
    {
      id: 1,
      background: header1,
    },
    {
      id: 2,
      background: header2,
    },
    {
      id: 3,
      background: header3,
    },
  ];

  return (
    <div>
      <Swiper
        pagination={{ clickable: true }}
        loop={true}
        speed={2000}
        grabCursor={true}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        className="h-auto sm:h-[40vh] lg:h-[80vh] z-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.background}
                alt={`Slide ${slide.id}`}
                className="h-full w-full object-contain sm:object-cover object-center"
              />
              <div className="absolute inset-0 bg-green-800 opacity-10"></div>{" "}
              {/* Overlay */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
