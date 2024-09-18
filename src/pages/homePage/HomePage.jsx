import header from "../../assets/header.svg";
import iconnavbar from "../../assets/iconnavbar.svg";
import Information from "../../components/bar/Information";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../../components/card/Card";
import CardDoa from "../../components/card/CardDoa";
import Footer from "../../components/navbar&footer/Footer";
import { responsive1, responsive2 } from "../../components/data/Responsive";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllCampaign,
  getAllCampaignEmergency,
  getAllMessage,
} from "../../redux/actions/campaignAction";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const { allCampaign } = useSelector((state) => state.campaign);
  const { allMessage } = useSelector((state) => state.campaign);
  const { allCampaignEmergency } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({
      duration: 1200,
      // offset: 250,
      once: true,
    });
    dispatch(getAllCampaign(0));
    dispatch(getAllMessage());
    dispatch(getAllCampaignEmergency());
  }, [dispatch]);
  return (
    <div className="font-Inter" data-aos="zoom-out">
      {/* Header */}
      <div
        className="flex justify-center pb-12 lg:h-[80vh]"
        style={{
          backgroundImage: `url(${header})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div className="flex justify-center w-5/6 items-center gap-5">
          <div className="w-1/2 hidden md:block">
            <img src={iconnavbar} alt="" className="w-full md:w-[90%]" />
          </div>
          <div className="w-full md:w-3/4 text-center md:text-left space-y-3">
            <h1 className="font-Montserrat mt-2 sm:mt-0 text-white font-[900] text-lg sm:text-xl md:text-2xl lg:text-4xl text-stroke2 sm:text-stroke">
              Donasi Anda Harapan Mereka
            </h1>
            <p className="text-white text-sm sm:text-base lg:text-xl md:w-5/6 md:mt-4 mt-1 sm:mt-2">
              Dengan berdonasi, Anda tidak hanya membantu materi,tapi juga
              menyalakan harapan bagi mereka yang membutuhkan
            </p>
            <Link to={"/daftarCampaign/Campaign/1"}>
              <button className="text-white font-semibold bg-fourth px-2 py-1 sm:px-4 rounded-md mt-4 text-sm sm:text-base md:text-lg hover:scale-105 duration-300">
                DONASI SEKARANG
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* information */}
      <Information />
      <div className="mx-4 md:mx-8 lg:mx-16 xl:mx-20 2xl:mx-32">
        {/* slider */}
        <div className="mt-20 lg:mt-36 font-bold text-gray-600 text-lg sm:text-4xl space-y-2 sm:space-y-4">
          <h1>Donasi Darurat</h1>
          <Carousel
            showDots={true}
            arrows={false}
            responsive={responsive1}
            infinite={true}
            autoPlaySpeed={5000}
            autoPlay
            keyBoardControl={true}
            itemClass="carousel-item-padding-40-px"
            className="z-20"
          >
            {allCampaignEmergency.slice(0, 10).map((item) => (
              <div key={item?.campaignId} className="flex justify-center">
                <div className="realtive w-full sm:w-5/6 lg:w-4/6 lg:h-[60vh]">
                  <Link to={`/detailCampaign/${item?.campaignId}`}>
                    <img
                      src={item?.campaignImage}
                      className="h-52 sm:h-60 md:h-72 lg:h-80 w-full rounded-2xl object-fill object-center"
                      alt=""
                      style={{ backgroundRepeat: "no-repeat" }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        {/* Campaign */}
        <h1 className="hidden md:block font-bold text-lg sm:text-4xl text-gray-600 mt-8 sm:mb-4">
          Rekomendasi Kegiatan
        </h1>
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCampaign.slice(0, 6).map((item) => (
            <Card key={item?.campaignCode} item={item} />
          ))}
        </div>
        <div className="md:hidden border-y-8 border-gray-50 mt-8">
          <h1 className="font-bold text-lg sm:text-4xl text-gray-600 sm:mb-4">
            Rekomendasi Kegiatan
          </h1>
          <Carousel
            className="md:hidden py-2"
            responsive={responsive2}
            arrows={false}
          >
            {allCampaign.slice(0, 6).map((item) => (
              <Card key={item?.campaignId} item={item} />
            ))}
          </Carousel>
        </div>
        {/* doa doa */}
        <div>
          <h1 className="font-bold text-lg sm:text-4xl text-gray-600 mt-4 sm:mt-8 text-left">
            Doa-Doa Orang Baik
          </h1>
          <div>
            <Carousel
              arrows={false}
              keyBoardControl={true}
              responsive={responsive2}
              className="pb-4 sm:py-4 z-10"
            >
              {allMessage.map((item) => (
                <CardDoa
                  key={item?.id}
                  id={item?.id}
                  nama={item?.username}
                  judul={item?.campaign?.campaignName}
                  waktu={item?.messagesDate}
                  ucapan={item?.messages}
                  aamiin={item?.aamiin}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
