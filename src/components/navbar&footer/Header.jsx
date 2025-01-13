import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import header1 from "../../assets/landingPage1.jpg";
// import header2 from "../../assets/landingPage2.jpg";
// import header3 from "../../assets/landingPage3.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSlides } from "../../redux/actions/authAction";

export default function Header() {
  // Data untuk Swiper slides
  const { slides } = useSelector((state) => state.page);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSlides());
  }, [dispatch]);

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
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src={slides[0]?.image_1}
              alt={`Slide ${slides[0]?.image_1}`}
              className="h-full w-full object-contain sm:object-cover object-center"
            />
            <div className="absolute inset-0 bg-green-800 opacity-10"></div>{" "}
            {/* Overlay */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src={slides[0]?.image_2}
              alt={`Slide ${slides[0]?.image_2}`}
              className="h-full w-full object-contain sm:object-cover object-center"
            />
            <div className="absolute inset-0 bg-green-800 opacity-10"></div>{" "}
            {/* Overlay */}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src={slides[0]?.image_3}
              alt={`Slide ${slides[0]?.image_3}`}
              className="h-full w-full object-contain sm:object-cover object-center"
            />
            <div className="absolute inset-0 bg-green-800 opacity-10"></div>{" "}
            {/* Overlay */}
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
