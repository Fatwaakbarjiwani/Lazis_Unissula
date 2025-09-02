import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSlides } from "../../redux/actions/authAction";

export default function Header() {
  const { slides } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);

  const images = [
    slides?.[0]?.image_1,
    slides?.[0]?.image_2,
    slides?.[0]?.image_3,
  ].filter(Boolean); // pastikan hanya gambar yang tersedia

  if (images.length === 0) {
    return null; // atau tambahkan loader jika ingin UX lebih baik
  }

  return (
    <div>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={2000}
        grabCursor={true}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        className="h-auto sm:h-[40vh] lg:h-[80vh] z-0"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={src}
                alt={`image${index + 1}`}
                loading="lazy"
                className="h-full w-full object-contain sm:object-cover object-center"
              />
              <div className="absolute inset-0 bg-green-800 opacity-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
