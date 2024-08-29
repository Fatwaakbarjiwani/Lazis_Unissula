import location from "../../assets/location.svg";
import time from "../../assets/time.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Target from "./Target";
export default function Card({ item }) {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const cardCategory = () => {
      setCategory(item?.category);
    };
    cardCategory();
  }, [item]);
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleDetail = (item) => {
    navigate(`/detailCampaign/${item}`);
  };

  return (
    <div>
      <div
        className={`card-wrapper h-full drop-shadow-lg bg-second rounded-xl md:rounded-xl xl:rounded-3xl flex flex-col font-NEUTRAL04 font-Inter cursor-pointer md:hover:scale-105 transition delay-150 duration-300 ease-in-out`}
      >
        <div className="p-3">
          <img
            src={item?.campaignImage}
            className="object-cover h-24 sm:h-36 md:h-40 lg:h-44 rounded-t-xl md:rounded-t-xl xl:rounded-3xl w-full"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-1 p-3">
          <div>
            <p className="font-Inter font-bold md:text-base text-xs lg:text-lg line-clamp-2">
              {item?.campaignName}
            </p>
          </div>
          {/* category */}
          <div className="flex flex-col justify-between gap-1">
            <div className="md:text-sm text-[6px] flex gap-1 items-center">
              <p>Kategori</p>
              <p className="bg-fourth text-white px-1 sm:px-2 rounded-3xl  font-semibold">
                {category?.categoryName}
              </p>
            </div>
            {/* location */}
            <div className="flex gap-1 lg:gap-1 items-center">
              <img src={location} className="lg:w-5 md:w-5 w-3" alt="" />
              <p className="md:text-sm xl:text-base sm:text-xs text-[8px]">
                {item?.location}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-between sm:hidden">
            <p className="xl:text-base md:text-sm sm:text-xs text-[8px]">
              Terkumpul
            </p>
            <div className="w-full rounded-full bg-NEUTRAL04">
              <Target
                targetAmount={item?.targetAmount}
                amountCampaign={item?.currentAmount}
              />
            </div>
          </div>
          <div className="w-full rounded-full bg-NEUTRAL04 hidden sm:block">
            <Target
              targetAmount={item?.targetAmount}
              amountCampaign={item?.currentAmount}
            />
          </div>
          <div>
            <div className="hidden sm:flex justify-between ">
              <p className="xl:text-base md:text-sm sm:text-xs ">Terkumpul</p>
              <p className="xl:text-base md:text-sm sm:text-xs ">
                Rp {formatNumber(item?.currentAmount)}
              </p>
            </div>
            <div className="hidden sm:flex justify-between ">
              <p className="xl:text-base md:text-sm sm:text-xs ">Target</p>
              <p className="xl:text-base md:text-sm sm:text-xs ">
                Rp {formatNumber(item?.targetAmount)}
              </p>
            </div>
          </div>
          {/* button */}
          <div className="block sm:hidden justify-between">
            <div className="flex gap-1 items-center">
              <img className="lg:w-7 md:w-5 w-3" src={time} alt="" />
              <p className="lg:text-base md:text-sm sm:text-xs text-[8px]">
                {item?.endDate}
              </p>
            </div>
            <button
              onClick={() => handleDetail(item?.campaignCode)}
              className="mt-1 w-full rounded-lg lg:px-5 md:px-4 sm:px-3 px-2 xl:px-6 py-1 lg:py-1 bg-fourth lg:text-base md:text-sm sm:text-xs text-[10px] text-white font-semibold mt-2 md:hover:scale-105 md:hover:bg-thirt"
            >
              Ikut Donasi
            </button>
          </div>
          <div className="sm:flex hidden justify-between">
            <button
              onClick={() => handleDetail(item?.campaignCode)}
              className="rounded-full lg:px-5 md:px-4 sm:px-3 px-2 xl:px-6 py-1 lg:py-1 bg-fourth xl:text-base lg:text-sm sm:text-xs text-[10px] text-white font-semibold mt-2 hover:scale-105 hover:bg-thirt"
            >
              Ikut Donasi
            </button>
            <div className="flex gap-1 items-center">
              <img className="lg:w-5 md:w-5 w-3" src={time} alt="" />
              <p className="xl:text-base lg:text-sm sm:text-xs text-[8px]">
                {item?.endDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Card.propTypes = {
  item: PropTypes.object.isRequired,
};
