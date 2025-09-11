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
// import DoaList from "../../components/card/CardDoa";
import DonasiDarurat from "../../components/swipper/DonasiDarurat";
import Header from "../../components/navbar&footer/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Card3 from "../../components/card/Card3";
import { Commet } from "react-loading-indicators";
import { Link } from "react-router-dom";
import CardBerita from "../../components/card/CardBerita";
import { getAllBerita } from "../../redux/actions/beritaAction";
import BeritaRSS from "../../components/BeritaRSS";
import { getMitra } from "../../redux/actions/mitraAction";

export default function HomePage() {
  const { allCampaign } = useSelector((state) => state.campaign);
  // const { allMessage } = useSelector((state) => state.campaign);
  const { allBerita } = useSelector((state) => state.berita);
  const {
    data: mitraData,
    loading: mitraLoading,
    error: mitraError,
  } = useSelector((state) => state.mitra);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getAllCampaign(0));
        await dispatch(getAllMessage());
        await dispatch(getAllCampaignEmergency());
        await dispatch(getAllBerita(0));
        await dispatch(getMitra());
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
            {/* berita  */}
            <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 py-2">
              <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-gray-600 sm:mt-8 text-left">
                BERITA TERBARU
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-6 mt-4">
                {allBerita.slice(0, 4).map((item) => (
                  <Link to={`/detailBerita/${item?.id}`} key={item?.id}>
                    <CardBerita
                      image={item?.newsImage}
                      judul={item?.title}
                      tanggal={item?.date}
                      content={item?.content}
                    />
                  </Link>
                ))}
              </div>
            </div>
            <BeritaRSS />
            {/* doa doa */}
            {/* <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 py-2">
              <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-gray-600 sm:mt-8 text-left">
                DOA DOA ORANG BAIK
              </h1>
              <DoaList allMessage={allMessage} />
            </div> */}
            <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 py-2">
              <h1 className="font-sans font-extrabold text-2xl sm:text-4xl text-gray-600 sm:mt-8 text-left">
                MITRA
              </h1>

              {/* Mitra Section */}
              {mitraLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="loader">
                    <Commet
                      color="#69C53E"
                      size="small"
                      text="Loading"
                      textColor="#69C53E"
                    />
                  </div>
                </div>
              ) : mitraError ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Error: {mitraError}</p>
                </div>
              ) : mitraData && mitraData.length > 0 ? (
                <div className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 md:gap-6">
                    {mitraData.map((mitra) => (
                      <div
                        key={mitra.id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-20 h-20 md:w-24 md:h-24 mb-3 overflow-hidden rounded-lg">
                            <img
                              src={mitra.image}
                              alt={mitra.name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.src = "/placeholder-logo.png"; // fallback image
                              }}
                            />
                          </div>
                          <h3 className="text-sm md:text-base font-semibold text-gray-800 text-center">
                            {mitra.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Belum ada data mitra</p>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
