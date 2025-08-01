import Information from "../../components/bar/Information";
import "swiper/css";
import "swiper/css/pagination";
import Card from "../../components/card/Card";
import Footer from "../../components/navbar&footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCampaign,
  getAllCampaignEmergency,
  getAllMessage,
} from "../../redux/actions/campaignAction";
import DoaList from "../../components/card/CardDoa";
import DonasiDarurat from "../../components/swipper/DonasiDarurat";
import Header from "../../components/navbar&footer/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Card3 from "../../components/card/Card3";
import { Commet } from "react-loading-indicators";

export default function HomePage() {
  const { allCampaign } = useSelector((state) => state.campaign);
  const { allMessage } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

   useEffect(() => {
     const fetchData = async () => {
       try {
         setLoading(true);
         await dispatch(getAllCampaign(0));
         await dispatch(getAllMessage());
         await dispatch(getAllCampaignEmergency());
       } finally {
         setLoading(false);
       }
     };

     fetchData();
   }, [dispatch]);
  return (
    <div>
      {loading ? (
        <div className="col-span-2 lg:col-span-3 flex justify-center h-[80vh] items-center">
          <div className="loader">
            <Commet
              color="#69C53E"
              size="medium"
              text="Loading"
              textColor="#69C53E"
            />
          </div>
        </div>
      ) : (
        <div className="font-Inter z-10">
          {/* Header */}
          <Header />
          {/* information */}
          <div className="relative z-20">
            <Information />
          </div>
          <div>
            <div className="font-sans mx-2 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32 mt-16 sm:mt-32 lg:mt-36 font-extrabold text-gray-600 text-2xl sm:text-2xl md:text-4xl space-y-2 sm:space-y-4">
              <h1>
                <span className="text-primary">DONASI</span> DARURAT
              </h1>
              <DonasiDarurat />
            </div>
            {/* Campaign */}
            <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32">
              <h1 className="font-sans hidden md:block font-extrabold text-2xl sm:text-2xl md:text-4xl text-gray-600 mt-8 sm:mb-4">
                REKOMENDASI DONASI
              </h1>
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCampaign.slice(0, 6).map((item) => (
                  <Card3 key={item?.campaignCode} item={item} h={"h-full"} />
                ))}
              </div>
            </div>
            <div className="px-2 md:px-8 lg:px-16 xl:mpx-20 2xl:px-32 md:hidden border-b-4 py-2 border-gray-200 mt-4">
              <h1 className="font-sans font-extrabold text-2xl sm:text-2xl md:text-4xl text-gray-600 sm:mb-4">
                REKOMENDASI <span className="text-primary">DONASI</span>
              </h1>
              <Swiper
                loop={true}
                grabCursor={true}
                slidesPerView={1.5}
                modules={[FreeMode]}
              >
                {(allCampaign || []).slice(0, 6).map((item) => (
                  <SwiperSlide
                    key={item?.campaignId || `slide-${Math.random()}`}
                  >
                    <Card item={item} h="min-h-[40vh] sm:min-h-[58vh]" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* doa doa */}
            <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 py-2">
              <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-gray-600 sm:mt-8 text-left">
                DOA DOA ORANG BAIK
              </h1>
              <DoaList allMessage={allMessage} />
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
