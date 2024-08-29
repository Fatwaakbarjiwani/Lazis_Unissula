import user from "../../assets/user.svg";
import love from "../../assets/love.svg";
import PropTypes from "prop-types";

export default function CardDoa({ nama, waktu, judul, ucapan }) {
  return (
    <div className="bg-second p-2 shadow-md rounded-2xl h-full flex flex-col justify-between m-2">
      <div className="flex items-center gap-2">
        <div>
          <img src={user} alt="" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-800">{nama}</h3>
          <p className="text-xs">{waktu}</p>
          <p className="text-xs text-primary line-clamp-1">{judul}</p>
        </div>
      </div>
      <p>{ucapan}</p>
      <div className="flex justify-center">
        <button className="flex gap-1 items-center">
          <img src={love} alt="" /> Aamiin
        </button>
      </div>
    </div>
  );
}
CardDoa.propTypes = {
  nama: PropTypes.string.isRequired,
  waktu: PropTypes.string.isRequired,
  judul: PropTypes.string.isRequired,
  ucapan: PropTypes.string.isRequired,
};

