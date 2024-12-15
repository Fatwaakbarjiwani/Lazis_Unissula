// import header from "../../assets/landingPage.jpg";
import Information from "../../components/bar/Information";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../../components/card/Card";
import Footer from "../../components/navbar&footer/Footer";
import { responsive2 } from "../../components/data/Responsive";
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
        {/* slider */}
        {/* <div className="mt-20 sm:mt-32 lg:mt-36 font-bold text-gray-600 text-lg sm:text-2xl md:text-4xl space-y-2 sm:space-y-4">
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
                <div className="realtive w-full sm:w-5/6 lg:w-5/6 lg:h-[70vh]">
                  <Link to={`/detailCampaign/${item?.campaignId}`}>
                    <img
                      src={item?.campaignImage}
                      className="h-52 sm:h-60 md:h-72 lg:h-[70vh] w-full rounded-2xl object-fill object-center drop-shadow-lg"
                      alt=""
                      style={{ backgroundRepeat: "no-repeat" }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div> */}
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
          <Carousel
            className="md:hidden"
            responsive={responsive2}
            arrows={false}
          >
            {allCampaign.slice(0, 6).map((item) => (
              <Card
                key={item?.campaignId}
                item={item}
                h={"min-h-[35vh] sm:min-h-[58vh]"}
              />
            ))}
          </Carousel>
        </div>
        {/* doa doa */}
        <div className="px-2 md:px-8 lg:px-16 xl:px-20 2xl:px-32 border-b-4 sm:border-b-0 py-2 border-gray-200">
          <h1 className="font-bold text-lg sm:text-4xl text-gray-600 sm:mt-8 text-left">
            Doa-Doa Orang Baik
          </h1>
          {/* <div>
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
          </div> */}
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
