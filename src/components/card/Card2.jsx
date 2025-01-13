import { FaExclamationTriangle } from "react-icons/fa"; // Importing a warning icon
import location from "../../assets/location.svg";
import time from "../../assets/time.svg";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Target from "./Target";

export default function Card2({ item, h }) {
  const navigate = useNavigate();
  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleDetail = (item) => {
    navigate(`/detailCampaign/${item}`);
  };

  return (
    <div>
      <div
        className={`relative ${h} justify-between m-1 md:m-0 card-wrapper md:h-full shadow sm:drop-shadow-lg bg-second rounded-xl md:rounded-xl xl:rounded-3xl flex flex-col font-Inter cursor-pointer md:hover:scale-105 transition delay-150 duration-300 ease-in-out`}
      >
        <div className="relative sm:p-3">
          {item?.emergency && (
            <div className="absolute top-0 left-0 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-tl-xl rounded-br-xl xl:rounded-tl-3xl xl:rounded-br-3xl shadow-lg animate-pulse">
              <FaExclamationTriangle className="animate-ping duration-1000" />
              <span className="text-xs font-semibold">EMERGENCY</span>
            </div>
          )}
          <img
            src={item?.campaignImage}
            className="object-contain h-auto sm:h-36 md:h-40 lg:h-44 rounded-t-xl md:rounded-t-xl xl:rounded-3xl w-full"
            alt=""
          />
          <div>
            <p className="font-Inter font-bold md:text-base text-lg lg:text-lg line-clamp-2 mt-2 lg:leading-6 px-2 md:px-0">
              {item?.campaignName}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 px-2 pb-2 sm:pb-3 sm:px-3">
          {/* category */}
          <div className="flex justify-between gap-1">
            <div className="text-sm flex gap-1 items-center font-semibold">
              <p>Kategori</p>
              <p className="bg-fourth text-white px-1 sm:px-1 rounded-3xl font-semibold">
                {item?.campaignCategory}
              </p>
            </div>
            {/* location */}
            <div className="flex gap-1 lg:gap-1 items-center">
              <img src={location} className="lg:w-5 md:w-5 w-5" alt="" />
              <p className="md:text-sm xl:text-base sm:text-xs text-sm font-semibold">
                {item?.location}
              </p>
            </div>
          </div>
          <div className="w-full rounded-full bg-NEUTRAL04 sm:block">
            <Target
              targetAmount={item?.targetAmount}
              amountCampaign={item?.currentAmount}
            />
          </div>
          <div>
            <div className="flex justify-between">
              <p className="xl:text-base md:text-sm sm:text-xs ">Terkumpul</p>
              <p className="xl:text-base md:text-sm sm:text-xs text-fourth font-semibold">
                Rp {formatNumber(item?.currentAmount || 0)}
              </p>
            </div>
            <div className="hidden flex justify-between">
              <p className="xl:text-base md:text-sm sm:text-xs ">Target</p>
              <p className="xl:text-base md:text-sm sm:text-xs font-semibold text-fourth">
                Rp {formatNumber(item?.targetAmount || 0)}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <button
              onClick={() => handleDetail(item?.campaignId)}
              className="rounded-xl w-1/2 lg:px-5 md:px-4 sm:px-3 px-1 xl:px-6 py-2 lg:py-1 bg-fourth xl:text-base lg:text-sm sm:text-xs text-sm text-white font-semibold mt-2 hover:scale-105 hover:bg-thirt"
            >
              Ikut Donasi
            </button>
            <div className="flex gap-1 items-center">
              <img className="lg:w-5 md:w-5 w-3" src={time} alt="" />
              <p className="xl:text-base lg:text-sm sm:text-xs text-[10px]">
                {item?.endDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card2.propTypes = {
  item: PropTypes.object.isRequired,
  h: PropTypes.string,
};
