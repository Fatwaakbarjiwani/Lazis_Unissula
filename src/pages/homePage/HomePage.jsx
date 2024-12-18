// import header from "../../assets/landingPage.jpg";
import Information from "../../components/bar/Information";
import "swiper/css";
import "swiper/css/pagination";
import Card from "../../components/card/Card";
import Footer from "../../components/navbar&footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllCampaign,
  getAllCampaignEmergency,
  getAllMessage,
} from "../../redux/actions/campaignAction";
import DoaList from "../../components/card/CardDoa";
import DonasiDarurat from "../../components/swipper/DonasiDarurat";
import Header from "../../components/navbar&footer/Header";
import Video from "./Video";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

export default function HomePage() {
  const { allCampaign } = useSelector((state) => state.campaign);
  const { allMessage } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCampaign(0));
    dispatch(getAllMessage());
    dispatch(getAllCampaignEmergency());
  }, [dispatch]);
  return (
    <div className="font-Inter">
      {/* Header */}
      <Header />
      {/* information */}
      <div className="relative">
        <Information />
      </div>
      <div>
        <div className="mx-2 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32 mt-16 sm:mt-32 lg:mt-36 font-bold text-gray-600 text-lg sm:text-2xl md:text-4xl space-y-2 sm:space-y-4">
          <h1>Donasi Darurat</h1>
          <DonasiDarurat />
        </div>
        {/* Campaign */}
        <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32">
          <h1 className=" 2xl:mx-32 hidden md:block font-bold text-lg sm:text-2xl md:text-4xl text-gray-600 mt-8 sm:mb-4">
            Rekomendasi Kegiatan
          </h1>
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCampaign.slice(0, 6).map((item) => (
              <Card key={item?.campaignCode} item={item} h={"h-full"} />
            ))}
          </div>
        </div>
        <div className="px-2 md:px-8 lg:px-16 xl:mpx-20 2xl:px-32 md:hidden border-y-4 py-2 border-gray-200 mt-8">
          <h1 className="font-bold text-lg sm:text-2xl md:text-4xl text-gray-600 sm:mb-4">
            Rekomendasi Kegiatan
          </h1>
          <Swiper
            loop={true}
            speed={2000}
            grabCursor={true}
            slidesPerView={1.5}
            modules={[FreeMode]}
          >
            {(allCampaign || []).slice(0, 6).map((item) => (
              <SwiperSlide key={item?.campaignId || `slide-${Math.random()}`}>
                <Card item={item} h="min-h-[38vh] sm:min-h-[58vh]" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* doa doa */}
        <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 border-b-4 sm:border-b-0 py-2 border-gray-200">
          <h1 className="font-bold text-lg sm:text-4xl text-gray-600 sm:mt-8 text-left">
            Doa-Doa Orang Baik
          </h1>
          <DoaList allMessage={allMessage} />
        </div>
        {/* Video */}
        <div className="border-b-4 sm:border-b-0 py-2 border-gray-200">
          <Video />
        </div>
      </div>
      <Footer />
    </div>
  );
}
