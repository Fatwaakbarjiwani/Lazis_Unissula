import PropTypes from "prop-types";
import { BiCalendar } from "react-icons/bi";
// import rightrow from "../../assets/rightrow.svg";

export default function CardBerita({ image, tanggal, judul, content }) {
  return (
    <div
      style={{
        backgroundImage: `url(${encodeURI(image)})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative bg-second rounded-2xl p-2 h-60 sm:h-72 flex items-end font-Inter text-gray-800 overflow-hidden hover:transition-all shadow-md"
    >
      <div className="absolute left-0 bottom-[-72px] sm:bottom-[-76px] hover:translate-y-[-72px] sm:hover:translate-y-[-76px] duration-300 box-border hover:bg-black/50 bg-black/50 rounded-xl p-2 w-full text-white">
        <div className="flex gap-2 items-center">
          <div className="space-y-2 flex-1">
            <div className="flex items-end gap-1 text-[10px] sm:text-xs">
              <BiCalendar className="text-base" />
              <p>{tanggal}</p>
            </div>
            <p className="font-semibold line-clamp-3 duration-300 text-xs sm:text-base">
              {judul}
            </p>
            <p className="line-clamp-4 sm:line-clamp-3 text-xs sm:text-base">
              {content}
            </p>
            {/* <img className="bg-white rounded-full" src={rightrow} alt="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

CardBerita.propTypes = {
  image: PropTypes.string.isRequired,
  tanggal: PropTypes.string.isRequired,
  judul: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};
