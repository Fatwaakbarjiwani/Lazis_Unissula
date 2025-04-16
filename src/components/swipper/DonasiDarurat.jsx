import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";

const DonasiDarurat = () => {
  const { allCampaignEmergency } = useSelector((state) => state.campaign);

  // Tampilkan loading atau placeholder jika data belum ada
  if (!allCampaignEmergency || allCampaignEmergency.length === 0) {
    return; 
  }

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      speed={1000}
      grabCursor={true}
      pagination={{ clickable: true }}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      modules={[Pagination, Autoplay]}
      className="z-20 md:rounded-3xl"
    >
      {allCampaignEmergency.slice(0, 10).map((item) => (
        <SwiperSlide key={item?.campaignId}>
          <div className="flex justify-center">
            <div className="relative w-full md:w-10/12 lg:h-[75vh]">
              <Link
                to={`/detailCampaign/${item?.campaignName}/${item?.campaignId}`}
              >
                <img
                  src={item?.campaignImage}
                  className="h-52 sm:h-60 md:h-72 lg:h-[75vh] object-cover w-full md:rounded-3xl"
                  alt=""
                  style={{ backgroundRepeat: "no-repeat" }}
                />
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DonasiDarurat;
