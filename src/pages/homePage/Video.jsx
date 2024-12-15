import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import header1 from "../../assets/landingPage1.jpg";
import header2 from "../../assets/landingPage2.jpg";
import header3 from "../../assets/landingPage3.jpg";

export default function Video() {
  // Data untuk Swiper slides
  const slides = [
    {
      id: 1,
      background: header1,
      linkVideo: "https://www.youtube.com/embed/J4M7GmQ24L8",
      title: "Banjir Semarang-Demak",
      date: "27 Oktober 2023",
      description:
        "Dokumentasi Relawan Lazis Sultan Agung saat banjir Semarang-Demak, Januari 2023.",
    },
    {
      id: 2,
      background: header2,
      linkVideo: "https://www.youtube.com/embed/V6xATwWDNyA",
      title: "Program Bantuan Pendidikan",
      date: "15 November 2023",
      description:
        "Inisiatif pendidikan untuk anak-anak yang membutuhkan di berbagai daerah.",
    },
    {
      id: 3,
      background: header3,
      linkVideo: "https://www.youtube.com/embed/4kgRkDHz_OY",
      title: "Program Bantuan Kesehatan",
      date: "20 Desember 2023",
      description:
        "Layanan kesehatan gratis untuk masyarakat kurang mampu di daerah terpencil.",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        pagination={{ clickable: true }}
        loop={true}
        speed={2000}
        grabCursor={true}
        slidesPerView={1}
        modules={[Pagination]}
        className="h-[40vh] lg:h-[80vh] z-0"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.background}
                alt={`Slide ${slide.id}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center py-4 md:py-0 md:justify-between px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 gap-2 md:gap-8 text-white">
                <div className="w-3/4 md:w-1/2 flex justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    src={slide.linkVideo}
                    title={slide.title}
                    className="rounded-lg shadow-lg aspect-video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="flex-1 flex flex-col gap-1 md:gap-2 text-left">
                  <h3 className="text-lg lg:text-3xl font-semibold">
                    {slide.title}
                  </h3>
                  <p className="text-sm md:text-base">{slide.description}</p>
                  <p className="text-xs lg:text-base text-gray-300">
                    Tanggal: {slide.date}
                  </p>
                  <a
                    href={slide.linkVideo.replace("embed/", "watch?v=")}
                    className="text-blue-400 underline text-xs lg:text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Selengkapnya
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
