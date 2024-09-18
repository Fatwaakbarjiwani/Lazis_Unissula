import user from "../../assets/user.svg";
import love from "../../assets/love.svg";
import love2 from "../../assets/love2.svg";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function CardDoa({ id, nama, waktu, judul, ucapan, aamiin }) {
  const [saveID, setSaveID] = useState([]);

  useEffect(() => {
    const storedIds = JSON.parse(localStorage.getItem("savedDoaIds")) || [];
    setSaveID(storedIds);
  }, []);

  const handleSaveId = (id) => {
    let updatedIds = [...saveID];
    if (updatedIds.includes(id)) {
      updatedIds = updatedIds.filter((savedId) => savedId !== id);
    } else {
      updatedIds.push(id);
    }

    setSaveID(updatedIds);
    localStorage.setItem("savedDoaIds", JSON.stringify(updatedIds));
  };
  const isAamiinClicked = saveID.includes(id);

  return (
    <div className="bg-second p-2 shadow-md rounded-2xl h-full flex flex-col justify-between m-1">
      <div className="flex items-center gap-2">
        <div>
          <img src={user} alt="" />
        </div>
        <div>
          <h3 className="text-xs sm:text-base font-semibold text-gray-800">
            {nama}
          </h3>
          <p className="text-[10px] sm:text-xs">{waktu}</p>
          <p className="text-[10px] sm:text-xs text-primary line-clamp-1">
            {judul}
          </p>
        </div>
      </div>
      <p className="text-xs sm:text-base">{ucapan}</p>
      <p className="text-xs sm:text-base text-[#f00793] font-semibold">
        {aamiin} orang memberi aamiin
      </p>
      <div className="flex justify-center">
        <button
          onClick={() => handleSaveId(id)}
          className={`flex hover:scale-105 duration-150 gap-1 items-center text-sm font-bold text-base ${
            isAamiinClicked ? "text-[#f00793]" : "text-gray-600"
          }`}
        >
          {isAamiinClicked ? (
            <img className="h-6 sm:h-auto" src={love2} alt="" />
          ) : (
            <img className="h-6 sm:h-auto" src={love} alt="" />
          )}
          Aamiin
        </button>
      </div>
    </div>
  );
}

CardDoa.propTypes = {
  nama: PropTypes.string,
  waktu: PropTypes.string,
  judul: PropTypes.string,
  ucapan: PropTypes.string,
  aamiin: PropTypes.number,
  id: PropTypes.number,
};
