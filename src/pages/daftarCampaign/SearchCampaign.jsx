import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getAllCampaign,
  getSearchCampaign,
} from "../../redux/actions/campaignAction";
import Card from "../../components/card/Card";
import { setButtonPage } from "../../redux/reducers/pageReducer";
import Footer from "../../components/navbar&footer/Footer";
import { BiSolidArrowToRight } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Card3 from "../../components/card/Card3";

export default function SearchCampaign() {
  const { name } = useParams();
  const { campaignBySearch } = useSelector((state) => state.campaign);
  const { allCampaign } = useSelector((state) => state.campaign);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setButtonPage(name));
    {
      name && dispatch(getSearchCampaign(name));
    }
    dispatch(getAllCampaign(0));
  }, [name, dispatch]);
  return (
    <>
      <div className="hidden sm:block px-2 sm:px-8 lg:px-[80px] py-4 sm:py-6 font-Inter">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Inter text-gray-600">
          Hasil Pencarian <span className="text-primary">{`"${name}"`}</span>
        </h1>
        <Swiper
          loop={true}
          grabCursor={true}
          slidesPerView={3.5}
          modules={[FreeMode]}
        >
          {(campaignBySearch || []).map((item) => (
            <SwiperSlide className="p-2" key={item?.campaignId || `slide-${Math.random()}`}>
              <Card
                key={item.campaignCode}
                item={item}
                h="min-h-[44vh] sm:min-h-[58vh]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <div className="flex flex-col mt-8 sm:gap-1"></div>
          <div className="flex justify-between items-end text-xl font-Inter sm:text-2xl my-2 sm:my-3">
            <div>
              <p className=" xl:text-3xl text-xl sm:text-2xl font-bold text-fourth">
                Bantu Mereka
              </p>
              <div className="hidden sm:block md:text-lg xl:text-xl text-base text-gray-600">
                <p>
                  Mereka butuh uluran tangan kita, Sedikit bantuan kita sangat
                  berarti bagi mereka
                </p>
              </div>
            </div>
            <Link
              to={`/daftarCampaign/Campaign/1`}
              className="text-xs text-primary -500 sm:text-base font-bold flex gap-2 items-center text-nowrap"
            >
              Lihat semua <BiSolidArrowToRight className="text-2xl" />
            </Link>
          </div>
          <Swiper
            loop={true}
            grabCursor={true}
            slidesPerView={3.5}
            modules={[FreeMode]}
          >
            {(allCampaign || []).slice(0, 6).map((item) => (
              <SwiperSlide className="p-2" key={item?.campaignId || `slide-${Math.random()}`}>
                <Card3 key={item?.campaignCode} item={item} h={"h-full"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="sm:hidden px-2 sm:px-8 lg:px-[80px] py-4 sm:py-6 font-Inter">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Inter text-gray-600">
          Hasil Pencarian <span className="text-primary">{`"${name}"`}</span>
        </h1>
        <Swiper
          loop={true}
          grabCursor={true}
          slidesPerView={1.5}
          modules={[FreeMode]}
        >
          {(campaignBySearch || []).map((item) => (
            <SwiperSlide key={item?.campaignId || `slide-${Math.random()}`}>
              <Card
                key={item.campaignCode}
                item={item}
                h="min-h-[44vh] sm:min-h-[58vh]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <div className="flex flex-col mt-8 sm:gap-1"></div>
          <div className="flex justify-between items-end text-xl font-Inter sm:text-2xl my-2 sm:my-3">
            <div>
              <p className=" xl:text-3xl text-xl sm:text-2xl font-bold text-fourth">
                Bantu Mereka
              </p>
              <div className="hidden sm:block md:text-lg xl:text-xl text-base text-gray-600">
                <p>
                  Mereka butuh uluran tangan kita, Sedikit bantuan kita sangat
                  berarti bagi mereka
                </p>
              </div>
            </div>
            <Link
              to={`/daftarCampaign/Campaign/1`}
              className="text-xs text-primary -500 sm:text-base font-bold flex gap-2 items-center text-nowrap"
            >
              Lihat semua <BiSolidArrowToRight className="text-2xl" />
            </Link>
          </div>
          <Swiper
            loop={true}
            grabCursor={true}
            slidesPerView={1.5}
            modules={[FreeMode]}
          >
            {(allCampaign || []).slice(0, 6).map((item) => (
              <SwiperSlide key={item?.campaignId || `slide-${Math.random()}`}>
                <Card3 key={item?.campaignCode} item={item} h={"h-full"} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </>
  );
}
