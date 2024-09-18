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
      <div className="px-4 sm:px-8 lg:px-[80px] py-4 sm:py-6 font-Inter">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-Inter text-gray-600">
          Hasil Pencarian <span className="text-primary">{`"${name}"`}</span>
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-6 mt-2 sm:mt-4">
          {campaignBySearch.map((item) => (
            <Card key={item.campaignCode} item={item} m={"0vh"} />
          ))}
        </div>
        <div>
          <div className="flex flex-col mt-8 sm:gap-1"></div>
          <div className="flex justify-between items-end text-xl font-Inter sm:text-2xl my-2 sm:my-3">
            <div>
              <p className=" xl:text-3xl text-xl sm:text-2xl font-bold text-fourth">
                Bantu Mereka
              </p>
              <div className="md:text-lg xl:text-xl text-base text-gray-600">
                <p>
                  Mereka butuh uluran tangan kita, Sedikit bantuan kita sangat
                  berarti bagi mereka
                </p>
              </div>
            </div>
            <Link
              to={`/daftarCampaign/Campaign/1`}
              className="text-xs text-primary -500 sm:text-base font-bold flex gap-2 items-center"
            >
              Lihat semua <BiSolidArrowToRight className="text-2xl"/>
            </Link>
          </div>
          <div className="justify-between grid md:grid-cols-3 grid-cols-2 mb-8 md:gap-6 sm:gap-5 gap-y-2">
            {allCampaign.slice(0, 6).map((item) => (
              <Card key={item.campaignName} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
